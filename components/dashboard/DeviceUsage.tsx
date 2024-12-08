"use client"

import Card from '@/components/ui/card'

export default function DeviceUsage() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">USED DEVICE</h2>
      <div className="flex items-center justify-center">
        <div className="w-32 h-32 rounded-full border-8 border-green-500 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold">85%</div>
            <div className="text-sm text-muted-foreground">Mob</div>
          </div>
        </div>
      </div>
    </Card>
  )
} 