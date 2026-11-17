import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { NEWS_ARTICLES } from "../data/mockData";
import { 
  FileText, 
  Calendar, 
  ChevronRight
} from "lucide-react";

export const NewsPage: React.FC = () => {
  const { language } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeArticle, setActiveArticle] = useState<string | null>(null);

  const categories = ["all", "Policy & Circulars", "Infrastructure", "Diaspora Services", "Procurement & Tenders"];

  const filteredNews = NEWS_ARTICLES.filter(n => {
    if (selectedCategory === "all") return true;
    return n.category.toLowerCase().includes(selectedCategory.toLowerCase().split(" ")[0]);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[var(--color-line)] pb-4 space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00594C] dark:text-[#00A38C] uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5" />
          <span>Public information department</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink)]">
          News, circulars & official announcements
        </h1>
        <p className="text-xs sm:text-sm text-[var(--color-slate)] max-w-3xl">
          Official communications, housing allocation notices, policy proclamations, and public procurement tenders from the Federal Housing Corporation.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-[var(--color-line)] pb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-[#00594C] text-white"
                : "bg-[var(--color-surface)] hover:bg-[var(--color-base)] text-[var(--color-slate)] border border-[var(--color-line)]"
            }`}
          >
            {cat === "all" ? "All announcements" : cat}
          </button>
        ))}
      </div>

      {/* News Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNews.map((art) => {
          const title = language === "am" ? art.titleAm : art.title;
          const summary = language === "am" ? art.summaryAm : art.summary;
          const content = language === "am" ? art.contentAm : art.content;
          const isExpanded = activeArticle === art.id;

          return (
            <div 
              key={art.id}
              className={`bg-[var(--color-surface)] rounded-md overflow-hidden border border-[var(--color-line)] shadow-xs flex flex-col justify-between transition-all ${
                isExpanded ? "md:col-span-2 lg:col-span-3" : ""
              }`}
            >
              <div>
                <div className={`${isExpanded ? "h-60 sm:h-72" : "h-44"} w-full overflow-hidden bg-[var(--color-base)]`}>
                  <img
                    src={art.image}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 sm:p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-[var(--color-slate)]">
                    <span className="font-semibold text-[#00594C] dark:text-[#00A38C]">
                      {art.category}
                    </span>
                    <span className="flex items-center gap-1 font-mono-num">
                      <Calendar className="w-3 h-3" />
                      <span>{art.date}</span>
                    </span>
                  </div>

                  <h2 className="font-semibold text-sm sm:text-base text-[var(--color-ink)] leading-snug">
                    {title}
                  </h2>

                  <p className="text-xs text-[var(--color-slate)] leading-relaxed">
                    {isExpanded ? content : summary}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 pt-0">
                <button
                  type="button"
                  onClick={() => setActiveArticle(isExpanded ? null : art.id)}
                  className="text-xs font-semibold text-[#00594C] dark:text-[#00A38C] hover:underline flex items-center gap-1"
                >
                  <span>{isExpanded ? "Collapse announcement" : "Read full notice"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
