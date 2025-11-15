import React, { useEffect, useRef, useState } from "react";
import { socket } from "../services/socket";
import "../style/drawing.css";

function ChatCanvas({ className = "" }) {
  const [isColor, setIsColor] = useState("black");
  const [lineWidth, setLineWidth] = useState(2);
  const [secondaryColors, setSecondaryColors] = useState([]);

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const colorPickerRef = useRef(null);
  const lineWidthInputRef = useRef(null);
  const colorPlatePanelRef = useRef(null);

  // Keep latest values for use in event listeners
  const colorRef = useRef(isColor);
  const lineWidthRef = useRef(lineWidth);
  const drawingRef = useRef(false); // ✅ fix for auto drawing

  useEffect(() => {
    colorRef.current = isColor;
  }, [isColor]);

  useEffect(() => {
    lineWidthRef.current = lineWidth;
  }, [lineWidth]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth - (window.innerWidth / 100) * 28;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const startDraw = (x, y) => {
      const ctx = ctxRef.current;
      ctx.beginPath();
      ctx.moveTo(x, y);
      socket.emit("start", { x, y });
    };

    const draw = (x, y, color, width) => {
      const ctx = ctxRef.current;
      ctx.lineTo(x, y);
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
      ctx.beginPath(); // ✅ prevents connecting old paths
      ctx.moveTo(x, y);
    };

    const handleMouseDown = (e) => {
      drawingRef.current = true;
      startDraw(e.offsetX, e.offsetY);
    };

    const handleMouseMove = (e) => {
      if (!drawingRef.current) return;
      const pos = {
        x: e.offsetX,
        y: e.offsetY,
        color: colorRef.current,
        linewidth: lineWidthRef.current,
      };
      draw(pos.x, pos.y, pos.color, pos.linewidth);
      socket.emit("draw", pos);
    };

    const stopDraw = () => {
      drawingRef.current = false;
      ctxRef.current.beginPath(); // ✅ ensures smooth new path after lift
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseleave", stopDraw);

    socket.on("start", ({ x, y }) => startDraw(x, y));
    socket.on("draw", ({ x, y, color, linewidth }) =>
      draw(x, y, color, linewidth)
    );
    socket.on("clear", () =>
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    );

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", stopDraw);
      canvas.removeEventListener("mouseleave", stopDraw);
      socket.off("start");
      socket.off("draw");
      socket.off("clear");
    };
  }, []);

  // ---- Utility ----
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit("clear", true);
  };

  const rgbToHex = (r, g, b) => {
    const toHex = (c) => c.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const toggleColorPlate = (e) => {
    const el = colorPlatePanelRef.current;
    const isOpen = el.style.bottom === "90px";
    el.style.bottom = isOpen ? "25px" : "90px";
    e.target.style.transform = isOpen ? "rotate(90deg)" : "rotate(270deg)";
  };

  const handleAddSecondaryColor = () => {
    const color = colorPickerRef.current.value;
    if (secondaryColors.length < 10 && !secondaryColors.includes(color)) {
      setSecondaryColors((prev) => [...prev, color]);
    }
  };

  const PRIMERY_COLOR = ["black", "red", "blue", "green", "yellow", "white"];

  return (
    <div className={`absolute right-0 ${className}`}>
      <canvas ref={canvasRef}></canvas>

      <div
        className="flex bg-[#27272a73] backdrop-blur-md px-4 rounded-3xl py-2 items-center absolute bottom-[90px] left-[50%] -translate-x-[50%] transition-all"
        ref={colorPlatePanelRef}
      >
        {/* Toggle Button */}
        <div className="open-btn">
          <button
            className="text-2xl colorPlate-btn"
            onClick={toggleColorPlate}
          >
            ⟨
          </button>
        </div>

        {/* Secondary Colors */}
        <div className="secondaryColor flex bg-[#80808055] backdrop-blur-md rounded-xl p-2 m-2 w-fit">
          <div className="flex gap-2 w-full justify-end pr-2">
            {secondaryColors.map((color) => (
              <div
                key={color}
                style={{
                  backgroundColor: color,
                  width: "25px",
                  height: "25px",
                  borderRadius: "100px",
                  border: color === isColor ? "2px solid white" : "",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  const rgb = e.target.style.backgroundColor;
                  const [r, g, b] = rgb.match(/\d+/g).map(Number);
                  setIsColor(rgbToHex(r, g, b));
                }}
              ></div>
            ))}
          </div>

          <div
            className="AddColor text-center w-[25px] h-[25px] rounded-4xl bg-[#0005] flex items-center justify-center cursor-pointer"
            onClick={() => colorPickerRef.current.click()}
          >
            <span>
              <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>

          <input
            type="color"
            ref={colorPickerRef}
            className="w-0 h-0 opacity-0 absolute"
            onChange={(e) => setIsColor(e.target.value)}
          />
        </div>

        {/* Primary Colors */}
        <div className="Primery-colors flex gap-2 bg-zinc-800 px-2 py-2 rounded-2xl m-1 items-center">
          {PRIMERY_COLOR.map((color) => (
            <div
              key={color}
              style={{
                backgroundColor: color,
                width: "25px",
                height: "25px",
                borderRadius: "100px",
                border: color === isColor ? "2px solid white" : "",
                cursor: "pointer",
              }}
              onClick={(e) => setIsColor(e.target.style.backgroundColor)}
            ></div>
          ))}
        </div>

        {/* Line Width Slider */}
        <div
          className="w-40 h-10 p-2 bg-[#0005] absolute top-[-50px] right-[30px] rounded-2xl backdrop-blur-2xl"
          ref={lineWidthInputRef}
        >
          <input
            type="range"
            className="range-slider w-full"
            min={1}
            max={10}
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
          />
        </div>

        {/* Toggle Brush Size Button */}
        <button
          onClick={() => {
            lineWidthInputRef.current.style.display =
              lineWidthInputRef.current.style.display === "none"
                ? "block"
                : "none";
          }}
        >
          <svg width="30" height="30" viewBox="0 0 64 64" fill="none">
            <g>
              <path
                fill="#394240"
                d="M62.828,16.484L47.512,1.172c-1.562-1.562-4.094-1.562-5.656,0L0,43.031V64h20.973l41.855-41.855
                C64.391,20.578,64.391,18.051,62.828,16.484z M18,56H8V46l0.172-0.172l10,10L18,56z M23.828,50.172l-10-10L44,10l10,10
                L23.828,50.172z"
              />
              <rect
                x="26.843"
                y="8.751"
                transform="matrix(0.7071 0.7071 -0.7071 0.7071 31.2072 -15.1689)"
                fill="#45AAB8"
                width="14.142"
                height="42.669"
              />
            </g>
          </svg>
        </button>

        {/* Set Color */}
        <button
          className="w-25 Canvas-button bg-[#0005] rounded-2xl backdrop-blur-md p-2 m-2"
          onClick={handleAddSecondaryColor}
        >
          Set color
        </button>

        {/* Clear Canvas */}
        <button
          className="Canvas-button w-25 h-full py-2 px-3 bg-[#0005] backdrop-blur-md rounded-2xl cursor-pointer ml-2"
          onClick={clearCanvas}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default ChatCanvas;
