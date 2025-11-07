export default function registerUserTemplate(data:any): string {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to PlusChat</title>
    <style>
      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f9fafb;
        color: #333;
      }

      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      }

      .header {
        background: #0e0e10;
        padding: 32px;
        text-align: center;
        color: white;
      }

      .header h1 {
        margin: 0;
        font-size: 28px;
        letter-spacing: 1px;
      }

      .content {
        padding: 32px;
        text-align: center;
      }

      .content h2 {
        color: #111827;
      }

      .content p {
        font-size: 16px;
        line-height: 1.6;
        color: #4b5563;
      }

      .verify-btn {
        display: inline-block;
        margin-top: 24px;
        padding: 14px 28px;
        background: #0e0e10;
        color: white;
        font-weight: bold;
        text-decoration: none;
        border-radius: 30px;
        transition: opacity 0.3s;
      }

      .verify-btn:hover {
        opacity: 0.9;
      }

      .footer {
        text-align: center;
        font-size: 14px;
        padding: 24px;
        color: #9ca3af;
      }

      .footer a {
        color: #facc15;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Header -->
      <div class="header">
        <h1>Welcome to PlusChat</h1>
      </div>

      <!-- Body -->
      <div class="content">
        <h2>Hey 👋, welcome ${data.username}</h2>
        <p>
          You’ve successfully signed up for <strong>PlusChat</strong> — the best way to connect, chat, and share moments with your friends in real time.
        </p>
        <p>
          Please verify your email address to activate your account and start chatting instantly.
        </p>

        <a href="${data.verifyLink}" class="verify-btn">Verify My Account</a>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>© 2025 PlusChat. All rights reserved.</p>
        <p>
          Need help? <a href="mailto:support@pluschat.com">Contact Support</a>
        </p>
      </div>
    </div>
  </body>
</html>
  `;
}
