"use client";

import { useState } from "react";

export function useTouchFeedback() {
  const [isTapped, setIsTapped] = useState(false);

  const handleTouchStart = () => {
    if (window.innerWidth < 640) {
      setIsTapped(true);
    }
  };

  const handleTouchEnd = () => {
    if (window.innerWidth < 640) {
      setTimeout(() => setIsTapped(false), 200);
    }
  };

  return { isTapped, handleTouchStart, handleTouchEnd };
}
