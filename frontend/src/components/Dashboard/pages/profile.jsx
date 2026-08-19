import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {

  const [fetchUserData, setfetchUserData] = useState('')

  useEffect(()=>{
    const  fetchUserData = async()=>{
      try{
        const res = await axios.get("/api/v1/auth/current-user", {
          withCredentials: true,
        })
        setfetchUserData(res.data)
      }catch(error){
        console.log(error);
        
      }
    }
    fetchUserData()
  }, [])
  const user = {
    name: fetchUserData?.data?.fullName,
    username: fetchUserData?.data?.username,
    email: fetchUserData?.data?.email,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    banner:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4 md:px-0">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="h-48 w-full">
          <img
            src={user.banner}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-16 mb-6 text-center sm:text-left">
            <div className="relative shrink-0">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover ring-4 ring-zinc-900 shadow-xl"
              />
            </div>

            <div className="mt-2 sm:mt-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {user.name}
              </h2>
              <p className="text-sm sm:text-base font-medium text-blue-400 mt-0.5">
                {user.username}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
            <div className="bg-zinc-800/50 rounded-2xl p-4 border border-zinc-800">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                Full Name
              </p>
              <p className="text-base font-semibold text-white">{user.name}</p>
            </div>

            <div className="bg-zinc-800/50 rounded-2xl p-4 border border-zinc-800">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                Username
              </p>
              <p className="text-base font-semibold text-white">
                {user.username}
              </p>
            </div>

            <div className="sm:col-span-2 bg-zinc-800/50 rounded-2xl p-4 border border-zinc-800">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                Email Address
              </p>
              <p className="text-base font-semibold text-zinc-200">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
