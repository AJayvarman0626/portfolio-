"use client";

import { useEffect, useRef, useState } from "react";
import { X, Circle, Minus } from "lucide-react";

type Player = "X" | "O" | null;
type Result = "X" | "O" | "draw" | null;

export default function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<Player>("X");
  const [result, setResult] = useState<Result>(null);

  const [score, setScore] = useState({
    you: 0,
    ai: 0,
    draw: 0,
  });

  const clickSound = useRef<HTMLAudioElement | null>(null);
  const winSound = useRef<HTMLAudioElement | null>(null);

  /* Load sounds */
  useEffect(() => {
    clickSound.current = new Audio("/sounds/click.mp3");
    winSound.current = new Audio("/sounds/win.mp3");
  }, []);

  /* Check result */
  useEffect(() => {
    const winner = checkWinner(board);

    if (winner) {
      setResult(winner);
      if (winner === "X") {
        setScore((s) => ({ ...s, you: s.you + 1 }));
        winSound.current?.play();
      } else {
        setScore((s) => ({ ...s, ai: s.ai + 1 }));
      }
      return;
    }

    if (board.every(Boolean)) {
      setResult("draw");
      setScore((s) => ({ ...s, draw: s.draw + 1 }));
    }
  }, [board]);

  /* AI Turn – TRUE MEDIUM (reduced hardness) */
  useEffect(() => {
    if (turn === "O" && result === null) {
      const move = getMediumMove(board);
      setTimeout(() => {
        const next = [...board];
        next[move] = "O";
        setBoard(next);
        setTurn("X");
      }, 500);
    }
  }, [turn, result]);

  function handleClick(i: number) {
    if (board[i] || turn !== "X" || result) return;
    clickSound.current?.play();

    const next = [...board];
    next[i] = "X";
    setBoard(next);
    setTurn("O");
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setTurn("X");
    setResult(null);
  }

  return (
    <section className="relative mx-auto max-w-md px-4 py-24 text-center bg-black">
      {/* Title */}
      <h2 className="mb-4 text-xl font-semibold text-white">
        Tic Tac Toe
      </h2>

      {/* Scoreboard */}
      <div className="mb-4 flex justify-center gap-3 text-xs">
        <Score label="You" value={score.you} icon={X} />
        <Score label="AI" value={score.ai} icon={Circle} />
        <Score label="Draw" value={score.draw} icon={Minus} />
      </div>

      {/* Board */}
      <div className="mx-auto grid grid-cols-3 gap-3 rounded-2xl p-4 bg-white/10 border border-white/20">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="
              flex h-20 w-20 items-center justify-center
              rounded-xl
              bg-white
              border border-black/10
              active:scale-95
            "
          >
            {cell === "X" && (
              <X size={36} strokeWidth={2.4} className="text-black" />
            )}
            {cell === "O" && (
              <Circle size={36} strokeWidth={2.4} className="text-black" />
            )}
          </button>
        ))}
      </div>

      {/* BIG RESULT SCREEN */}
      {result && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="rounded-2xl bg-white px-10 py-8 text-black shadow-2xl">
            <div className="mb-3 text-5xl">
              {result === "X" ? "🎉" : result === "O" ? "🤖" : "🤝"}
            </div>
            <h3 className="mb-4 text-xl font-semibold">
              {result === "X"
                ? "You Win!"
                : result === "O"
                ? "AI Wins!"
                : "Match Draw"}
            </h3>
            <button
              onClick={resetGame}
              className="rounded-md bg-black px-5 py-2 text-sm text-white"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------- UI ---------- */

function Score({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: any;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5 rounded-lg px-3 py-2 bg-white/10 border border-white/20 text-white">
      <Icon size={14} />
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

/* ---------- GAME LOGIC ---------- */

function checkWinner(board: Player[]): Result {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

/* ---------- MEDIUM AI (RELAXED) ---------- */
function getMediumMove(board: Player[]): number {
  const chance = Math.random();

  // 60% smart, 40% random
  if (chance < 0.6) {
    const win = findBest(board, "O");
    if (win !== null) return win;

    const block = findBest(board, "X");
    if (block !== null) return block;

    if (!board[4]) return 4;
  }

  const empty = board
    .map((v, i) => (v === null ? i : null))
    .filter((v) => v !== null) as number[];

  return empty[Math.floor(Math.random() * empty.length)];
}

function findBest(board: Player[], player: Player): number | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    const line = [board[a], board[b], board[c]];
    if (
      line.filter((v) => v === player).length === 2 &&
      line.includes(null)
    ) {
      return [a, b, c][line.indexOf(null)];
    }
  }
  return null;
}
