import React from "react";

interface ProductCardProps {
  title: string;
  price: string;
  image: string;
  onClick?: () => void;
  selected?: boolean;
}

export function ProductCard({
  title,
  price,
  image,
  onClick,
  selected = false,
}: ProductCardProps) {
  return (
    <div
      className={
        "flex flex-col items-start gap-2 flex-shrink-0 w-[165px] h-[180px] rounded-xl cursor-pointer transition-colors relative " +
        (selected ? 'ring-2 ring-primary scale-[1.02]' : 'bg-[#ECE6F0] hover:bg-[#E1D8E8]')
      }
      onClick={onClick}
      aria-pressed={selected}
    >
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        <img src={image} alt={title} className="w-full h-full object-cover" />

        {/* Title overlay */}
        <div className="absolute bottom-2 left-2 right-2">
          <div className="text-[8px] leading-[14px] tracking-[0.4px] text-[#1D1B20] text-center font-normal line-clamp-1 mb-1">
            {title}
          </div>
        </div>

        {/* Price overlay */}
        <div className="absolute top-2 right-2">
          <div className="text-[8px] leading-[16px] tracking-[0.4px] text-[#49454F] text-center font-normal">
            {price}
          </div>
        </div>
      </div>
    </div>
  );
}
