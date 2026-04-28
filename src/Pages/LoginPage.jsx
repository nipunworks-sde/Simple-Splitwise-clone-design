import { useState } from "react";
import { Wallet, Eye, EyeOff } from "lucide-react";

const DEMO_USERS = [
  { id: "u1", name: "Nipun Gupta", email: "nipun@gmail.com", password: "123456", avatar: "NG", phone: "+91 8929771661" },
  { id: "u2", name: "Rashi Baj", email: "rashi@gmail.com", password: "123456", avatar: "RB", phone: "+91 91234 56789" },
];

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    const user = DEMO_USERS.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      onLogin(user);
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center">
            <Wallet size={24} className="text-white" />
          </div>
          <span className="text-3xl font-bold text-white">SplitEase</span>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-1">Welcome back</h2>
          <p className="text-gray-400 text-sm mb-6">Sign in to manage your expenses</p>

          {/* Demo credentials hint */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 mb-6">
            <p className="text-emerald-400 text-xs font-medium mb-1">Demo Credentials</p>
            <p className="text-gray-400 text-xs">Email: nipun@gmail.com</p>
            <p className="text-gray-400 text-xs">Password: 123456</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">Email</label>
              <input
                type="email"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="you@gmail.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors pr-12"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm transition-all mt-2"
            >
              Sign In
            </button>
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          Demo app built with React + Tailwind CSS
        </p>
      </div>
    </div>
  );
}