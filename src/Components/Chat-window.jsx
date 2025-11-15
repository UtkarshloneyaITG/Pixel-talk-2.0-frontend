import SendTo from "./ChatSendTo";
import SendBy from "./ChatSendBy";
import ChatInput from "./ChatInput";
import { useRef, useState, useEffect } from "react";
import { socket } from "../services/socket";
import ChatAppHeader from "./ChatAppHeader";
import { useMsgFunctions } from "../provider/msgContext";
import pixel_talk from "../assets/svg/Pixel Talk(full).png";
import ChatCanvas from "./ChatCanvas";

function ChatWindow() {
  const { opneCanvas } = useMsgFunctions();
  const [messages, setMessages] = useState([]);
  const chatLogs = useRef(null);
  const isAtBottom = useRef(true);

  // ✅ Scroll listener to detect if user is at bottom
  useEffect(() => {
    const el = chatLogs.current;
    if (!el) return;

    const handleScroll = () => {
      // user is at bottom if within 10px
      isAtBottom.current =
        el.scrollHeight - el.scrollTop <= el.clientHeight + 50;
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Auto-scroll & Notifications
  useEffect(() => {
    const el = chatLogs.current;
    if (!el || messages.length === 0) return;

    // Auto-scroll only if user is already at bottom
    if (isAtBottom.current) {
      el.lastElementChild?.scrollIntoView({ behavior: "smooth" });
    }

    // Notification when tab hidden
    const lastMsg = messages[messages.length - 1];
    if (
      document.hidden &&
      Notification.permission === "granted" &&
      lastMsg.userID !== "Gamith"
    ) {
      new Notification("New Message", {
        body: `${lastMsg.userID}: ${lastMsg.msg}`,
        icon: pixel_talk,
      });
    }
  }, [messages]);

  // ✅ Handle socket messages
  useEffect(() => {
    const handleMessage = (msg) => {
      setMessages((prev) => {
        const exists = prev.some(
          (m) =>
            m.msg === msg.msg &&
            m.createdAt === msg.createdAt &&
            m.userID === msg.userID
        );
        if (exists) return prev;
        return [...prev, msg];
      });
    };

    const handleDelete = (id) => {
      setMessages((pre) => pre.filter((val) => val._id !== id));
    };

    socket.on("delete-message", handleDelete);
    socket.on("chat-message", handleMessage);

    return () => {
      socket.off("chat-message", handleMessage);
      socket.off("delete-message", handleDelete);
    };
  }, []);

  return (
    <>
      <div className="relative flex flex-col flex-1 px-10 pb-5 chat-window justify-end">
        <div className="chat-wrapper w-full">
          <ChatAppHeader />
          <div
            className="p-6 overflow-auto space-y-4 Chat--Chat-placeholder h-screen fade-messages"
            ref={chatLogs}
          >
            {messages.map((value, index) =>
              value.userID !== "Gamith" ? (
                <SendBy
                  text={value.msg}
                  date={value.date}
                  time={value.time}
                  name={value.userID}
                  image={value.image}
                  key={index}
                  id={value._id}
                />
              ) : (
                <SendTo
                  text={value.msg}
                  date={value.date}
                  time={value.time}
                  image={value.image}
                  key={index}
                  id={value._id}
                />
              )
            )}
          </div>
        </div>

        {/* Chat Input */}
        <ChatInput />
        <ChatCanvas className={`${opneCanvas ? "block" : "hidden"}`} />
      </div>
    </>
  );
}

export default ChatWindow;
