// <!-- ADVANCED SOURCE PROTECTION -->

    
      (function () {
        const triggerSecurity = () => {
          // Clear interval if user keeps spamming
          const style = `
        <style>
          :root {
            --bg: #030712;
            --accent: #3b82f6;
            --danger: #ef4444;
            --glass: rgba(15, 23, 42, 0.8);
            --border: rgba(255, 255, 255, 0.1);
          }
          
          body {
            margin: 0;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: radial-gradient(circle at center, #111827 0%, var(--bg) 100%);
            font-family: 'Inter', -apple-system, sans-serif;
            color: #f8fafc;
            overflow: hidden;
          }

          .container {
            position: relative;
            width: 90%;
            max-width: 500px;
            padding: 40px;
            background: var(--glass);
            backdrop-filter: blur(20px);
            border: 1px solid var(--border);
            border-radius: 24px;
            text-align: center;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .shield-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 24px;
            background: rgba(59, 130, 246, 0.1);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--accent);
            animation: pulse 2s infinite;
          }

          .title {
            font-size: 24px;
            font-weight: 800;
            letter-spacing: -0.025em;
            margin-bottom: 12px;
            background: linear-gradient(to right, #fff, #94a3b8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .subtitle {
            font-size: 15px;
            color: #94a3b8;
            line-height: 1.6;
            margin-bottom: 30px;
          }

          .status-badge {
            display: inline-block;
            padding: 6px 12px;
            background: rgba(239, 68, 68, 0.1);
            color: var(--danger);
            border-radius: 100px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            margin-bottom: 20px;
          }

          .info-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
            padding-top: 25px;
            border-top: 1px solid var(--border);
            text-align: left;
          }

          .info-item {
            font-size: 13px;
            color: #64748b;
          }

          .info-item b { color: #e2e8f0; font-weight: 500; }

          .timer-bar {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 4px;
            background: var(--accent);
            width: 100%;
            transform-origin: left;
            animation: shrink 5s linear forwards;
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
          }

          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes shrink {
            from { transform: scaleX(1); }
            to { transform: scaleX(0); }
          }
        </style>
      `;

          document.body.innerHTML = `
        ${style}
        <div class="container">
          <div class="status-badge">Integrity Breach Detected</div>
          <div class="shield-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          </div>
          <h1 class="title">Security Protocol Active</h1>
          <p class="subtitle">
            Source code inspection and developer tools are restricted on this environment. 
            Access has been logged and the session is being terminated.
          </p>
          
          <div class="info-grid">
            <div class="info-item">Provider: <b>YK OFFICIAL SECURITY</b></div>
            <div class="info-item">Administrator: <b>Yegnesh Kamble</b></div>
            <div class="info-item">Contact: <b>Yegnesh7219@gmail.com</b></div>
          </div>

          <div class="timer-bar"></div>
        </div>
      `;

          setTimeout(() => location.reload(), 5000);
        };

        // Event Listeners
        document.addEventListener("contextmenu", (e) => {
          e.preventDefault();
          triggerSecurity();
        });

        document.addEventListener("keydown", (e) => {
          const keys = ["F12", "I", "J", "U", "C"];
          if (
            keys.includes(e.key) ||
            (e.ctrlKey &&
              e.shiftKey &&
              (e.key === "I" || e.key === "J" || e.key === "C")) ||
            (e.ctrlKey && e.key === "U")
          ) {
            e.preventDefault();
            triggerSecurity();
          }
        });

        // Detect DevTools by Window Resize
        setInterval(() => {
          const threshold = 160;
          if (
            window.outerWidth - window.innerWidth > threshold ||
            window.outerHeight - window.innerHeight > threshold
          ) {
            triggerSecurity();
          }
        }, 1000);
      })();
    
