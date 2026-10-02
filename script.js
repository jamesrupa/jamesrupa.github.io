// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('[data-nav]').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Reveal-on-scroll
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Terminal typewriter
const terminalBody = document.getElementById('terminalBody');
if (terminalBody) {
  const lines = [
    { prompt: 'whoami', output: 'james_rupa — network engineer' },
    { prompt: 'uptime', output: '3+ years in network infrastructure' },
    { prompt: 'ping client-gateway', output: '64 bytes from 10.0.0.1: time=1ms' },
    { prompt: 'status --all', output: '● all systems operational' },
  ];

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function typeLine(el, text, speed = 28) {
    for (const ch of text) {
      el.textContent += ch;
      await sleep(speed);
    }
  }

  async function runTerminal() {
    while (true) {
      terminalBody.innerHTML = '';
      for (const { prompt, output } of lines) {
        const promptLine = document.createElement('div');
        const promptSpan = document.createElement('span');
        promptSpan.className = 't-prompt';
        promptSpan.textContent = '$ ';
        promptLine.appendChild(promptSpan);
        const cmdSpan = document.createElement('span');
        promptLine.appendChild(cmdSpan);
        terminalBody.appendChild(promptLine);

        await typeLine(cmdSpan, prompt);
        await sleep(300);

        const outLine = document.createElement('span');
        outLine.className = 't-out';
        outLine.textContent = output;
        terminalBody.appendChild(outLine);
        await sleep(650);
      }
      const caret = document.createElement('span');
      caret.className = 'terminal-caret';
      terminalBody.appendChild(caret);
      await sleep(4000);
    }
  }

  runTerminal();
}
