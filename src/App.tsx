import { useState } from "react";
import "./App.css";
import Chatbot from "./modules/chatbotModule";

import { IconButton, Tooltip } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

function App() {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className="relative h-screen">
      {/* Centered Button */}
      <div className="flex items-center justify-center h-full">
        <Tooltip title="Start Chat">
          <IconButton
            onClick={() => setShowChatbot((prev) => !prev)}
            size="large"
            style={{
              backgroundColor: 'oklch(64.8% 0.2 131.684)',
              color: 'white',
            }}
            className="hover:opacity-90 transition"
          >
            <ArrowCircleRightIcon style={{ fontSize: 60 }} />
          </IconButton>
        </Tooltip>
      </div>

      {/* Chatbot Popup */}
      <div
        className={`fixed bottom-4 right-4 w-100 h-[600px] bg-white border border-gray-300 shadow-xl rounded-xl transition-transform duration-500 ${showChatbot ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
      >
        {/* You can replace this with your actual chatbot module */}
        <div className=" h-full overflow-auto">
          <Chatbot />
        </div>
      </div>
    </div>
  );
}

export default App;

