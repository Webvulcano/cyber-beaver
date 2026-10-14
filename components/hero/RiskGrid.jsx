"use client";

import { useEffect, useRef } from "react";

// Kockázat-szkenner háttér: pontrács, piros "kockázat" klaszterekkel. Egy hódos szkenner-vonal
// balról jobbra végigmegy, mögötte a kockázatok zöldre (lime) váltanak. Az egér körül is "gyógyul".

const RISK = [255, 92, 80];
const OK = [214, 243, 75];
const BASE = [255, 255, 255];

const RISK_LABELS = [
  "Hiányzó GAP-elemzés",
  "Beszállítói kockázat",
  "Elavult szabályzat",
  "Nincs incidenskezelési terv",
  "Képzetlen munkatársak",
  "DORA hiányosság",
];
const FIX_LABELS = ["NIS2 ✓", "TPRM ✓", "Szabályzat ✓", "Incidenskezelés ✓", "Tudatosság ✓", "DORA ✓"];

const PHASE = { show: 1800, scan: 5200, hold: 2600, reset: 1200 };
const HEAL_RADIUS = 90;

const rand = (a, b) => a + Math.random() * (b - a);
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));

export default function RiskGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fontFamily = getComputedStyle(canvas).fontFamily;

    let w = 0;
    let h = 0;
    let gap = 30;
    let cells = [];
    let labels = [];
    let phase = "show";
    let phaseStart = performance.now();
    let lineX = -100;
    let mouse = null;
    let raf = 0;
    let visible = true;

    function build() {
      const rect = section.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      gap = w < 640 ? 24 : 30;
      const cols = Math.ceil(w / gap);
      const rows = Math.ceil(h / gap);
      const offX = (w - (cols - 1) * gap) / 2;
      const offY = (h - (rows - 1) * gap) / 2;
      cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cells.push({ x: offX + c * gap, y: offY + r * gap, risk: 0, target: 0, ok: 0, glow: 0 });
        }
      }
      seedRisks();
    }

    function seedRisks() {
      for (const cell of cells) {
        cell.target = 0;
        cell.ok = 0;
      }
      labels = [];
      const clusters = w < 640 ? 4 : 7;
      const labelCount = w < 640 ? 2 : 5;
      const order = [...RISK_LABELS.keys()].sort(() => Math.random() - 0.5);

      const content = contentBox();
      ctx.font = `500 13px ${fontFamily}`;

      for (let i = 0; i < clusters; i++) {
        // A klaszterek a szélekre kerülnek; a feliratos klaszterek a szöveges blokkot is elkerülik.
        const left = i % 2 === 0;
        const labelText = i < labelCount ? RISK_LABELS[order[i]] : null;
        let cx = 0;
        let cy = 0;
        for (let attempt = 0; attempt < 40; attempt++) {
          cx = left ? rand(0.04, 0.3) * w : rand(0.7, 0.96) * w;
          cy = rand(0.08, 0.92) * h;
          if (!labelText) break;
          const tw = Math.max(ctx.measureText(labelText).width, ctx.measureText(FIX_LABELS[order[i]]).width) + 16;
          const box = { x1: left ? cx : cx - tw, x2: left ? cx + tw : cx, y1: cy - 12, y2: cy + 12 };
          if (!overlaps(box, content) && box.x1 > 4 && box.x2 < w - 4) break;
        }
        const radius = rand(1.5, 3.5) * gap;
        for (const cell of cells) {
          const d = Math.hypot(cell.x - cx, cell.y - cy);
          if (d < radius && Math.random() < 0.6) cell.target = rand(0.45, 1);
        }
        if (i < labelCount) {
          const anchor = nearest(cx, cy);
          anchor.target = 1;
          const tw = ctx.measureText(labelText).width + 16;
          const box = { x1: left ? anchor.x : anchor.x - tw, x2: left ? anchor.x + tw : anchor.x, y1: anchor.y - 12, y2: anchor.y + 12 };
          if (!overlaps(box, content)) labels.push({ cell: anchor, risk: labelText, fix: FIX_LABELS[order[i]], left });
        }
      }
      // Szórt egyedi kockázatok
      for (const cell of cells) if (Math.random() < 0.012) cell.target = rand(0.5, 1);
    }

    // A szöveges tartalom doboza a section-höz képest (kicsit kitágítva).
    function contentBox() {
      const el = section.querySelector("[data-hero-content]");
      if (!el) return null;
      const s = section.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      return { x1: r.left - s.left - 16, x2: r.right - s.left + 16, y1: r.top - s.top - 16, y2: r.bottom - s.top + 16 };
    }

    function overlaps(a, b) {
      return b && a.x1 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y2 > b.y1;
    }

    function nearest(x, y) {
      let best = cells[0];
      let bd = Infinity;
      for (const cell of cells) {
        const d = (cell.x - x) ** 2 + (cell.y - y) ** 2;
        if (d < bd) {
          bd = d;
          best = cell;
        }
      }
      return best;
    }

    function step(now) {
      const t = now - phaseStart;
      if (phase === "show" && t > PHASE.show) next("scan", now);
      else if (phase === "scan") {
        lineX = -60 + (t / PHASE.scan) * (w + 120);
        if (t > PHASE.scan) next("hold", now);
      } else if (phase === "hold" && t > PHASE.hold) next("reset", now);
      else if (phase === "reset" && t > PHASE.reset) {
        seedRisks();
        lineX = -100;
        next("show", now);
      }

      for (const cell of cells) {
        const fading = phase === "reset";
        cell.risk += ((fading ? 0 : cell.target) - cell.risk) * 0.06;

        let healTarget = phase === "hold" || (phase === "scan" && cell.x < lineX) || cell.ok > 0.5 ? 1 : 0;
        if (mouse && !fading && Math.hypot(cell.x - mouse.x, cell.y - mouse.y) < HEAL_RADIUS) healTarget = 1;
        cell.ok += (healTarget - cell.ok) * 0.12;

        // Világító csóva közvetlenül a szkenner-vonal mögött
        const behind = lineX - cell.x;
        const trail = phase === "scan" && behind > 0 ? Math.max(0, 1 - behind / 240) : 0;
        cell.glow += (trail - cell.glow) * 0.25;
      }
    }

    function next(p, now) {
      phase = p;
      phaseStart = now;
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const size = gap < 30 ? 3 : 4;

      for (const cell of cells) {
        let color;
        let alpha;
        if (cell.risk > 0.02) {
          color = mix(RISK, OK, cell.ok);
          alpha = 0.25 + 0.75 * cell.risk;
        } else {
          color = mix(BASE, OK, Math.min(1, cell.glow));
          alpha = 0.1 + 0.5 * cell.glow;
        }
        ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha})`;
        ctx.fillRect(cell.x - size / 2, cell.y - size / 2, size, size);
      }

      ctx.font = `500 13px ${fontFamily}`;
      ctx.textBaseline = "middle";
      for (const label of labels) {
        const { cell } = label;
        if (cell.risk < 0.1) continue;
        const fixed = cell.ok > 0.5;
        const text = fixed ? label.fix : label.risk;
        const c = fixed ? OK : [255, 255, 255];
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${(fixed ? 0.95 : 0.7) * cell.risk})`;
        ctx.textAlign = label.left ? "left" : "right";
        ctx.fillText(text, cell.x + (label.left ? 12 : -12), cell.y);
      }

      if (phase === "scan" && lineX > -40 && lineX < w + 40) drawScanner(lineX);
    }

    function drawScanner(x) {
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "rgba(214,243,75,0)");
      grad.addColorStop(0.15, "rgba(214,243,75,0.55)");
      grad.addColorStop(0.85, "rgba(214,243,75,0.55)");
      grad.addColorStop(1, "rgba(214,243,75,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(x - 1, 0, 2, h);
      drawBeaver(x, Math.min(110, h * 0.14));
    }

    // Egyszerű flat hódfej: lime korong, petrol arc, két nagy fog.
    function drawBeaver(x, y) {
      const petrol = "#0b4456";
      ctx.fillStyle = "#d6f34b";
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = petrol;
      ctx.beginPath();
      ctx.arc(x - 8, y - 8, 3.5, 0, Math.PI * 2); // fülek
      ctx.arc(x + 8, y - 8, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y + 1, 9.5, 0, Math.PI * 2); // fej
      ctx.fill();

      ctx.fillStyle = "#d6f34b";
      ctx.beginPath();
      ctx.arc(x - 3.5, y - 1.5, 1.4, 0, Math.PI * 2); // szemek
      ctx.arc(x + 3.5, y - 1.5, 1.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x, y + 2.5, 2.2, 1.5, 0, 0, Math.PI * 2); // orr
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x - 2.6, y + 5, 2.4, 4); // fogak
      ctx.fillRect(x + 0.2, y + 5, 2.4, 4);
    }

    function loop(now) {
      step(now);
      draw();
      if (visible) raf = requestAnimationFrame(loop);
    }

    function start() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    }

    build();

    if (reduced) {
      // Statikus kép: félig "megjavított" állapot, animáció nélkül.
      for (const cell of cells) {
        cell.risk = cell.target;
        cell.ok = cell.x < w * 0.5 ? 1 : 0;
      }
      draw();
      return;
    }

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => (mouse = null);
    const onResize = () => build();
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    io.observe(section);
    start();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full" />;
}
