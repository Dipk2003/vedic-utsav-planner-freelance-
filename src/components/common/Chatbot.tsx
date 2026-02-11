'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

const suggestions = [
  'I want to plan a wedding in Delhi',
  'Corporate event in Greater Noida',
  'Birthday party in Varanasi'
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Hello. I am the VaidikUtsav assistant. We plan events in Delhi, Greater Noida, and Varanasi. Please share your event type and preferred date.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const canSend = input.trim().length > 0 && !isSending;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const historyPayload = useMemo(() => {
    return messages.slice(-8).map((msg) => ({
      role: msg.role,
      text: msg.text
    }));
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isSending) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      text: content
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          history: historyPayload
        })
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        console.error('Chatbot API error:', data?.error || data);
        throw new Error('The assistant is temporarily unavailable. Please try again in a moment.');
      }

      const replyText = data?.reply?.trim();

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant_${Date.now()}`,
          role: 'assistant',
          text: replyText || 'Sorry, I did not receive a response. Please try again.'
        }
      ]);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'The assistant is temporarily unavailable. Please try again.';
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant_${Date.now()}`,
          role: 'assistant',
          text: message
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-[320px] sm:w-[360px] h-[520px] max-h-[70vh] bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-white/70">
            <div>
              <p className="text-sm font-semibold text-foreground">VaidikUtsav Assistant</p>
              <p className="text-xs text-muted-foreground">Powered by Gemini</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-muted text-foreground flex items-center justify-center hover:bg-muted/80 transition"
              aria-label="Close chat"
            >
              <Icon name="XMarkIcon" className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed font-geist shadow-sm ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-white text-foreground border border-border'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex justify-start">
                <div className="bg-white text-foreground border border-border rounded-2xl px-4 py-2 text-sm font-geist">
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-4 py-3 border-t border-border bg-white/70 space-y-3">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => sendMessage(suggestion)}
                  className="text-xs px-3 py-1.5 rounded-full border border-border text-foreground hover:bg-muted transition"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href="https://wa.me/919369190920"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-full bg-success text-success-foreground"
              >
                WhatsApp Us
              </a>
              <a
                href="mailto:vaidikutsav03@gmail.com"
                className="text-xs px-3 py-1.5 rounded-full border border-border text-foreground"
              >
                Email Us
              </a>
            </div>

            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 rounded-xl border border-border bg-card text-foreground text-sm font-geist focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="submit"
                disabled={!canSend}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                  canSend
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
                aria-label="Send message"
              >
                <Icon name="PaperAirplaneIcon" className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition"
        aria-label="Open chat"
      >
        <Icon name="ChatBubbleLeftRightIcon" className="w-5 h-5" />
        <span className="text-sm font-semibold">Chat with us</span>
      </button>
    </div>
  );
}

