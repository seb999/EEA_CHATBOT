import { useEffect, useRef, useState } from "react";
import "./App.css";
import type { ChatGptMessage } from "./type/ChatGptMessage";

import { IconButton, Tooltip } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

function App() {
  const [chatGptMessages, setChatGptMessages] = useState<ChatGptMessage[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatGptMessages]);

  const handleNewPrompt = () => {
    if (!input.trim()) return;

    const updatedHistory: ChatGptMessage[] = [
      ...chatGptMessages,
      { role: "user", content: input },
    ];
    setChatGptMessages(updatedHistory);
    setInput("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Messages Area */}
      <div
        className={`flex-grow ${chatGptMessages.length === 0
            ? "flex items-center justify-center"
            : "overflow-y-auto"
          }`}
        style={{ padding: chatGptMessages.length === 0 ? 0 : "1rem" }}
      >
        {chatGptMessages.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center text-center px-4">
            <div className="text-xl font-semibold">What can I help with?</div>
            <div className="max-w-2xl w-full mb-6">
              <div className="relative w-full">
                <textarea
                  value={input}
                  rows={2}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleNewPrompt();
                    }
                  }}
                  className="w-full border border-gray-300 rounded-lg p-3 pr-12 focus:outline-none resize-none"
                  placeholder="Ask something..."
                />
                <IconButton
                  onClick={handleNewPrompt}
                  color="success"
                  size="small"
                  aria-label="run"
                  disabled={!input.trim()}
                  className="!absolute bottom-2 right-2"
                >
                  <Tooltip title="Execute">
                    <ArrowCircleRightIcon fontSize="large" />
                  </Tooltip>
                </IconButton>
              </div>
            </div>

          </div>
        ) : (
          <div className="flex flex-col space-y-3 w-full max-w-2xl mx-auto mt-4">
            {chatGptMessages.map((m, index) => (
              <div
                key={index}
                className={`whitespace-pre-wrap flex ${m.role === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`p-3 rounded-lg shadow ${m.role === "user"
                      ? "bg-blue-100 text-black max-w-md"
                      : "text-black w-full"
                    }`}
                >
                  <span>{m.content}</span>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Sticky input only when messages exist */}
      {chatGptMessages.length > 0 && (
        <div className="sticky bottom-0 bg-white pt-3 pb-2 px-4">
          <div className="flex items-center gap-2 max-w-2xl mx-auto relative w-full">
            <textarea
              value={input}
              rows={2}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleNewPrompt();
                }
              }}
              className="flex-grow border border-gray-300 rounded-lg p-3 pr-12 focus:outline-none resize-none"
              placeholder="Ask something..."
            />
            <IconButton
              onClick={handleNewPrompt}
              color="success"
              size="small"
              aria-label="run"
              disabled={!input.trim()}
              className="!absolute bottom-2 right-2"
            >
              <Tooltip title="Execute">
                <ArrowCircleRightIcon fontSize="large" />
              </Tooltip>
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
