'use client'

const reviews = [
  { name: "Emma Johnson", emoji: "😊", rating: 5, review: "This app has completely changed the way I manage my tasks! Super intuitive and fun to use. 🚀" },
  { name: "David Smith", emoji: "😎", rating: 4, review: "Great features and clean UI. Just needs a dark mode to be perfect! 🌙" },
  { name: "Sophia Lee", emoji: "🤩", rating: 5, review: "Absolutely love it! I stay more productive and never miss a deadline. Highly recommended! 🔥" },
  { name: "John Doe", emoji: "👍", rating: 4, review: "A solid app for task management. Would love to see more integrations in the future! 📅" },
  { name: "Olivia Martinez", emoji: "💖", rating: 5, review: "Perfect for team collaboration! We use it daily at work. Highly recommend. 💼" },
];

export default function UserReviews() {
  return (
    <div className="bg-gradient-to-br from-purple-600 to-blue-500 text-white py-16 px-6 text-center rounded-3xl border border-white/20 shadow-lg mt-16">
      
      <h2 className="text-3xl sm:text-5xl font-extrabold drop-shadow-lg mb-6">What Our Users Say 💬</h2>
      <p className="text-base sm:text-lg max-w-3xl mx-auto mb-6 px-4">
        See what our amazing users have to say about their experience with our task manager!
      </p>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {reviews.map((user, index) => (
          <div
            key={index}
            className="p-6 bg-white/10 rounded-lg shadow-lg backdrop-blur-md text-left"
          >
            <div className="flex items-center gap-4">
              <span className="text-5xl">{user.emoji}</span>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold">{user.name}</h3>
                <div className="text-yellow-400 text-base sm:text-lg">
                  {"⭐".repeat(user.rating)}
                  <span className="text-gray-300">{5 - user.rating > 0 ? "☆".repeat(5 - user.rating) : ""}</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-white/90 text-sm sm:text-lg leading-relaxed">
              {user.review}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
