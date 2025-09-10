import React, { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface ImageMessage {
  id: string;
  type: "system" | "sent" | "received" | "image";
  text?: string;
  url?: string;
}

export function ImageReferenceChat({
  userName = "User",
  onClose,
}: {
  userName?: string;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<ImageMessage[]>(() => [
    {
      id: "welcome",
      type: "system",
      text: `Hi, ${userName}! Let’s find something beautiful for you ✨\n\nI’ll help you create the best outfit suggestions based on your photo references.\n\nJust upload a photo or screenshot and leave a few notes about what’s special in this look, so I can better understand your style and what you’re looking for.\n\nIf you’re ready, go ahead and upload a photo 📸\n`,
    },
  ]);
  const [input, setInput] = useState("");
  const [hasImage, setHasImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // auto-scroll when messages change
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  const pushMessage = useCallback((msg: ImageMessage) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const handleFiles = useCallback(
    (file: File) => {
      const url = URL.createObjectURL(file);
      const id = `img-${Date.now()}`;
      pushMessage({ id, type: "image", url });
      setHasImage(true);
      // confirmation
      setTimeout(() => {
        pushMessage({
          id: `confirm-${Date.now()}`,
          type: "received",
          text: "Got it! Here’s your reference photo to analyze",
        });
      }, 300);
    },
    [pushMessage],
  );

  const handleDeleteImage = useCallback((id: string, url?: string) => {
    setMessages((prev) => {
      const newArr = prev.filter((m) => m.id !== id);
      // revoke object URL to free memory
      if (url) {
        try {
          URL.revokeObjectURL(url);
        } catch (e) {
          // ignore
        }
      }
      // update hasImage based on remaining messages
      setHasImage(newArr.some((m) => m.type === "image"));
      return newArr;
    });
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const f = e.dataTransfer.files?.[0];
      if (f && f.type.startsWith("image/")) {
        handleFiles(f);
      }
    },
    [handleFiles],
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f && f.type.startsWith("image/")) {
        handleFiles(f);
      }
    },
    [handleFiles],
  );

  const handleSubmit = useCallback(() => {
    if (!input.trim()) return;
    const id = `msg-${Date.now()}`;
    pushMessage({ id, type: "sent", text: input.trim() });
    setInput("");
    setTimeout(() => {
      pushMessage({
        id: `pref-confirm-${Date.now()}`,
        type: "received",
        text: "Great, let’s use your style preferences as a starting point ✨",
      });
    }, 300);
  }, [input, pushMessage]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-2xl h-[80vh] bg-card border border-border rounded-lg shadow-lg flex flex-col overflow-hidden"
      >
        <header className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="text-lg font-medium ml-[1px]">
            Upload image reference with your notes
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={openFilePicker}
              className="px-3 py-1 bg-primary-container text-primary rounded-md"
              aria-label="Upload image"
            >
              Upload
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1 bg-muted rounded-md"
              aria-label="Close chat"
            >
              Close
            </button>
          </div>
        </header>

        <div
          ref={containerRef}
          onDrop={onDrop}
          onDragOver={onDragOver}
          className="flex-1 overflow-auto p-4 space-y-4 bg-background"
        >
          {messages.map((m, idx) => (
            <div
              key={m.id}
              ref={idx === messages.length - 1 ? lastMessageRef : undefined}
              className={"max-w-full"}
            >
              {m.type === "system" && (
                <div className="bg-muted p-4 rounded-lg text-sm leading-relaxed">
                  {String(m.text)
                    .split(/\n\n/)
                    .map((para, idx, arr) => (
                      <div
                        key={idx}
                        style={{
                          fontSize: "16px",
                          marginBottom:
                            idx < arr.length - 1 ? "0.5rem" : undefined,
                        }}
                      >
                        {para.split(/\n/).map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                      </div>
                    ))}
                </div>
              )}

              {m.type === "sent" && (
                <div className="text-right">
                  <div className="inline-block bg-primary text-primary-foreground px-3 py-2 rounded-lg">
                    {m.text}
                  </div>
                </div>
              )}

              {m.type === "received" && (
                <div className="text-left">
                  <div className="inline-block bg-card border border-border px-3 py-2 rounded-lg">
                    {m.text}
                  </div>
                </div>
              )}

              {m.type === "image" && m.url && (
                <div className="flex items-center gap-3 relative">
                  <div className="relative">
                    <img
                      src={m.url}
                      alt="Uploaded reference"
                      className="w-28 h-28 object-cover rounded-md shadow-sm transition-opacity duration-300"
                    />
                    <button
                      aria-label="Delete image"
                      title="Delete image"
                      onClick={() => handleDeleteImage(m.id, m.url)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-muted transition-colors"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">
                      Reference photo
                    </div>
                    <div className="text-xs text-foreground/70 mt-1">
                      You can upload another image or add style preferences
                      below.
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          className="bg-popover flex items-center gap-3"
          style={{
            padding: "12px 16px 16px",
            border: "0px 0px 0px solid rgb(229, 231, 235)",
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={onFileChange}
          />

          <input
            aria-label="Upload image or type your style preferences"
            placeholder={
              hasImage
                ? "Let us know what’s special you see on this look"
                : "Let us know what’s special you see on this look"
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
            className="flex-1 p-3 rounded-md border border-border bg-card"
          />

          <button
            onClick={handleSubmit}
            className="px-4 py-3 bg-primary text-primary-foreground rounded-md"
            aria-label="Send message"
          >
            Detect outfit
          </button>
        </div>
      </div>
    </div>
  );
}
