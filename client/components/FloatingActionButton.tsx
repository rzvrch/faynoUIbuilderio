import React from "react";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  onClick: () => void;
  className?: string;
}

export function FloatingActionButton({
  onClick,
  className,
}: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground",
        "rounded-full shadow-lg hover:shadow-xl transition-all duration-200",
        "flex items-center justify-center z-[100]",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        className,
      )}
      style={{ margin: '0 50px 200px 0' }}
      aria-label="Open product catalog"
    >
      <ShoppingBag className="w-6 h-6 flex flex-col justify-center items-center" />
    </button>
  );
}
