"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/contexts/auth-context"
import { cn } from "@/lib/utils"

interface RegisterFormProps {
  onSuccess?: () => void
  onSwitchToLogin?: () => void
  className?: string
}

export function RegisterForm({ onSuccess, onSwitchToLogin, className }: RegisterFormProps) {
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp")
      setLoading(false)
      return
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự")
      setLoading(false)
      return
    }

    const { confirmPassword, ...registerData } = formData
    const result = await register(registerData)

    if (result.success) {
      setSuccess(true)
      setTimeout(() => {
        onSuccess?.()
      }, 2000)
    } else {
      setError(result.error || "Đăng ký thất bại")
    }

    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    if (error) setError("")
  }

  if (success) {
    return (
      <div className={cn("w-full max-w-md mx-auto text-center", className)}>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">Đăng ký thành công!</h3>
          <p className="text-green-600">Tài khoản của bạn đã được tạo thành công. Bạn có thể đăng nhập ngay bây giờ.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Đăng ký</h2>
        <p className="text-gray-600 mt-2">Tạo tài khoản mới để bắt đầu mua sắm</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">{error}</div>
        )}

        <div className="space-y-2">
          <Label htmlFor="name">Họ và tên</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Nhập họ và tên"
              value={formData.name}
              onChange={handleChange}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Nhập email của bạn"
              value={formData.email}
              onChange={handleChange}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Số điện thoại (tùy chọn)</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Nhập số điện thoại"
              value={formData.phone}
              onChange={handleChange}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Mật khẩu</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="password"
              name="password"
              autoComplete="new-password"
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
              value={formData.password}
              onChange={handleChange}
              className="pl-10 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="pl-10 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            required
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            Tôi đồng ý với{" "}
            <a href="/terms" className="text-blue-600 hover:text-blue-700">
              Điều khoản dịch vụ
            </a>{" "}
            và{" "}
            <a href="/privacy" className="text-blue-600 hover:text-blue-700">
              Chính sách bảo mật
            </a>
          </label>
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </Button>

        <div className="text-center">
          <span className="text-gray-600">Đã có tài khoản? </span>
          <button type="button" onClick={onSwitchToLogin} className="text-blue-600 hover:text-blue-700 font-medium">
            Đăng nhập ngay
          </button>
        </div>
      </form>
    </div>
  )
}
