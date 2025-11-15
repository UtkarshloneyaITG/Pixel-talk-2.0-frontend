import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ThemeSelection from "./ThemeSelection";
import { useMsgFunctions } from "../provider/msgContext";

function Sidebar({ isOpen, closeSidebar }) {
  const sidebarRef = useRef(null);

  const { isThemeOpen, setIsThemeOpen } = useMsgFunctions();


  useEffect(() => {
    const sidebar = sidebarRef.current;

    if (isOpen) {
      gsap.to(sidebar, { x: 0, duration: 0.5, ease: "power3.out" });
    } else {
      gsap.to(sidebar, { x: "100%", duration: 0.5, ease: "power3.in" });
    }
  }, [isOpen]);


    const [isOn, setIsOn] = useState(false);
    const inBtnRef = useRef(null);
    const outerLayer = useRef(null);

    const handleToggle = () => {
      setIsOn(prev => !prev);
    };

    useEffect(() => {
      gsap.to(inBtnRef.current, {
        x: isOn ? 0 : 20, 
        backgroundColor: isOn ? "#e5e7ab" : "#e5e7ab", 
        duration: 0.4,
        ease: "elastic.out(1, 0.5)",
      });
      gsap.to(outerLayer.current,{
        backgroundColor: isOn? "#3b3b3b":"#40e353"
      })
    }, [isOn]);

    const menuItems = [
      {
        label: "Settings",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="url(#grad)"
            className="w-6 h-6"
          >
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#A78BFA" />
              </linearGradient>
            </defs>
            <path d="M12 8a4 4 0 100 8 4 4 0 000-8z" />
            <path
              fillRule="evenodd"
              d="M4.94 4.94a1.5 1.5 0 012.12 0l.88.88A8.002 8.002 0 0112 4c1.58 0 3.05.46 4.3 1.26l.88-.88a1.5 1.5 0 112.12 2.12l-.88.88A8.002 8.002 0 0120 12c0 1.58-.46 3.05-1.26 4.3l.88.88a1.5 1.5 0 01-2.12 2.12l-.88-.88A8.002 8.002 0 0112 20a8.002 8.002 0 01-4.3-1.26l-.88.88a1.5 1.5 0 01-2.12-2.12l.88-.88A8.002 8.002 0 014 12c0-1.58.46-3.05 1.26-4.3l-.88-.88a1.5 1.5 0 010-2.12z"
              clipRule="evenodd"
            />
          </svg>
        ),
        onClick: null,
      },
      {
        label: "Set Chat Theme",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="url(#grad)"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
            <path d="M12 3a9 9 0 106.32 15.32 9 9 0 00-6.32-15.32zm0 16a7 7 0 01-4.9-11.9A7 7 0 0112 19z" />
          </svg>
        ),
        onClick: () => setIsThemeOpen(true),
      },
      {
        label: "Notifications",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="url(#grad)"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FACC15" />
                <stop offset="100%" stopColor="#FB923C" />
              </linearGradient>
            </defs>
            <path d="M12 22a2 2 0 002-2H10a2 2 0 002 2zm6-6V11a6 6 0 10-12 0v5l-2 2v1h16v-1l-2-2z" />
          </svg>
        ),
        button: (<div className="flex items-center ml-10">
          <button
          ref={outerLayer}
            onClick={handleToggle}
            className="w-12 bg-green-500 px-1 py-1 rounded-2xl flex items-center cursor-pointer"
          >
            <div
              ref={inBtnRef}
              className="bg-zinc-200 w-5 h-5 rounded-2xl"
            ></div>
          </button>
        </div>)
      },
      {
        label: "Edit Profile",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="url(#grad)"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <path d="M4 21v-2a4 4 0 014-4h1l9-9a2.121 2.121 0 113 3l-9 9v1a4 4 0 01-4 4H4z" />
          </svg>
        ),
      },
      {
        label: "Delete Chat",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="url(#grad)"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F87171" />
                <stop offset="100%" stopColor="#DC2626" />
              </linearGradient>
            </defs>
            <path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        ),
      },
      {
        label: "Block User",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="url(#grad)"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.24 14.24L7.76 7.76A8 8 0 0116.24 16.24zM12 20a8 8 0 01-4.24-14.24l8.48 8.48A8 8 0 0112 20z" />
          </svg>
        ),
      },
    ];

    return (
      <>
        <aside
          ref={sidebarRef}
          className="fixed top-0 right-0 w-80 h-screen bg-zinc-900/80 backdrop-blur-lg p-6 flex flex-col gap-6 transform translate-x-full z-50 shadow-[0_0_30px_rgba(0,0,0,0.6)] rounded-l-3xl border-l border-zinc-800"
        >
          {/* Close button */}
          <button
            onClick={closeSidebar}
            className="self-end text-gray-400 hover:text-red-500 transition text-3xl cursor-pointer"
          >
            ✕
          </button>

          {/* Menu Options */}
          <div className="flex flex-col gap-3 mt-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="flex items-center gap-4 px-5 py-3 cursor-pointer rounded-xl bg-zinc-800/60 hover:bg-zinc-700/80 transition-all duration-200 group"
              >
                <div className="group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-gray-100 font-medium tracking-wide group-hover:text-white">
                  {item.label}
                </span>
                <div>{item.button}</div>
              </button>
            ))}
          </div>
        </aside>

        {isThemeOpen && <ThemeSelection />}
      </>
    );
  }

  export default Sidebar;
