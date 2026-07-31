import React from "react";

const loginpage = () => {
    
  return (
    <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center font-sans text-white">

      <img
        src="LoginB.png"
        alt="Background Image"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />


      <div className="relative z-10 w-full max-w-4xl min-h-[500px] bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row gap-8 mx-4">
        

        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Join the<br/>Future</h1>
          <div className="h-1 w-16 bg-gradient-to-r from-pink-500 to-cyan-400 mb-10 rounded-full"></div>

          <form className="flex flex-col gap-6 w-full max-w-sm">
            <input type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-white/30 pb-2 text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white/50" />
            <input type="email" placeholder="Email" className="w-full bg-transparent border-b border-white/30 pb-2 text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white/50" />
            <input type="password" placeholder="Password" className="w-full bg-transparent border-b border-white/30 pb-2 text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white/50" />
            

            <div className="flex gap-1 mt-1">
              <div className="h-1.5 w-6 bg-pink-500 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.8)]"></div>
              <div className="h-1.5 w-16 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
            </div>


            <div className="flex items-center gap-4 mt-2">
               <span className="text-xs text-white/50 mr-2">continue with</span>

               <svg className="w-5 h-5 fill-current opacity-70 hover:opacity-100 cursor-pointer transition-opacity" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.15 2.95.97 3.83 2.3-3.43 2.12-2.98 6.85.66 8.35-.67 1.52-1.58 3.19-3.14 2.36zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>

               <svg className="w-5 h-5 fill-current opacity-70 hover:opacity-100 cursor-pointer transition-opacity" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>

               <svg className="w-5 h-5 fill-current opacity-70 hover:opacity-100 cursor-pointer transition-opacity" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>
            </div>

            <button type="button" className="w-full mt-4 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-cyan-400 hover:opacity-90 transition-opacity shadow-[0_4px_14px_0_rgba(34,211,238,0.39)]">
              Sign up
            </button>

            <div className="flex items-center gap-2 mt-2 justify-center">
              <input type="checkbox" id="terms" className="accent-pink-500 w-4 h-4 cursor-pointer" />
              <label htmlFor="terms" className="text-xs text-white/70 cursor-pointer hover:text-white transition-colors">I agree to the Terms</label>
            </div>
          </form>
        </div>


        <div className="flex-1 hidden md:flex flex-col items-end justify-between py-2">
          

          <div className="flex items-center bg-black/40 rounded-full pl-6 pr-2 py-1.5 gap-4 border border-white/10 backdrop-blur-md cursor-pointer hover:bg-black/60 transition-colors">
            <span className="text-sm font-semibold">Welcome back</span>
            <div className="bg-pink-500 rounded-full p-2">
               <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6z"/></svg>
            </div>
          </div>


          <div className="bg-black/20 border border-white/10 backdrop-blur-md p-6 rounded-2xl max-w-sm mt-12 mb-8 text-sm text-white/80 leading-relaxed shadow-inner">
            " The reason we're here is to build things that make a difference. We are focused on pushing the boundaries of what is possible. "
            <div className="mt-4 text-white/50 italic font-mono text-xs">
              / Your joint designers *
            </div>
          </div>


          <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 backdrop-blur-md text-xs font-medium text-white/80">
            <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            Secure & Encrypted
          </div>
        </div>

      </div>
    </div>
  );
};

export default loginpage;
