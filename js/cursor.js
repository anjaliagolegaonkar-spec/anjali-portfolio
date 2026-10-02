/**
 * Custom Desktop Cursor
 * Subtle glowing precision dot & magnetic expanding ring for desktop users.
 */

class DigitalLabCursor {
  constructor() {
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) return;

    this.dot = document.createElement('div');
    this.dot.className = 'custom-cursor-dot';

    this.ring = document.createElement('div');
    this.ring.className = 'custom-cursor-ring';

    document.body.appendChild(this.dot);
    document.body.appendChild(this.ring);

    this.mouseX = -100;
    this.mouseY = -100;
    this.ringX = -100;
    this.ringY = -100;

    this.init();
  }

  init() {
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.dot.style.left = `${this.mouseX}px`;
      this.dot.style.top = `${this.mouseY}px`;
    });

    // Magnetic / Hover targets
    const hoverElements = document.querySelectorAll('a, button, .toolkit-card, .project-card, .achievement-card, .beyond-satellite-pill');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (el.tagName === 'BUTTON' || el.tagName === 'A') {
          this.ring.classList.add('cursor-magnetic');
        } else {
          this.ring.classList.add('cursor-hover');
        }
      });
      el.addEventListener('mouseleave', () => {
        this.ring.classList.remove('cursor-magnetic');
        this.ring.classList.remove('cursor-hover');
      });
    });

    this.render();
  }

  render() {
    // Smooth lag for ring
    this.ringX += (this.mouseX - this.ringX) * 0.15;
    this.ringY += (this.mouseY - this.ringY) * 0.15;

    this.ring.style.left = `${this.ringX}px`;
    this.ring.style.top = `${this.ringY}px`;

    requestAnimationFrame(() => this.render());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new DigitalLabCursor();
});
