'use client'

import React, { useState, useRef, useEffect } from 'react'
import styles from './Chatbot.module.css'
import chatbotIcon from '../../image/chatbot.png'

interface Message {
  id: string
  role: 'user' | 'bot'
  content: string
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: 'Hello! I am the Team Eyrie assistant. How can I help you today with our services or portal navigation?',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      // Prevent background scrolling
      document.body.style.overflow = 'hidden'
      // Focus input field
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Maintain focus on the input box after sending a message
  useEffect(() => {
    if (isOpen && !isLoading && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 10)
    }
  }, [isOpen, isLoading])

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom()
    }, 100)
    return () => clearTimeout(timer)
  }, [messages, isLoading, isOpen])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    
    // Add user message to UI
    const newMessage: Message = { id: Date.now().toString(), role: 'user', content: userMessage }
    setMessages((prev) => [...prev, newMessage])
    setIsLoading(true)

    try {
      const response = await fetch('/chat-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage, history: messages }),
      })

      if (!response.ok) {
        let errorDetails = 'Unknown error'
        try {
          const errData = await response.json()
          errorDetails = errData.error || errorDetails
        } catch (e) {}

        console.log('Chat API Error:', errorDetails)
        
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: 'bot',
            content: `Connection Error: ${errorDetails}.`,
          },
        ])
        return
      }

      const data = await response.json()
      
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: 'bot', content: data.reply },
      ])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'bot',
          content: 'I apologize, but I am currently having trouble connecting. Please try again later or visit our contact page.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.chatbotContainer}>
      {isOpen && (
        <div className={styles.chatWindow} data-lenis-prevent="true">
          <div className={styles.chatHeader}>
            <div>
              <h3>Team Eyrie Support</h3>
              <p>Online & Ready to Help</p>
            </div>
            <button className={styles.closeButton} onClick={toggleChat} aria-label="Close chat">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className={styles.chatMessages} ref={messagesContainerRef} data-lenis-prevent="true">
            {messages.map((msg) => (
              <div key={msg.id} className={`${styles.message} ${styles[msg.role]}`}>
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className={styles.typingIndicator}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>

          <div className={styles.chatInputContainer}>
            <form onSubmit={handleSubmit} className={styles.chatForm}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className={styles.chatInput}
                disabled={isLoading}
              />
              <button type="submit" className={styles.sendButton} disabled={!input.trim() || isLoading} aria-label="Send message">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '2px' }}>
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        className={styles.toggleButton}
        onClick={toggleChat}
        aria-label="Toggle chat"
        style={{ transform: isOpen ? 'scale(0)' : 'scale(1)', opacity: isOpen ? 0 : 1, pointerEvents: isOpen ? 'none' : 'auto' }}
      >
        <img src={chatbotIcon.src} alt="Chat" style={{ width: '35px', height: '35px', objectFit: 'contain' }} />
      </button>
    </div>
  )
}
