# 🎨 BitLens

> "세상을 16비트 렌즈로 투영하다"
> Transform high-resolution images into artistic pixel art with retro palettes

BitLens is a Micro SaaS that converts your photos into beautiful pixelated art using intentional downsampling and retro color palettes.

## ✨ Features

- **🎮 Instant Pixel Conversion**: Generate pixel art in under 3 seconds
- **🖼️ Multiple Resolutions**: Choose from 64px, 128px, or 256px presets
- **🎨 Retro Palettes**:
  - Classic Grey (Game Boy style)
  - Greenish (Original Game Boy green)
  - Cyberpunk (16-bit neon aesthetics)
  - Nostalgia (Vintage faded colors)
- **⚡ 100% Client-Side**: All processing happens in your browser (zero server costs)
- **📱 SNS Ready**: Download in 1080px for perfect social media sharing
- **🕹️ Retro UI**: Built with NES.css for authentic 8-bit game aesthetics

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see BitLens in action.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: NES.css + Tailwind CSS
- **Processing**: HTML5 Canvas API
- **Font**: Press Start 2P (Google Fonts)
- **Deployment**: Vercel

## 📖 How It Works

1. **Upload**: Drag & drop or select an image
2. **Pixelate**: Choose your desired resolution (64px/128px/256px)
3. **Stylize**: Pick a retro color palette
4. **Download**: Get your pixel art upscaled to 1080px for social sharing

All processing happens in your browser using Canvas API for pixel manipulation and color quantization algorithms to map colors to retro palettes.

## 🎯 MVP Goals

- ✅ Core pixel conversion engine
- ✅ Multiple resolution presets
- ✅ Retro color palettes
- ✅ Client-side processing
- ✅ High-quality downloads (1080px)
- ✅ Retro UI with NES.css

## 📝 License

MIT

## 🙏 Credits

Made with 💙 by the BitLens team
