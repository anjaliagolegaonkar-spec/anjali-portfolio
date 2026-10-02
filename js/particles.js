/**
 * Living Developer Lab Background Engine
 * Renders floating syntax fragments, terminal symbols, subtle code dust, and coordinate crosshairs.
 */

class DigitalLabBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.fragments = [];
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 160 };
    this.animFrameId = null;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Real syntax snippets from Anjali's toolkit
    this.codeSnippets = [
      'def create(): return "ideas"',
      '<div class="future">',
      '</div>',
      'const build = () => {}',
      'SELECT * FROM projects;',
      'while (learning): build()',
      'import creativity',
      'esp32.readSensors()',
      'nlp.analyze(text)',
      '{ status: 200 }',
      'async function innovate()',
      'git commit -m "growth"',
      'Array.from(passion)',
      'cursor.execute(query)',
      'const future = true;',
      'ESP32.begin(115200);',
      'System.out.println("Hello");',
      'class AnjaliLab:',
      'npm run build',
      'lambda x: x.scale()'
    ];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    this.createElements();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * (window.devicePixelRatio || 1);
    this.canvas.height = this.height * (window.devicePixelRatio || 1);
    this.ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

    if (this.fragments.length > 0) {
      this.createElements();
    }
  }

  createElements() {
    this.fragments = [];
    this.particles = [];

    const isMobile = this.width < 768;
    const fragmentCount = isMobile ? 8 : 16;
    const particleCount = isMobile ? 25 : 55;

    // Create floating code snippets
    for (let i = 0; i < fragmentCount; i++) {
      const text = this.codeSnippets[i % this.codeSnippets.length];
      this.fragments.push({
        text: text,
        x: Math.random() * (this.width - 150) + 50,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(Math.random() * 0.35 + 0.15), // Slow upward drift
        fontSize: Math.random() * 2 + 11,
        colorType: i % 4, // 0: violet, 1: cyan, 2: peach, 3: white
        baseAlpha: Math.random() * 0.12 + 0.05,
        alpha: 0.1
      });
    }

    // Create subtle cyber dust
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.4 + 0.2),
        size: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.3 + 0.1,
        color: i % 3 === 0 ? '#8b5cf6' : (i % 3 === 1 ? '#06b6d4' : '#fb7185')
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (this.isReducedMotion) {
      // Draw static fragments
      this.ctx.font = '12px "JetBrains Mono", monospace';
      for (let f of this.fragments) {
        this.ctx.fillStyle = 'rgba(139, 92, 246, 0.08)';
        this.ctx.fillText(f.text, f.x, f.y);
      }
      return;
    }

    // 1. Render & Update Code Fragments
    for (let i = 0; i < this.fragments.length; i++) {
      let f = this.fragments[i];

      f.x += f.vx;
      f.y += f.vy;

      if (f.y < -30) {
        f.y = this.height + 30;
        f.x = Math.random() * (this.width - 150) + 50;
      }
      if (f.x < -100) f.x = this.width + 50;
      if (f.x > this.width + 50) f.x = -100;

      // Mouse deflection
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - f.x;
        const dy = this.mouse.y - f.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouse.radius) {
          const force = (1 - dist / this.mouse.radius) * 1.2;
          f.x -= (dx / dist) * force;
          f.y -= (dy / dist) * force;
        }
      }

      this.ctx.font = `${f.fontSize}px "JetBrains Mono", monospace`;
      
      let colorStr = 'rgba(139, 92, 246, ';
      if (f.colorType === 1) colorStr = 'rgba(6, 182, 212, ';
      if (f.colorType === 2) colorStr = 'rgba(251, 113, 133, ';
      if (f.colorType === 3) colorStr = 'rgba(248, 250, 252, ';

      this.ctx.fillStyle = colorStr + f.baseAlpha + ')';
      this.ctx.fillText(f.text, f.x, f.y);
    }

    // 2. Render Cyber Dust Particles
    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.y < -10) {
        p.y = this.height + 10;
        p.x = Math.random() * this.width;
      }
      if (p.x < -10) p.x = this.width + 10;
      if (p.x > this.width + 10) p.x = -10;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fill();
      this.ctx.globalAlpha = 1.0;
    }

    this.animFrameId = requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new DigitalLabBackground('digital-lab-canvas');
});
