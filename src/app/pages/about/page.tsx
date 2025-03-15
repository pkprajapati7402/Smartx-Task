// pages/about.tsx
'use client'

import Image from "next/image";
import Footer from "@/sections/footer";

export default function About() {
  return (
    <>
    
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white flex flex-col items-center justify-center px-6 py-16 pt-24">
      <h1 className="text-5xl font-extrabold drop-shadow-lg">About Our AI Task Manager 🚀</h1>
      <p className="mt-4 text-lg max-w-3xl text-center">
        Say hello to the future of productivity! Our AI-driven Task Manager helps you <strong>organize tasks</strong>, 
        <strong>prioritize goals</strong>, and <strong>boost efficiency</strong>—all while keeping work fun! 🎯
      </p>

      {/* Team Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        <div className="p-6 bg-white/10 rounded-lg shadow-lg backdrop-blur-md text-center">
          <Image
            src="/tech.png" 
            alt="AI Tech"
            width={150}
            height={150}
            className="rounded-full mx-auto"
          />
          <h2 className="text-2xl font-bold mt-4">AI-Powered Efficiency</h2>
          <p className="mt-2 text-gray-200">Our smart AI assistant keeps you on track, helping you manage time effortlessly.</p>
        </div>

        <div className="p-6 bg-white/10 rounded-lg shadow-lg backdrop-blur-md text-center">
          <Image
            src="/teamwork.jpg"
            alt="Team Collaboration"
            width={150}
            height={150}
            className="rounded-full mx-auto"
          />
          <h2 className="text-2xl font-bold mt-4">Seamless Teamwork</h2>
          <p className="mt-2 text-gray-200">Collaborate with your team in real-time and hit deadlines with ease.</p>
        </div>

        <div className="p-6 bg-white/10 rounded-lg shadow-lg backdrop-blur-md text-center">
          <Image
            src="/productivity.jpg"
            alt="Productivity Boost"
            width={150}
            height={150}
            className="rounded-full mx-auto"
          />
          <h2 className="text-2xl font-bold mt-4">Boost Productivity</h2>
          <p className="mt-2 text-gray-200">Use data-driven insights to improve efficiency and make better decisions.</p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mt-16 max-w-4xl text-center">
        <h2 className="text-4xl font-bold">Our Mission 🌟</h2>
        <p className="mt-4 text-lg">
          We believe work should be <strong>organized, stress-free, and fun</strong>! 
          Our mission is to create a tool that <strong>empowers individuals and teams</strong> 
          to work smarter—not harder.
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
}
