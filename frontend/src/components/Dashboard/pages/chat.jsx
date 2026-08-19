import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import { Search, Plus, Smile, SendHorizontal, ArrowLeft } from "lucide-react";
import { io } from "socket.io-client";

const initialUsers = [];

const Chat = () => {
  const [otherUser, setotherUser] = useState(null);
  const [CurrentUser, setCurrentUser] = useState(null);
  const [selectedUser, setselectedUser] = useState(initialUsers[0]);
  const [query, setQuery] = useState("");
  const [search, setsearch] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  const socket = useMemo(
    () =>
      io(import.meta.env.VITE_API_BASE_URL || "http://localhost:3000", {
        withCredentials: true,
      }),
    [],
  );

  useEffect(() => {
    socket.on("room_joined", (data) => {
      setMessages(data.messages || []);
    });

    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("room_joined");
      socket.off("message");
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    axios
      .get("/api/v1/auth/current-user", { withCredentials: true })
      .then((res) => {
        setCurrentUser(res.data.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSearch = (e) => {
    e.preventDefault();
    FetchUser();
  };

  const Userchat = JSON.parse(localStorage.getItem("users") || "[]");

  const clickUser = async (Username) => {
    const localUsers = JSON.parse(localStorage.getItem("users") || "[]");

    if (!localUsers.some((u) => u.name === Username)) {
      localUsers.push({ name: Username });
      localStorage.setItem("users", JSON.stringify(localUsers));
    }

    setsearch([]);
    setQuery("");

    try {
      const userRes = await axios.get(`/api/v1/post/search/${Username}`, {
        withCredentials: true,
      });
      const recipientId =
        userRes.data.data.otherUser._id || userRes.data.data.otherUser.id;
      setotherUser(recipientId);

      const chatroomRes = await axios.post(
        "/api/v1/room/chatroom",
        { userId2: recipientId },
        { withCredentials: true },
      );
      const roomId = chatroomRes.data.data._id;
      setCurrentRoomId(roomId);

      socket.emit("join_room", { userId2: recipientId });

      setselectedUser({ name: Username });
    } catch (error) {}
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !currentRoomId) return;

    socket.emit("sendMessage", {
      roomId: currentRoomId,
      message: messageInput.trim(),
    });

    setMessageInput("");
  };

  const FetchUser = async () => {
    try {
      const res = await axios.get(`/api/v1/post/searchUsername?q=${query}`, {
        withCredentials: true,
      });
      setsearch(res.data.data);
    } catch (error) {}
  };

  const handleBackToList = () => {
    setselectedUser(null);
    setotherUser(null);
    setCurrentRoomId(null);
  };

  return (
    <div className="flex h-full gap-4 text-zinc-100 font-sans">
      <div className={`bg-[#171719] rounded-xl flex flex-col p-4 divide-y divide-dashed divide-zinc-800 ${
        selectedUser ? "hidden md:flex md:w-[35%] lg:w-[30%]" : "w-full md:w-[35%] lg:w-[30%]"
      }`}>
        <div className="flex flex-col gap-3 pb-4">
          <div className="text-2xl font-bold">Message</div>
          <div className="flex flex-col relative gap-2 items-center">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative w-full">
                <Search
                  className="absolute z-4 top-[9px] left-[10px] text-zinc-400"
                  size={"18px"}
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search User"
                  className="w-full h-9 p-3 pl-12 rounded-lg bg-[#232324] text-sm text-white placeholder-zinc-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition shadow-lg shrink-0 mt-3"
              >
                Search
              </button>
            </form>
            <div className="h-auto w-full rounded-2xl">
              {search.map((user) => (
                <div
                  key={user.username}
                  onClick={() => clickUser(user.username)}
                  className="w-full h-16 rounded-2xl flex items-center p-3 gap-3 cursor-pointer transition-all duration-200 hover:bg-zinc-800/40"
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
                      {user.username}
                    </span>
                    <span className="text-xs text-zinc-400 truncate">
                      Click to Chat
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-4 flex flex-col gap-3 overflow-y-auto flex-1">
          {Userchat.map((user) => (
            <div
              key={user.name}
              onClick={() => clickUser(user.name)}
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

      <div className={`bg-[#171719] rounded-xl relative overflow-hidden flex-1 ${
        !selectedUser ? "hidden md:block md:w-[65%] lg:w-[70%]" : "w-full md:w-[65%] lg:w-[70%]"
      }`}>
        {selectedUser ? (
          <>
            <div className="bg-[#232324]/60 border-b border-zinc-800/80 w-full h-18 absolute flex items-center px-4 gap-3 backdrop-blur-sm z-10">
              <button
                onClick={handleBackToList}
                className="md:hidden p-2 -ml-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Back to Messages"
              >
                <ArrowLeft size={20} />
              </button>
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
                <span className="text-xs text-green-400 font-medium">
                  Online
                </span>
              </div>
            </div>

            <div className="h-full w-full pb-22 pt-20 pl-4 pr-4 flex flex-col gap-3 overflow-y-auto">
              {messages.map((msg) => {
                const isMe = msg.userId === CurrentUser?._id;
                return (
                  <div
                    key={msg._id}
                    className={`h-auto w-fit max-w-[70%] p-2.5 rounded-xl ${
                      isMe
                        ? "ml-auto bg-[#155EFD] text-white rounded-tr-none"
                        : "mr-auto bg-[#252427] text-zinc-100 rounded-tl-none"
                    }`}
                  >
                    {msg.message}
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <div className="absolute bottom-0 left-0 w-full p-4 bg-[#171719] border-t border-zinc-800/40">
              <div className="flex items-center gap-3 bg-[#232324] border border-zinc-800/80 focus-within:border-zinc-700/80 rounded-2xl px-4 py-2.5 transition-all duration-200">
                <button className="text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer shrink-0">
                  <Plus size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                  className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none min-w-0"
                />
                <button className="text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer shrink-0">
                  <Smile size={20} />
                </button>
                <button
                  onClick={handleSendMessage}
                  className="text-blue-500 hover:text-blue-400 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0 ml-1"
                >
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
