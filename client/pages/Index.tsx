import React, { useEffect, useState } from "react";
import { NavigationRail } from "../components/NavigationRail";
import { ChatArea } from "../components/ChatArea";
import { MessageInput } from "../components/MessageInput";
import { FloatingActionButton } from "../components/FloatingActionButton";
import { ProductCatalog } from "../components/ProductCatalog";
import { ChatMessageProps } from "../components/ChatMessage";
import { ImageReferenceChat } from "../components/ImageReferenceChat";

export default function Index() {
  const [isRailCollapsed, setIsRailCollapsed] = useState(true); // Start collapsed on mobile
  const [isMobile, setIsMobile] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isImageChatOpen, setIsImageChatOpen] = useState(false);

  // Keep track of available chats (simple example)
  const chats = [
    {
      id: "bali-vacation",
      title: "Let’s create your perfect Bali vacation outfit ✨",
    },
  ];

  const [selectedChatId, setSelectedChatId] = useState<string>(chats[0].id);

  // Handle responsive behavior
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Auto-collapse on mobile
      if (mobile) {
        setIsRailCollapsed(true);
      }
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);
  const [messages, setMessages] = useState<ChatMessageProps[]>([
    {
      message:
        "I’m preparing for my trip to Bali 🌴✨ Can you help me find a hot evening dress that’s stylish and perfect for tropical nights?\n\nLooking for a sexy evening dress for my Bali trip. Can you suggest something?",
      type: "sent",
    },
    {
      message:
        "Got it! I’d love to help you find the perfect evening dress for your Bali trip.\n\nBefore we start, just a few quick questions so I can suggest looks that truly fit your vibe:\n\nWhat mood are you going for — elegant, playful, or bold?\nDo you have any favorite colors or fabrics in mind?\nShould the dress feel more lightweight for tropical evenings, or chic for a fancy dinner?\n\nThe better I understand your style and context, the more beautiful outfits I can recommend. 💃",
      type: "received",
    },
  ]);

  const handleSendMessage = (message: string) => {
    const newMessage: ChatMessageProps = {
      message,
      type: "sent",
      timestamp: new Date().toLocaleTimeString("uk-UA", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate assistant response after a brief delay
    setTimeout(() => {
      const assistantResponse: ChatMessageProps = {
        message:
          "Дякую за ваше ��овідомлення! Я розумію, що ви шукаете стильний образ для особливого випадку. Дайте мені трохи часу, щоб підібрати ідеальний комплект одягу ��ля вашої вечері в ресторані.",
        type: "received",
        timestamp: new Date().toLocaleTimeString("uk-UA", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, assistantResponse]);
    }, 1000);
  };

  const toggleRail = () => {
    setIsRailCollapsed(!isRailCollapsed);
  };

  const closeRailOnMobile = () => {
    if (isMobile) {
      setIsRailCollapsed(true);
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      {/* Mobile Overlay */}
      {isMobile && !isRailCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeRailOnMobile}
        />
      )}

      {/* Navigation Rail */}
      <NavigationRail
        isCollapsed={isRailCollapsed}
        onToggle={toggleRail}
        onSearchByImage={() => setIsImageChatOpen(true)}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Mobile Header */}
        {isMobile && isRailCollapsed && (
          <div className="flex items-center p-4 border-b border-border bg-white">
            <button
              onClick={toggleRail}
              className="p-2 rounded-lg hover:bg-muted transition-colors mr-3"
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-lg font-medium">Chat Assistant</h1>
          </div>
        )}

        {/* Chat Messages */}
        <ChatArea messages={messages} chatName="Chat Assistant" />

        {/* Message Input */}
        <MessageInput onSendMessage={handleSendMessage} />
      </div>

      {/* Floating Action Button */}
      {isImageChatOpen && (
        <ImageReferenceChat
          userName={"Roman Z."}
          onClose={() => setIsImageChatOpen(false)}
        />
      )}
      <FloatingActionButton onClick={() => setIsCatalogOpen(true)} />

      {/* Product Catalog Modal */}
      <ProductCatalog
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
      />
    </div>
  );
}
