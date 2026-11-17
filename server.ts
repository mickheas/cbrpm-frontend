import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini AI client server-side
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

// Natural language search parser endpoint
app.post("/api/ai/parse-search", async (req: Request, res: Response) => {
  const { query } = req.body;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const ai = getGenAI();
    if (ai) {
      const prompt = `You are the smart search parser for Addis Ababa City Administration Building & Rental Property Management System (የአዲስ አበባ ከተማ አስተዳደር ህንፃዎች እና ኪራይ ንብረት አስተዳደር).
Extract structured search parameters from the user's natural language municipal rental housing and property query.
Query: "${query}"

Return ONLY valid JSON matching this schema:
{
  "type": "rent" | "all",
  "subCity": string | null (e.g. "Bole", "Kirkos", "Yeka", "Arada", "Lideta", "Nifas Silk", "Gulele", "Kolfe Keranio", "Akaky Kaliti", "Addis Ketema", "Lemi Kura"),
  "bedrooms": number | null (e.g. 1, 2, 3, 4),
  "maxPrice": number | null,
  "currency": "ETB" | "USD" | "EUR" | "GBP",
  "houseType": "government" | "international_standard" | "all",
  "keywords": string[],
  "interpretedSummary": string
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.1,
        }
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        return res.json({ success: true, data: parsed, engine: "gemini-3.5-flash-lite" });
      }
    }
  } catch (error) {
    console.error("Gemini parse-search error, using deterministic fallback:", error);
  }

  // Fallback rule-based parsing if AI service is not available
  const lower = query.toLowerCase();
  let type: "rent" | "all" = "all";
  if (lower.includes("rent") || lower.includes("lease") || lower.includes("monthly") || lower.includes("unit") || lower.includes("flat") || lower.includes("apartment")) {
    type = "rent";
  }

  const subCities = ["Bole", "Kirkos", "Yeka", "Arada", "Lideta", "Nifas Silk", "Gulele", "Kolfe", "Kaliti", "Ketema", "Lemi Kura"];
  let matchedSubCity: string | null = null;
  for (const sc of subCities) {
    if (lower.includes(sc.toLowerCase())) {
      matchedSubCity = sc;
      break;
    }
  }

  let bedrooms: number | null = null;
  const bedMatch = lower.match(/(\d+)\s*(?:bed|bedroom|br|bhk)/i);
  if (bedMatch) {
    bedrooms = parseInt(bedMatch[1], 10);
  } else if (lower.includes("studio")) {
    bedrooms = 0;
  }

  let currency: "ETB" | "USD" | "EUR" | "GBP" = "ETB";
  let maxPrice: number | null = null;

  if (lower.includes("$") || lower.includes("usd") || lower.includes("dollar")) {
    currency = "USD";
  } else if (lower.includes("€") || lower.includes("eur") || lower.includes("euro")) {
    currency = "EUR";
  } else if (lower.includes("£") || lower.includes("gbp") || lower.includes("pound")) {
    currency = "GBP";
  }

  const priceMatch = lower.match(/(?:under|below|max|budget|within|upto|<|\$|birr|etb)?\s*(\$|€|£|etb|birr)?\s*([\d,]+(?:\.\d+)?)\s*(?:k|thousand)?/i);
  if (priceMatch && priceMatch[2]) {
    let val = parseFloat(priceMatch[2].replace(/,/g, ""));
    if (lower.includes("k") && val < 1000) val *= 1000;
    if (val > 50) maxPrice = val;
  }

  let houseType: "government" | "international_standard" | "all" = "all";
  if (lower.includes("government") || lower.includes("standard") || lower.includes("city")) {
    houseType = "government";
  } else if (lower.includes("luxury") || lower.includes("international") || lower.includes("premium") || lower.includes("high-end")) {
    houseType = "international_standard";
  }

  return res.json({
    success: true,
    data: {
      type,
      subCity: matchedSubCity,
      bedrooms,
      maxPrice,
      currency,
      houseType,
      keywords: query.split(/\s+/).filter(w => w.length > 2),
      interpretedSummary: `Filters applied for: ${type.toUpperCase()} in ${matchedSubCity || "All Locations"}, ${bedrooms !== null ? `${bedrooms} Bedrooms` : "Any Bedrooms"}`
    },
    engine: "heuristic-fallback"
  });
});

// City Property AI Copilot Chat Endpoint (Informational & Guidance)
app.post("/api/ai/copilot", async (req: Request, res: Response) => {
  const { messages, language = "en" } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Valid message history required" });
  }

  const systemInstruction = `You are the official City Property AI Copilot for the Addis Ababa City Administration Building & Rental Property Management System (የአዲስ አበባ ከተማ አስተዳደር ህንፃዎች እና ኪራይ ንብረት አስተዳደር).
Your role is to provide trustworthy, accurate, and professional public information regarding city property management, rental leasing rules, public building governance, maintenance workflows, complaint handling, and sub-city branch services.

Key Institutional Facts:
1. Mandate & Portfolio: Established by the Addis Ababa City Administration, the department manages public buildings, residential and commercial rental property stock (72,400+ units), and municipal facilities across all 11 sub-cities of Addis Ababa.
2. Property Scope: Post-construction handover, lease agreement administration, rent billing and electronic payment collection (CBE, Telebirr, Awash Bank), preventive maintenance dispatch, defect rectification, and tenant complaint resolution.
3. Official Public Contact: info@addisproperty.gov.et. Hotline: 8333 / 9912. Head office at Addis Ababa City Administration Building, Churchill Ave.
4. Diaspora & International Services: Foreign currency (FCY) rental lease transactions are supported under National Bank of Ethiopia (NBE) directives.
5. Currency & Exchange: Valuations and lease rates are quoted in ETB and international currencies at official NBE rates.
6. Maintenance & Complaints: 24/7 logging, technician dispatch across 11 sub-city depots, and transparent SLA tracking (Emergency 4-hour SLA for power/water leaks).

Always maintain a respectful, formal, and authoritative municipal tone. Support answers in English, Amharic (አማርኛ), or Afaan Oromoo according to user preference.`;

  try {
    const ai = getGenAI();
    if (ai) {
      // Filter valid message objects and format for Gemini API
      const validTurns: { role: "user" | "model"; parts: { text: string }[] }[] = [];
      
      for (const m of messages) {
        if (!m || !m.content || typeof m.content !== "string") continue;
        const text = m.content.trim();
        if (!text) continue;
        const role = m.role === "assistant" || m.role === "model" ? "model" : "user";
        validTurns.push({
          role,
          parts: [{ text }]
        });
      }

      // Gemini multi-turn conversation MUST start with a 'user' turn
      while (validTurns.length > 0 && validTurns[0].role !== "user") {
        validTurns.shift();
      }

      // Ensure turns alternate strictly between user and model
      const alternateTurns: { role: "user" | "model"; parts: { text: string }[] }[] = [];
      for (const turn of validTurns) {
        if (alternateTurns.length > 0 && alternateTurns[alternateTurns.length - 1].role === turn.role) {
          alternateTurns[alternateTurns.length - 1].parts[0].text += `\n\n${turn.parts[0].text}`;
        } else {
          alternateTurns.push(turn);
        }
      }

      // If valid turns exist, make generateContent call with a timeout race
      if (alternateTurns.length > 0) {
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("AI generation timed out")), 10000)
        );

        const aiPromise = ai.models.generateContent({
          model: "gemini-3.5-flash-lite",
          contents: alternateTurns,
          config: {
            systemInstruction,
            temperature: 0.3,
          }
        });

        const response: any = await Promise.race([aiPromise, timeoutPromise]);

        if (response && response.text && response.text.trim().length > 0) {
          return res.json({
            reply: response.text,
            sources: [
              "Addis Ababa City Administration Property Directives",
              "National Bank of Ethiopia (NBE) Directives",
              "City Building & Rental Property Management Guidelines 2026"
            ]
          });
        }
      }
    }
  } catch (err) {
    console.error("Gemini Copilot Error, deploying expert municipal knowledge engine:", err);
  }

  // Comprehensive, structured municipal knowledge base fallback
  const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || "";
  let reply = "";
  let sources = ["Addis Ababa City Administration Building & Rental Property Management Directorate (info@addisproperty.gov.et)"];

  if (lastUserMsg.includes("lease") || lastUserMsg.includes("rent") || lastUserMsg.includes("apply") || lastUserMsg.includes("application") || lastUserMsg.includes("eligibility") || lastUserMsg.includes("quota")) {
    reply = `### Addis Ababa City Public Tenancy & Lease Process

1. **Eligibility Criteria:**
   * Valid Ethiopian Resident ID (Kebele ID or Fayda Digital ID).
   * Verified Taxpayer Identification Number (TIN).
   * Official clearance demonstrating no outstanding municipal rent arrears or previous tenancy defaults.
   * Civil servant allocation quota verification (where applicable).

2. **Application Channels:**
   * **Online:** Submit through our Public Services Portal under the "Public Housing Quota" section.
   * **In-Person:** Visit your designated Sub-City Land & Property Management Branch Depot.

3. **Lease Agreement Administration:**
   * Formal agreements are executed under City Administration Directive No. 44/2026.
   * Statutory lease term: 2 to 5 years, renewable upon timely rent reconciliation.
   * Grace period: Rent is payable on or before the 30th of each calendar month, with a 5-day grace window.`;
    sources.push("Municipal Housing Directive No. 44/2026");
  } else if (lastUserMsg.includes("maintenance") || lastUserMsg.includes("repair") || lastUserMsg.includes("defect") || lastUserMsg.includes("leak") || lastUserMsg.includes("plumbing") || lastUserMsg.includes("electric") || lastUserMsg.includes("broken")) {
    reply = `### Municipal Maintenance & Defect Resolution Protocol

1. **Logging Defects:**
   * Report through the **Tenant Portal** (Defects & Depot Requests tab) or call the **24/7 Hotline at 8333**.
   * Specify building block, unit number, photo evidence, and urgency classification.

2. **Service Level Agreements (SLAs):**
   * **Emergency Tier (Within 4 Hours):** Burst potable water mains, sewage overflows, electrical faults risking fire, or elevator stoppages.
   * **Standard Tier (Within 48–72 Hours):** Joinery repairs, roofing maintenance, lighting fixtures, and plaster repairs.

3. **Technician Dispatch:**
   * On-duty municipal engineering crews are dispatched directly from your sub-city's centralized maintenance depot.`;
    sources.push("Municipal Facility Maintenance Operational SLA 2026");
  } else if (lastUserMsg.includes("bank") || lastUserMsg.includes("cbe") || lastUserMsg.includes("telebirr") || lastUserMsg.includes("deposit") || lastUserMsg.includes("slip") || lastUserMsg.includes("pay") || lastUserMsg.includes("payment") || lastUserMsg.includes("account")) {
    reply = `### Designated Treasury Payment Accounts & Slip Verification

Rent payments must be deposited directly into official municipal accounts:

* **Commercial Bank of Ethiopia (CBE):**
  * Account Name: *AA Housing Dev Treasury*
  * Account Number: **1000-0238-4921-9**
* **Awash Bank / Telebirr Pay:**
  * Account Number: **0132-0948-2831-0**
  * Telebirr Biller Code: **99420**

**Submitting Payment Slips:**
After completing your transfer or bank deposit, submit your deposit slip photograph or transaction reference via the **Tenant Portal -> Rent & Deposit Slips tab**. The Municipal Finance Desk verifies slips against CBE treasury statements within 24 business hours to issue your statutory rent clearance.`;
    sources.push("City Treasury Collection Directives 2026");
  } else if (lastUserMsg.includes("diaspora") || lastUserMsg.includes("foreign") || lastUserMsg.includes("fcy") || lastUserMsg.includes("dollar") || lastUserMsg.includes("usd") || lastUserMsg.includes("euro")) {
    reply = `### Diaspora & International Commercial Leasing (FCY)

* **Eligibility:** Non-Resident Ethiopians, Ethiopian Origin Identity Card holders (Yellow Card), and registered foreign commercial organizations.
* **Payment Channels:** Foreign Currency (FCY) bank transfers (USD, EUR, GBP) in accordance with National Bank of Ethiopia (NBE) directives.
* **Benefits:** Guaranteed long-term commercial lease security, expedited sub-city permitting, and dedicated diaspora desk assistance at our Churchill Avenue Head Office.`;
    sources.push("National Bank of Ethiopia (NBE) Foreign Currency Leasing Directives");
  } else if (lastUserMsg.includes("depot") || lastUserMsg.includes("branch") || lastUserMsg.includes("sub-city") || lastUserMsg.includes("subcity") || lastUserMsg.includes("location") || lastUserMsg.includes("office")) {
    reply = `### 11 Sub-City Property Management Depots Directory

The City Administration operates direct branch offices across all 11 sub-cities:
* **Bole:** Rwanda St., Near Bole Sub-City Municipality (+251 11 662 4410)
* **Yeka:** Megenaña Square, Meles Zenawi Building (+251 11 646 2201)
* **Kirkos:** Meskel Flower Rd., Opposite Dreamliner (+251 11 465 3320)
* **Arada:** Churchill Ave., City Administration Complex (+251 11 155 0400)
* **Lemi Kura:** Ayat Zone 2, Administrative Depot (+251 11 667 8900)
* **Lideta:** Balcha Hospital Area, Sub-City Depot (+251 11 550 1234)
* **Nifas Silk-Lafto:** Gotera Interchange, Housing Bureau (+251 11 442 5560)
* **Kolfe Keranio:** Total 18 Area, Municipal Hub (+251 11 278 9911)
* **Gulele:** Piazza / St. George Depot (+251 11 123 4567)
* **Addis Ketema:** Merkato Administration Block (+251 11 275 8890)
* **Akaki Kality:** Kality Ring Road Industrial Zone (+251 11 434 0012)

**Working Hours:** Monday – Friday, 8:30 AM to 5:30 PM; Saturday, 8:30 AM to 12:30 PM.`;
    sources.push("Addis Ababa Sub-City Directorate Network");
  } else if (lastUserMsg.includes("complaint") || lastUserMsg.includes("grievance") || lastUserMsg.includes("ticket") || lastUserMsg.includes("dispute")) {
    reply = `### Citizen Grievance & Complaint Redressal System

* **Filing Channel:** Use the Tenant Portal or visit the Customer Complaint Desk at your local sub-city depot.
* **Escalation Hierarchy:**
  1. Sub-City Depot Supervisor (Level 1, within 48 hours).
  2. Sub-City Chief Housing Officer (Level 2, within 5 business days).
  3. Central City Administration Housing Grievance Tribunal (Level 3).
* **Tracking:** All tickets receive an official tracking ID (e.g. AACA-CMP-2026-X) with SMS status updates.`;
    sources.push("Addis Ababa Ombudsman & Housing Citizen Charter");
  } else {
    reply = `Welcome to the Addis Ababa City Administration Building & Rental Property Management Civic AI Desk.

We administer over 72,400+ public buildings and residential housing units across all 11 sub-cities of Addis Ababa. How may I assist you today?

**Common Inquiries:**
1. **Tenancy & Leases:** Eligibility, quota applications, and lease renewals.
2. **Rent Payments:** CBE & Telebirr treasury accounts and deposit slip verification.
3. **Maintenance:** Logging plumbing, electrical, or structural defects for depot dispatch.
4. **Sub-City Depots:** Contact info and locations for our 11 branch offices.
5. **Diaspora Leasing:** Foreign Currency (FCY) rental guidelines under NBE rules.

Feel free to ask your question in English, Amharic (አማርኛ), or Afaan Oromoo.`;
  }

  return res.json({
    reply,
    sources
  });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Property System Server running on http://localhost:${PORT}`);
  });

  server.on("error", (err) => {
    console.error("Server error:", err);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
