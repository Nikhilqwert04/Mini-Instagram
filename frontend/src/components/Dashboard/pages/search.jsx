import { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
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
    </div>
  );
};

export default Search;
