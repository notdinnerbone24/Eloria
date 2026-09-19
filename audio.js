// audio.js - Eloria Synth Audio Engine

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const sfx = {
    playTone: function(freq, type, duration, vol = 0.05) {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(vol, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    },
    
    hover: () => sfx.playTone(800, 'sine', 0.1, 0.02),
    click: () => sfx.playTone(400, 'square', 0.15, 0.03),
    
    success: () => {
        sfx.playTone(400, 'sine', 0.1, 0.05);
        setTimeout(() => sfx.playTone(600, 'sine', 0.1, 0.05), 100);
        setTimeout(() => sfx.playTone(800, 'sine', 0.2, 0.05), 200);
    },
    error: () => {
        sfx.playTone(150, 'sawtooth', 0.3, 0.05);
        setTimeout(() => sfx.playTone(100, 'sawtooth', 0.4, 0.05), 150);
    },
    tileFlash: (index) => {
        const baseFreq = 200 + (index * 15);
        sfx.playTone(baseFreq, 'square', 0.2, 0.03);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Add audio to buttons, cards, and interactive elements dynamically
    const interactables = document.querySelectorAll('.card, button, .back-btn, .num-btn, .color-btn, .nav-btn, select, input[type="range"]');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', sfx.hover);
        el.addEventListener('click', sfx.click);
    });
});
