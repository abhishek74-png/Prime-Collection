import { FormEvent, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const RETURN_TO_KEY = 'luxor-return-to';

export const AuthPage = () => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(name, email, password);
      }

      const returnTo = localStorage.getItem(RETURN_TO_KEY) || '#checkout';
      localStorage.removeItem(RETURN_TO_KEY);
      window.location.hash = returnTo;
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="auth" className="relative min-h-screen overflow-hidden bg-black py-20 md:py-0">
      <video
        src="/Geometric_crystals_light_sweep_202606122143.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover brightness-[1.18] contrast-[1.05] saturate-[1.05]"
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-black/45" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 35%, rgba(255,255,255,0.10), transparent 30%), radial-gradient(circle at 15% 15%, rgba(120,160,255,0.16), transparent 32%), radial-gradient(circle at 85% 75%, rgba(255,255,255,0.10), transparent 34%), linear-gradient(to bottom, rgba(0,0,0,0.28), rgba(0,0,0,0.78))'
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, transparent 0%, transparent 52%, rgba(0,0,0,0.72) 100%)'
        }}
      />

      <div className="relative z-10 flex min-h-screen items-center px-4 md:px-6">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[0.85fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <p className="mb-5 text-[11px] uppercase tracking-[0.46em] text-white/55">
              Secure Checkout
            </p>
            <h1 className="font-display text-balance text-4xl font-thin leading-tight tracking-[-0.055em] text-white md:text-6xl lg:text-7xl">
              Enter the Luxor garage.
            </h1>
            <p className="mt-6 text-sm leading-8 tracking-[0.16em] text-white/65">
              Guests can browse and add items to cart. Authentication is required only when proceeding to checkout.
            </p>
          </motion.div>

          <motion.form
            ref={formRef}
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={submit}
            className="rounded-[2rem] border border-white/8 p-6 shadow-[0_40px_160px_rgba(0,0,0,0.55)] backdrop-blur-[20px] md:p-8"
            style={{
              background: 'rgba(15,15,15,0.45)'
            }}
          >
            <div className="mb-8 flex rounded-full bg-white/5 p-1">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 rounded-full px-5 py-3 text-xs font-medium uppercase tracking-[0.22em] transition ${
                  mode === 'login' ? 'bg-white text-black' : 'text-white/55 hover:text-white'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`flex-1 rounded-full px-5 py-3 text-xs font-medium uppercase tracking-[0.22em] transition ${
                  mode === 'register' ? 'bg-white text-black' : 'text-white/55 hover:text-white'
                }`}
              >
                Register
              </button>
            </div>

            {mode === 'register' && (
              <label className="mb-5 block">
                <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-white/50">Name</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-white/24"
                  placeholder="Your name"
                  required
                />
              </label>
            )}

            <label className="mb-5 block">
              <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-white/50">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-white/24"
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="mb-6 block">
              <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-white/50">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-white/24"
                placeholder="Minimum 6 characters"
                minLength={6}
                required
              />
            </label>

            {error && <p className="mb-5 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-white px-6 py-3 text-xs font-medium uppercase tracking-[0.24em] text-black transition hover:bg-white/85 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Please wait…' : mode === 'login' ? 'Continue to Checkout' : 'Create Account'}
            </button>

            <p className="mt-6 text-center text-xs leading-6 tracking-[0.14em] text-white/45">
              Your guest cart will be merged securely after login.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
