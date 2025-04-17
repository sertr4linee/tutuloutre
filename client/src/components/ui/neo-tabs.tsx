"use client"

import { useState, type ReactNode } from "react"

interface Tab {
  id: string
  label: string
  content: ReactNode
}

interface NeoTabsProps {
  tabs: Tab[]
  defaultTab?: string
}

export function NeoTabs({ tabs, defaultTab }: NeoTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id)

  return (
    <div className="mb-8">
      <div className="flex border-3 border-black overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-6 font-bold text-black flex-1 transition-colors ${
              activeTab === tab.id
                ? "bg-blue-400 shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.3)]"
                : "bg-white hover:bg-gray-100"
            }`}
            style={{
              borderRight: tab.id !== tabs[tabs.length - 1].id ? "3px solid black" : "none",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-6 border-3 border-black border-t-0 bg-white">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  )
}
