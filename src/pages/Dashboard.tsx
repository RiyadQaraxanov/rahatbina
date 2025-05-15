import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

type Props = {}

export default function Dashboard({}: Props) {
  return (
    <div>
      <div className="grid grid-cols-2 items-center gap-x-6">
        <Card>
          <CardContent>asdasdafas</CardContent>
        </Card>
        <Card>
          <CardContent>asdasdafas</CardContent>
        </Card>
      </div>
    </div>
  )
}