import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, Menu, ChevronLeft, LogOut, PanelLeft, Folder, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationRailProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  onNewChat?: () => void;
  onSearchByImage?: () => void;
  onStartFaynoChat?: () => void;
  onLogout?: () => void;
}

export function NavigationRail({
  isCollapsed = false,
  onToggle,
  onNewChat = () => {},
  onSearchByImage = () => {},
  onStartFaynoChat = () => {},
  onLogout = () => {},
}: NavigationRailProps) {
  // navigation rail component
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [menuPos, setMenuPos] = useState<{ left: number; top: number } | null>(
    null,
  );
  const toggleMenu = () => setMenuOpen((v) => !v);
  const [isHoveringToggle, setIsHoveringToggle] = useState(false);

  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        menuRef.current &&
        (menuRef.current.contains(target) ||
          (buttonRef.current && buttonRef.current.contains(target)))
      ) {
        return;
      }
      setMenuOpen(false);
    }
    document.addEventListener("mousedown", handleDocClick);
    return () => document.removeEventListener("mousedown", handleDocClick);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      setMenuPos(null);
      return;
    }
    // compute button position and set menuPos for fixed positioning
    const btn = buttonRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const left = rect.right + 12; // 12px gap
      const top = rect.top;
      setMenuPos({ left, top });
    }
  }, [menuOpen]);

  const handleImageSearch = () => {
    setMenuOpen(false);
    onSearchByImage();
  };

  const handleFaynoChat = () => {
    setMenuOpen(false);
    onStartFaynoChat();
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-sidebar transition-all duration-300 ease-in-out",
        // Mobile: sidebar is overlay when expanded, hidden when collapsed
        "md:relative absolute inset-y-0 left-0 z-50 ml-auto",
        isCollapsed ? "w-0 md:w-20 overflow-hidden" : "w-80 md:w-80",
      )}
      style={{ border: "1px solid rgba(243, 243, 243, 1)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-center p-4 my-auto mx-0 cursor-pointer"
        onClick={(e) => {
          // only trigger when clicking the header itself, not inner buttons
          if (e.target !== e.currentTarget) return;
          onToggle?.();
        }}
      >
        {!isCollapsed && (
          <div className="flex items-center rounded-full basis-0 flex-grow gap-3 py-[18px] px-4">
            <div className="flex items-center gap-3">
              <div className="text-[22px] font-medium leading-7 tracking-[0px] text-[#49454F] font-roboto">
                FAYNO
              </div>
            </div>
          </div>
        )}
        <button
          onClick={onToggle}
          onMouseEnter={() => setIsHoveringToggle(true)}
          onMouseLeave={() => setIsHoveringToggle(false)}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors flex flex-col items-center"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title="Open sidebar"
        >
          {isCollapsed ? (
            isHoveringToggle ? (
              <PanelLeft className="w-5 h-5 text-sidebar-foreground" />
            ) : (
              <span className="block text-[#424A52] text-[20px] font-medium">
                F
              </span>
            )
          ) : (
            <ChevronLeft className="w-5 h-5 text-sidebar-foreground" />
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <div
        className={cn(
          "flex-1 p-4 flex flex-col justify-start items-stretch",
          isCollapsed ? "cursor-pointer" : "",
        )}
        onClick={(e) => {
          // only trigger when clicking the container background itself
          if (e.target !== e.currentTarget) return;
          if (isCollapsed) onToggle?.();
        }}
      >
        <div className="space-y-2">
          <div className="flex flex-col w-full">
            {/* Add New Chat Button */}
            <div className="relative" ref={menuRef}>
              <button
                ref={buttonRef}
                onClick={toggleMenu}
                title="Start new chat"
                aria-label="Start new chat"
                aria-expanded={menuOpen}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-[28px] hover:bg-primary-container transition-colors w-full",
                  isCollapsed && "justify-center",
                )}
              >
                <div className="flex items-center justify-center w-6 h-6">
                  <svg
                    className="w-6 h-6 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {!isCollapsed && (
                  <span className="text-primary font-medium">Add New Chat</span>
                )}
              </button>

              {menuOpen && (
                <div
                  role="menu"
                  aria-label="Start new chat options"
                  ref={menuRef}
                  style={{
                    position: "fixed",
                    left: menuPos ? `${menuPos.left}px` : "auto",
                    top: menuPos ? `${menuPos.top}px` : "auto",
                    width: "240px",
                    zIndex: 9999,
                  }}
                  className="bg-card border border-border rounded-lg shadow-lg py-1"
                >
                  <button
                    role="menuitem"
                    onClick={handleImageSearch}
                    className="w-full text-left px-4 py-2 hover:bg-muted rounded-t-lg"
                  >
                    Search by image reference
                  </button>
                  <button
                    role="menuitem"
                    onClick={handleFaynoChat}
                    className="w-full text-left px-4 py-2 hover:bg-muted rounded-b-lg"
                  >
                    Search by chat with Fayno stylist assistant
                  </button>
                </div>
              )}
            </div>

            {/* Chat Item - Active */}
            <div
              className={cn(
                "flex items-center gap-3 p-3 rounded-[28px] bg-[rgba(252,248,245,1)] cursor-pointer transition-colors w-full",
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
      </div>

      {/* User Avatar */}
      <div className="p-4">
        <div
          className={cn(
            "flex items-center gap-3 w-full",
            isCollapsed ? "justify-center" : "justify-between",
          )}
        >
          <div className="flex items-center gap-3">
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

          {!isCollapsed && (
            <div className="ml-3">
              <button
                onClick={onLogout}
                title="Log out"
                aria-label="Log out"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors text-sm"
              >
                <LogOut className="w-4 h-4 text-sidebar-foreground" />
                <span className="text-sidebar-foreground">Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
