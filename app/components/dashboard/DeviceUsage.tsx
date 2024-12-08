"use client"

import Card from '@/components/ui/card'

interface DeviceUsageProps {
  mobilePercentage?: number;
  desktopPercentage?: number;
}

export default function DeviceUsage({ 
  mobilePercentage = 85, 
  desktopPercentage = 15 
}: DeviceUsageProps) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">USED DEVICE</h2>
      <div className="flex items-center justify-center gap-8">
        {/* Mobile Usage */}
        <div className="text-center">
          <div className="relative w-32 h-32">
            <div className="w-full h-full rounded-full border-8 border-green-500/20">
              <div 
                className="absolute inset-0 rounded-full border-8 border-green-500"
                style={{
                  clipPath: `polygon(0 0, 100% 0, 100% ${mobilePercentage}%, 0 ${mobilePercentage}%)`
                }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div>
                <div className="text-2xl font-bold">{mobilePercentage}%</div>
                <div className="text-sm text-muted-foreground">Mobile</div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Usage */}
        <div className="text-center">
          <div className="relative w-32 h-32">
            <div className="w-full h-full rounded-full border-8 border-blue-500/20">
              <div 
                className="absolute inset-0 rounded-full border-8 border-blue-500"
                style={{
                  clipPath: `polygon(0 0, 100% 0, 100% ${desktopPercentage}%, 0 ${desktopPercentage}%)`
                }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div>
                <div className="text-2xl font-bold">{desktopPercentage}%</div>
                <div className="text-sm text-muted-foreground">Desktop</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
} 