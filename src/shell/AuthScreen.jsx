import React, { useState } from "react";
import { Loader2 } from "lucide-react";

function AuthScreen({ onAuthenticated }) {
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const url = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const body = mode === "login" ? { email, password } : { email, password, name, role };
    try {
      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }
      onAuthenticated(data);
    } catch (err) {
      setError("Couldn't reach the server, try again in a moment.");
      setLoading(false);
    }
  }

  return (
    <div data-theme="brand" className="min-h-screen w-full flex items-center justify-center px-5" style={{ background: "var(--bg, #FFFFFF)", color: "var(--ink, #141414)", fontFamily: "Verdana, Geneva, sans-serif" }}>
      <style>{`
        [data-theme="brand"] {
          --bg: #FFFFFF; --surface: #FFF8F3; --border: #F0D6BC; --ink: #141414;
          --muted: #5C4A40; --muted2: #7A6154; --gold: #A83A0A; --cta: #FF7A1A;
          --cta-shadow: #C15A00; --cta-ink: #141414; --developing: #D6182B;
        }
        .font-display { font-family: Verdana, Geneva, sans-serif; }
      `}</style>
      <div className="w-full max-w-sm">
        <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>Legacy Lab Academy</div>
        <h1 className="font-display font-800 text-2xl mb-6">{mode === "login" ? "Welcome back" : "Create an account"}</h1>

        <form onSubmit={submit} className="flex flex-col gap-3">
          {mode === "register" && (
            <>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" required className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={{ background: "var(--surface)", border: "1.5px solid var(--border)", color: "var(--ink)" }} />
              <div className="flex gap-2">
                {["student", "parent", "coach"].map((r) => (
                  <button key={r} type="button" onClick={() => setRole(r)} className="flex-1 text-sm font-bold rounded-xl px-3 py-2.5 capitalize" style={{ background: role === r ? "var(--gold)" : "var(--surface)", color: role === r ? "#fff" : "var(--muted2)", border: "1.5px solid var(--border)" }}>{r}</button>
                ))}
              </div>
            </>
          )}
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={{ background: "var(--surface)", border: "1.5px solid var(--border)", color: "var(--ink)" }} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required minLength={8} className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={{ background: "var(--surface)", border: "1.5px solid var(--border)", color: "var(--ink)" }} />

          {error && <p className="text-sm" style={{ color: "var(--developing)" }}>{error}</p>}

          <button type="submit" disabled={loading} className="w-full px-6 py-3.5 rounded-2xl text-sm font-bold" style={{ background: "var(--cta)", color: "var(--cta-ink)", boxShadow: "0 2px 8px rgba(20,20,20,0.16)" }}>
            {loading ? <span className="flex items-center justify-center gap-2"><Loader2 size={15} className="animate-spin" /> Working...</span> : mode === "login" ? "Log in" : "Create account"}
          </button>
        </form>

        <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(null); }} className="text-xs underline mt-4 block" style={{ color: "var(--muted2)" }}>
          {mode === "login" ? "Need an account? Register" : "Already have an account? Log in"}
        </button>
      </div>
    </div>
  );
}

export default AuthScreen;
