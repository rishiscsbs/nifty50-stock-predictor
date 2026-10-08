import { ReactNode } from "react";

export function TerminalBlock({ children }: { children: ReactNode }) {
  return <div className="font-mono text-[13px] leading-relaxed text-zinc-100">{children}</div>;
}

export function TerminalBanner({ title }: { title: string }) {
  return (
    <div className="my-3 text-center">
      <p className="text-zinc-500">{"=".repeat(56)}</p>
      <p className="font-semibold tracking-wide text-white">{title}</p>
      <p className="text-zinc-500">{"=".repeat(56)}</p>
    </div>
  );
}

export function TerminalLine({ kind = "default", children }: { kind?: "ok" | "warn" | "info" | "prompt" | "default"; children: ReactNode }) {
  const color =
    kind === "ok"
      ? "text-emerald-400"
      : kind === "warn"
        ? "text-amber-300"
        : kind === "info"
          ? "text-cyan-300"
          : kind === "prompt"
            ? "text-yellow-300"
            : "text-zinc-100";
  return <p className={color}>{children}</p>;
}
