"use client";

import React from "react";
import Footer from "@/sections/footer";

export default function Contact() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white flex flex-col items-center px-6 py-16 pt-24">
        <h1 className="text-5xl font-extrabold drop-shadow-lg">Get in Touch 📩</h1>
        <p className="mt-4 text-lg max-w-3xl text-center">
          {`Have questions or need support? We're here to help! Reach out to us anytime.`}
        </p>

        {/* Contact Form & Google Map Side by Side */}
        <div className="mt-10 flex flex-col lg:flex-row gap-8 w-full max-w-5xl">
          {/* Contact Form */}
          <div className="bg-white/10 p-8 rounded-lg shadow-lg backdrop-blur-md w-full lg:w-1/2">
            <h2 className="text-2xl font-bold text-center mb-6">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold">Your Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full mt-1 p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold">Email Address</label>
                <input 
                  type="email" 
                  placeholder="you@example.com"
                  className="w-full mt-1 p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold">Your Message</label>
                <textarea 
                  placeholder="Type your message here..."
                  className="w-full mt-1 p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 h-32"
                ></textarea>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg text-lg font-semibold">
                Send Message 🚀
              </button>
            </form>
          </div>

          {/* Google Maps */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl font-bold text-center lg:text-left">Find Us Here 📍</h2>
            <p className="mt-2 text-lg text-center lg:text-left">
              {`Visit our office or reach us online anytime!`}
            </p>
            <div className="mt-4 w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d128769.03469989188!2d-73.97188928816186!3d40.700909932877316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1741937294932!5m2!1sen!2sin" 
                width="100%" 
                height="350" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
