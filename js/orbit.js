/**
 * Digital Lab Interactions & "Beyond Code" Orbit Constellation
 * Manages the personality constellation orbit around ANJALI and interactive toolkit node behavior.
 */

class BeyondCodeOrbit {
  constructor(stageId) {
    this.stage = document.getElementById(stageId);
    if (!this.stage) return;

    this.satellites = this.stage.querySelectorAll('.beyond-satellite-pill');
    this.centerNode = this.stage.querySelector('.beyond-center-node');
    this.angle = 0;
    this.isPaused = false;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.stage.addEventListener('mouseenter', () => this.isPaused = true);
    this.stage.addEventListener('mouseleave', () => this.isPaused = false);

    // Subtle 3D mouse parallax on the stage
    window.addEventListener('mousemove', (e) => {
      const rect = this.stage.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      if (Math.abs(deltaX) < 1.5 && Math.abs(deltaY) < 1.5) {
        if (this.centerNode) {
          this.centerNode.style.transform = `translate(${deltaX * 12}px, ${deltaY * 12}px)`;
        }
      }
    });

    if (!this.isReducedMotion) {
      this.animate();
    }
  }

  animate() {
    if (!this.isPaused) {
      this.angle += 0.01;
      this.satellites.forEach((sat, i) => {
        const offset = (i * Math.PI * 2) / this.satellites.length;
        const currentAngle = this.angle + offset;
        const floatY = Math.sin(currentAngle) * 8;
        const floatX = Math.cos(currentAngle) * 5;

        // Apply gentle breathing float
        sat.style.transform = `translate(${floatX}px, ${floatY}px)`;
      });
    }

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new BeyondCodeOrbit('beyond-orbit-stage');
});
