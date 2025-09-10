import React, { useState, useEffect } from "react";
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
        "Мені цікаво, які твої можливості по підбору одягу і ві��ображення вибраних позицій у чаті. Можеш зробити приклади на основі одягу зі сайту Zara. підбери мені цілісний образ на вечерю із дівчиною у ресторані",
      type: "sent",
      timestamp: "12:34",
    },
    {
      message:
        "Звісно! Уявімо, що я твій особистий стиліст 😊\nОсь що я можу зробити для тебе в чаті на прикладі Zara:\n\n🔍 Контекст:\nПодія: вечеря з дівчиною в ресторані\nЛокація: припустимо, сучасний ресторан з невимушеним, але стильним дрес-кодом\nМета: виглядати впевнено, з елегантним стилем, без надмірної офіційності",
      type: "received",
      timestamp: "12:35",
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
          "Дякую за ваше повідомлення! Я розумію, що ви шукаете стильний образ для особливого випадку. Дайте мені трохи часу, щоб підібрати ідеальний комплект одягу для вашої вечері в ресторані.",
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
      <NavigationRail isCollapsed={isRailCollapsed} onToggle={toggleRail} onSearchByImage={() => setIsImageChatOpen(true)} />

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
        <ChatArea messages={messages} />

        {/* Message Input */}
        <MessageInput onSendMessage={handleSendMessage} />
      </div>

      {/* Floating Action Button */}
      {isImageChatOpen && (
        <ImageReferenceChat userName={"Roman Z."} onClose={() => setIsImageChatOpen(false)} />
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
