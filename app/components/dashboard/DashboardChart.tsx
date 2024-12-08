"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '@/components/ui/card'

const visitData = [
  { name: 'Ja', value: 50 },
  { name: 'Fe', value: 40 },
  { name: 'Ma', value: 60 },
  { name: 'Ap', value: 65 },
  { name: 'Ma', value: 55 },
  { name: 'Ju', value: 45 },
  { name: 'Ju', value: 58 },
  { name: 'Au', value: 52 },
  { name: 'Se', value: 57 },
  { name: 'Oc', value: 54 },
  { name: 'No', value: 42 }
]

export default function DashboardChart() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">SITE VISITORS</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={visitData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#4ade80" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
} 