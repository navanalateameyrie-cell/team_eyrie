import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json()

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY
    
    if (!apiKey) {
      // Fallback message if API key is not yet configured by the user
      return NextResponse.json({
        reply: "Hello! The chat API key has not been configured yet. Once the site administrator adds the Gemini API key to the environment variables, I will be able to answer your questions about our services and help you log in to the client portal!"
      })
    }

    // System prompt instructing the model about its role and website context
    const systemPrompt = `You are a professional customer support assistant for Team Eyrie, India's Integrated Professional Services Network. 
    You must ONLY provide information related to our services (taxation, assurance, regulatory compliance, corporate advisory, transaction services, strategic consulting) and CA (Chartered Accountant) related queries. 
    If a user asks how to login, access their dashboard, or portal, guide them to use the "Client Login" button in the navigation bar to access the client portal. 
    Keep your answers concise, professional, and friendly. Do not answer questions unrelated to Team Eyrie, its services, or CA topics.`

    // Format history for Gemini API
    const formattedHistory = history.map((msg: { role: string, content: string }) => ({
      role: msg.role === 'bot' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }))

    // Add current message
    formattedHistory.push({
      role: 'user',
      parts: [{ text: message }]
    })

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: formattedHistory,
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 250,
        }
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Gemini API Error:', errorData)
      return NextResponse.json(
        { error: 'Failed to generate response' },
        { status: 500 }
      )
    }

    const data = await response.json()
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't understand that."

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
