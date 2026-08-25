import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  // Let's create a user using fetch to local API
  const res = await fetch('http://localhost:3001/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Fetch User',
      email: 'fetch@test.com',
      password: 'password123',
      role: 'client'
    })
  })
  
  const data = await res.json()
  return NextResponse.json(data)
}
