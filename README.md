# 🤖 Kyū Chatbot

[![Deploy with Vercel](https://vercel.com/button)](https://kyu-chatbot.vercel.app)
🌐 **[Live Demo](https://kyu-chatbot-mcdnmh3fn-eden-bergels-projects.vercel.app)**

A modern AI-powered chatbot with an animated 3D sphere interface built with Next.js, React Three Fiber, and OpenAI API.

![Kyū Chatbot](https://img.shields.io/badge/Next.js-16.0.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue?style=for-the-badge&logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-Latest-orange?style=for-the-badge&logo=three.js)

## ✨ Features

- 🤖 **AI Chat Interface** - Powered by OpenAI's GPT models
- 🎨 **Animated 3D Sphere** - Efficient rendering with React Three Fiber
- 💾 **Persistent Storage** - User preferences saved locally

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.0.0](https://nextjs.org/) (React 19.2.0)
- **3D Graphics**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [Three.js](https://threejs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI**: [OpenAI API](https://openai.com/api/)
- **Design System**: Custom UI components

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/edenbergel/kyu-chatbot.git
   cd kyu-chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your OpenAI API key to `.env.local`:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── TextArea.tsx
│   ├── Layout.tsx           # Main layout component
│   ├── ThreeSphere.tsx      # 3D animated sphere
│   └── TypingMessage.tsx    # Typing animation component
├── hooks/
│   ├── useChat.ts           # Chat logic and state management
│   └── useInputValue.ts     # Input handling hook
├── pages/
│   ├── api/
│   │   └── chat.ts          # OpenAI API integration
│   ├── _app.tsx             # Next.js app wrapper
│   ├── _document.tsx        # HTML document structure
│   ├── index.tsx            # Landing page
│   └── chat.tsx             # Main chat interface
└── styles/
    └── globals.css          # Global styles and animations
```

## 🎮 Usage

1. **Enter your name** - The chatbot will remember your name for future conversations
2. **Start chatting** - Type your message and press Enter or click Send
4. **Fresh experience** - Each session starts with a clean chat

## 🔧 Configuration

### Customizing Chat Behavior

Edit `src/hooks/useChat.ts` to modify:
- Error messages
- Loading behavior
- API integration

## 🚀 Deployment

### Deploy to Vercel

**Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Add environment variables (OPENAI_API_KEY)
   - Deploy!

### Environment Variables

Make sure to add these environment variables in your deployment platform:

- `OPENAI_API_KEY` - Your OpenAI API key

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

⭐ **Star this repository if you found it helpful!**
