'use client'

export default function Footer() {
    return (
      <footer className="bg-gradient-to-br from-purple-700 to-blue-600 text-white py-10 px-6 rounded-t-3xl border-t border-white/20 shadow-lg mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center sm:text-left">
          
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              We create intuitive and powerful task management solutions designed to boost productivity and efficiency.
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#" className="hover:text-white transition">Features</a></li>
              <li><a href="#" className="hover:text-white transition">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
  
          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Socials</h3>
            <p className="text-white/80 text-sm mb-4">
              Get connected with our Socials, to get Latest Products and Services updates.
            </p>
            <div className="flex items-center justify-center sm:justify-start border border-white/30 rounded-md p-1">
              {/* <input
                type="email"
                placeholder="Enter your email"
                className="w-2/3 p-2 text-black rounded-l-md focus:outline-none"
              /> */}
              <div>
                <li>Instagram</li>
                <li>YouTube</li>
                <li>Twitter</li>
              </div>
              {/* <button className="bg-white text-purple-700 px-4 py-2 rounded-r-md hover:bg-gray-200 transition">
                Subscribe
              </button> */}
            </div>
          </div>
        </div>
  
        {/* Bottom Section */}
        <div className="text-center text-white/70 text-sm mt-10">
          © {new Date().getFullYear()} SmartX. All rights reserved.
        </div>
      </footer>
    );
  }
  