import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const UserProfile = () => {
  const [data, setdata] = useState({ otherUserPost: [] });
  const { username } = useParams();
  console.log(username);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/v1/post/search/${username}`, {
          withCredentials: true,
        });
        setdata(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (username) {
      fetchUser();
    }
  }, [username]);

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4 md:px-0">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="h-48 w-full bg-gradient-to-br from-blue-600/40 via-purple-600/30 to-zinc-900"></div>

        <div className="relative px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-16 mb-6 text-center sm:text-left">
            <div className="relative shrink-0">
              <div className="w-32 h-32 rounded-full bg-zinc-700 ring-4 ring-zinc-900 shadow-xl flex items-center justify-center">
                <span className="text-4xl font-bold text-zinc-400">
                  {(username || "").charAt(0).toUpperCase()}
                </span>
              </div>
            </div>

            <div className="mt-2 sm:mt-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {data.otherUser?.fullName}
              </h2>
              <p className="text-sm sm:text-base font-medium text-blue-400 mt-0.5">
                @{data.otherUser?.username}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
            <div className="bg-zinc-800/50 rounded-2xl p-4 border border-zinc-800">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                Username
              </p>
              <p className="text-base font-semibold text-white">@{username}</p>
            </div>

            <div className="bg-zinc-800/50 rounded-2xl p-4 border border-zinc-800">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                Email
              </p>
              <p className="text-base font-semibold text-zinc-200">
                {data.otherUser?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-6 px-4 md:px-0">
        <div className="flex items-center justify-between mb-8">
         <h1 className="text-2xl font-bold text-white">My Posts</h1>
          <span className="text-xs font-semibold text-zinc-400 bg-zinc-800 px-3 py-1.5 rounded-full border border-zinc-700">
             Posts
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.otherUserPost.map((post) => (
            <div
              key={post.description}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between"
            >
              <div className="relative aspect-square bg-black overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.description}
                  className="w-full h-full object-cover"
                />
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
    </div>
  );
};

export default UserProfile;
