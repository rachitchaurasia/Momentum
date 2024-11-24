'use client'

import { Trophy } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

const achievements = [
  { id: 1, title: 'Task Master', description: 'Complete 100 tasks', progress: 75 },
  { id: 2, title: 'Streak Keeper', description: 'Maintain a 7-day streak', progress: 100 },
  { id: 3, title: 'Productivity Guru', description: 'Reach level 10', progress: 40 },
]

export function Achievements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <Card key={achievement.id}>
              <CardContent className="p-4 flex flex-col items-center">
                <Trophy className="w-12 h-12 mb-2 text-yellow-500" />
                <h3 className="text-lg font-semibold text-center">{achievement.title}</h3>
                <p className="text-sm text-gray-400 text-center mb-2">{achievement.description}</p>
                <Progress value={achievement.progress} className="w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

