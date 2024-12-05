'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { SignUpModal } from "@/components/modals/SignUpModal"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-background px-4 space-y-8">
      {/* Başlık */}
      <h1 className="mb-8 text-5xl font-serif text-primary dark:text-white">
        join <span className="text-primary dark:text-white">Post.</span>
      </h1>

      {/* Kayıt Butonları */}
      <div className="flex w-full max-w-sm flex-col space-y-4">
        <button className="flex items-center justify-center gap-2 rounded-full border border-black dark:border-white py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800">
          <Image src="/assets/icons/google.svg" alt="Google Icon" width={20} height={20} />
          Sign Up With Google
        </button>
        <button 
          onClick={() => setIsSignUpModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-full border border-black dark:border-white py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Image src="/assets/icons/email.svg" alt="Email Icon" width={20} height={20} />
          Sign Up With email
        </button>
      </div>

      {/* Alt Yazı */}
      <p className="mt-8 text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <Link 
          href="/auth/login"
          className="text-accent hover:underline"
        >
          Sign In
        </Link>
      </p>
      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center max-w-md">
        Click "Sign up" to agree to Post's{" "}
        <Link href="/terms" className="text-black dark:text-white underline">
          Terms of Service
        </Link>{" "}
        and acknowledge that Post's{" "}
        <Link href="/privacy-policy" className="text-black dark:text-white underline">
          Privacy Policy
        </Link>{" "}
        applies to you.
      </p>

      <SignUpModal 
        isOpen={isSignUpModalOpen}
        onClose={() => {
          setIsSignUpModalOpen(false)
          router.push('/')
        }}
      />
    </div>
  )
}