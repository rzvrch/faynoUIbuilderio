import React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

export function UserProfile({ 
  isOpen, 
  onClose, 
  userName = "Roman Zvarych" 
}: UserProfileProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Side Sheet */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-profile-title"
        className={cn(
          "relative flex flex-col w-80 max-w-sm h-full bg-background",
          "border-r border-outline-variant shadow-lg",
          "animate-in slide-in-from-left duration-300"
        )}
        style={{ 
          borderRight: "0.5px solid #B3B3B3"
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-3 pr-3 pl-6 pt-3 pb-4">
          <div className="flex-1 pt-3">
            <h1 
              id="user-profile-title"
              className="text-[22px] font-normal leading-7 text-[#49454F] font-roboto"
            >
              {userName}
            </h1>
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className={cn(
              "flex items-center justify-center w-12 h-12",
              "rounded-full hover:bg-muted transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            )}
            aria-label="Close user profile"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full">
              <X className="w-6 h-6 text-[#49454F]" />
            </div>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 px-6">
          {/* Profile content will go here */}
          <div className="text-sm text-muted-foreground">
            Profile settings and options coming soon...
          </div>
        </div>

        {/* Vertical Divider */}
        <div 
          className="absolute right-0 top-0 w-px h-full bg-outline-variant"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
