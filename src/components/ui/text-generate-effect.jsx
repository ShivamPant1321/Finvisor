"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({ words, className }) => {
  const [characterCount, setCharacterCount] = useState(0);
  const [text, setText] = useState("");
  
  useEffect(() => {
    if (!words) return;
    
    const timeout = setTimeout(() => {
      setText(words.slice(0, characterCount));
      if (characterCount < words.length) {
        setCharacterCount(prevCount => prevCount + 1);
      }
    }, 20);
    
    return () => clearTimeout(timeout);
  }, [characterCount, words]);
  
  return (
    <div className={cn("font-bold", className)}>
      {text}
      {characterCount < words.length && (
        <span className="animate-pulse">|</span>
      )}
    </div>
  );
};
