"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Trash2, Download, Settings } from "lucide-react"
import { useSubscription } from "@/components/subscription-provider"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hello! I'm your AI nutrition assistant. I'm here to help you with pregnancy nutrition questions. How can I support you today? ",
    sender: "bot",
    timestamp: new Date(),
  },
]

const sampleQuestions = [
  "What foods should I avoid in my first trimester?",
  "How much protein do I need during pregnancy?",
  "What are good sources of iron for pregnant women?",
  "Can I drink coffee while pregnant?",
  "What supplements should I take?",
]

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { isPremium } = useSubscription()
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])


 
  const generateBotResponse = (userMessage: string): string | null => {
    const lowerMessage = userMessage.toLowerCase().trim()

    const greetings = ["hi", "hello", "hey", "good morning", "good evening"]
    if (greetings.includes(lowerMessage)) {
      return "Hi there! 👋 I'm your pregnancy nutrition assistant. Ask me something like 'What foods should I avoid in my first trimester?' "
    }

    if (lowerMessage.includes("first trimester") || lowerMessage.includes("avoid")) {
      return "During your first trimester, it's important to avoid raw or undercooked meats, fish high in mercury (like shark, swordfish), unpasteurized dairy products, and excessive caffeine. Focus on folate-rich foods like leafy greens and fortified cereals. Would you like specific recipe suggestions?"

    }

    if (/\bprotein\b/.test(lowerMessage)) {
      return "During pregnancy, aim for 75-100g of protein daily. Good sources: eggs, chicken, fish (low mercury), lentils, beans, paneer, tofu, Greek yogurt, and nuts. Would you like a sample meal plan or Nepali protein-rich recipes?"
    }

    if (/\biron\b/.test(lowerMessage)) {
      return "Pregnant women need 27mg iron daily. Eat: lean red meat, chicken, fish, spinach, lentils, beans, and iron-fortified cereals. Pair with vitamin C (citrus, tomatoes) for better absorption. Want iron-rich Nepali recipes or a daily iron chart?"
    }

    if (/\b(coffee|caffeine|tea)\b/.test(lowerMessage)) {
      return "Limit caffeine to 200mg/day (about 1-2 cups of coffee or 3-4 cups of tea). Herbal teas like ginger or mint are safe. Avoid energy drinks. Want caffeine-free drink ideas or herbal tea recipes?"
    }

    if (/\b(supplement|vitamin|multivitamin)\b/.test(lowerMessage)) {
      return "Take prenatal vitamins with folic acid (400-600mcg), iron, calcium, and DHA. Always consult your doctor before starting new supplements. Want a checklist of essential supplements or local brands?"
    }

    if (/\bcalcium\b/.test(lowerMessage)) {
      return "You need 1000mg calcium daily. Sources: milk, cheese, yogurt, tofu, almonds, leafy greens, and fortified plant milks. Want a list of calcium-rich Nepali foods or recipes?"
    }

    if (/\b(morning sickness|nausea|vomit|vomiting|feel sick)\b/.test(lowerMessage)) {
      return "For morning sickness: eat small, frequent meals, try ginger tea, avoid spicy/fatty foods, and keep crackers by your bed. Bananas, rice, and curd are gentle on the stomach. Want more home remedies or a bland meal plan?"
    }


    if (/\b(weight gain|how much weight|gain weight)\b/.test(lowerMessage)) {
      return "Healthy weight gain depends on your pre-pregnancy BMI. On average: 1-2kg in the first trimester, then 0.5kg/week. Your doctor can give you a personalized target. Want a weight gain chart or tips to manage weight?"
    }

    if (/\b(hydration|water|drink)\b/.test(lowerMessage)) {
      return "Drink at least 8-10 glasses of water daily. Coconut water, lassi, and soups are also good. Limit sugary drinks. Want hydration tips or healthy drink recipes?"
    }

    if (/\b(gestational diabetes|sugar|diabetes)\b/.test(lowerMessage)) {
      return "If you have gestational diabetes, focus on whole grains, high-fiber foods, lean proteins, and non-starchy vegetables. Limit sweets and refined carbs. Want a sample meal plan for gestational diabetes or a Nepali food list?"
    }

    if (/\bconstipation\b/.test(lowerMessage)) {
      return "Constipation is common in pregnancy. Eat more fiber (whole grains, fruits, vegetables), drink plenty of water, and stay active. Prunes and papaya can help. Want a fiber-rich meal plan?"
    }

    if (/\banemia|hemoglobin\b/.test(lowerMessage)) {
      return "To prevent anemia, eat iron-rich foods (meat, beans, spinach), take your prenatal vitamins, and pair iron with vitamin C. Want a list of foods to boost hemoglobin?"
    }

    if (/\bheartburn|acidity\b/.test(lowerMessage)) {
      return "For heartburn, eat smaller meals, avoid spicy/fatty foods, and don't lie down right after eating. Drink cold milk or eat yogurt for relief. Want more tips?"
    }

    if (/\bcramps|leg cramps\b/.test(lowerMessage)) {
      return "Leg cramps are common. Stay hydrated, stretch your legs, and get enough calcium and magnesium. Bananas and milk can help. Want more remedies?"
    }

    if (/\bgestational hypertension|high blood pressure\b/.test(lowerMessage)) {
      return "For high blood pressure, reduce salt, avoid processed foods, eat more fruits/vegetables, and stay active. Always follow your doctor's advice. Want a low-salt meal plan?"
    }


    // Default fallback
    return "I'm here to help with pregnancy nutrition! Please ask about foods, supplements, meal plans, or any specific concern. For medical emergencies, always consult your doctor."
  }

  // ✅ REPLACED handleSendMessage TO SKIP NULL BOT RESPONSE
  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)

    setTimeout(() => {
      const botText = generateBotResponse(userMessage.text)
      if (!botText) {
        setIsTyping(false)
        return
      }

      const botResponse: Message = {
        id: messages.length + 2,
        text: botText,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuestionClick = (question: string) => {
    setInputText(question)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleClearChat = () => {
    setMessages(initialMessages)
    toast({
      title: "Chat cleared",
      description: "Your conversation history has been cleared.",
    })
  }

  const handleExportChat = () => {
    const chatText = messages
      .map((msg) => `${msg.sender === "user" ? "You" : "AI Assistant"}: ${msg.text}`)
      .join("\n\n")

    const blob = new Blob([chatText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "aahar-chat-history.txt"
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Chat exported",
      description: "Your chat history has been downloaded.",
    })
  }

  const handleSettings = () => {
    toast({
      title: "Settings",
      description: "Chat settings would open here.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Nutrition Assistant</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Get instant answers to your pregnancy nutrition questions
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {isPremium && (
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              Premium Support
            </Badge>
          )}
          <Button variant="outline" size="sm" onClick={handleSettings}>
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportChat}>
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleClearChat}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Sample Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Popular Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {sampleQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuestionClick(question)}
                className="text-left h-auto p-2 whitespace-normal hover:bg-primary hover:text-primary-foreground"
              >
                {question}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="h-[500px] flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-blue-600" />
            <span>Chat with Aahar AI</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === "bot" && <Bot className="h-4 w-4 mt-1 text-blue-600" />}
                    {message.sender === "user" && <User className="h-4 w-4 mt-1" />}
                    <div className="flex-1">
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-blue-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about pregnancy nutrition..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!inputText.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {!isPremium && (
              <p className="text-xs text-gray-500 mt-2">
                Upgrade to Premium for priority responses and personalized recommendations
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
