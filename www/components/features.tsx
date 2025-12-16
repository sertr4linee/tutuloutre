import React from "react"

export default function Features() {
  return (
    <div className="bg-white py-24 px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-light tracking-tight mb-16">Selected Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="aspect-4/5 bg-gray-100 relative group overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-light">
                Project {item}
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
