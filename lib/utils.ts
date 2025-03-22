"use client"; // Ensure the component runs only on the client

import { useEffect, useState } from "react";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"
import { enUS, hi } from "date-fns/locale"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string, language: "en" | "hi" = "en") {
  const locale = language === "en" ? enUS : hi
  return format(new Date(date), "MMMM d, yyyy", { locale })
}

export function truncateText(text: string, length: number) {
  if (text.length <= length) return text
  return text.slice(0, length) + "..."
}

export function stripHtml(html: string) {
  const [text, setText] = useState("");

  useEffect(() => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    setText(tmp.textContent || tmp.innerText || "");
  }, [html]);

  return text;
}
export function getReadingTime(content: string) {
  const wordsPerMinute = 200
  const text = stripHtml(content)
  const words = text.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return minutes
}

