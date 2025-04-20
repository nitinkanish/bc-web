"use client"

import type React from "react"

interface ClientWrapperProps {
  children: React.ReactNode
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return <>{children}</>
}
