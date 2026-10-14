"use client";

import { useEffect, useRef } from "react";

// Kockázat-szkenner háttér: pontrács piros "kockázat" klaszterekkel. 3-4 lime "kígyó" halad a
// pöttyök mentén, a kockázatok felé tart, és amin átmegy, az zöldre (lime) vált. A meggyógyult
// pontok egy idő után eltűnnek, máshol újak jelennek meg. Az egér körül is "gyógyul".

const RISK = [255, 92, 80];
const OK = [214, 243, 75];
const BASE = [255, 255, 255];

const DIRS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
const MOVE_MS = 85; // ennyi idő alatt lép egy pöttyöt a kígyó
const TAIL = 9; // kígyó hossza (pötty)
const HEALED_STAY_MS = 3500; // meddig marad zölden egy meggyógyult pont, mielőtt eltűnik
const SPAWN_MS = 2200; // ilyen gyakran nézi, kell-e új kockázat-klaszter
const HEAL_RADIUS = 90; // egér

const rand = (a, b) => a + Math.random() * (b - a);
const randInt = (a, b) => Math.floor(rand(a, b + 1));
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));

export default function RiskGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let gap = 30;
    let cols = 0;
    let rows = 0;
    let cells = [];
    let snakes = [];
    let mouse = null;
    let lastTime = 0;
    let lastSpawn = 0;
    let raf = 0;
    let visible = true;

    const at = (c, r) => cells[r * cols + c];
    const small = () => w < 640;

    function build() {
      const rect = section.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      gap = small() ? 24 : 30;
      cols = Math.ceil(w / gap);
      rows = Math.ceil(h / gap);
      const offX = (w - (cols - 1) * gap) / 2;
      const offY = (h - (rows - 1) * gap) / 2;
      cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cells.push({ c, r, x: offX + c * gap, y: offY + r * gap, risk: 0, target: 0, ok: 0, healedAt: 0 });
        }
      }

      const clusters = small() ? 4 : 7;
      for (let i = 0; i < clusters; i++) spawnCluster(i % 2 === 0);
      for (const cell of cells) if (Math.random() < 0.01) cell.target = rand(0.5, 1);

      snakes = [];
      const count = small() ? 3 : 4;
      for (let i = 0; i < count; i++) snakes.push(newSnake());
    }

    // ---- Kockázatok ------------------------------------------------------------------------

    // A klaszterek a szélekre kerülnek, a középső (szöveges) sáv szabadabb marad.
    function spawnCluster(left = Math.random() < 0.5) {
      const cx = left ? rand(0.04, 0.3) * w : rand(0.7, 0.96) * w;
      const cy = rand(0.08, 0.92) * h;
      const radius = rand(1.5, 3.5) * gap;
      for (const cell of cells) {
        if (cell.target > 0 || cell.risk > 0.02) continue;
        if (Math.hypot(cell.x - cx, cell.y - cy) < radius && Math.random() < 0.6) cell.target = rand(0.45, 1);
      }
    }

    function heal(cell, now) {
      if (cell.target > 0 && !cell.healedAt) cell.healedAt = now;
    }

    // ---- Kígyók ----------------------------------------------------------------------------

    function newSnake() {
      const c = randInt(0, cols - 1);
      const r = randInt(0, rows - 1);
      return { c, r, dir: DIRS[randInt(0, 3)], trail: [{ c, r }], target: null, retarget: 0, wait: rand(0, MOVE_MS) };
    }

    // Legközelebbi még nem gyógyult kockázat (kicsit véletlenszerűen, hogy ne mind ugyanoda menjen).
    function pickTarget(snake) {
      let best = null;
      let bd = Infinity;
      for (const cell of cells) {
        if (cell.target <= 0 || cell.healedAt) continue;
        const d = Math.abs(cell.c - snake.c) + Math.abs(cell.r - snake.r) + rand(0, 12);
        if (d < bd) {
          bd = d;
          best = cell;
        }
      }
      return best;
    }

    function moveSnake(snake, now) {
      if (now > snake.retarget || (snake.target && snake.target.healedAt)) {
        snake.target = pickTarget(snake);
        snake.retarget = now + rand(1500, 3000);
      }

      const inside = ([dc, dr]) => {
        const c = snake.c + dc;
        const r = snake.r + dr;
        return c >= 0 && c < cols && r >= 0 && r < rows;
      };
      const options = DIRS.filter((d) => !(d[0] === -snake.dir[0] && d[1] === -snake.dir[1]) && inside(d));

      let dir = snake.dir;
      const t = snake.target;
      const toward = t
        ? options.filter(
            ([dc, dr]) => (dc !== 0 && dc === Math.sign(t.c - snake.c)) || (dr !== 0 && dr === Math.sign(t.r - snake.r))
          )
        : [];
      if (toward.length && Math.random() < 0.7) dir = toward[randInt(0, toward.length - 1)];
      else if (!options.includes(snake.dir) || Math.random() < 0.25) dir = options[randInt(0, options.length - 1)];

      snake.dir = dir;
      snake.c += dir[0];
      snake.r += dir[1];
      snake.trail.unshift({ c: snake.c, r: snake.r });
      if (snake.trail.length > TAIL) snake.trail.pop();

      // A fej és közvetlen szomszédai gyógyulnak.
      for (const [dc, dr] of [[0, 0], ...DIRS]) {
        const c = snake.c + dc;
        const r = snake.r + dr;
        if (c >= 0 && c < cols && r >= 0 && r < rows) heal(at(c, r), now);
      }
    }

    // ---- Ciklus ----------------------------------------------------------------------------

    function step(now) {
      const dt = Math.min(100, now - (lastTime || now));
      lastTime = now;

      for (const snake of snakes) {
        snake.wait -= dt;
        while (snake.wait <= 0) {
          moveSnake(snake, now);
          snake.wait += MOVE_MS;
        }
      }

      if (mouse) {
        for (const cell of cells) if (Math.hypot(cell.x - mouse.x, cell.y - mouse.y) < HEAL_RADIUS) heal(cell, now);
      }

      let active = 0;
      for (const cell of cells) {
        if (cell.healedAt && now - cell.healedAt > HEALED_STAY_MS) cell.target = 0;
        cell.risk += (cell.target - cell.risk) * 0.06;
        cell.ok += ((cell.healedAt ? 1 : 0) - cell.ok) * 0.12;
        if (cell.target === 0 && cell.risk < 0.02 && cell.healedAt) {
          cell.risk = 0;
          cell.ok = 0;
          cell.healedAt = 0;
        }
        if (cell.target > 0 && !cell.healedAt) active++;
      }

      if (now - lastSpawn > SPAWN_MS) {
        lastSpawn = now;
        if (active < cells.length * 0.025) spawnCluster();
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const size = small() ? 3 : 4;

      for (const cell of cells) {
        let color = BASE;
        let alpha = 0.1;
        if (cell.risk > 0.02) {
          color = mix(RISK, OK, cell.ok);
          alpha = 0.25 + 0.75 * cell.risk;
        }
        ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha})`;
        ctx.fillRect(cell.x - size / 2, cell.y - size / 2, size, size);
      }

      for (const snake of snakes) {
        // halvány összekötő vonal a pöttyök között → "kígyó" hatás
        ctx.lineWidth = 1.5;
        for (let i = 1; i < snake.trail.length; i++) {
          const a = at(snake.trail[i - 1].c, snake.trail[i - 1].r);
          const b = at(snake.trail[i].c, snake.trail[i].r);
          ctx.strokeStyle = `rgba(${OK[0]},${OK[1]},${OK[2]},${0.35 * (1 - i / TAIL)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        snake.trail.forEach(({ c, r }, i) => {
          const cell = at(c, r);
          const a = 1 - i / TAIL;
          const s = i === 0 ? size + 3 : size + 1;
          ctx.fillStyle = `rgba(${OK[0]},${OK[1]},${OK[2]},${0.2 + 0.8 * a})`;
          ctx.fillRect(cell.x - s / 2, cell.y - s / 2, s, s);
        });
      }
    }

    function loop(now) {
      step(now);
      draw();
      if (visible) raf = requestAnimationFrame(loop);
    }

    function start() {
      cancelAnimationFrame(raf);
      lastTime = 0;
      raf = requestAnimationFrame(loop);
    }

    build();

    if (reduced) {
      // Statikus kép, kígyók nélkül: a bal oldali kockázatok már "megjavítva".
      snakes = [];
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
