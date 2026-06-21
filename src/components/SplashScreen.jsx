import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show splash screen for 2.5 seconds, then fade out
    const timer = setTimeout(() => {
      setFadeOut(true);
      const finishTimer = setTimeout(onFinish, 500); // Allow fadeout animation to complete
      return () => clearTimeout(finishTimer);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`splash-container ${fadeOut ? "fade-out" : ""}`}>
      <div className="splash-content">
        <div className="beer-animation-container">
          <div className="beer-glass">
            <div className="beer-foam"></div>
            <div className="beer-liquid"></div>
          </div>
          <div className="bubbles">
            <span className="bubble b1"></span>
            <span className="bubble b2"></span>
            <span className="bubble b3"></span>
            <span className="bubble b4"></span>
          </div>
        </div>
        <h1 className="splash-title">CalculaBreja</h1>
        <p className="splash-subtitle">
          O seu comparador de preço de cerveja 🍻
        </p>
      </div>

      <style>{`
        .splash-container {
          position: fixed;
          inset: 0;
          background-color: var(--bg-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          transition: opacity 0.5s ease-out;
        }
        
        .splash-container.fade-out {
          opacity: 0;
          pointer-events: none;
        }

        .splash-content {
          text-align: center;
          animation: fadeInUp 0.8s ease-out;
        }

        .beer-animation-container {
          position: relative;
          width: 120px;
          height: 160px;
          margin: 0 auto 24px;
        }

        /* Stylized Beer Mug */
        .beer-glass {
          position: relative;
          width: 80px;
          height: 110px;
          border: 6px solid var(--text-primary);
          border-top: none;
          border-radius: 0 0 16px 16px;
          margin: 30px auto 0;
          background: transparent;
          overflow: hidden;
        }

        /* Glass Handle */
        .beer-glass::after {
          content: '';
          position: absolute;
          right: -30px;
          top: 25px;
          width: 25px;
          height: 50px;
          border: 6px solid var(--text-primary);
          border-left: none;
          border-radius: 0 16px 16px 0;
        }

        .beer-liquid {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, #d97706, #fbbf24);
          animation: beer-fill 2s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }

        .beer-foam {
          position: absolute;
          top: 15px;
          left: -10px;
          right: -10px;
          height: 25px;
          background-color: #ffffff;
          border-radius: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          animation: foam-pulse 2s infinite ease-in-out;
          z-index: 2;
        }

        .bubbles {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 80px;
          z-index: 1;
        }

        .bubble {
          position: absolute;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: rise 2.5s infinite ease-in;
        }

        .bubble.b1 { left: 15px; width: 8px; height: 8px; animation-delay: 0.2s; animation-duration: 2.2s; }
        .bubble.b2 { left: 30px; width: 6px; height: 6px; animation-delay: 0.6s; animation-duration: 1.8s; }
        .bubble.b3 { left: 45px; width: 10px; height: 10px; animation-delay: 1.2s; animation-duration: 2.6s; }
        .bubble.b4 { left: 25px; width: 7px; height: 7px; animation-delay: 1.8s; animation-duration: 2s; }

        .splash-title {
          font-size: 2.8rem;
          font-weight: 800;
          letter-spacing: -0.05em;
          background: linear-gradient(135deg, var(--primary) 0%, #b45309 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }

        .splash-subtitle {
          color: var(--text-secondary);
          font-size: 1.1rem;
          font-weight: 400;
        }

        @keyframes rise {
          0% {
            bottom: 0;
            opacity: 0;
            transform: scale(0.5);
          }
          30% {
            opacity: 1;
            transform: scale(1);
          }
          90% {
            opacity: 0.8;
          }
          100% {
            bottom: 90px;
            opacity: 0;
            transform: scale(0.3);
          }
        }
      `}</style>
    </div>
  );
}
