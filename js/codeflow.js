/**
 * "CODE FLOW" & "INFINITE POSSIBILITY" (∞) — Living 3D Signature Engine
 * Features a large, elegant, translucent 3D Infinity Ribbon (Lemniscate of Bernoulli),
 * scroll-reactive 3D orientation, flowing learning/tech tokens, and the "A" + ∞ central signature.
 */

class InfiniteCodeFlowEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.mouse = { x: null, y: null, targetX: null, targetY: null, rotX: 0, rotY: 0 };
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 3D Infinity Parametric State
    this.infinity = {
      baseRadius: Math.min(this.width, this.height) * 0.42,
      depth: 180,
      rotX: 0.15,
      rotY: 0.1,
      rotZ: 0.05,
      floatAngle: 0,
      targetRotX: 0.15,
      targetRotY: 0.1,
      targetScale: 1.0,
      currentScale: 1.0,
      opacity: 0.12,
      targetOpacity: 0.12,
      focalLength: 850
    };

    // Scroll tracking & Section topology
    this.scrollProgress = 0;
    this.currentSection = 0;
    this.targetSection = 0;

    // "A" + ∞ Central Intersection Signature State
    this.intersectionA = {
      pulseAngle: 0,
      glowAlpha: 0.35,
      pulseSpeed: 0.025
    };

    // Flowing Tech & Learning Tokens along the ∞ curve
    this.infinityTokens = [
      { text: 'Python', t: 0.05, speed: 0.0016, color: 'rgba(139, 92, 246, ' },
      { text: 'AI / NLP', t: 0.20, speed: 0.0014, color: 'rgba(251, 113, 133, ' },
      { text: 'Learn', t: 0.32, speed: 0.0018, color: 'rgba(6, 182, 212, ' },
      { text: 'IoT / ESP32', t: 0.45, speed: 0.0015, color: 'rgba(139, 92, 246, ' },
      { text: 'Build', t: 0.58, speed: 0.0017, color: 'rgba(251, 113, 133, ' },
      { text: 'SQL', t: 0.70, speed: 0.0016, color: 'rgba(6, 182, 212, ' },
      { text: 'Create', t: 0.82, speed: 0.0019, color: 'rgba(139, 92, 246, ' },
      { text: 'Grow', t: 0.94, speed: 0.0015, color: 'rgba(251, 113, 133, ' }
    ];

    // High-speed luminous pulse packets traveling on the ∞ ribbon
    this.infinityPulses = [];
    for (let i = 0; i < 8; i++) {
      this.infinityPulses.push({
        t: Math.random(),
        speed: Math.random() * 0.0025 + 0.0018,
        length: 0.06,
        color: i % 3 === 0 ? '#8b5cf6' : (i % 3 === 1 ? '#06b6d4' : '#fb7185')
      });
    }

    // Ambient Code Flow data conduits (midground & background)
    this.codePackets = [
      { text: 'def build(): return idea', t: 0.1, speed: 0.0018, pathIndex: 1, color: 'rgba(139, 92, 246, ' },
      { text: 'const create = () => {}', t: 0.45, speed: 0.0015, pathIndex: 2, color: 'rgba(6, 182, 212, ' },
      { text: '<div>', t: 0.7, speed: 0.0022, pathIndex: 0, color: 'rgba(251, 113, 133, ' },
      { text: 'display: flex;', t: 0.25, speed: 0.0016, pathIndex: 3, color: 'rgba(139, 92, 246, ' },
      { text: 'SELECT * FROM projects;', t: 0.6, speed: 0.0014, pathIndex: 4, color: 'rgba(6, 182, 212, ' },
      { text: '{ ... }', t: 0.85, speed: 0.0025, pathIndex: 5, color: 'rgba(251, 113, 133, ' },
      { text: 'esp32.pulse()', t: 0.35, speed: 0.0020, pathIndex: 2, color: 'rgba(139, 92, 246, ' }
    ];

    this.conduitPaths = [];
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = e.clientX;
      this.mouse.targetY = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.targetX = null;
      this.mouse.targetY = null;
    });

    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

    this.initConduits();
    this.handleScroll();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * (window.devicePixelRatio || 1);
    this.canvas.height = this.height * (window.devicePixelRatio || 1);
    this.ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

    this.infinity.baseRadius = Math.min(this.width * 0.45, this.height * 0.55);
    if (this.width < 768) {
      this.infinity.baseRadius = this.width * 0.48;
    }

    this.initConduits();
  }

  handleScroll() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = totalHeight > 0 ? window.scrollY / totalHeight : 0;

    const sections = ['home', 'about', 'education', 'skills', 'projects', 'achievements', 'contact'];
    const scrollY = window.scrollY + window.innerHeight * 0.35;

    for (let i = 0; i < sections.length; i++) {
      const el = document.getElementById(sections[i]);
      if (el) {
        const top = el.offsetTop;
        const h = el.offsetHeight;
        if (scrollY >= top && scrollY < top + h) {
          this.targetSection = i;
          break;
        }
      }
    }
  }

  initConduits() {
    const w = this.width;
    const h = this.height;

    this.conduitPaths = [
      {
        pts: [{ x: -50, y: h * 0.22 }, { x: w * 0.3, y: h * 0.18 }, { x: w * 0.7, y: h * 0.28 }, { x: w + 50, y: h * 0.2 }],
        color: 'rgba(139, 92, 246, 0.12)',
        width: 1.0
      },
      {
        pts: [{ x: -50, y: h * 0.5 }, { x: w * 0.25, y: h * 0.45 }, { x: w * 0.75, y: h * 0.55 }, { x: w + 50, y: h * 0.48 }],
        color: 'rgba(6, 182, 212, 0.15)',
        width: 1.2
      },
      {
        pts: [{ x: -50, y: h * 0.78 }, { x: w * 0.35, y: h * 0.72 }, { x: w * 0.68, y: h * 0.82 }, { x: w + 50, y: h * 0.75 }],
        color: 'rgba(251, 113, 133, 0.12)',
        width: 1.0
      }
    ];
  }

  // 3D Parametric Lemniscate of Bernoulli with 3D Mobius twist
  getInfinityPoint(t, radius, rotX, rotY, rotZ, ribbonOffset = 0) {
    const denom = 1 + Math.sin(t) * Math.sin(t);
    const x0 = (radius * Math.cos(t)) / denom;
    const y0 = (radius * Math.sin(t) * Math.cos(t)) / denom;
    const z0 = this.infinity.depth * Math.sin(2 * t) + ribbonOffset;

    // 3D Rotation Matrix Transformations
    // Rotate around X
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const y1 = y0 * cosX - z0 * sinX;
    const z1 = y0 * sinX + z0 * cosX;

    // Rotate around Y
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const x2 = x0 * cosY + z1 * sinY;
    const z2 = -x0 * sinY + z1 * cosY;

    // Rotate around Z
    const cosZ = Math.cos(rotZ);
    const sinZ = Math.sin(rotZ);
    const x3 = x2 * cosZ - y1 * sinZ;
    const y3 = x2 * sinZ + y1 * cosZ;
    const z3 = z2;

    // Perspective Projection to 2D
    const scale = this.infinity.focalLength / (this.infinity.focalLength + z3);
    const cx = this.width * 0.5;
    const cy = this.height * 0.5;

    return {
      x: cx + x3 * scale * this.infinity.currentScale,
      y: cy + y3 * scale * this.infinity.currentScale,
      z: z3,
      scale: scale
    };
  }

  drawInfinityRibbon(radius, rotX, rotY, rotZ) {
    const steps = 140;
    const pointsRailA = [];
    const pointsRailB = [];

    const ribbonWidth = 14;

    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      const ptA = this.getInfinityPoint(t, radius, rotX, rotY, rotZ, -ribbonWidth);
      const ptB = this.getInfinityPoint(t, radius, rotX, rotY, rotZ, ribbonWidth);
      pointsRailA.push(ptA);
      pointsRailB.push(ptB);
    }

    // 1. Draw Translucent Glass-like Ribbon Fill
    this.ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      if (i === 0) this.ctx.moveTo(pointsRailA[i].x, pointsRailA[i].y);
      else this.ctx.lineTo(pointsRailA[i].x, pointsRailA[i].y);
    }
    for (let i = steps; i >= 0; i--) {
      this.ctx.lineTo(pointsRailB[i].x, pointsRailB[i].y);
    }
    this.ctx.closePath();

    const grad = this.ctx.createLinearGradient(0, 0, this.width, this.height);
    grad.addColorStop(0, `rgba(139, 92, 246, ${this.infinity.opacity * 0.35})`);
    grad.addColorStop(0.5, `rgba(6, 182, 212, ${this.infinity.opacity * 0.35})`);
    grad.addColorStop(1, `rgba(251, 113, 133, ${this.infinity.opacity * 0.25})`);
    this.ctx.fillStyle = grad;
    this.ctx.fill();

    // 2. Draw Translucent Edge Lines
    this.ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      if (i === 0) this.ctx.moveTo(pointsRailA[i].x, pointsRailA[i].y);
      else this.ctx.lineTo(pointsRailA[i].x, pointsRailA[i].y);
    }
    this.ctx.strokeStyle = `rgba(139, 92, 246, ${this.infinity.opacity * 0.8})`;
    this.ctx.lineWidth = 1.1;
    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = 'rgba(139, 92, 246, 0.4)';
    this.ctx.stroke();

    this.ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      if (i === 0) this.ctx.moveTo(pointsRailB[i].x, pointsRailB[i].y);
      else this.ctx.lineTo(pointsRailB[i].x, pointsRailB[i].y);
    }
    this.ctx.strokeStyle = `rgba(6, 182, 212, ${this.infinity.opacity * 0.8})`;
    this.ctx.lineWidth = 1.1;
    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = 'rgba(6, 182, 212, 0.4)';
    this.ctx.stroke();
    this.ctx.shadowBlur = 0;
  }

  drawCentralASignature(cx, cy) {
    this.intersectionA.pulseAngle += this.intersectionA.pulseSpeed;
    const pulse = (Math.sin(this.intersectionA.pulseAngle) + 1) / 2; // 0 to 1
    const alpha = 0.2 + pulse * 0.45;

    this.ctx.save();
    this.ctx.translate(cx, cy);

    // Glowing subtle "A" monogram frame at intersection
    this.ctx.font = '700 22px "Space Grotesk", sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = `rgba(251, 113, 133, ${alpha})`;
    this.ctx.shadowBlur = 18;
    this.ctx.shadowColor = 'rgba(251, 113, 133, 0.7)';
    this.ctx.fillText('A', 0, -1);

    // Subtle micro coordinate indicator
    this.ctx.font = '600 8px "JetBrains Mono", monospace';
    this.ctx.fillStyle = `rgba(6, 182, 212, ${alpha * 0.75})`;
    this.ctx.shadowBlur = 0;
    this.ctx.fillText('∞ . ANJALI', 0, 18);

    this.ctx.restore();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const time = performance.now() * 0.0006;

    // Smooth section transition weight
    this.currentSection += (this.targetSection - this.currentSection) * 0.05;

    // Mouse parallax rotation targets
    if (this.mouse.targetX !== null && !this.isReducedMotion) {
      const normX = (this.mouse.targetX / this.width - 0.5) * 2;
      const normY = (this.mouse.targetY / this.height - 0.5) * 2;
      this.mouse.rotY += (normX * 0.15 - this.mouse.rotY) * 0.05;
      this.mouse.rotX += (-normY * 0.12 - this.mouse.rotX) * 0.05;
    } else {
      this.mouse.rotX *= 0.95;
      this.mouse.rotY *= 0.95;
    }

    // Section-specific 3D Infinity orientation adjustments
    // Hero (0): Wide, subtle floating backdrop behind profile video
    // About (1): Higher presence, structured angle
    // Education (2): Stretches vertically
    // Skills (3): Rotates to showcase twin lobes
    // Projects (4): Fast pulses
    // Achievements (5): Elevated pitch
    // Contact (6): Converges and focuses behind contact / finale
    const sec = this.currentSection;

    let targetRotX = 0.15 + this.mouse.rotX + Math.sin(time * 0.7) * 0.05;
    let targetRotY = 0.08 + this.mouse.rotY + Math.cos(time * 0.5) * 0.05;
    let targetRotZ = (time * 0.05) % (Math.PI * 2);
    let targetScale = 1.0;
    let targetOpacity = 0.12;

    if (sec <= 0.8) {
      targetOpacity = 0.10; // Hero
      targetScale = 1.05;
    } else if (sec > 0.8 && sec <= 1.8) {
      targetOpacity = 0.14; // About
      targetRotX += 0.1;
    } else if (sec > 1.8 && sec <= 2.8) {
      targetOpacity = 0.13; // Education
      targetRotZ += 0.2;
    } else if (sec > 2.8 && sec <= 3.8) {
      targetOpacity = 0.14; // Skills
      targetScale = 1.08;
    } else if (sec > 3.8 && sec <= 4.8) {
      targetOpacity = 0.15; // Projects
      targetRotY += 0.15;
    } else if (sec > 4.8 && sec <= 5.8) {
      targetOpacity = 0.13; // Achievements
      targetRotX += 0.12;
    } else if (sec > 5.8) {
      targetOpacity = 0.16; // Contact / Finale
      targetScale = 0.92;
    }

    this.infinity.rotX += (targetRotX - this.infinity.rotX) * 0.05;
    this.infinity.rotY += (targetRotY - this.infinity.rotY) * 0.05;
    this.infinity.rotZ += (targetRotZ - this.infinity.rotZ) * 0.05;
    this.infinity.currentScale += (targetScale - this.infinity.currentScale) * 0.05;
    this.infinity.opacity += (targetOpacity - this.infinity.opacity) * 0.05;

    // 1. Draw 3D Infinity Ribbon
    this.drawInfinityRibbon(
      this.infinity.baseRadius,
      this.infinity.rotX,
      this.infinity.rotY,
      this.infinity.rotZ
    );

    // 2. Draw "A" + ∞ Central Intersection Signature
    const centerIntersection = this.getInfinityPoint(0, this.infinity.baseRadius, this.infinity.rotX, this.infinity.rotY, this.infinity.rotZ, 0);
    this.drawCentralASignature(centerIntersection.x, centerIntersection.y);

    // 3. Render High-Speed Pulses along the ∞ Loop
    if (!this.isReducedMotion) {
      this.infinityPulses.forEach(pulse => {
        pulse.t += pulse.speed;
        if (pulse.t > 1) pulse.t = 0;

        const tAngle = pulse.t * Math.PI * 2;
        const ptHead = this.getInfinityPoint(tAngle, this.infinity.baseRadius, this.infinity.rotX, this.infinity.rotY, this.infinity.rotZ, 0);
        const tTailAngle = Math.max(0, pulse.t - pulse.length) * Math.PI * 2;
        const ptTail = this.getInfinityPoint(tTailAngle, this.infinity.baseRadius, this.infinity.rotX, this.infinity.rotY, this.infinity.rotZ, 0);

        const grad = this.ctx.createLinearGradient(ptTail.x, ptTail.y, ptHead.x, ptHead.y);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(1, pulse.color);

        this.ctx.beginPath();
        this.ctx.moveTo(ptTail.x, ptTail.y);
        this.ctx.lineTo(ptHead.x, ptHead.y);
        this.ctx.strokeStyle = grad;
        this.ctx.lineWidth = 2.2;
        this.ctx.shadowBlur = 12;
        this.ctx.shadowColor = pulse.color;
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;
      });
    }

    // 4. Render Flowing Learning & Tech Tokens along the ∞ Loop
    this.ctx.font = '600 11px "JetBrains Mono", monospace';
    this.infinityTokens.forEach(token => {
      token.t += token.speed;
      if (token.t > 1) token.t = 0;

      const tAngle = token.t * Math.PI * 2;
      const pt = this.getInfinityPoint(tAngle, this.infinity.baseRadius, this.infinity.rotX, this.infinity.rotY, this.infinity.rotZ, 0);
      const ptNext = this.getInfinityPoint(tAngle + 0.02, this.infinity.baseRadius, this.infinity.rotX, this.infinity.rotY, this.infinity.rotZ, 0);

      const angle = Math.atan2(ptNext.y - pt.y, ptNext.x - pt.x);

      // Depth-based token alpha
      const depthAlpha = Math.max(0.1, Math.min(0.35, 0.2 + (pt.scale - 1) * 0.3));

      this.ctx.save();
      this.ctx.translate(pt.x, pt.y);
      this.ctx.rotate(angle * 0.35);
      this.ctx.fillStyle = token.color + depthAlpha + ')';
      this.ctx.fillText(token.text, -15, -4);
      this.ctx.restore();
    });

    this.animFrameId = requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new InfiniteCodeFlowEngine('digital-lab-canvas');
});
