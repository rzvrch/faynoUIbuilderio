import React, { useState } from 'react';
import { NavigationRail } from '../components/NavigationRail';
import { ChatArea } from '../components/ChatArea';
import { MessageInput } from '../components/MessageInput';
import { ChatMessageProps } from '../components/ChatMessage';

export default function Index() {
  const [isRailCollapsed, setIsRailCollapsed] = useState(false);
  const [messages, setMessages] = useState<ChatMessageProps[]>([
    {
      message: "Мені цікаво, які твої можливості по підбору одягу і відображення вибраних позицій у чаті. Можеш зробити приклади на основі одягу зі сайту Zara. підбери мені цілісний образ на вечерю із дівчиною у ресторані",
      type: "sent",
      timestamp: "12:34"
    },
    {
      message: "Звісно! Уявімо, що я твій особистий стиліст 😊\nОсь що я можу зробити для тебе в чаті на прикладі Zara:\n\n🔍 Контекст:\nПодія: вечеря з дівчиною в ресторані\nЛокація: припустимо, сучасний ресторан з невимушеним, але стильним дрес-кодом\nМета: виглядати впевнено, з елегантним стилем, без надмірної офіційності",
      type: "received",
      timestamp: "12:35"
    }
  ]);

  const handleSendMessage = (message: string) => {
    const newMessage: ChatMessageProps = {
      message,
      type: "sent",
      timestamp: new Date().toLocaleTimeString('uk-UA', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
    
    setMessages(prev => [...prev, newMessage]);

    // Simulate assistant response after a brief delay
    setTimeout(() => {
      const assistantResponse: ChatMessageProps = {
        message: "Дякую за ваше повідомлення! Я розумію, що ви шукаете стильний образ для особливого випадку. Дайте мені трохи часу, щоб підібрати ідеальний комплект одягу для вашої вечері в ресторані.",
        type: "received",
        timestamp: new Date().toLocaleTimeString('uk-UA', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      setMessages(prev => [...prev, assistantResponse]);
    }, 1000);
  };

  const toggleRail = () => {
    setIsRailCollapsed(!isRailCollapsed);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Navigation Rail */}
      <NavigationRail 
        isCollapsed={isRailCollapsed} 
        onToggle={toggleRail} 
      />
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Messages */}
        <ChatArea messages={messages} />
        
        {/* Message Input */}
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
