/**
 * 3D Tilt & Specular Physics Engine
 * Adds smooth gyroscopic and cursor-driven 3D tilt effects to digital lab cards and frames.
 */

class VanillaTiltEngine {
  constructor(elements, options = {}) {
    this.elements = typeof elements === 'string' ? document.querySelectorAll(elements) : elements;
    this.options = Object.assign({
      maxTilt: 8,        // Max tilt in degrees
      perspective: 1000, // Transform perspective
      scale: 1.02,       // Subtle lift on hover
      speed: 400,        // Transition speed ms
      glare: true,       // Add specular light reflection
      maxGlare: 0.22
    }, options);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return; // Disable on touch devices for crisp performance

    this.init();
  }

  init() {
    this.elements.forEach(el => {
      this.bindElement(el);
    });
  }

  bindElement(el) {
    el.style.transformStyle = 'preserve-3d';

    let glareElement = null;
    if (this.options.glare) {
      glareElement = document.createElement('div');
      glareElement.className = 'card-glare-overlay';
      glareElement.style.position = 'absolute';
      glareElement.style.top = '0';
      glareElement.style.left = '0';
      glareElement.style.width = '100%';
      glareElement.style.height = '100%';
      glareElement.style.pointerEvents = 'none';
      glareElement.style.borderRadius = 'inherit';
      glareElement.style.opacity = '0';
      glareElement.style.transition = 'opacity 0.3s ease';
      glareElement.style.background = 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 75%)';
      glareElement.style.zIndex = '5';
      el.appendChild(glareElement);
    }

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      const tiltX = -percentY * this.options.maxTilt;
      const tiltY = percentX * this.options.maxTilt;

      el.style.transform = `perspective(${this.options.perspective}px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(${this.options.scale}, ${this.options.scale}, ${this.options.scale})`;

      if (glareElement) {
        glareElement.style.opacity = this.options.maxGlare.toString();
        glareElement.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(139, 92, 246, 0.3) 0%, rgba(251, 113, 133, 0.15) 50%, transparent 80%)`;
      }
    };

    const onMouseLeave = () => {
      el.style.transition = `transform ${this.options.speed}ms cubic-bezier(0.16, 1, 0.3, 1)`;
      el.style.transform = `perspective(${this.options.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

      if (glareElement) {
        glareElement.style.opacity = '0';
      }

      setTimeout(() => {
        el.style.transition = '';
      }, this.options.speed);
    };

    const onMouseEnter = () => {
      el.style.transition = 'none';
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseenter', onMouseEnter);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new VanillaTiltEngine('.project-card', { maxTilt: 7, scale: 1.02 });
  new VanillaTiltEngine('.lab-video-card', { maxTilt: 5, scale: 1.01 });
  new VanillaTiltEngine('.cert-card', { maxTilt: 5, scale: 1.01 });
  new VanillaTiltEngine('.achievement-card', { maxTilt: 6, scale: 1.02 });
  new VanillaTiltEngine('.toolkit-card', { maxTilt: 4, scale: 1.01 });
});
