


"use client";

import { useState, useEffect } from "react";

export default function FetchPostPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/external")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPosts(data.data);
        } else {
          setError(data.message);
        }
      })
      .catch(() => setError("An unexpected error occurred."))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-sky-300 via-teal-300 to-green-300">
        <p className="text-lg font-semibold text-white">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-sky-300 via-teal-300 to-green-300">
        <p className="text-lg font-semibold text-red-600">Error: {error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-300 via-teal-300 to-green-300 py-10">
      <div className="max-w-6xl mx-auto bg-white/90 p-6 rounded-lg shadow-lg">
        {/* Elegant Heading with Strong Colors */}
        <h1 className="text-4xl font-serif italic text-teal-900 mb-6 text-center border-b-4 border-teal-700 pb-3">
          Explore Our <span className="text-sky-600">Beautiful</span> Posts
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: { id: number; title: string; body: string }) => (
            <div
              key={post.id}
              className="border rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow bg-gradient-to-r from-teal-50 to-sky-200"
            >
              {/* Post Title in Bold Italics */}
              <h2 className="text-xl font-semibold italic text-teal-900">{post.title}</h2>
              <p className="text-gray-800 mt-2">{post.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
