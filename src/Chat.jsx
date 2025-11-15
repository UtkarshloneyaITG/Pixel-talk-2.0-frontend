import { useEffect, useState } from "react";
import ChatAppBody from "./Components/ChatAppBody";
import SignUp from "./Pages/SignUp";

function ChatApp() {
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <>
      <div className="bg-slate-900 text-white flex flex-col h-screen font-[Poppins]">
        {/* <ChatAppHeader /> */}
        <ChatAppBody />
      </div>
    </>
  );
}

export default ChatApp;
