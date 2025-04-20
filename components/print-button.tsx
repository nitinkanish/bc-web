"use client"

import { Printer } from "lucide-react"

export default function PrintButton() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <button
      onClick={handlePrint}
      className="flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
      aria-label="Print article"
    >
      <Printer className="h-4 w-4" />
    </button>
  )
}
