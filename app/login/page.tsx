"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";


  async function submit(code: string) {
    setLoading(true);
    setError(false);
    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ code }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      router.push(next);
    } else {
      setError(true);
      setDigits(["", "", "", "", "", ""]);
      inputs.current[0]?.focus();
    }
    setLoading(false);
  }

  function handleChange(i: number, val: string) {
    const v = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    if (v && i < 5) inputs.current[i + 1]?.focus();
    if (next.every((d) => d !== "")) submit(next.join(""));
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (text.length === 6) {
      setDigits(text.split(""));
      submit(text);
    }
  }

  useEffect(() => { inputs.current[0]?.focus(); }, []);

  return (
    <div className="min-h-screen bg-[#F2F0EB] flex flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center gap-8">
        <p className="text-[10px] tracking-[0.25em] uppercase text-black/40 font-[family-name:var(--font-mono)]">
          Private Access
        </p>

        {/* 6-Digit Input */}
        <div className="flex gap-3" onPaste={handlePaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { inputs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`w-10 h-14 text-center text-xl font-semibold bg-transparent border-b-2 outline-none transition-all font-[family-name:var(--font-mono)]
                ${error ? "border-black/30 text-black/30" : "border-black/20 focus:border-black text-black"}`}
              disabled={loading}
            />
          ))}
        </div>

        <p className={`text-[10px] tracking-[0.15em] uppercase font-[family-name:var(--font-mono)] transition-opacity ${error ? "text-black/50 opacity-100" : "opacity-0"}`}>
          Falscher Code
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
