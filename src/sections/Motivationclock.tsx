"use client";

import { useState, useEffect } from "react";

// List of Motivational Quotes
const quotes = [
  "Believe you can and you&apos;re halfway there. – Theodore Roosevelt",
  "Don&apos;t watch the clock; do what it does. Keep going. – Sam Levenson",
  "Success is not the key to happiness. Happiness is the key to success. – Albert Schweitzer",
  "It does not matter how slowly you go as long as you do not stop. – Confucius",
  "The best way to predict the future is to create it. – Peter Drucker",
  "Your time is limited, so don&apos;t waste it living someone else&apos;s life. – Steve Jobs",
  "The secret of getting ahead is getting started. – Mark Twain",
  "You don’t have to be great to start, but you have to start to be great. – Zig Ziglar",
  "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt",
  "Opportunities don&apos;t happen. You create them. – Chris Grosser",
  "Dream big and dare to fail. – Norman Vaughan",
  "Act as if what you do makes a difference. It does. – William James",
  "Do what you can, with what you have, where you are. – Theodore Roosevelt",
];

export default function MotivationClock() {
  const [quote, setQuote] = useState("");
  const [time, setTime] = useState("");

  // Function to update the quote every 24 hours
  useEffect(() => {
    const todayIndex = new Date().getDate() % quotes.length;
    setQuote(quotes[todayIndex]);
  }, []);

  // Function to update the live digital clock every second
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setTime(`${hours}:${minutes}:${seconds} ${ampm}`);
    };

    const interval = setInterval(updateClock, 1000);
    updateClock();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-700 to-blue-600 text-white p-6 rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-between text-center sm:text-left mt-6">
      
      {/* Quote Section */}
      <div className="flex-1">
        <h3 className="text-2xl font-semibold">✨ Daily Motivation</h3>
        <p className="text-lg mt-3 text-white/90 italic">{quote}</p>
      </div>

      {/* Clock Section with Futuristic Font */}
      <div className="bg-white/20 p-4 rounded-lg shadow-md mt-4 sm:mt-0">
        <span className="text-4xl font-mono sm:text-5xl tracking-widest text-neon">
          ⏰ {time}
        </span>
      </div>
      
    </div>
  );
}
