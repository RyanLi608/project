"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/lib/language-context";
import { Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface AIChatProps {
  landmarkName: string;
}

export function AIChat({ landmarkName }: AIChatProps) {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // 初始化欢迎消息
  useEffect(() => {
    const welcomeMessage = language === "en" 
      ? `Hello! I'm your AI guide for ${landmarkName}. Feel free to ask me anything about its history, architecture, interesting facts, or travel tips!`
      : `你好！我是你的${landmarkName}AI导游。欢迎随时向我询问关于它的历史、建筑、有趣事实或旅行提示！`;
      
    setMessages([
      {
        id: "welcome",
        content: welcomeMessage,
        role: "assistant",
        timestamp: new Date()
      }
    ]);
  }, [landmarkName, language]);

  // 滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 发送消息到API
  const sendMessage = async () => {
    if (!input.trim()) return;
    
    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // 发送请求到AI API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          landmark: landmarkName,
          language: language === "en" ? "English" : "Chinese",
          history: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to get response");
      }
      
      const data = await response.json();
      
      // 添加AI回复
      const aiMessage: Message = {
        id: Date.now().toString() + "-ai",
        content: data.response || 
          (language === "en" 
            ? "I'm sorry, I couldn't process your request at the moment."
            : "抱歉，我现在无法处理您的请求。"),
        role: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      
      // 错误消息
      const errorMessage: Message = {
        id: Date.now().toString() + "-error",
        content: language === "en" 
          ? "Sorry, there was an error processing your request. Please try again later."
          : "抱歉，处理您的请求时出错。请稍后再试。",
        role: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理按回车键发送
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="w-full h-[500px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          {language === "en" ? "AI Travel Guide" : "AI旅行向导"}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-[350px] p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.role === "user" ? (
                      <>
                        <span className="text-xs font-medium">
                          {language === "en" ? "You" : "你"}
                        </span>
                        <User className="h-3 w-3" />
                      </>
                    ) : (
                      <>
                        <span className="text-xs font-medium">
                          {language === "en" ? "AI Guide" : "AI导游"}
                        </span>
                        <Bot className="h-3 w-3" />
                      </>
                    )}
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium">
                      {language === "en" ? "AI Guide" : "AI导游"}
                    </span>
                    <Bot className="h-3 w-3" />
                  </div>
                  <div className="flex items-center h-5">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="flex w-full gap-2">
          <Input
            placeholder={
              language === "en"
                ? "Ask me anything about this landmark..."
                : "询问关于这个景点的任何问题..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />
          <Button 
            size="icon" 
            onClick={sendMessage} 
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 