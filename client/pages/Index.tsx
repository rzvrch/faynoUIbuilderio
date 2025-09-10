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

  // Keep track of available chats (dynamic)
  const [chats, setChats] = useState<{ id: string; title: string }[]>([
    {
      id: "bali-vacation",
      title: "Let’s create your perfect Bali vacation outfit ✨",
    },
  ]);

  const [selectedChatId, setSelectedChatId] = useState<string>(chats[0].id);
  const [autoFocusChatId, setAutoFocusChatId] = useState<string | null>(null);

  // Messages per chat id
  const [messagesMap, setMessagesMap] = useState<
    Record<string, ChatMessageProps[]>
  >({
    "bali-vacation": [
      {
        message:
          "I��m preparing for my trip to Bali 🌴✨ Can you help me find a hot evening dress that’s stylish and perfect for tropical nights?\n\nLooking for a sexy evening dress for my Bali trip. Can you suggest something?",
        type: "sent",
      },
      {
        message:
          "Got it! I’d love to help you find the perfect evening dress for your Bali trip.\n\nBefore we start, just a few quick questions so I can suggest looks that truly fit your vibe:\n\nWhat mood are you going for — elegant, playful, or bold?\nDo you have any favorite colors or fabrics in mind?\nShould the dress feel more lightweight for tropical evenings, or chic for a fancy dinner?\n\nThe better I understand your style and context, the more beautiful outfits I can recommend. 💃",
        type: "received",
      },
    ],
  });

  const handleSendMessage = (message: string) => {
    if (!selectedChatId) return;
    const chatId = selectedChatId;

    const newMessage: ChatMessageProps = {
      message,
      type: "sent",
      timestamp: new Date().toLocaleTimeString("uk-UA", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Add user's message
    setMessagesMap((prev) => {
      const prevMessages = prev[chatId] ?? [];
      return { ...prev, [chatId]: [...prevMessages, newMessage] };
    });

    // Special handling for "cat" (case-insensitive)
    if (message.trim().toLowerCase() === "cat") {
      // Fetch a cat image and insert as part of the assistant's message
      const prevMessages = messagesMap[chatId] ?? [];
      fetch("https://cataas.com/cat")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch cat image");
          return res.blob();
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const assistantMessage: ChatMessageProps = {
            message: "Here's a cute cat for you 🐱",
            type: "received",
            imageUrl: url,
            imageAlt: "Random cat from Cataas",
            timestamp: new Date().toLocaleTimeString("uk-UA", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };

          setMessagesMap((prev) => {
            const prevMessagesInner = prev[chatId] ?? [];
            return {
              ...prev,
              [chatId]: [...prevMessagesInner, assistantMessage],
            };
          });
        })
        .catch(() => {
          const assistantMessage: ChatMessageProps = {
            message:
              "Couldn't fetch a cat right now, but here's a virtual meow 🐾",
            type: "received",
            timestamp: new Date().toLocaleTimeString("uk-UA", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };

          setMessagesMap((prev) => {
            const prevMessagesInner = prev[chatId] ?? [];
            return {
              ...prev,
              [chatId]: [...prevMessagesInner, assistantMessage],
            };
          });
        });

      return;
    }

    // Default assistant behavior
    setTimeout(() => {
      const assistantResponse: ChatMessageProps = {
        message:
          "Дякую за ваше ����відомлення! Я розумію, що ви шукаете стильний образ для особливого випадку. Дайте мені трохи часу, щоб підібрати ідеальний комплект одягу ��ля вашої вечері в ресторані.",
        type: "received",
        timestamp: new Date().toLocaleTimeString("uk-UA", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessagesMap((prev) => {
        const prevMessages = prev[chatId] ?? [];
        return {
          ...prev,
          [chatId]: [...prevMessages, assistantResponse],
        };
      });
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

  const handleStartFaynoChat = () => {
    const id = `fayno-${Date.now()}`;
    const title = "Discover new outfit with Fayno assistance.";

    // Insert at top
    setChats((prev) => [{ id, title }, ...prev]);

    // Create empty messages array for new chat
    setMessagesMap((prev) => ({ ...prev, [id]: [] }));

    // Select the new chat and request autofocus for its input
    setSelectedChatId(id);
    setAutoFocusChatId(id);
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
        selectedChatId={selectedChatId}
        onSelectChat={(id: string) => setSelectedChatId(id)}
        onStartFaynoChat={handleStartFaynoChat}
        chats={chats}
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
        <ChatArea
          messages={messagesMap[selectedChatId] ?? []}
          chatName={chats.find((c) => c.id === selectedChatId)?.title}
        />

        {/* Message Input */}
        <MessageInput
          onSendMessage={handleSendMessage}
          autoFocus={selectedChatId === autoFocusChatId}
          onAutoFocusDone={() => setAutoFocusChatId(null)}
        />
      </div>

      {/* Floating Action Button */}
      {isImageChatOpen && (
        <ImageReferenceChat
          userName={"Roman Z."}
          onClose={() => setIsImageChatOpen(false)}
          onCreateFaynoChat={(summary: string, imageUrl?: string) => {
            const id = `fayno-${Date.now()}`;
            const title = "Discover new outfit with Fayno assistance.";

            // Insert at top
            setChats((prev) => [{ id, title }, ...prev]);

            // Create initial assistant message with the summary and CTA
            const assistantMessage = {
              message: `${summary}\n\nWould you like to start discovering an outfit for you?`,
              type: "received",
              timestamp: new Date().toLocaleTimeString("uk-UA", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              imageUrl: imageUrl,
              imageAlt: "Reference photo",
            } as any;

            setMessagesMap((prev) => ({ ...prev, [id]: [assistantMessage] }));

            // Select the new chat and request autofocus for its input
            setSelectedChatId(id);
            setAutoFocusChatId(id);

            // Close the image modal
            setIsImageChatOpen(false);
          }}
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
