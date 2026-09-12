import { useState } from "react";
import { Message } from "../pages/api/chat";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fonction pure pour l'appel API
  const callChatAPI = async (messages: Message[]): Promise<Message> => {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: messages }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  // Fonction pour ajouter un message utilisateur
  const addUserMessage = (content: string): Message[] => {
    const userMessage: Message = { role: "user", content };
    return [...messages, userMessage];
  };

  // Fonction principale pour envoyer un message
  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const newMessages = addUserMessage(content);
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const botResponse = await callChatAPI(newMessages);
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Afficher un message d'erreur à l'utilisateur
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
  };
};
