import React, { useState } from "react";
import { Search, Plus, Smile, SendHorizontal } from "lucide-react";

const users = [{ name: "Nikhil" }, { name: "Himanshika" }];

const Chat = () => {
  const [selectedUser, setselectedUser] = useState(users[0]);

  return (
    <div className="flex h-full gap-4 text-zinc-100 font-sans">
      {/* Sidebar List */}
      <div className="bg-[#171719] w-[30%] h-full rounded-xl flex flex-col p-4 divide-y divide-dashed divide-zinc-800">
        <div className="flex flex-col gap-3 pb-4">
          <div className="text-2xl font-bold">Message</div>
          <div className="flex flex-col relative">
            <Search
              className="absolute z-4 top-[8px] left-[10px]"
              size={"18px"}
            />
            <input
              type="text"
              placeholder="Search"
              className="w-full h-9 p-3 pl-12 rounded-lg bg-[#232324]"
            />
          </div>
        </div>
        <div className="pt-4 flex flex-col gap-3">
          {users.map((user) => (
            <div
              key={user.name}
              onClick={() => setselectedUser(user)}
              className={`w-full h-16 rounded-2xl flex items-center p-3 gap-3 cursor-pointer transition-all duration-200 ${
                selectedUser?.name === user.name
                  ? "bg-zinc-800 border border-zinc-700"
                  : "bg-zinc-800/40 hover:bg-zinc-800/60 border border-zinc-800/80"
              }`}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 ring-blue-500/20">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Profile"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold truncate text-white">
                  {user.name}
                </span>
                <span className="text-xs text-zinc-400 truncate">Online</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Chat Window */}
      <div className="bg-[#171719] w-[70%] h-full rounded-xl relative overflow-hidden">
        {selectedUser ? (
          <>
            {/* Header Navbar */}
            <div className="bg-[#232324]/60 border-b border-zinc-800/80 w-full h-18 absolute flex items-center px-4 gap-3 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-blue-500/20">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Profile"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold truncate text-white">
                  {selectedUser.name}
                </span>
                <span className="text-xs text-green-400 font-medium">Online</span>
              </div>
            </div>

            <div className="h-full w-full pb-22 p pl-4 pr-4 flex flex-col gap-3 overflow-x-auto">
              <div className="h-auto w-fit  p-2 rounded-l-xl rounded-t-xl ml-auto bg-[#155EFD]">Hello Nikhil1</div>
              <div className="h-auto w-fit p-2 rounded-r-xl rounded-b-xl mr-auto bg-[#252427]">Hello Nikhil2</div>
              <div className="h-auto w-fit p-2 rounded-r-xl rounded-b-xl mr-auto bg-[#252427]">Hello Nikhil2ijhcvdkjfbghekjfvbh</div>
              <div className="h-auto w-fit  p-2 rounded-l-xl rounded-t-xl ml-auto bg-[#155EFD]">Hello Nikhil1</div>
              <div className="h-auto w-fit p-2 rounded-r-xl rounded-b-xl mr-auto bg-[#252427]">Hello Nikhil2</div>
              <div className="h-auto w-fit p-2 rounded-r-xl rounded-b-xl mr-auto bg-[#252427]">Hello Nikhil2ijhcvdkjfbghekjfvbh</div>
              <div className="h-auto w-fit  p-2 rounded-l-xl rounded-t-xl ml-auto bg-[#155EFD]">Hello Nikhil1</div>
              <div className="h-auto w-fit p-2 rounded-r-xl rounded-b-xl mr-auto bg-[#252427]">Hello Nikhil2</div>
              <div className="h-auto w-fit p-2 rounded-r-xl rounded-b-xl mr-auto bg-[#252427]">Hello Nikhil2ijhcvdkjfbghekjfvbh</div>
              <div className="h-auto w-fit  p-2 rounded-l-xl rounded-t-xl ml-auto bg-[#155EFD]">Hello Nikhil1</div>
              <div className="h-auto w-fit p-2 rounded-r-xl rounded-b-xl mr-auto bg-[#252427]">Hello Nikhil2</div>
              <div className="h-auto w-fit p-2 rounded-r-xl rounded-b-xl mr-auto bg-[#252427]">Hello Nikhil2ijhcvdkjfbghekjfvbh</div>
              <div className="h-auto w-fit  p-2 rounded-l-xl rounded-t-xl ml-auto bg-[#155EFD]">Hello Nikhil1</div>
              <div className="h-auto w-fit p-2 rounded-r-xl rounded-b-xl mr-auto bg-[#252427]">Hello Nikhil2</div>
              <div className="h-auto w-fit p-2 rounded-r-xl rounded-b-xl mr-auto bg-[#252427]">Hello Nikhil2ijhcvdkjfbghekjfvbh</div>
              <div className="h-auto w-fit p-2 rounded-r-xl rounded-b-xl mr-auto bg-[#252427]">kya haal hai</div>
              <div className="h-auto w-fit p-2 rounded-r-xl rounded-b-xl mr-auto bg-[#252427]">sab badhiya</div>
            </div>

            {/* Bottom Message Input Bar */}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-[#171719] border-t border-zinc-800/40">
              <div className="flex items-center gap-3 bg-[#232324] border border-zinc-800/80 focus-within:border-zinc-700/80 rounded-2xl px-4 py-2.5 transition-all duration-200">
                <button className="text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer shrink-0">
                  <Plus size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Message..."
                  className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none min-w-0"
                />
                <button className="text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer shrink-0">
                  <Smile size={20} />
                </button>
                <button className="text-blue-500 hover:text-blue-400 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0 ml-1">
                  <SendHorizontal size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-400">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
