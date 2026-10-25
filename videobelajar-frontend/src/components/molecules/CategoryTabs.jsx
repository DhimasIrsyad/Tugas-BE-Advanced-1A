import React from "react";
import CategoryTabItem from "../atoms/CategoryTabItem";

const CategoryTabs = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex gap-5 border-b border-gray-200 mb-6 overflow-x-auto pb-1.5 scrollbar-none">
      {categories.map((category, index) => (
        <CategoryTabItem
          key={index}
          label={category}
          // Tab akan menyala aktif jika teks labelnya sama dengan state activeCategory
          isActive={activeCategory === category}
          // Saat diklik, langsung ubah teks kategori aktif di file induk
          onClick={() => setActiveCategory(category)}
        />
      ))}
    </div>
  );
};

export default CategoryTabs;
