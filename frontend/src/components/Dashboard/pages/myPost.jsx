import axios from "axios";
import { useEffect, useState } from "react";


const MyPosts = () => {

  const [fetchpost, setfetchpost] = useState([])

  useEffect(()=>{
    const fetchpost = async()=>{
      try{
        const res = await axios.get('/api/v1/post/me')
        setfetchpost(res.data.data.Allpost)
      } catch(error){
        console.log(error)
      }
    }
    fetchpost()
  },[])
  return (
    <div className="max-w-6xl mx-auto mt-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">My Posts</h1>
        <span className="text-xs font-semibold text-zinc-400 bg-zinc-800 px-3 py-1.5 rounded-full border border-zinc-700">
          {fetchpost.length} Posts
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {fetchpost.map((post) => (
          <div
            key={post._id}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between"
          >

            <div className="relative aspect-square bg-black overflow-hidden">
              <img
                src={post.imageUrl}
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
