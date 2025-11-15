import React, { useState, useRef, useEffect } from "react";

function MessageMenu({ text }) {

  return (
    <>
      <div
        
        className="bg-[#222] text-white p-3 rounded-xl w-fit my-2 cursor-pointer select-none"
      >
        {text}
      </div>

      
    </>
  );
}

export default MessageMenu;
