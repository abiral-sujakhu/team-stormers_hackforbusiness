"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Baby, Calendar, Heart, Scale, Ruler, Clock, CheckCircle, AlertCircle, Plus, Edit } from "lucide-react"
import { useSubscription } from "@/components/subscription-provider"
import { useToast } from "@/hooks/use-toast"

interface BabyMilestone {
  week: number
  title: string
  description: string
  size: string
  weight: string
  development: string[]
}

interface ChecklistItem {
  id: number
  task: string
  completed: boolean
  category: "hospital" | "baby" | "home" | "documents"
  trimester: number
}

const babyMilestones: BabyMilestone[] = [
  {
    week: 12,
    title: "End of First Trimester",
    description: "Your baby is now fully formed!",
    size: "Plum",
    weight: "0.5 oz",
    development: ["All major organs formed", "Fingers and toes developed", "Can make fists"],
  },
  {
    week: 20,
    title: "Halfway Point",
    description: "You might feel the first kicks!",
    size: "Banana",
    weight: "10 oz",
    development: ["Gender can be determined", "Hair and nails growing", "Can hear sounds"],
  },
  {
    week: 28,
    title: "Third Trimester Begins",
    description: "Baby's survival rate increases significantly",
    size: "Eggplant",
    weight: "2.2 lbs",
    development: ["Eyes can open and close", "Brain developing rapidly", "Can respond to light"],
  },
  {
    week: 36,
    title: "Full Term Approaching",
    description: "Baby is considered full-term soon",
    size: "Papaya",
    weight: "6 lbs",
    development: ["Lungs nearly mature", "Gaining weight rapidly", "Getting into birth position"],
  },
  {
    week: 40,
    title: "Due Date",
    description: "Your baby is ready to meet you!",
    size: "Watermelon",
    weight: "7.5 lbs",
    development: ["Fully developed", "Ready for birth", "Waiting for labor to begin"],
  },
]

const initialChecklist: ChecklistItem[] = [
  // Hospital Bag
  { id: 1, task: "Pack comfortable going-home outfit", completed: false, category: "hospital", trimester: 3 },
  { id: 2, task: "Pack nursing bras and comfortable underwear", completed: false, category: "hospital", trimester: 3 },
  { id: 3, task: "Pack toiletries and personal items", completed: false, category: "hospital", trimester: 3 },
  { id: 4, task: "Pack phone charger and camera", completed: false, category: "hospital", trimester: 3 },
  { id: 5, task: "Pack snacks for after delivery", completed: false, category: "hospital", trimester: 3 },

  // Baby Items
  { id: 6, task: "Buy newborn diapers and wipes", completed: false, category: "baby", trimester: 2 },
  { id: 7, task: "Set up crib and nursery", completed: false, category: "baby", trimester: 2 },
  { id: 8, task: "Install car seat", completed: false, category: "baby", trimester: 3 },
  { id: 9, task: "Stock up on baby clothes (0-3 months)", completed: false, category: "baby", trimester: 2 },
  {
    id: 10,
    task: "Buy feeding supplies (bottles, formula if needed)",
    completed: false,
    category: "baby",
    trimester: 3,
  },

  // Home Preparation
  { id: 11, task: "Deep clean the house", completed: false, category: "home", trimester: 3 },
  { id: 12, task: "Stock freezer with easy meals", completed: false, category: "home", trimester: 3 },
  { id: 13, task: "Arrange help for first few weeks", completed: false, category: "home", trimester: 3 },
  { id: 14, task: "Set up changing station", completed: false, category: "home", trimester: 2 },

  // Documents
  { id: 15, task: "Complete hospital pre-registration", completed: false, category: "documents", trimester: 3 },
  { id: 16, task: "Review insurance coverage", completed: false, category: "documents", trimester: 2 },
  { id: 17, task: "Prepare birth plan", completed: false, category: "documents", trimester: 3 },
  { id: 18, task: "Research pediatricians", completed: false, category: "documents", trimester: 2 },
]

export default function DeliveryTrackerPage() {
  const [currentWeek, setCurrentWeek] = useState(28)
  const [dueDate, setDueDate] = useState("")
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist)
  const [newTask, setNewTask] = useState("")
  const [notes, setNotes] = useState("")
  const { isPremium, upgradeToPremium, refreshSubscriptionStatus } = useSubscription()
  const { toast } = useToast()

  // Add state for contraction timer
  const [contractionTimer, setContractionTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Refresh subscription status when component mounts
    refreshSubscriptionStatus()

    // Calculate due date based on current week (mock calculation)
    const today = new Date()
    const weeksRemaining = 40 - currentWeek
    const calculatedDueDate = new Date(today.getTime() + weeksRemaining * 7 * 24 * 60 * 60 * 1000)
    setDueDate(calculatedDueDate.toLocaleDateString())
  }, [currentWeek, refreshSubscriptionStatus])

  const handleChecklistToggle = (id: number) => {
    setChecklist((prev) => prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
    toast({
      title: "Task updated",
      description: "Your delivery checklist has been updated.",
    })
  }

  const addCustomTask = () => {
    if (!newTask.trim()) return

    const newItem: ChecklistItem = {
      id: Date.now(),
      task: newTask,
      completed: false,
      category: "home",
      trimester: 3,
    }

    setChecklist((prev) => [...prev, newItem])
    setNewTask("")
    toast({
      title: "Task added",
      description: "New task added to your delivery checklist.",
    })
  }

  const getCurrentMilestone = () => {
    return babyMilestones.find((milestone) => currentWeek >= milestone.week) || babyMilestones[0]
  }

  const getNextMilestone = () => {
    return babyMilestones.find((milestone) => currentWeek < milestone.week)
  }

  const getCompletionStats = () => {
    const completed = checklist.filter((item) => item.completed).length
    const total = checklist.length
    return { completed, total, percentage: Math.round((completed / total) * 100) }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "hospital":
        return <Heart className="h-4 w-4" />
      case "baby":
        return <Baby className="h-4 w-4" />
      case "home":
        return <CheckCircle className="h-4 w-4" />
      case "documents":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  // Add timer functions
  const startTimer = () => {
    if (!isTimerRunning) {
      setIsTimerRunning(true)
      const interval = setInterval(() => {
        setContractionTimer((prev) => prev + 1)
      }, 1000)
      setTimerInterval(interval)
    }
  }

  const stopTimer = () => {
    if (isTimerRunning && timerInterval) {
      setIsTimerRunning(false)
      clearInterval(timerInterval)
      setTimerInterval(null)
    }
  }

  const resetTimer = () => {
    setIsTimerRunning(false)
    setContractionTimer(0)
    if (timerInterval) {
      clearInterval(timerInterval)
      setTimerInterval(null)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  console.log("Delivery Tracker - isPremium:", isPremium)

  if (!isPremium) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Baby Delivery Tracker</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your baby's development and prepare for delivery
          </p>
        </div>

        <Card className="text-center py-12">
          <CardContent>
            <Baby className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Premium Feature</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Upgrade to Premium to access the complete delivery tracker with baby milestones and preparation checklist.
            </p>
            <Button
              onClick={() => {
                console.log("Upgrade button clicked from delivery tracker")
                upgradeToPremium()
                setTimeout(() => {
                  refreshSubscriptionStatus()
                  window.location.reload() // Force refresh to show premium content
                }, 100)
                toast({
                  title: "Welcome to Premium! 🎉",
                  description: "You now have access to all premium features including the delivery tracker.",
                })
              }}
            >
              Upgrade to Premium
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentMilestone = getCurrentMilestone()
  const nextMilestone = getNextMilestone()
  const stats = getCompletionStats()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Baby Delivery Tracker</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your baby's development and prepare for delivery
          </p>
        </div>
        <Badge className="bg-purple-600 text-white">Premium Active ✨</Badge>
      </div>

      {/* Current Status */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentWeek} weeks</div>
            <p className="text-xs text-muted-foreground">{40 - currentWeek} weeks remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Date</CardTitle>
            <Baby className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dueDate}</div>
            <p className="text-xs text-muted-foreground">Estimated delivery</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Preparation</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.percentage}%</div>
            <p className="text-xs text-muted-foreground">
              {stats.completed} of {stats.total} tasks completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardHeader>
          <CardTitle>Pregnancy Progress</CardTitle>
          <CardDescription>Your journey to meeting your baby</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={(currentWeek / 40) * 100} className="w-full" />
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Week 1</span>
              <span>Week {currentWeek}</span>
              <span>Week 40</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="milestones" className="space-y-4">
        <TabsList>
          <TabsTrigger value="milestones">Baby Milestones</TabsTrigger>
          <TabsTrigger value="checklist">Delivery Checklist</TabsTrigger>
          <TabsTrigger value="notes">Notes & Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="milestones" className="space-y-4">
          {/* Current Milestone */}
          <Card className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Baby className="h-5 w-5 text-pink-600" />
                  <span>
                    Week {currentMilestone.week}: {currentMilestone.title}
                  </span>
                </CardTitle>
                <Badge>Current</Badge>
              </div>
              <CardDescription>{currentMilestone.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Ruler className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Size: {currentMilestone.size}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Scale className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Weight: {currentMilestone.weight}</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Development Highlights:</h4>
                <ul className="space-y-1">
                  {currentMilestone.development.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Next Milestone */}
          {nextMilestone && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-600" />
                  <span>Coming Up: Week {nextMilestone.week}</span>
                </CardTitle>
                <CardDescription>{nextMilestone.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">{nextMilestone.description}</p>
              </CardContent>
            </Card>
          )}

          {/* All Milestones Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Complete Timeline</CardTitle>
              <CardDescription>Track your baby's development journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {babyMilestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-4 p-4 rounded-lg ${
                      currentWeek >= milestone.week
                        ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                        : "bg-gray-50 dark:bg-gray-800"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentWeek >= milestone.week ? "bg-green-600 text-white" : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {currentWeek >= milestone.week ? <CheckCircle className="h-4 w-4" /> : milestone.week}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">
                        Week {milestone.week}: {milestone.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{milestone.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>Size: {milestone.size}</span>
                        <span>Weight: {milestone.weight}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklist" className="space-y-4">
          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Preparation Progress</CardTitle>
              <CardDescription>
                {stats.completed} of {stats.total} tasks completed ({stats.percentage}%)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={stats.percentage} className="w-full" />
            </CardContent>
          </Card>

          {/* Add Custom Task */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Add Custom Task</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter a custom task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addCustomTask()}
                />
                <Button onClick={addCustomTask}>Add</Button>
              </div>
            </CardContent>
          </Card>

          {/* Checklist by Category */}
          {["hospital", "baby", "home", "documents"].map((category) => {
            const categoryItems = checklist.filter((item) => item.category === category)
            const categoryCompleted = categoryItems.filter((item) => item.completed).length

            return (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(category)}
                      <span className="capitalize">{category} Preparation</span>
                    </div>
                    <Badge variant="outline">
                      {categoryCompleted}/{categoryItems.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categoryItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => handleChecklistToggle(item.id)}
                          className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500"
                        />
                        <span className={`flex-1 ${item.completed ? "line-through text-gray-500" : ""}`}>
                          {item.task}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          T{item.trimester}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Edit className="h-5 w-5" />
                <span>Birth Plan & Notes</span>
              </CardTitle>
              <CardDescription>
                Keep track of your birth preferences, questions for your doctor, and important reminders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="notes">Your Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Write your birth plan, questions for your doctor, or any important notes here..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={10}
                />
              </div>
              <Button
                onClick={() => {
                  toast({
                    title: "Notes saved",
                    description: "Your birth plan and notes have been saved.",
                  })
                }}
              >
                Save Notes
              </Button>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Birth Plan Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Discuss pain management options with your healthcare provider</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Consider who you want present during labor and delivery</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Think about immediate postpartum preferences (skin-to-skin, breastfeeding)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Prepare questions about newborn procedures and tests</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Labor Preparation Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-red-600" />
            <span>Labor Preparation</span>
          </CardTitle>
          <CardDescription>Tools to help you prepare for and track early labor</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contraction Timer</CardTitle>
                <CardDescription>Track the timing and duration of contractions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-3xl font-bold text-blue-600">{formatTime(contractionTimer)}</div>
                  <div className="space-x-2">
                    <Button variant="outline" onClick={startTimer} disabled={isTimerRunning}>
                      Start Timer
                    </Button>
                    <Button variant="outline" onClick={stopTimer} disabled={!isTimerRunning}>
                      Stop
                    </Button>
                    <Button variant="outline" onClick={resetTimer}>
                      Reset
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Time contractions to help determine when to go to the hospital
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hospital Bag Status</CardTitle>
                <CardDescription>Quick overview of your hospital bag preparation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Hospital bag packed</span>
                    <Badge variant="outline">Ready</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Car seat installed</span>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Emergency contacts ready</span>
                    <Badge variant="outline">Ready</Badge>
                  </div>
                  <Button
                    className="w-full mt-4"
                    variant="outline"
                    onClick={() => {
                      // Switch to checklist tab
                      const checklistTab = document.querySelector('[value="checklist"]') as HTMLElement
                      checklistTab?.click()
                    }}
                  >
                    Review Full Checklist
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Labor Signs Information */}
          <Card>
            <CardHeader>
              <CardTitle>When to Go to the Hospital</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2 text-green-600">Early Labor Signs:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Regular contractions 5-7 minutes apart</li>
                    <li>• Contractions lasting 45-60 seconds</li>
                    <li>• Bloody show or mucus plug loss</li>
                    <li>• Lower back pain that comes and goes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-red-600">Call Doctor Immediately:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Water breaks (clear or colored fluid)</li>
                    <li>• Contractions 3-5 minutes apart</li>
                    <li>• Severe bleeding</li>
                    <li>• Baby's movement decreases significantly</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
