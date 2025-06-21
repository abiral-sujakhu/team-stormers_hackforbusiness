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

    if (lowerMessage.includes("protein")) {
      return "Pregnant women need about 75-100g of protein daily, especially in the second and third trimesters. Great sources include lean meats, fish, eggs, beans, tofu, and Greek yogurt. I can suggest some delicious high-protein recipes if you'd like!"
    }

    if (lowerMessage.includes("iron")) {
      return "Iron is crucial during pregnancy! You need about 27mg daily. Excellent sources include lean red meat, poultry, fish, beans, spinach, and fortified cereals. Pair iron-rich foods with vitamin C (like citrus fruits) to enhance absorption. Would you like some iron-rich meal ideas?"
    }

    if (lowerMessage.includes("coffee") || lowerMessage.includes("caffeine")) {
      return "You can have coffee during pregnancy, but limit caffeine to 200mg per day (about 1-2 cups of coffee). This includes tea, chocolate, and some sodas. Herbal teas like ginger tea can be great alternatives and help with morning sickness!"
    }

    if (lowerMessage.includes("supplement")) {
      return "Essential supplements during pregnancy include prenatal vitamins with folic acid (400-600mcg), iron, calcium, and DHA omega-3s. Always consult your healthcare provider before starting any supplements. They can recommend the best options based on your specific needs."
    }

    if (lowerMessage.includes("calcium")) {
      return "You need about 1000mg of calcium daily during pregnancy for your baby's bone development. Great sources include dairy products, leafy greens, almonds, sardines, and fortified plant milks. Try our calcium-rich smoothie recipes!"
    }

    if (lowerMessage.includes("morning sickness") || lowerMessage.includes("nausea")) {
      return "For morning sickness, try eating small, frequent meals, keep crackers by your bedside, try ginger tea or ginger candies, and avoid spicy or fatty foods. Bland foods like toast, rice, and bananas can help. Stay hydrated with small sips throughout the day."
    }

    // Filter irrelevant short messages
    if (lowerMessage.length < 10) return null

    const defaultResponses = [
      "That's a great question! For personalized nutrition advice, I recommend consulting with your healthcare provider.",
      "I'd be happy to help! Can you tell me which trimester you're in or any specific concern you have?",
      "Every pregnancy is unique! I can offer general tips, but your doctor can provide the best personalized advice.",
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
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
