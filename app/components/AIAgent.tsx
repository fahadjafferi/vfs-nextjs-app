"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AIAgent() {
  const [input, setInput] = useState("")
  const [conversation, setConversation] = useState<{ role: "user" | "ai"; content: string }[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [scrollAreaRef])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setConversation((prev) => [...prev, { role: "user", content: input }])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/ai-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        throw new Error("Failed to get AI response")
      }

      const data = await response.json()
      setConversation((prev) => [...prev, { role: "ai", content: data.response }])
    } catch (error) {
      console.error("Error:", error)
      setConversation((prev) => [...prev, { role: "ai", content: "Sorry, I encountered an error. Please try again." }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearConversation = () => {
    setConversation([])
  }

  const suggestedQuestions = [
    "What's the total amount of all active loans?",
    "Which loan has the highest interest rate?",
    "How many loans are currently active?",
    "What's the average loan term across all loans?",
    "Can you summarize the loan with the highest monthly payment?",
  ]

  return (
    <Card className="w-full max-w-2xl mx-auto flex flex-col h-[600px]">
      <CardHeader>
        <CardTitle>AI Loan Assistant</CardTitle>
        <CardDescription>Ask questions about your loans or get financial advice</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
          {conversation.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-2 rounded-lg ${
                message.role === "ai" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
              }`}
            >
              <strong>{message.role === "ai" ? "AI: " : "You: "}</strong>
              {message.content}
            </div>
          ))}
          {isLoading && <div className="text-gray-500 p-2 rounded-lg bg-gray-100">AI is thinking...</div>}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex-shrink-0 border-t pt-4">
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            type="text"
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" disabled={isLoading}>
            Send
          </Button>
        </form>
      </CardFooter>
      <div className="px-6 pb-4 flex flex-wrap gap-2">
        <Button variant="ghost" onClick={handleClearConversation}>
          Clear Conversation
        </Button>
        {suggestedQuestions.map((question, index) => (
          <Button key={index} variant="outline" size="sm" onClick={() => setInput(question)}>
            {question}
          </Button>
        ))}
      </div>
    </Card>
  )
}

