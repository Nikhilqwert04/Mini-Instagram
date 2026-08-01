import React, { useState } from "react";
import axios from "axios";

const loginpage = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      const response = await axios.post("/api/v1/admin/adminlogin", {
        email,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center font-sans text-white">
      <img
        src="LoginB.png"
        alt="Background Image"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="relative z-10 w-full max-w-4xl min-h-[500px] bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row gap-8 mx-4">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Mini
            <br />
            Instagram
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-pink-500 to-cyan-400 mb-10 rounded-full"></div>

          <form
            className="flex flex-col gap-6 w-full max-w-sm"
            onSubmit={(e) => {
              SubmitHandler(e);
            }}
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              disabled={loading}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              className="w-full bg-transparent border-b border-white/30 pb-2 text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white/50 disabled:opacity-50"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              disabled={loading}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              className="w-full bg-transparent border-b border-white/30 pb-2 text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white/50 disabled:opacity-50"
            />

            <div className="flex gap-1 mt-1">
              <div className="h-1.5 w-6 bg-pink-500 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.8)]"></div>
              <div className="h-1.5 w-16 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-cyan-400 hover:opacity-90 transition-opacity shadow-[0_4px_14px_0_rgba(34,211,238,0.39)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing up...
                </>
              ) : (
                "Sign up"
              )}
            </button>
          </form>
        </div>

        <div className="flex-1 hidden md:flex flex-col items-end justify-between py-2">
          <div className="flex justify-center gap-2">
            <a
              className="flex items-center bg-black/40 rounded-full pl-6 pr-2 py-1.5 gap-4 border border-white/10 backdrop-blur-md cursor-pointer hover:bg-black/60 transition-colors"
              href="/"
            >
              <span className="text-sm font-semibold">New to Platform</span>
              <div className="bg-pink-500 rounded-full p-2">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6z" />
                </svg>
              </div>
            </a>

            <a
              className="flex items-center bg-black/40 rounded-full pl-6 pr-2 py-1.5 gap-4 border border-white/10 backdrop-blur-md cursor-pointer hover:bg-black/60 transition-colors"
              href="/signin"
            >
              <span className="text-sm font-semibold">Existting User</span>
              <div className="bg-pink-500 rounded-full p-2">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6z" />
                </svg>
              </div>
            </a>
          </div>

          <div className="bg-black/20 border border-white/10 backdrop-blur-md p-6 rounded-2xl max-w-sm mt-12 mb-8 text-sm text-white/80 leading-relaxed shadow-inner">
            " The reason we're here is to build things that make a difference.
            We are focused on pushing the boundaries of what is possible. "
            <div className="mt-4 text-white/50 italic font-mono text-xs">
              / Your joint designers *
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 backdrop-blur-md text-xs font-medium text-white/80">
            <svg
              className="w-4 h-4 opacity-70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              ></path>
            </svg>
            Secure & Encrypted
          </div>
        </div>
      </div>
    </div>
  );
};

export default loginpage;
