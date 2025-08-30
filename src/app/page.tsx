"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                RunFuture Economy
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/auth/signin">เข้าสู่ระบบ</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">ลงทะเบียน</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">
              🚀 เปิดตัวระบบ AI-Powered E-commerce
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Development Factory
              </span>
              <br />
              + E-commerce Marketplace
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              ระบบ E-commerce Marketplace แบบครบวงจรที่ขับเคลื่อนด้วย AI 
              พร้อมระบบพัฒนาซอฟต์แวร์อัตโนมัติสำหรับตลาดไทย
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" asChild className="text-lg px-8 py-3">
              <Link href="/admin/ai-factory">เริ่มใช้ AI Factory</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3">
              <Link href="/marketplace">สำรวจ Marketplace</Link>
            </Button>
          </div>

          {/* System Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="h-4 bg-gradient-to-r from-blue-200 to-blue-300 rounded"></div>
                  <div className="h-3 bg-gradient-to-r from-purple-200 to-purple-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gradient-to-r from-green-200 to-green-300 rounded w-1/2"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-gradient-to-r from-orange-200 to-orange-300 rounded"></div>
                  <div className="h-3 bg-gradient-to-r from-pink-200 to-pink-300 rounded w-2/3"></div>
                  <div className="h-3 bg-gradient-to-r from-indigo-200 to-indigo-300 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              ระบบครบวงจร 2 เฟส
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              รวมศักยภาพของ AI Development Factory และ E-commerce Marketplace 
              เพื่อการขยายตัวที่ไม่มีขีดจำกัด
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Phase 1: AI Development Factory */}
            <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="default" className="bg-blue-100 text-blue-800 border-blue-200">
                    Phase 1
                  </Badge>
                  <Badge variant="outline">🤖 AI-Powered</Badge>
                </div>
                <CardTitle className="text-2xl text-blue-900">AI Development Factory System</CardTitle>
                <CardDescription className="text-gray-600">
                  ระบบ AI ที่สามารถพัฒนาซอฟต์แวร์ได้เองโดยอัตโนมัติ
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">AI Project Supervisor</h4>
                    <p className="text-sm text-blue-700">ระบบควบคุมและจัดการ workflow</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-900 mb-2">Code Generation Agents</h4>
                    <p className="text-sm text-purple-700">สร้างโค้ดอัตโนมัติทุกส่วน</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">Quality Assurance</h4>
                    <p className="text-sm text-green-700">ทดสอบและรับรองคุณภาพ</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-900 mb-2">Deployment Manager</h4>
                    <p className="text-sm text-orange-700">Deploy อัตโนมัติ</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="/admin/ai-factory">เข้าสู่ AI Factory</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Phase 2: E-commerce Marketplace */}
            <Card className="border-2 border-purple-200 hover:border-purple-300 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="default" className="bg-purple-100 text-purple-800 border-purple-200">
                    Phase 2
                  </Badge>
                  <Badge variant="outline">🛒 E-commerce</Badge>
                </div>
                <CardTitle className="text-2xl text-purple-900">E-commerce Marketplace System</CardTitle>
                <CardDescription className="text-gray-600">
                  ระบบ E-commerce แบบครบวงจรสำหรับตลาดไทย
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-900 mb-2">Multi-tenancy</h4>
                    <p className="text-sm text-purple-700">รองรับผู้ขายหลายราย</p>
                  </div>
                  <div className="bg-pink-50 rounded-lg p-4">
                    <h4 className="font-semibold text-pink-900 mb-2">Admin Dashboard</h4>
                    <p className="text-sm text-pink-700">ระบบจัดการแบบ Real-time</p>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-900 mb-2">Payment Gateway</h4>
                    <p className="text-sm text-indigo-700">PromptPay & ธนาคารไทย</p>
                  </div>
                  <div className="bg-teal-50 rounded-lg p-4">
                    <h4 className="font-semibold text-teal-900 mb-2">AI Enhancement</h4>
                    <p className="text-sm text-teal-700">แนะนำสินค้าอัจฉริยะ</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="/marketplace">เข้าสู่ Marketplace</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Stack */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            เทคโนโลยีที่ใช้
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              "Next.js 14", "TypeScript", "Tailwind CSS", 
              "PostgreSQL", "Prisma", "Redis", 
              "Docker", "Kubernetes", "AI/ML",
              "OpenRouter", "Replicate", "Claude"
            ].map((tech) => (
              <div key={tech} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <p className="font-semibold text-gray-700">{tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            พร้อมเริ่มต้นการเดินทางสู่อนาคต?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            เข้าร่วมกับเราและสัมผัสประสบการณ์ E-commerce ที่ขับเคลื่อนด้วย AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-3">
              <Link href="/auth/signup">ลงทะเบียนฟรี</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/admin/ai-factory">ทดลองใช้ AI Factory</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">RunFuture Economy</h3>
          <p className="text-gray-400 mb-6">
            ระบบ E-commerce Marketplace ที่ขับเคลื่อนด้วย AI เพื่อการขยายตัวที่ไม่มีขีดจำกัด
          </p>
          <div className="flex justify-center space-x-6 text-gray-400">
            <span>© 2024 RunFuture Economy</span>
            <span>•</span>
            <span>Made with ❤️ for Thailand</span>
          </div>
        </div>
      </footer>
    </div>
  );
}