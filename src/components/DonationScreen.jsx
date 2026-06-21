import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, Heart, Beer } from 'lucide-react';


export default function DonationScreen({ onBack }) {
  const [copied, setCopied] = useState(false);
  const pixKey = 'doacao@calculabreja.com.br'; // Mock Pix key (developer's email)

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="donation-container glass-panel">
      <header className="donation-header">
        <button className="btn-icon" onClick={onBack} aria-label="Voltar para calculadora">
          <ArrowLeft size={24} />
        </button>
        <h2>Doe uma Cerveja</h2>
      </header>

      <main className="donation-body">
        <div className="heart-beer-icon">
          <Beer size={40} className="beer-glow" />
          <Heart size={20} className="heart-float" />
        </div>

        <h3>Pague uma rodada! 🍻</h3>
        <p className="motivation-text">
          Se a <strong>CalculaBreja</strong> te ajudou a economizar no churrasco ou no bar, que tal apoiar o desenvolvedor pagando uma rodada de cerveja?
        </p>

        <div className="qr-container">
          {/* Beautifully stylized mock Pix QR Code */}
          <svg className="pix-qr-svg" viewBox="0 0 200 200" width="180" height="180">
            {/* Background */}
            <rect width="200" height="200" rx="16" fill="#ffffff" />
            {/* QR Pattern (stylized lines/rects) */}
            <rect x="20" y="20" width="40" height="40" fill="#1c1917" />
            <rect x="25" y="25" width="30" height="30" fill="#ffffff" />
            <rect x="30" y="30" width="20" height="20" fill="#1c1917" />

            <rect x="140" y="20" width="40" height="40" fill="#1c1917" />
            <rect x="145" y="25" width="30" height="30" fill="#ffffff" />
            <rect x="150" y="30" width="20" height="20" fill="#1c1917" />

            <rect x="20" y="140" width="40" height="40" fill="#1c1917" />
            <rect x="25" y="145" width="30" height="30" fill="#ffffff" />
            <rect x="30" y="150" width="20" height="20" fill="#1c1917" />

            {/* Random QR Grid Pixels */}
            <rect x="75" y="20" width="10" height="20" fill="#1c1917" />
            <rect x="90" y="35" width="15" height="10" fill="#1c1917" />
            <rect x="110" y="20" width="20" height="15" fill="#1c1917" />
            <rect x="75" y="50" width="10" height="10" fill="#1c1917" />
            <rect x="95" y="55" width="25" height="15" fill="#1c1917" />
            
            <rect x="20" y="75" width="20" height="10" fill="#1c1917" />
            <rect x="35" y="90" width="15" height="20" fill="#1c1917" />
            <rect x="20" y="120" width="10" height="10" fill="#1c1917" />
            
            <rect x="140" y="75" width="15" height="15" fill="#1c1917" />
            <rect x="165" y="80" width="15" height="10" fill="#1c1917" />
            <rect x="140" y="100" width="20" height="10" fill="#1c1917" />
            <rect x="150" y="120" width="10" height="15" fill="#1c1917" />

            <rect x="75" y="140" width="20" height="10" fill="#1c1917" />
            <rect x="80" y="155" width="15" height="25" fill="#1c1917" />
            <rect x="110" y="140" width="10" height="15" fill="#1c1917" />
            <rect x="105" y="165" width="20" height="15" fill="#1c1917" />

            <rect x="140" y="145" width="10" height="10" fill="#1c1917" />
            <rect x="160" y="150" width="20" height="10" fill="#1c1917" />
            <rect x="150" y="170" width="15" height="10" fill="#1c1917" />

            {/* Central Pix Logo */}
            <circle cx="100" cy="100" r="22" fill="#ffffff" />
            <circle cx="100" cy="100" r="18" fill="#77cca4" />
            {/* PIX Chevron shape */}
            <path d="M93 94 L100 87 L107 94 L100 101 Z" fill="#326e5d" />
            <path d="M93 106 L100 99 L107 106 L100 113 Z" fill="#326e5d" />
          </svg>
        </div>

        <div className="pix-id-box">
          <span className="pix-label">Chave Pix</span>
          <div className="pix-input-wrapper">
            <input type="text" readOnly value={pixKey} className="pix-key-input" />
            <button className={`btn-copy ${copied ? 'copied' : ''}`} onClick={handleCopy}>
              {copied ? <Check size={18} /> : <Copy size={18} />}
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        <div className="developer-box">
          <span className="pix-label">Desenvolvedor</span>
          <div className="dev-card">
            <span className="dev-name">Joelton Lino Luz</span>
            <a 
              href="https://www.linkedin.com/in/joeltonluz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-linkedin"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </main>

      <style>{`
        .donation-container {
          padding: 24px;
          max-width: 480px;
          margin: 20px auto;
          text-align: center;
          animation: fadeInUp 0.5s ease-out;
        }

        .donation-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .donation-header h2 {
          font-size: 1.5rem;
          margin: 0;
        }

        .btn-icon {
          background: transparent;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color var(--transition-fast);
        }

        .btn-icon:hover {
          background-color: var(--primary-light);
        }

        .donation-body {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .heart-beer-icon {
          position: relative;
          margin-bottom: 16px;
          color: var(--primary);
        }

        .beer-glow {
          animation: float 3s infinite ease-in-out;
        }

        .heart-float {
          position: absolute;
          top: -8px;
          right: -8px;
          color: #ef4444;
          animation: float 2.5s infinite ease-in-out;
          animation-delay: 0.5s;
        }

        .donation-body h3 {
          font-size: 1.3rem;
          margin-bottom: 8px;
        }

        .motivation-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .qr-container {
          padding: 12px;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border);
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pix-qr-svg {
          display: block;
        }

        .pix-id-box {
          width: 100%;
          text-align: left;
        }

        .pix-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 6px;
          display: block;
        }

        .pix-input-wrapper {
          display: flex;
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          background-color: var(--bg-primary);
        }

        .pix-key-input {
          flex: 1;
          border: none;
          background: transparent;
          padding: 12px;
          color: var(--text-primary);
          font-size: 0.9rem;
          font-family: var(--font-body);
        }

        .pix-key-input:focus {
          outline: none;
        }

        .btn-copy {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0 16px;
          background-color: var(--primary);
          color: #ffffff;
          border: none;
          cursor: pointer;
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.85rem;
          transition: background-color var(--transition-fast);
        }

        .btn-copy:hover {
          background-color: var(--primary-hover);
        }

        .btn-copy.copied {
          background-color: var(--accent);
        }

        .developer-box {
          width: 100%;
          text-align: left;
          margin-top: 24px;
        }

        .dev-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          border: 1px solid var(--border);
          border-radius: 12px;
          background-color: var(--bg-primary);
          gap: 12px;
          flex-wrap: wrap;
        }

        .dev-name {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 1rem;
          color: var(--text-primary);
        }

        .btn-linkedin {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #0077b5;
          color: #ffffff;
          border: none;
          padding: 8px 14px;
          border-radius: 8px;
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.85rem;
          text-decoration: none;
          transition: background-color var(--transition-fast), transform var(--transition-fast);
        }

        .btn-linkedin:hover {
          background-color: #005582;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}
