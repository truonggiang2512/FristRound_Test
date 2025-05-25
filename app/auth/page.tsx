"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login")
  const router = useRouter()

  // 🔄 Giữ lại tab đang hoạt động trong localStorage
  useEffect(() => {
    const savedTab = localStorage.getItem("authTab")
    if (savedTab === "register" || savedTab === "login") {
      setActiveTab(savedTab)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("authTab", activeTab)
  }, [activeTab])

  const handleSuccess = () => {
    localStorage.removeItem("authTab") // Xóa để reset sau khi đăng nhập thành công
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          {/* Tab Navigation */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === "login"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === "register"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Đăng ký
            </button>
          </div>

          {/* Form Content */}
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

      <SiteFooter />
    </div>
  )
}
