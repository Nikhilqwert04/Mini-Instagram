import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [search, setsearch] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);

    FetchUser();
  };

  const FetchUser = async () => {
    try {
      const res = await axios.get(`/api/v1/post/searchUsername?q=${query}`, {
        withCredentials: true,
      });
      setsearch(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-2xl mx-auto mt-6">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-2xl font-bold text-white mb-6">Search</h1>

        <form onSubmit={handleSearch} className="flex items-center gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts or users..."
            className="flex-1 px-5 py-3.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition text-sm"
          />
          <button
            type="submit"
            className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition shadow-lg shrink-0"
          >
            Search
          </button>
        </form>
      </div>
      <div className="mt-6 flex flex-col gap-2">
        {search.map((user) => (
          <div
            key={user.username}
            onClick={() => navigate(`/dashboard/user/${user.username}`)}
            className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 hover:bg-zinc-800/70 hover:border-zinc-700 transition-all duration-200 cursor-pointer group"
          >
            <div className="shrink-0">
              <img
                className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-500/40 group-hover:ring-blue-500/70 transition-all duration-200"
                src="https://images.unsplash.com/photo-1482482097755-0b595893ba63?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Profile Photo"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-blue-400 group-hover:text-blue-300 transition-colors truncate">
                @{user.username}
              </span>
              <span className="text-xs text-zinc-400 truncate">
                {user.fullName}
              </span>
            </div>
            <svg
              className="ml-auto h-4 w-4 text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
