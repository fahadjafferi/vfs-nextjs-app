import { NextResponse } from "next/server";
import OpenAI from "openai";
import { prepareLoansContext } from "@/utils/prepareLoansContext";

// Initialize the OpenAI client with Deepseek's API endpoint
const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY, // Your Deepseek API key
  baseURL: "https://api.deepseek.com/v1", // Replace with the actual Deepseek API endpoint
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    // Prepare context for the AI
    const context = await prepareLoansContext();

    // Generate AI response
    const response = await deepseek.chat.completions.create({
      model: "deepseek-chat-r1", // Replace with the correct model name
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
7. If asked about application features or technical details, explain that you're focused on loan information and recommend contacting customer support for those queries.`,
        },
        {
          role: "user",
          content: `${context}\n\nHuman: ${message}\n\nAI:`,
        },
      ],
    });

    // Extract the AI's response
    const aiResponse = response.choices[0].message.content;

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error("Error in AI agent:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}