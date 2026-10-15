import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json()

    const apiKey = process.env.OPENROUTER_API_KEY

    if (!apiKey || apiKey === 'sk-or-v1-your-openrouter-api-key-here') {
      return NextResponse.json({
        reply: "Hello! The OpenRouter API key has not been configured yet. Please add it to your .env file."
      })
    }

    const systemPrompt = `You are a professional customer support assistant for Team Eyrie, India's Integrated Professional Services Network. 
    You have full knowledge of the entire Team Eyrie website and its contents. You must base all your answers exclusively on the information below and the policies provided on our website.

    COMPANY BACKGROUND:
    Team Eyrie is a premier multidisciplinary professional services network formed by three esteemed Chartered Accountancy partnerships:
    1. V. Verma & Co. (New Delhi) - Specialized in Direct Tax Litigation, NCLT Proceedings.
    2. S S A L Associates (Salem & Bengaluru) - Industrial Audit, Cost Management, MSME Advisory.
    3. R. Sridharan & Company (Chennai) - Statutory Bank Assurance, SEBI Compliance, Corporate Governance.

    MAIN SERVICES WE OFFER:
    - Assurance & Audit (Statutory, Internal, Bank, Forensic, Risk Advisory)
    - Tax Advisory (Direct Tax, Income Tax Litigation, International Tax, Transfer Pricing, FEMA)
    - GST & Indirect Taxes (Advisory, Compliance, Litigation, Customs)
    - Corporate & Regulatory (Company Law, Secretarial, RBI, SEBI, ROC)
    - Business Consulting (Virtual CFO, Financial Modelling, Business Structuring)
    - Transaction Advisory (M&A, VC/PE Advisory, Fund Raising, Due Diligence)
    - Family Business Advisory (Succession Planning, Wealth Preservation, Governance)
    - Global Business Services (Cross-Border Transactions, NRI Taxation)

    SECTORS WE SERVE:
    Manufacturing, BFSI, FinTech, IT, Healthcare, Real Estate, E-Commerce, Startups, MSMEs, Renewable Energy, and Logistics.

    INSTRUCTIONS:
    - You must ONLY provide information related to our services listed above and CA (Chartered Accountant) related queries. 
    - If a user asks how to login, access their dashboard, or portal, guide them to use the "Client Login" button in the navigation bar to access the client portal. 
    - Keep your answers concise, highly accurate, professional, and friendly. Do not answer questions unrelated to Team Eyrie, its services, or CA topics.`

    // Format history for OpenRouter (OpenAI-compatible) API
    const formattedMessages = [
      { role: 'system', content: systemPrompt }
    ]

    history.forEach((msg: { role: string, content: string }) => {
      const role = msg.role === 'bot' ? 'assistant' : 'user'
      formattedMessages.push({ role, content: msg.content })
    })

    // Add current user message
    formattedMessages.push({ role: 'user', content: message })

    // Default to a highly reliable model on OpenRouter
    const model = process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.1-8b-instruct'

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        // Optional OpenRouter headers to identify your app
        'HTTP-Referer':
          process.env.NEXT_PUBLIC_SERVER_URL ||
          (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://te1-steel.vercel.app'),
        'X-Title': 'Team Eyrie Chatbot',
      },
      body: JSON.stringify({
        model: model,
        messages: formattedMessages,
        temperature: 0.2,
        max_tokens: 250,
      })
    })

    if (!response.ok) {
      let errorMessage = 'Failed to generate response'
      try {
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json()
          errorMessage = errorData?.error?.message || errorMessage
          console.log('OpenRouter API Error JSON:', errorData)
        } else {
          const errorText = await response.text()
          errorMessage = errorText || errorMessage
          console.log('OpenRouter API Error Text:', errorText)
        }
      } catch (e) {
        console.error('Error parsing API failure response:', e)
      }
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      )
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't understand that."

    return NextResponse.json({ reply })
  } catch (error: any) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}
