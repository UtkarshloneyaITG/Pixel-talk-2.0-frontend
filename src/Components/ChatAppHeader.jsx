import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Sidebar from "./settingSidebar";

function ChatAppHeader() {
  const buttonRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const btn = buttonRef.current;
    const dots = btn.querySelectorAll("span");

    const hoverIn = () => {
      const tl = gsap.timeline();
      tl.to(btn, { scale: 1.2, duration: 0.2, ease: "power1.out" });

      tl.to(
        dots,
        {
          y: -10,
          scale: 1.3,
          duration: 0.3,
          stagger: 0.1,
          ease: "power1.inOut",
          yoyo: true,
          repeat: 1,
        },
        "<" // start with button scale
      );
    };

    // Hover out animation
    const hoverOut = () => {
      gsap.to(btn, {
        scale: 1,
        rotation: 0,
        duration: 0.2,
        ease: "power1.out",
      });
      gsap.to(dots, {
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.2,
        ease: "power1.out",
        stagger: 0.05,
      });
    };

    btn.addEventListener("mouseenter", hoverIn);
    btn.addEventListener("mouseleave", hoverOut);

    return () => {
      btn.removeEventListener("mouseenter", hoverIn);
      btn.removeEventListener("mouseleave", hoverOut);
    };
  }, []);

  return (
    <>
    
      <div className="flex items-center justify-between px-5 z-20">
        <div className="profile flex items-center">
          <div className="profile-image w-10 h-10 bg-gray-500 rounded-full z-20"></div>
          <div className="px-3 py-8 Chat-Person--placeholder text-2xl z-20">
            User
          </div>
        </div>
        <div className="extra flex pr-3 z-20">
          <button
            ref={buttonRef}
            className="cursor-pointer flex space-x-1"
            onClick={() => setIsSidebarOpen(true)}
          >
            <span>●</span>
            <span>●</span>
            <span>●</span>
          </button>
        </div>
      </div>
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />
    </>
  );
}

export default ChatAppHeader;
