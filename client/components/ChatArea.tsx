import React, { useRef, useEffect } from "react";
import { ChatMessage, ChatMessageProps } from "./ChatMessage";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface ChatAreaProps {
  messages: ChatMessageProps[];
  chatName?: string;
}

export function ChatArea({
  messages,
  chatName = "Chat Assistant",
}: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Top Bar */}
      <div
        className="flex items-center justify-between px-6 py-4 bg-transparent hover:bg-white/90 backdrop-blur transition-colors duration-150 ease-in-out"
        style={{ border: "1px solid rgba(243, 243, 243, 1)" }}
      >
        <h2 className="text-base sm:text-lg font-medium text-foreground truncate">
          Let’s create your perfect Bali vacation outfit ✨
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              className="bg-transparent hover:bg-muted transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-0 shadow-none border-0"
            >
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Complete chat</DropdownMenuItem>
            <DropdownMenuItem>Save chat</DropdownMenuItem>
            <DropdownMenuItem>Report problem</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4 bg-white">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h3 className="text-lg font-medium text-foreground mb-2">
                Welcome to Chat Assistant
              </h3>
              <p className="text-muted-foreground">
                Start a conversation by typing a message below.
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message.message}
                type={message.type}
                timestamp={message.timestamp}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
    </div>
  );
}
