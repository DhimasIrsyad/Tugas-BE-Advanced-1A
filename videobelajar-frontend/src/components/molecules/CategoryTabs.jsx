import React, { useState } from "react";
import CategoryTabItem from "../atoms/CategoryTabItem";

const CategoryTabs = ({ categories }) => {
  // Menggunakan state untuk melacak kategori mana yang sedang diklik/aktif
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex gap-5 border-b border-gray-200 mb-6 overflow-x-auto pb-1.5 scrollbar-none">
      {categories.map((category, index) => (
        <CategoryTabItem
          key={index}
          label={category}
          isActive={activeTab === index}
          onClick={() => setActiveTab(index)}
        />
      ))}
    </div>
  );
};

export default CategoryTabs;
