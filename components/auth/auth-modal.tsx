"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: "login" | "register"
}

export function AuthModal({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab)

  // Update active tab when defaultTab changes
  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab)
    }
  }, [isOpen, defaultTab])

  if (!isOpen) return null

  const handleSuccess = () => {
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleBackdropClick} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-4 right-4 z-10 hover:bg-gray-100">
          <X className="h-4 w-4" />
        </Button>

        {/* Tab Navigation */}
        <div className="flex p-4 pb-0">
          <div className="flex w-full bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === "login" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === "register" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Đăng ký
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-4">
          {activeTab === "login" ? (
            <LoginForm
              onSuccess={handleSuccess}
              onSwitchToRegister={() => setActiveTab("register")}
              className="max-w-none"
            />
          ) : (
            <RegisterForm
              onSuccess={handleSuccess}
              onSwitchToLogin={() => setActiveTab("login")}
              className="max-w-none"
            />
          )}
        </div>
      </div>
    </div>
  )
}
