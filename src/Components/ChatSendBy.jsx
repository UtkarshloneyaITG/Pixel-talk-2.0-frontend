import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import { socket } from "../services/socket";

function SendBy({ text, image, id }) {
  const el = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const [userTyping, setUserTyping] = useState(null);
  const menuRef = useRef(null);

  useGSAP(() => {
    const animate = () => {
      const tl = gsap.timeline({ defaults: { ease: "back.out(1.7)" } });

      tl.fromTo(
        el.current,
        { x: -100, opacity: 0, scaleX: 0.8, scaleY: 1.2 },
        { x: 0, opacity: 1, scaleX: 1, scaleY: 1, duration: 0.4 }
      )
        .to(el.current, {
          scaleX: 1.1,
          scaleY: 0.9,
          duration: 0.3,
          ease: "power1.inOut",
        })
        .to(el.current, {
          scaleX: 1,
          scaleY: 1,
          duration: 0.3,
          ease: "elastic.out(1, 0.5)",
        })
        .fromTo(
          el.current,
          { boxShadow: "0 0 0px rgba(255,255,255,0.8)" },
          {
            boxShadow: "0 0 10px rgba(255,255,255,0.8)",
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          }
        );
    };

    if (!document.hidden) {
      animate();
    } else {
      const handleVisibilityChange = () => {
        if (!document.hidden) {
          animate();
          document.removeEventListener(
            "visibilitychange",
            handleVisibilityChange
          );
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }
  }, []);

  // Close fullscreen on Esc
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsFullScreen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
  // --- Close menu when clicking outside ---
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useState(() => {
    const handleUserTping = (e) => {
      setUserTyping(e.typing);
    };
    socket.on("user-typing", handleUserTping);
    return socket.off("user-typing", handleUserTping);
  });

  // --- Right click handler ---
  let message_TO_perform_action = null;
  const handleRightClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuPos({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
  };
  const handleMenuClick = (action) => {
    console.log(`You clicked ${action}`);
    if (action == "Copy") {
      navigator.clipboard.writeText(text);
    }
    if (action == "Delete") {
      socket.emit("delete-message", id);
    }
    setMenuVisible(false);
  };
  // check if message is link or not

  function isLink(text) {
    const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/i;
    return urlPattern.test(text.trim());
  }

  return (
    <>
      <div
        ref={el}
        className="ChatSendBy--"
        style={{
          padding: "10px 18px",
          borderRadius: "20px",
          display: "inline-block",
          color: "white",
          fontSize: "16px",
          transformOrigin: "bottom left",
        }}
        onContextMenu={handleRightClick}
      >
        {/* Image display (click to open fullscreen) */}
        {image && (
          <img
            src={image}
            style={{
              maxWidth: "300px",
              marginBottom: "5px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            alt="sent"
            onClick={() => setIsFullScreen(true)}
          />
        )}
        {isLink(text) ? (
          <a href={text} target="_blank">
            {text}
          </a>
        ) : (
          text
        )}
      </div>
      {userTyping ? (
        <div
          className="ChatSendBy--"
          style={{
            padding: "10px 18px",
            borderRadius: "20px",
            display: "inline-block",
            color: "white",
            fontSize: "16px",
            transformOrigin: "bottom left",
          }}
        >
          <span className="loader-typing"></span>
        </div>
      ) : (
        ""
      )}
      {menuVisible && (
        <ul
          ref={menuRef}
          className="fixed z-[9999] bg-[#2b2b2b7c] backdrop-blur-xs text-white rounded-xl  min-w-[150px] shadow-2xl"
          style={{
            top: `${menuPos.y}px`,
            left: `${menuPos.x}px`,
          }}
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking menu
        >
          {["Reply", "Edit", "Copy", "Delete"].map((item) => (
            <li
              key={item}
              className="px-4 py-2  hover:bg-[#2424246c] cursor-pointer select-none transition-all rounded-xl"
              onClick={() => handleMenuClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      {/* Full-screen view (keeps your message style untouched) */}
      {isFullScreen && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999] h-full"
          onClick={() => setIsFullScreen(false)}
        >
          <img
            src={image}
            alt="fullscreen"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
            }}
          />
        </div>
      )}
    </>
  );
}

export default SendBy;
