'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Banner() {
  return (
    <div className="relative overflow-hidden bg-background lg:px-24 ">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-center gap-8 pt-12 pb-24 md:grid-cols-2 md:gap-12 lg:grid-cols-2">
          {/* Sol Taraf - Metin İçeriği */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-sans text-3xl font-sans font-bold tracking-tight text-primary sm:text-4xl lg:text-6xl dark:text-white"
              >
                Power of <br />
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  word
                </motion.span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="max-w-[600px] text-secondary font-sans text-muted-foreground sm:text-lg"
              >
                Share your thoughts, discover your inspiration and change the world with your words.
              </motion.p>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-col gap-4 min-[400px]:flex-row"
            >
              <Link
                href="/auth/login"
                className="bg-accent font-sans font-bold text-white px-4 py-2 rounded-md"
              >
                Start Reading
              </Link>
            </motion.div>
          </motion.div>

          {/* Sağ Taraf - Görsel */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative aspect-square w-full max-w-[450px]">
              <Image
                src="/assets/bro.png"
                alt="Banner Image"
                fill
                priority
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>

        {/* Alt Kısım */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex flex-col items-center gap-12 font-serif text-center my-24"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="text-4xl text-primary"
          >
            Every article has a story. <br />
            So are you ready to write yours?
          </motion.h1>
          <Link
            href="/auth/login"
            className="bg-accent font-sans font-bold text-white px-4 py-2 rounded-md"
          >
            Get Started
          </Link>
        </motion.div>
      </div>

      {/* Arkaplan Dekoratif Elementler */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute left-0 top-0 -z-10 h-full w-full"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" 
        />
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" 
        />
      </motion.div>
    </div>
  )
}
