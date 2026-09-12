import { useEffect, useState } from "react";
import { useChat } from "../hooks/useChat";
import { ThreeSphere } from "@/components/ThreeSphere";
import Button from "@/components/ui/Button";
import { TextArea } from "@/components/ui/TextArea";
import { Card } from "@/components/ui/Card";
import { TypingMessage } from "@/components/TypingMessage";

export default function Chat() {
  const { messages, isLoading, sendMessage } = useChat();
  const [input, setInput] = useState<string>("");
  const [name, setName] = useState<string>("darling");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(storedName);
    }
  }, []);

  useEffect(() => {
    // Scroll to the bottom when a new message is added
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Keep scrolling during typing animation
    const scrollInterval = setInterval(() => {
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);

    // Clean up after 3 seconds (animation duration)
    const timeout = setTimeout(() => {
      clearInterval(scrollInterval);
    }, 3000);

    return () => {
      clearInterval(scrollInterval);
      clearTimeout(timeout);
    };
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-between py-16 px-4 bg-white dark:bg-black">
      <h1 className="text-4xl font-bold capitalize">{`Welcome ${name}`}</h1>

      {!messages.length && !isLoading && <ThreeSphere />}

      <div id="chat-container" className="overflow-y-auto max-h-[50vh] w-full">
        {messages.map((msg, index) => (
          <Card
            key={`${msg.role}-${index}`}
            className={`w-max max-w-[80%] ${
              msg.role === "assistant" ? "mr-auto" : "ml-auto"
            }`}
          >
            <h2 className="mb-2 text-lg font-semibold">
              {msg.role === "user" ? name : "Mental Health Companion"}
            </h2>
            {msg.role === "assistant" ? (
              <TypingMessage content={msg.content} />
            ) : (
              <p>{msg.content}</p>
            )}
          </Card>
        ))}
        {isLoading && (
          <Card key="typing-indicator" className="w-max max-w-[80%] mr-auto">
            <h2 className="mb-2 text-lg font-semibold">Mental Health Companion</h2>
            <p className="animate-pulse">Is typing...</p>
          </Card>
        )}
      </div>

      <div className="relative w-full border border-zinc-300 rounded-md bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
        <TextArea
          input={input}
          placeholder="Type your message here..."
          setInput={setInput}
          onKeyDown={handleSendMessage}
        />
        <div className="w-full flex justify-end mt-2 pb-1 pr-1">
          <Button
            onClick={handleSendMessage}
            isLoading={isLoading}
            text="Send"
            loadingText="Sending..."
            className="text-end"
          />
        </div>
      </div>
    </div>
  );
}
