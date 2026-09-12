import { ThreeSphere } from "@/components/ThreeSphere";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useInputValue } from "@/hooks/useInputValue";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const { value, onChange } = useInputValue();
  const goToChat = () => {
    router.push("/chat");
    localStorage.setItem("name", value);
  };
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-between py-16 px-4 bg-white dark:bg-black">
      <div className="flex flex-col items-center">
        <Image
          src="/favicon.png"
          alt="Mental Health Companion Logo"
          width={64}
          height={64}
          className="rounded-full border border-zinc-800 shadow-lg mb-3 object-cover"
        />
        <h1 className="text-4xl font-bold">{`Mental Health Companion`}</h1>
        <h4 className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          Your mental health therapy chatbot.
        </h4>
      </div>
      <ThreeSphere />
      <Input
        value={value}
        placeholder="Write your name here..."
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            goToChat();
          }
        }}
      />
      <Button onClick={goToChat} text="Start Chat" className="mt-4" />
      <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
        This is a safe space to breathe, reflect, and feel heard.
      </p>
    </div>
  );
}
