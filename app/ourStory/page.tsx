'use client'

import { useTheme } from "next-themes"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function OurStory() {
  const { theme } = useTheme()

  return (
    <main className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-8 font-sans text-primary dark:text-white">
          Everyone Has a Story Worth Sharing
        </h1>
        <div className="prose dark:prose-invert max-w-3xl space-y-6">
          <p className="text-lg text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
            Post is a platform for human stories and ideas. It's a space where anyone can share their knowledge and experiences with the world without needing a large following or mailing list.
          </p>

          <p className="text-lg text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
            While the internet often feels overwhelming and chaotic, Post offers a calm and thoughtful environment. As an intuitive, visually appealing, and collaborative platform, it's designed to help connect your unique voice with the right audience.
          </p>

          <p className="text-lg text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
            More than 100 million people come together on Post every month. Software developers, aspiring writers, designers, CEOs, and individuals with untold stories... They share their projects, sleepless nights, personal experiences, and lessons learned.
          </p>

          <p className="text-lg text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
            Unlike platforms that sell your data or profit from ads, Post grows with the support of a million members who share our vision.
          </p>

          <div className="flex flex-col items-center gap-4 mt-8">
            <h2 className="text-2xl font-bold text-primary dark:text-white">
              Are You Ready to Share Your Story?
            </h2>
            <div className="flex gap-4">
              <Link href="/">
                <Button className="font-sans bg-accent text-white hover:bg-accent/90">
                  Start Reading
                </Button>
              </Link>
              <Link href="/write">
                <Button variant="outline" className="font-sans border border-accent text-accent hover:bg-accent/10">
                  Start Writing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
