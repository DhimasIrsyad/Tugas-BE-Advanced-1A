import React from "react";

const PriceLabel = ({ price }) => {
  return (
    <span className="text-green-500 font-bold text-xs md:text-sm whitespace-nowrap">
      {price}
    </span>
  );
};

export default PriceLabel;
