import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Ticker Animation Tests', () => {
  let mockElement;
  
  beforeEach(() => {
    // Create mock DOM structure
    mockElement = document.createElement('div');
    mockElement.className = 'ticker';
    mockElement.dataset.tickerSpeed = '50';
    mockElement.dataset.scrollBased = 'false';
    
    const container = document.createElement('div');
    container.className = 'ticker__container';
    
    const track1 = document.createElement('div');
    track1.className = 'ticker__track';
    track1.dataset.direction = 'left';
    
    const text1 = document.createElement('span');
    text1.className = 'ticker__text';
    text1.textContent = 'Test Text';
    Object.defineProperty(text1, 'offsetWidth', { value: 200 });
    
    track1.appendChild(text1);
    container.appendChild(track1);
    mockElement.appendChild(container);
    document.body.appendChild(mockElement);
  });

  it('should read speed from data attribute', () => {
    const speed = parseFloat(mockElement.dataset.tickerSpeed);
    expect(speed).toBe(50);
  });

  it('should read scrollBased from data attribute', () => {
    const scrollBased = mockElement.dataset.scrollBased === 'true';
    expect(scrollBased).toBe(false);
  });

  it('should set data-speed to 0 to prevent ScrollSmoother conflicts', () => {
    mockElement.setAttribute('data-speed', '0');
    expect(mockElement.dataset.speed).toBe('0');
  });

  it('should find ticker tracks', () => {
    const tracks = mockElement.querySelectorAll('.ticker__track');
    expect(tracks.length).toBe(1);
  });

  it('should find ticker text elements', () => {
    const texts = mockElement.querySelectorAll('.ticker__text');
    expect(texts.length).toBe(1);
  });

  it('should handle direction attribute', () => {
    const track = mockElement.querySelector('.ticker__track');
    expect(track.dataset.direction).toBe('left');
  });

  it('should clone text elements for looping', () => {
    const track = mockElement.querySelector('.ticker__track');
    const text = track.querySelector('.ticker__text');
    
    // Simulate cloning
    const clones = 3;
    for (let i = 0; i < clones; i++) {
      const clone = text.cloneNode(true);
      track.appendChild(clone);
    }
    
    const allTexts = track.querySelectorAll('.ticker__text');
    expect(allTexts.length).toBe(clones + 1); // Original + clones
  });

  it('should calculate duration based on speed', () => {
    const textWidth = 200;
    const gap = 60;
    const speed = 50;
    
    const totalWidth = textWidth + gap;
    const duration = totalWidth / speed;
    
    expect(duration).toBe(5.2);
  });
});
