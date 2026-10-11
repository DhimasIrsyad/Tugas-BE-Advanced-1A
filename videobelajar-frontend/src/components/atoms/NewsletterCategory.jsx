import React from "react";

const NewsletterCategory = ({ children }) => {
  return (
    <p className="text-[10px] tracking-widest font-bold uppercase text-white mb-1 opacity-90">
      {children}
    </p>
  );
};

export default NewsletterCategory;
