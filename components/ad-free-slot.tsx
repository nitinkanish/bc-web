import type React from "react"

interface AdFreeSlotProps {
  title: string
  children: React.ReactNode
}

export default function AdFreeSlot({ title, children }: AdFreeSlotProps) {
  return (
    <div className="my-2 p-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800 shadow-sm">
      <div className="flex items-start">
  
        <div className="flex-1">
          <h4 className="text-lg font-bold mb-0 text-green-800 dark:text-green-300 flex items-center"> <a href="https://wa.me/918988089080?text=I%20want%20to%20know%20about%20it" target="_blank">{title}</a>
          </h4>
          <div className="text-gray-700 dark:text-gray-300">{children}</div>
          
        </div>
      </div>
    </div>
  )
}
