import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Notfound = () => {
  const navigate = useNavigate();
  const visorRef = useRef(null);
  const cordRef = useRef(null);

  useEffect(() => {
    // Draw visor
    const visorCanvas = visorRef.current;
    if (visorCanvas) {
      const ctx = visorCanvas.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(5, 45);
        ctx.bezierCurveTo(15, 64, 45, 64, 55, 45);
        ctx.lineTo(55, 20);
        ctx.bezierCurveTo(55, 15, 50, 10, 45, 10);
        ctx.lineTo(15, 10);
        ctx.bezierCurveTo(15, 10, 5, 10, 5, 20);
        ctx.lineTo(5, 45);

        ctx.fillStyle = "#2f3640";
        ctx.strokeStyle = "#f5f6fa";
        ctx.fill();
        ctx.stroke();
      }
    }
  }, []);

  useEffect(() => {
    // Draw cord
    const cordCanvas = cordRef.current;
    if (!cordCanvas) return;
    const ctx = cordCanvas.getContext("2d");
    if (!ctx) return;

    let y1 = 160;
    let y2 = 100;
    let y3 = 100;

    let y1Forward = true;
    let y2Forward = false;
    let y3Forward = true;

    let animationFrameId;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, cordCanvas.width, cordCanvas.height);

      ctx.beginPath();
      ctx.moveTo(130, 170);
      ctx.bezierCurveTo(250, y1, 345, y2, 400, y3);

      ctx.strokeStyle = "white";
      ctx.lineWidth = 8;
      ctx.stroke();

      if (y1 === 100) {
        y1Forward = true;
      }
      if (y1 === 300) {
        y1Forward = false;
      }
      if (y2 === 100) {
        y2Forward = true;
      }
      if (y2 === 310) {
        y2Forward = false;
      }
      if (y3 === 100) {
        y3Forward = true;
      }
      if (y3 === 317) {
        y3Forward = false;
      }

      y1Forward ? (y1 += 1) : (y1 -= 1);
      y2Forward ? (y2 += 1) : (y2 -= 1);
      y3Forward ? (y3 += 1) : (y3 -= 1);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleLogin = () => {
    navigate("/signin");
  };

  const handleContact = () => {
    navigate("/");
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[linear-gradient(90deg,rgba(47,54,64,1)_23%,rgba(24,27,32,1)_100%)] select-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');
        
        @keyframes shimmer {
          from {
            opacity: 0;
          }
          to {
            opacity: 0.7;
          }
        }
        
        .animate-shimmer {
          animation: shimmer 1.5s infinite alternate;
        }
      `}</style>

      {/* Moon */}
      <div className="absolute top-[-100px] left-[-300px] w-[900px] h-[900px] rounded-full bg-[linear-gradient(90deg,rgba(208,208,208,1)_48%,rgba(145,145,145,1)_100%)] shadow-[0_0_30px_-4px_rgba(0,0,0,0.5)]"></div>
      
      {/* Craters */}
      <div className="absolute rounded-full bg-[linear-gradient(90deg,rgba(122,122,122,1)_38%,rgba(195,195,195,1)_100%)] opacity-60 top-[250px] left-[500px] w-[60px] h-[180px]"></div>
      <div className="absolute rounded-full bg-[linear-gradient(90deg,rgba(122,122,122,1)_38%,rgba(195,195,195,1)_100%)] opacity-60 top-[650px] left-[340px] w-[40px] h-[80px] rotate-[55deg]"></div>
      <div className="absolute rounded-full bg-[linear-gradient(90deg,rgba(122,122,122,1)_38%,rgba(195,195,195,1)_100%)] opacity-60 top-[-20px] left-[40px] w-[65px] h-[120px] rotate-[250deg]"></div>

      {/* Stars */}
      <div className="absolute w-[5px] h-[5px] rounded-full bg-gray-400 rotate-[250deg] opacity-40 animate-shimmer top-[40%] left-[50%]" style={{ animationDelay: "1s" }}></div>
      <div className="absolute w-[5px] h-[5px] rounded-full bg-gray-400 rotate-[250deg] opacity-40 animate-shimmer top-[60%] left-[90%]" style={{ animationDelay: "3s" }}></div>
      <div className="absolute w-[5px] h-[5px] rounded-full bg-gray-400 rotate-[250deg] opacity-40 animate-shimmer top-[10%] left-[70%]" style={{ animationDelay: "2s" }}></div>
      <div className="absolute w-[5px] h-[5px] rounded-full bg-gray-400 rotate-[250deg] opacity-40 animate-shimmer top-[90%] left-[40%]" style={{ animationDelay: "0s" }}></div>
      <div className="absolute w-[5px] h-[5px] rounded-full bg-gray-400 rotate-[250deg] opacity-40 animate-shimmer top-[20%] left-[30%]" style={{ animationDelay: "0.5s" }}></div>

      {/* Error Info */}
      <div className="absolute left-[100px] top-[400px] -translate-y-[60%] font-['Righteous',cursive] text-[#363e49]">
        <div className="text-[10em] leading-none">404</div>
        <div className="text-[2em] leading-normal">Hmmm...</div>
        <div className="text-[1em] opacity-50">It looks like one of the developers fell asleep</div>
        <button
          onClick={handleLogin}
          className="min-w-[7em] mt-[3em] mr-[0.5em] py-[0.5em] px-[2em] outline-none border-2 border-[#e67e22] bg-[#e67e22] text-white rounded-[8em] cursor-pointer transition-all duration-200 text-[0.75em] font-['Righteous',cursive] hover:shadow-[0_0_8px_0_rgba(0,0,0,0.5)] hover:text-white"
        >
          LOGIN
        </button>
        <button
          onClick={handleContact}
          className="min-w-[7em] mt-[3em] mr-[0.5em] py-[0.5em] px-[2em] outline-none border-2 border-[#2f3640] bg-transparent text-[#576375] rounded-[8em] cursor-pointer transition-all duration-200 text-[0.75em] font-['Righteous',cursive] hover:text-[#21252c] hover:border-[#21252c]"
        >
          CONTACT
        </button>
      </div>

      {/* Astronaut */}
      <div className="absolute w-[185px] h-[300px] left-[70%] top-[50%] -translate-x-1/2 -translate-y-1/2 rotate-[20deg] scale-[1.2]">
        <div className="absolute top-[90px] left-[47px] w-[86px] h-[90px] bg-[#bfbfbf] rounded-[8px]"></div>
        <div className="absolute top-[115px] left-[55px] w-[70px] h-[80px] bg-[#e6e6e6] rounded-[8px]"></div>
        <div className="absolute top-[140px] left-[68px] w-[45px] h-[25px] bg-[#d9d9d9] rounded-[6px]"></div>
        <div className="absolute top-[127px] left-[9px] w-[65px] h-[20px] bg-[#e6e6e6] rounded-[8px] rotate-[-30deg]"></div>
        <div className="absolute top-[102px] left-[7px] w-[20px] h-[45px] bg-[#e6e6e6] rounded-[8px] rotate-[-12deg] rounded-t-[8em]"></div>
        <div className="absolute top-[113px] left-[100px] w-[65px] h-[20px] bg-[#e6e6e6] rounded-[8px] rotate-[-10deg]"></div>
        <div className="absolute top-[78px] left-[141px] w-[20px] h-[45px] bg-[#e6e6e6] rounded-[8px] rotate-[-10deg] rounded-t-[8em]"></div>
        <div className="absolute top-[110px] left-[21px] w-[10px] h-[6px] bg-[#e6e6e6] rounded-[8em] rotate-[-35deg]"></div>
        <div className="absolute top-[90px] left-[133px] w-[10px] h-[6px] bg-[#e6e6e6] rounded-[8em] rotate-[20deg]"></div>
        <div className="absolute top-[188px] left-[50px] w-[23px] h-[75px] bg-[#e6e6e6] rotate-[10deg]"></div>
        <div className="absolute top-[188px] left-[108px] w-[23px] h-[75px] bg-[#e6e6e6] rotate-[-10deg]"></div>
        <div className="absolute top-[240px] left-[43px] w-[28px] h-[20px] bg-white rotate-[10deg] rounded-[3px] rounded-t-[8em] border-b-4 border-b-[#e67e22]"></div>
        <div className="absolute top-[240px] left-[111px] w-[28px] h-[20px] bg-white rotate-[-10deg] rounded-[3px] rounded-t-[8em] border-b-4 border-b-[#e67e22]"></div>
        <div className="absolute top-[122px] left-[6.5px] w-[21px] h-[4px] bg-[#e67e22] rounded-[8em] rotate-[-15deg]"></div>
        <div className="absolute top-[98px] left-[141px] w-[21px] h-[4px] bg-[#e67e22] rounded-[8em] rotate-[-10deg]"></div>

        {/* Cord (drawn programmatically) */}
        <div className="absolute top-0 left-0 pointer-events-none">
          <canvas ref={cordRef} height="500" width="500"></canvas>
        </div>

        {/* Head */}
        <div className="absolute top-[60px] left-[60px] w-[60px] h-[60px] bg-white rounded-[2em]">
          <canvas ref={visorRef} width="60" height="60" className="absolute top-0 left-0"></canvas>
          <div className="absolute top-[28px] left-[40px] w-[10px] h-[10px] bg-[#7f8fa6] rounded-[2em] opacity-50"></div>
          <div className="absolute top-[40px] left-[38px] w-[5px] h-[5px] bg-[#718093] rounded-[2em] opacity-30"></div>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
