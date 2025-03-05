<div align='center'>

  # ARTIZER AI
  
  **ARTIZER AI** - AI Article Analyzer is a project that utilizes the AI Gemini API to analyze articles. It fetches content from a given URL and provides summaries, sentiment analysis, and keyword extraction.
  
  ---------------
  
  <div align='center'>
  
  # SCREENSHOT
  
  </div>
  <p align="center">
    <a href="1">
      <img src="https://files.catbox.moe/yxymvq.png" alt="1" border="0">
    </a>
  </p>
  </div>

## 🔑 Setup Gemini API

To use this project, you need to obtain an API key from Google AI's Gemini service.

### 1️⃣ Get Your Gemini API Key
1. Go to [Google AI Gemini](https://ai.google.dev/).
2. Sign in with your Google account.
3. Navigate to the **API Keys** section.
4. Generate a new API key and copy it.

### 2️⃣ Configure API Key
1. In the root directory of this project, create a file named `config.json`.
2. Add the following content to the file:

   ```json
   {
       "gemini": {
           "apiKey": "YOUR-GEMINI-API-KEY",
           "apiUrl": "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
       }
   }
   ```

3. Replace `"YOUR-GEMINI-API-KEY"` with the API key you copied earlier.

### ✅ Done! Now, your project is set up to use the Gemini AI API. 🎉

  ---------------
  ## This project can be run in two ways:
  1. **Locally** (on your machine)
  2. **On a VPS** (self-hosted)
  
  
  ## 🖥️ Running Locally
  
  1. **Clone the repository:**
     ```sh
     git clone https://github.com/mistra-dev/artizer-ai.git
     cd artizer-ai
     ```
  
  2. **Install dependencies:**
     ```sh
     npm install
     ```
  
  3. **Start the server:**
     ```sh
     node server.js
     ```
  
  4. **Access the app:**
     ```
     http://localhost:<PORT>
     ```
  
  ---
  
  ## 🌍 Running on a VPS
  
  ### Prerequisites:
  - A VPS with **Node.js (v16+)** installed
  - **PM2** (for process management)
  
  1. **Connect to your VPS** via SSH:
     ```sh
     ssh user@your-vps-ip
     ```
  
  2. **Clone the repository:**
     ```sh
     git clone https://github.com/mistra-dev/artizer-ai.git
     cd artizer-ai
     ```
  
  3. **Install dependencies:**
     ```sh
     npm install
     ```
  
  4. **Run with PM2 (recommended for production):**
     ```sh
     npm install -g pm2
     pm2 start index.js --name artizer-ai
     pm2 save
     pm2 startup
     ```
  
  5. **Access the app via your VPS IP:**
     ```
     http://your-vps-ip:<PORT>
     ```
  
  (Optional) **Use Nginx as a reverse proxy** for a custom domain and SSL setup.
  
  ---------------
  ## License
  This project is licensed under the MIT License.