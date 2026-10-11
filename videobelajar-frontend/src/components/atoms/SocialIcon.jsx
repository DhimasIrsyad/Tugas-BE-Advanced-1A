import React from "react";

const SocialIcon = ({ src, alt, href = "#" }) => {
  return (
    <a
      href={href}
      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 cursor-pointer transition-all"
    >
      <img
        src={src}
        alt={alt}
        className="w-6 h-6 object-contain block transition-transform hover:scale-105"
      />
    </a>
  );
};

export default SocialIcon;
