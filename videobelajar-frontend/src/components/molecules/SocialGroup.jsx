import React from "react";
import SocialIcon from "../atoms/SocialIcon";

const SocialGroup = ({ items }) => {
  return (
    <div className="flex gap-2">
      {items.map((icon, index) => (
        <SocialIcon
          key={index}
          src={icon.src}
          alt={icon.alt}
          href={icon.href}
        />
      ))}
    </div>
  );
};

export default SocialGroup;
