const MyPosts = () => {
  const posts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&auto=format&fit=crop&q=80",
      description: "Neon city lights reflecting in the evening rain. Tokyo streets at night.",
      visibility: "Public",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
      description: "Sunset over the mountains. Fresh air and peaceful vibes.",
      visibility: "Public",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
      description: "Personal tech workstation and project planning setup.",
      visibility: "Private",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80",
      description: "Retro arcade memories and classic pixel gaming aesthetics.",
      visibility: "Public",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
      description: "Misty pine forest landscape on a cold winter morning.",
      visibility: "Private",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
      description: "Minimal mechanical keyboard and workstation accessories.",
      visibility: "Public",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">My Posts</h1>
        <span className="text-xs font-semibold text-zinc-400 bg-zinc-800 px-3 py-1.5 rounded-full border border-zinc-700">
          {posts.length} Posts
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between"
          >

            <div className="relative aspect-square bg-black overflow-hidden">
              <img
                src={post.image}
                alt={post.description}
                className="w-full h-full object-cover"
              />


              <div className="absolute top-3 right-3">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full shadow-md ${
                    post.visibility === "Public"
                      ? "bg-blue-600/90 text-white"
                      : "bg-zinc-800/90 text-zinc-300 border border-zinc-700"
                  }`}
                >
                  {post.visibility}
                </span>
              </div>
            </div>


            <div className="p-5">
              <p className="text-xs text-zinc-500 uppercase font-semibold tracking-wider mb-1">
                Description
              </p>
              <p className="text-sm text-zinc-200 leading-relaxed">
                {post.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
