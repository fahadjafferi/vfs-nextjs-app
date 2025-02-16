import { NextResponse } from "next/server"
import { prepareLoansContext } from "@/utils/prepareLoansContext"

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    // Prepare context for the AI
    const context = await prepareLoansContext()

    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "X-Title": "Vehicle Financing AI Agent",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [
          {
            role: "system",
            content: `You are an AI assistant for a vehicle financing application. Your role is to provide accurate and helpful information based on the loan data provided. Here are some guidelines:

1. Always base your answers on the loan data provided in the context.
2. If asked about specific loans, refer to them by their Loan ID.
3. Provide financial advice cautiously, always recommending professional consultation for major decisions.
4. If asked about information not present in the loan data, politely state that you don't have that information.
5. Be prepared to calculate totals, averages, or other statistics based on the loan data if asked.
6. Explain financial terms in simple language when necessary.
7. If asked about application features or technical details, explain that you're focused on loan information and recommend contacting customer support for those queries.

Here's the current context of loans in the system:

${context}`,
          },
          { role: "user", content: message },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API request failed with status ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response."

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error("Error in AI agent:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

