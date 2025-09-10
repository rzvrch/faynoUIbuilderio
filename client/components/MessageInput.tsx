import React, { useState, KeyboardEvent } from "react";
import { Send, Image } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function MessageInput({
  onSendMessage,
  placeholder = "Let us know what a look are you looking for?",
  disabled = false,
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-3 sm:p-6 bg-white" style={{ border: "0px 0px 0px solid rgb(229, 231, 235)" }}>
      <div className="flex items-center justify-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-[28px] border border-outline bg-white">
        {/* Image Attachment Button - Hidden on very small screens */}
        <button
          className="hidden sm:flex flex-shrink-0 p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Attach image"
          disabled={disabled}
        >
          <Image className="w-6 h-6 text-foreground" />
        </button>

        {/* Text Input */}
        <div className="flex-1 min-h-[35px] max-h-32 flex flex-col justify-center items-center">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "w-full resize-none border-0 outline-none bg-transparent",
              "text-sm sm:text-base leading-5 sm:leading-6 tracking-[0.5px] text-foreground",
              "placeholder:text-outline placeholder:text-sm sm:placeholder:text-lg",
              "py-1.5",
            )}
            rows={1}
            style={{
              minHeight: "35px",
              maxHeight: "128px",
              overflowY: "auto",
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = Math.min(target.scrollHeight, 128) + "px";
            }}
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className={cn(
            "flex-shrink-0 p-2 rounded-full transition-colors",
            message.trim() && !disabled
              ? "text-primary hover:bg-primary/10"
              : "text-outline cursor-not-allowed",
          )}
          aria-label="Send message"
        >
          <Send className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
