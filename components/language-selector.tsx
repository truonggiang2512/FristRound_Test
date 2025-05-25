"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

interface Language {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: "vi", name: "VI", flag: "/ico-country-c-vietnam.png" },
  { code: "en", name: "EN", flag: "/ico-country-c-vietnam.png" },
]

export function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2  px-3 py-2 rounded-md transition-colors"
      >
        <div className="w-5 h-5 rounded-full overflow-hidden">
          <Image src={selectedLanguage.flag || "/placeholder.svg"} alt={selectedLanguage.name} width={20} height={20} />
        </div>
        <span className="text-sm font-medium">{selectedLanguage.name}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                setSelectedLanguage(language)
                setIsOpen(false)
              }}
              className="flex items-center space-x-2 w-full px-3 py-2 text-left hover:bg-gray-50"
            >
              <div className="w-5 h-5 rounded-full overflow-hidden">
                <Image src={language.flag || "/placeholder.svg"} alt={language.name} width={20} height={20} />
              </div>
              <span className="text-sm">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
