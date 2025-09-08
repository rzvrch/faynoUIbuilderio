import React from 'react';
import { cn } from '@/lib/utils';

export interface ChatMessageProps {
  message: string;
  type: 'sent' | 'received';
  timestamp?: string;
}

export function ChatMessage({ message, type, timestamp }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex w-full",
        type === 'sent' ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[600px] sm:max-w-[500px] md:max-w-[600px] min-h-[44px] px-4 py-2 rounded-[20px] break-words",
          "mx-2 sm:mx-0", // Add margin on very small screens
          type === 'sent'
            ? "bg-secondary text-secondary-foreground rounded-br-[8px]"
            : "bg-white text-on-surface-variant border border-border rounded-bl-[8px]"
        )}
      >
        <p className="text-base leading-6 tracking-[0.5px]">
          {message}
        </p>
        {timestamp && (
          <p className="text-xs text-muted-foreground mt-1 opacity-70">
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
}
