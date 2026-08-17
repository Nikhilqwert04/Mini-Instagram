import React from "react";

const Chat = () => {
  return (
    <div className="flex h-full gap-4 text-zinc-100 font-sans">
      {/* Sidebar - Chat list */}
      <div className="bg-zinc-900/90 w-[32%] h-full rounded-2xl border border-zinc-800 flex flex-col overflow-hidden shadow-xl backdrop-blur-md">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-zinc-800/80 flex flex-col gap-3">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-xl font-bold tracking-tight text-white">Messages</h2>
            <button className="text-blue-500 hover:text-blue-400 p-1.5 rounded-lg hover:bg-zinc-800/60 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
            </button>
          </div>
          {/* Search Box */}
          <div className="relative flex items-center">
            <span className="absolute left-3 text-zinc-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </span>
            <input 
              type="text" 
              placeholder="Search chat or people..." 
              className="w-full bg-zinc-800/70 hover:bg-zinc-800 border border-zinc-700/30 focus:border-zinc-600 focus:bg-zinc-800 text-sm h-10 pl-10 pr-4 rounded-xl outline-none transition placeholder-zinc-500"
            />
          </div>
        </div>

        {/* Active Now Stories */}
        <div className="px-4 py-3 border-b border-zinc-800/50 flex gap-4 overflow-x-auto scrollbar-none shrink-0">
          <div className="flex flex-col items-center gap-1.5 cursor-pointer group shrink-0">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="Active" className="w-12 h-12 rounded-full object-cover border-2 border-green-500 p-0.5 group-hover:scale-105 transition" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-zinc-900 rounded-full"></span>
            </div>
            <span className="text-[11px] text-zinc-400 font-medium max-w-[56px] truncate">Alice</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 cursor-pointer group shrink-0">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Active" className="w-12 h-12 rounded-full object-cover border-2 border-green-500 p-0.5 group-hover:scale-105 transition" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-zinc-900 rounded-full"></span>
            </div>
            <span className="text-[11px] text-zinc-400 font-medium max-w-[56px] truncate">Elena</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 cursor-pointer group shrink-0">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" alt="Active" className="w-12 h-12 rounded-full object-cover border-2 border-green-500 p-0.5 group-hover:scale-105 transition" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-zinc-900 rounded-full"></span>
            </div>
            <span className="text-[11px] text-zinc-400 font-medium max-w-[56px] truncate">Marcus</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 cursor-pointer group shrink-0">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150" alt="Active" className="w-12 h-12 rounded-full object-cover border-2 border-green-500 p-0.5 group-hover:scale-105 transition" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-zinc-900 rounded-full"></span>
            </div>
            <span className="text-[11px] text-zinc-400 font-medium max-w-[56px] truncate">Sophia</span>
          </div>
        </div>

        {/* Chat List Scrollable area */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800">
          {/* Active Chat Item */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-blue-600/10 border border-blue-500/20 cursor-pointer transition">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="Alice" className="w-12 h-12 rounded-full object-cover border border-zinc-800" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-zinc-900 rounded-full"></span>
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-white truncate">Alice Smith</h4>
                <p className="text-xs text-zinc-300 font-medium truncate mt-0.5">Typing...</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="text-[10px] text-blue-400 font-semibold">Just now</span>
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            </div>
          </div>

          {/* Normal Chat Item */}
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-800/40 cursor-pointer transition border border-transparent">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" alt="Marcus" className="w-12 h-12 rounded-full object-cover border border-zinc-800" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-zinc-300 truncate">Marcus Vance</h4>
                <p className="text-xs text-zinc-500 truncate mt-0.5">Let's catch up later today!</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] text-zinc-500">2h ago</span>
            </div>
          </div>

          {/* Chat Item */}
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-800/40 cursor-pointer transition border border-transparent">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Elena" className="w-12 h-12 rounded-full object-cover border border-zinc-800" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-zinc-900 rounded-full"></span>
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-zinc-300 truncate">Elena Rostova</h4>
                <p className="text-xs text-zinc-400 font-semibold truncate mt-0.5">Sent a photo 📸</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="text-[10px] text-zinc-400">4h ago</span>
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 flex items-center justify-center text-[7px] text-white font-bold">1</div>
            </div>
          </div>

          {/* Chat Item */}
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-800/40 cursor-pointer transition border border-transparent">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150" alt="Sophia" className="w-12 h-12 rounded-full object-cover border border-zinc-800" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-zinc-300 truncate">Sophia Lopez</h4>
                <p className="text-xs text-zinc-500 truncate mt-0.5">Sounds good, thanks!</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] text-zinc-500">Yesterday</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Panel */}
      <div className="bg-zinc-900/90 w-[68%] h-full rounded-2xl border border-zinc-800 flex flex-col overflow-hidden shadow-xl backdrop-blur-md">
        {/* Chat Header */}
        <div className="p-4 border-b border-zinc-800/80 flex justify-between items-center bg-zinc-900/40 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="Alice" className="w-11 h-11 rounded-full object-cover border border-zinc-800" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-zinc-900 rounded-full"></span>
            </div>
            <div>
              <h3 className="font-semibold text-white leading-tight">Alice Smith</h3>
              <p className="text-xs text-green-400 font-medium mt-0.5">Online & Active</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </button>
            <button className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
            </button>
            <button className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </button>
          </div>
        </div>

        {/* Message Feed Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800">
          <div className="flex justify-center my-2">
            <span className="text-[10px] text-zinc-500 font-semibold bg-zinc-800/40 px-2.5 py-1 rounded-full uppercase tracking-wider">Today</span>
          </div>

          {/* Received message bubble */}
          <div className="flex items-end gap-2.5 max-w-[80%]">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="Alice" className="w-8 h-8 rounded-full object-cover border border-zinc-800" />
            <div className="flex flex-col gap-1">
              <div className="bg-zinc-800/90 text-zinc-100 px-4 py-2.5 rounded-2xl rounded-bl-none text-[13.5px] border border-zinc-700/20 shadow-md">
                Hey! Are you done designing the messaging flow for Mini-Instagram? 🚀
              </div>
              <span className="text-[10px] text-zinc-500 ml-1">10:14 AM</span>
            </div>
          </div>

          {/* Sent message bubble */}
          <div className="flex items-end gap-2.5 justify-end max-w-[80%] ml-auto">
            <div className="flex flex-col gap-1 items-end">
              <div className="bg-blue-600 text-white px-4 py-2.5 rounded-2xl rounded-br-none text-[13.5px] shadow-md shadow-blue-600/10">
                Yes! Just finished it. It has standard UI spacing, custom SVGs for the header control buttons, and clean message blocks.
              </div>
              <div className="flex items-center gap-1 text-[10px] text-zinc-500 mr-1">
                <span>10:16 AM</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
            </div>
          </div>

          {/* Received message bubble */}
          <div className="flex items-end gap-2.5 max-w-[80%]">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="Alice" className="w-8 h-8 rounded-full object-cover border border-zinc-800" />
            <div className="flex flex-col gap-1">
              <div className="bg-zinc-800/90 text-zinc-100 px-4 py-2.5 rounded-2xl rounded-bl-none text-[13.5px] border border-zinc-700/20 shadow-md">
                Wow, this looks super premium! Can you also check if it fits perfectly inside the parent Dashboard padding?
              </div>
              <span className="text-[10px] text-zinc-500 ml-1">10:18 AM</span>
            </div>
          </div>

          {/* Sent message bubble */}
          <div className="flex items-end gap-2.5 justify-end max-w-[80%] ml-auto">
            <div className="flex flex-col gap-1 items-end">
              <div className="bg-blue-600 text-white px-4 py-2.5 rounded-2xl rounded-br-none text-[13.5px] shadow-md shadow-blue-600/10">
                Absolutely, it works like a charm and respects the vertical spacing bounds without introducing extra scrollbars.
              </div>
              <div className="flex items-center gap-1 text-[10px] text-zinc-500 mr-1">
                <span>10:19 AM</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
            </div>
          </div>

          {/* Typing Indicator */}
          <div className="flex items-center gap-2 max-w-[80%] pl-10">
            <span className="text-xs text-zinc-400 italic">Alice is typing</span>
            <span className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </span>
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-2">
            {/* Attachment buttons */}
            <div className="flex items-center gap-0.5">
              <button className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800/60 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
              </button>
              <button className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800/60 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
              </button>
              <button className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800/60 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x1="9" y1="9" y2="9.01"/><line x1="15" x1="15" y1="9" y2="9.01"/></svg>
              </button>
            </div>

            {/* Input field */}
            <input 
              type="text" 
              placeholder="Message..." 
              className="flex-1 bg-zinc-800/50 hover:bg-zinc-800/70 border border-zinc-700/20 focus:border-zinc-600 focus:bg-zinc-800/80 text-sm h-11 px-4 rounded-xl outline-none transition placeholder-zinc-500 text-white"
            />

            {/* Send Button */}
            <button className="h-11 px-5 bg-blue-600 hover:bg-blue-500 font-semibold text-sm rounded-xl text-white transition flex items-center gap-1.5 shadow-md shadow-blue-600/10">
              <span>Send</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x1="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

