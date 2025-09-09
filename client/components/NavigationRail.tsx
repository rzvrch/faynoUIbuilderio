import React, { useState } from "react";
import { MessageCircle, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationRailProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function NavigationRail({
  isCollapsed = false,
  onToggle,
}: NavigationRailProps) {
  return (
    <div
      className={cn(
        "flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
        // Mobile: sidebar is overlay when expanded, hidden when collapsed
        "md:relative absolute inset-y-0 left-0 z-50",
        isCollapsed ? "w-0 md:w-20 overflow-hidden" : "w-80 md:w-80",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <h1 className="text-lg font-medium text-sidebar-foreground">
            Chat Assistant
          </h1>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <Menu className="w-5 h-5 text-sidebar-foreground" />
          ) : (
            <X className="w-5 h-5 text-sidebar-foreground" />
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 p-4">
        <div className="space-y-2">
          {/* Add New Chat Button */}
          <button
            onClick={onNewChat}
            title="Start new chat"
            aria-label="Start new chat"
            className={cn(
              "flex items-center gap-3 p-3 rounded-[28px] hover:bg-primary-container transition-colors",
              isCollapsed && "justify-center"
            )}
          >
            <div className="flex items-center justify-center w-6 h-6">
              <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {!isCollapsed && (
              <span className="text-primary font-medium">Add New Chat</span>
            )}
          </button>

          {/* Chat Item - Active */}
          <div
            className={cn(
              "flex items-center gap-3 p-3 rounded-[28px] bg-sidebar-accent cursor-pointer transition-colors",
              isCollapsed && "justify-center",
            )}
          >
            <div className="flex items-center justify-center w-6 h-6">
              <MessageCircle className="w-6 h-6 text-sidebar-accent-foreground" />
            </div>
            {!isCollapsed && (
              <span className="text-sidebar-accent-foreground font-medium">
                Chat
              </span>
            )}
          </div>
        </div>
      </div>

      {/* User Avatar */}
      <div className="p-4 border-t border-sidebar-border">
        <div
          className={cn(
            "flex items-center gap-3",
            isCollapsed && "justify-center",
          )}
        >
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-medium">
                U
              </span>
            </div>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                User
              </p>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                Online
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
