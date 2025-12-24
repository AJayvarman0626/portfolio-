"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Cell = "X" | "O" | null;

export default function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winningLine, setWinningLine] = useState<number[]>([]);

  // 🏆 Scoreboard
  const [score, setScore] = useState({ X: 0, O: 0, draw: 0 });

  // 🔊 Sounds (browser-safe)
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const winSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    clickSoundRef.current = new Audio("/sounds/click.mp3");
    winSoundRef.current = new Audio("/sounds/win.mp3");
  }, []);

  const result = calculateWinner(board);
  const winner = result?.winner ?? null;

  /* ===== Check game state ===== */
  useEffect(() => {
    if (result) {
      setWinningLine(result.line);
      setGameOver(true);

      winSoundRef.current?.play();
      confettiBurst();

      setScore((s) => ({
        ...s,
        [result.winner]: s[result.winner] + 1,
      }));
    } else if (board.every(Boolean)) {
      setGameOver(true);
      setScore((s) => ({ ...s, draw: s.draw + 1 }));
    }
  }, [board]);

  /* ===== AI Move ===== */
  useEffect(() => {
    if (!isPlayerTurn && !winner && board.some((c) => c === null)) {
      const t = setTimeout(makeComputerMove, 500);
      return () => clearTimeout(t);
    }
  }, [isPlayerTurn, board, winner]);

  function handleClick(i: number) {
    if (board[i] || winner || !isPlayerTurn) return;

    clickSoundRef.current?.play();

    const next = [...board];
    next[i] = "X";
    setBoard(next);
    setIsPlayerTurn(false);
  }

  function makeComputerMove() {
    const move = getBestMove(board);
    if (move !== null) {
      const next = [...board];
      next[move] = "O";
      setBoard(next);
      setIsPlayerTurn(true);
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameOver(false);
    setWinningLine([]);
  }

  /* ===== 3D Tilt ===== */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-50, 50], [10, -10]), {
    stiffness: 120,
    damping: 14,
  });
  const rotateY = useSpring(useTransform(mx, [-50, 50], [-10, 10]), {
    stiffness: 120,
    damping: 14,
  });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  function renderSquare(i: number) {
    const isWin = winningLine.includes(i);
    return (
      <motion.button
        onClick={() => handleClick(i)}
        whileTap={{ scale: 0.9 }}
        className={`
          h-20 w-20 rounded-xl
          flex items-center justify-center
          text-3xl font-bold
          bg-black/5 dark:bg-white/10
          hover:bg-black/10 dark:hover:bg-white/20
          transition
          ${isWin ? "ring-4 ring-green-400 shadow-[0_0_20px_rgba(74,222,128,0.8)]" : ""}
        `}
      >
        {board[i] && (
          <motion.span
            className="text-black"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {board[i]}
          </motion.span>
        )}
      </motion.button>
    );
  }

  const resultText = winner
    ? winner === "X"
      ? "🎉 You Win!"
      : "😓 AI Wins"
    : "🤝 Draw";

  return (
    <section className="mx-auto max-w-md px-4 py-24">
      {/* Title */}
      <div className="mb-4 text-center">
        <h2 className="inline-block px-5 py-2 text-2xl font-semibold bg-white/80 dark:bg-black/60 text-black dark:text-white backdrop-blur-md rounded-xl">
          Tic Tac Toe
        </h2>
      </div>

      {/* Scoreboard */}
      <div className="mb-4 flex justify-center gap-6 px-4 py-1 rounded-full text-sm bg-white/80 dark:bg-black/60 backdrop-blur-md text-black dark:text-white border border-black/10 dark:border-white/20">
        <span>❌ You: {score.X}</span>
        <span>⭕ AI: {score.O}</span>
        <span>🤝 Draw: {score.draw}</span>
      </div>

      {/* Board */}
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, perspective: 1000 }}
        className="relative rounded-3xl p-6 bg-white dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20"
      >
        <div className="grid grid-cols-3 gap-3 justify-center">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i}>{renderSquare(i)}</div>
          ))}
        </div>

        {/* Overlay */}
        {gameOver && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-3xl">
            <div className="rounded-2xl p-6 bg-white dark:bg-black text-black dark:text-white text-center">
              <h1 className="text-2xl font-semibold">{resultText}</h1>
              <button
                onClick={resetGame}
                className="mt-4 px-4 py-1 rounded-full border border-black/20 dark:border-white/30 hover:bg-black/10 dark:hover:bg-white/15 transition"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}

/* ===== Helpers ===== */

function calculateWinner(board: Cell[]) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  return null;
}

function getBestMove(board: Cell[]) {
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      const b = [...board];
      b[i] = "O";
      if (calculateWinner(b)?.winner === "O") return i;
    }
  }

  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      const b = [...board];
      b[i] = "X";
      if (calculateWinner(b)?.winner === "X") return i;
    }
  }

  const empty = board
    .map((v, i) => (v === null ? i : null))
    .filter((v): v is number => v !== null);

  return empty.length
    ? empty[Math.floor(Math.random() * empty.length)]
    : null;
}

function confettiBurst() {
  const confetti = document.createElement("div");
  confetti.innerHTML = "🎉 🎊 ✨ 🎉 🎊 ✨";
  confetti.className =
    "fixed inset-0 z-50 flex items-center justify-center text-6xl animate-ping pointer-events-none";
  document.body.appendChild(confetti);
  setTimeout(() => confetti.remove(), 1200);
}
