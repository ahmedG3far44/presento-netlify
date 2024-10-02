"use client";
import { LuShare2 } from "react-icons/lu";
import { useState } from "react";
import { LuCopy } from "react-icons/lu";
import { CgLaptop } from "react-icons/cg";

function ShareBtn() {
  const [copyState, setCopyState] = useState(false);
  const handleCopyProfileLinkToClipboard = async () => {
    console.log("click to copy");
    setCopyState(true);
    await navigator.clipboard.writeText(`${window.location}`);
    setTimeout(() => {
      setCopyState(false);
    }, 1000);
  };
  return (
    <button
      onClick={handleCopyProfileLinkToClipboard}
      className="flex justify-center items-center gap-2 relative hover:bg-secondary p-2 rounded-md duration-150"
    >
      <span className={copyState ? "text-secondary" : "text-primary"}>
        {copyState ? <LuCopy size={15} /> : <LuShare2 size={15} />}
      </span>
      {copyState && (
        <span className="text-secondary absolute -right-20 rounded-3xl px-2">
          copied
        </span>
      )}
    </button>
  );
}

export default ShareBtn;
