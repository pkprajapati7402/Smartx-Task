// components/Homepage.tsx
import Link from "next/link";
import Image from "next/image";
import UserReviews from "@/sections/Userreviews";
import Footer from "@/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 text-white text-center p-6 pt-24">
      <h1 className="text-5xl font-extrabold drop-shadow-lg">Boost Your Productivity 🚀</h1>
      <p className="mt-4 text-lg max-w-2xl">
  Meet your new <strong>AI-powered Task Manager</strong>! Stay <strong>organized</strong>, <strong>crush deadlines</strong>, and <strong>make work fun</strong>! 🎯💡  
</p>


      <div className="mt-8 flex space-x-4">
        <Link href="/dashboard" className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition">
          Get Started
        </Link>
        <Link href="/features" className="px-6 py-3 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition">
          Explore Features
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white/10 rounded-lg shadow-lg backdrop-blur-md">
          <h2 className="text-2xl font-bold">📌 Smart Task Management</h2>
          <p className="mt-2">Organize, prioritize, and never miss a deadline.</p>
        </div>
        <div className="p-6 bg-white/10 rounded-lg shadow-lg backdrop-blur-md">
          <h2 className="text-2xl font-bold">🤖 AI-Powered Insights</h2>
          <p className="mt-2">AI analyzes your tasks & boosts your efficiency.</p>
        </div>
        <div className="p-6 bg-white/10 rounded-lg shadow-lg backdrop-blur-md">
          <h2 className="text-2xl font-bold">⏳ Time Tracking</h2>
          <p className="mt-2">See where your time goes and work smarter.</p>
        </div>
        <div className="p-6 bg-white/10 rounded-lg shadow-lg backdrop-blur-md">
          <h2 className="text-2xl font-bold">📊 Beautiful Analytics</h2>
          <p className="mt-2">Track progress with interactive charts & insights.</p>
        </div>
        <div className="p-6 bg-white/10 rounded-lg shadow-lg backdrop-blur-md">
          <h2 className="text-2xl font-bold">⚡ Seamless Collaboration</h2>
          <p className="mt-2">Share tasks, assign work, and stay in sync.</p>
        </div>
        <div className="p-6 bg-white/10 rounded-lg shadow-lg backdrop-blur-md">
          <h2 className="text-2xl font-bold">🎯 Goal-Oriented Workflow</h2>
          <p className="mt-2">Set goals and track your achievements easily.</p>
        </div>
      </div>

      <Image src="/startup.png" alt="Task Manager Illustration" width={400} height={300} className="mt-10 rounded-lg shadow-lg" />
      <UserReviews />
      <Footer />
    </div>
  );
}
