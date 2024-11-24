'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { TaskList } from './TaskList'
import { Achievements } from './Achievements'
import { Leaderboard } from './Leaderboard'
import { AIAssistant } from './AIAssistant'
import { BackgroundGradient } from './BackgroundGradient'
import { ThemeProvider } from './ThemeProvider'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const AvatarCanvas = dynamic(() => import('./AvatarCanvas'), { ssr: false })

export default function Dashboard() {
  const [level, setLevel] = useState(1)
  const [xp, setXp] = useState(0)
  const [currency, setCurrency] = useState(0)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleTaskComplete = (taskXp: number) => {
    setXp((prevXp) => {
      const newXp = prevXp + taskXp
      if (newXp >= 100) {
        setLevel((prevLevel) => prevLevel + 1)
        setCurrency((prevCurrency) => prevCurrency + 50)
        setShowLevelUp(true)
        setTimeout(() => setShowLevelUp(false), 3000)
        return newXp - 100
      }
      return newXp
    })
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <BackgroundGradient />
        <div className="container mx-auto p-4">
          <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-4xl font-bold">Productivity Quest</h1>
            <div className="flex items-center space-x-4">
              <Card>
                <CardContent className="flex items-center p-2">
                  <Progress value={xp} className="w-[100px] mr-2" />
                  <span className="text-sm font-medium">XP: {xp}/100</span>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-2">
                  <span className="text-sm font-medium">Level {level}</span>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-2">
                  <span className="text-sm font-medium">{currency} 💎</span>
                </CardContent>
              </Card>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1 md:col-span-2 space-y-8">
              <Tabs defaultValue="tasks" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>
                <TabsContent value="tasks">
                  <TaskList onTaskComplete={handleTaskComplete} />
                </TabsContent>
                <TabsContent value="achievements">
                  <Achievements />
                </TabsContent>
              </Tabs>
            </div>
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Your Avatar (Level {level} Duck)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 w-full">
                    <AvatarCanvas level={level} />
                  </div>
                </CardContent>
              </Card>
              <Leaderboard />
            </div>
          </div>
        </div>
        