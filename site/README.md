# SYNARC.AI Website

A cutting-edge static website showcasing the SYNARC project - featuring AURA architecture and ψ-System theory for Artificial General Intelligence.

## 🚀 Features

- **Advanced WebGL Visualizations**: Semantic field rendering with custom shaders
- **Interactive Particle Systems**: Real-time neural network visualization
- **Mouse-Reactive Effects**: Dynamic cursor and field interactions
- **Smooth Animations**: GSAP and Framer Motion powered transitions
- **3D Graphics**: Three.js/React Three Fiber for immersive experiences
- **Responsive Design**: Fully adaptive across all devices
- **Static Export**: Optimized for GitHub Pages deployment

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Animation**: GSAP, Framer Motion
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/synarc-ai.git
cd synarc-ai/aura/site

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in browser.

## 🏗️ Building for Production

```bash
# Build static export
npm run build

# Test production build locally
npx serve out
```

## 🚢 Deployment

### GitHub Pages (Automatic)

The site is automatically deployed to GitHub Pages on push to main branch via GitHub Actions.

### Manual Deployment

```bash
# Build and export
npm run export

# The static files will be in the 'out' directory
# Deploy these to any static hosting service
```

## 🎨 Key Components

### Visualizations
- **SemanticField**: WebGL shader-based semantic field visualization
- **ParticleNetwork**: Interactive neural network particle system
- **AuraVisualization**: 3D representation of AURA architecture

### UI Components
- **CustomCursor**: Advanced mouse tracking with particle trails
- **NavigationDots**: Smooth section navigation
- **Hero/Concept/Architecture/Documentation Sections**: Main content areas

### Animations
- Scroll-triggered animations with GSAP ScrollTrigger
- Mouse-reactive effects and field distortions
- Continuous independent animations
- Smooth page transitions

## 🔧 Configuration

### Environment Variables

Create `.env.local` for local development:

```env
# Add any environment variables here
NEXT_PUBLIC_API_URL=your_api_url
```

### Customization

- **Colors**: Edit `tailwind.config.ts` for color scheme
- **Animations**: Modify animation parameters in components
- **Content**: Update text in component files

## 📁 Project Structure

```
site/
├── src/
│   ├── app/              # Next.js app router
│   ├── components/       # React components
│   ├── styles/          # Global styles
│   └── shaders/         # WebGL shaders
├── public/              # Static assets
├── next.config.js       # Next.js configuration
├── tailwind.config.ts   # Tailwind configuration
└── package.json         # Dependencies
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is part of the SYNARC open theoretical framework.

## 🔗 Links

- [AURA Documentation](/docs/aura)
- [ψ-System Theory](/docs/psi-system)
- [GitHub Repository](https://github.com/yourusername/synarc-ai)

---

**SYNARC.AI** - From computation to consciousness, from information to understanding.