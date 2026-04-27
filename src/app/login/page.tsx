'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const user = { id: 1, name: nama || email.split('@')[0], role: 'user', isVendor: false };
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/');
    }, 1200);
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', fontFamily: 'Plus Jakarta Sans, sans-serif', background: '#f7f7f5' }}>

      {/* ── Left Panel ── */}
      <div
        className="login-left"
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          background: '#0d3b2e',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px 56px',
        }}
      >
        {/* Background photo */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1400&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.18,
        }} />

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, rgba(13,59,46,0.6) 0%, rgba(13,59,46,0.95) 100%)',
        }} />

        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 280, height: 280, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }} />

        {/* Logo */}
        <div style={{ position: 'relative', zIndex: 2, animation: 'fadeUp 0.7s 0.1s both' }}>
          <Link href="/">
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'white',
              borderRadius: 14,
              padding: '8px 14px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}>
              <img src="/logo_findor.jpg" alt="Findor" style={{ height: 36, width: 'auto', objectFit: 'contain', display: 'block' }} />
            </div>
          </Link>
        </div>

        {/* Headline & stats */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ animation: 'fadeUp 0.7s 0.25s both' }}>
            <h2 style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(38px, 3.8vw, 62px)',
              fontWeight: 900,
              color: 'white',
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
              marginBottom: 20,
            }}>
              Temukan Vendor<br />
              <em style={{ fontStyle: 'italic', color: '#f5a623', fontWeight: 300 }}>Terbaik</em> untuk<br />
              Event Anda.
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, maxWidth: 340 }}>
              Platform kurasi vendor event premium terpercaya di Indonesia.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 36, marginTop: 52, animation: 'fadeUp 0.7s 0.4s both' }}>
            {[
              { val: '2.400+', label: 'Vendor' },
              { val: '18rb+', label: 'Event Sukses' },
              { val: '99%', label: 'Kepuasan' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: 30, fontWeight: 900, color: 'white', lineHeight: 1 }}>
                  {s.val}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>

      {/* ── Right Panel ── */}
      <div
        className="login-right"
        style={{
          width: 500,
          background: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '56px 52px',
          overflowY: 'auto',
          animation: 'fadeIn 0.5s ease both',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 40, animation: 'fadeUp 0.6s 0.15s both' }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px', marginBottom: 8, lineHeight: 1.2 }}>
            Masuk ke Findor
          </h1>
          <p style={{ fontSize: 14, color: '#94a3b8' }}>
            Belum punya akun?{' '}
            <Link href="/register" style={{ color: '#0d3b2e', fontWeight: 700, textDecoration: 'none' }}>
              Daftar gratis
            </Link>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18, animation: 'fadeUp 0.6s 0.28s both' }}>

          {/* Nama */}
          <div>
            <label style={labelStyle}>Nama</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                value={nama}
                onChange={e => setNama(e.target.value)}
                onFocus={() => setFocused('nama')}
                onBlur={() => setFocused(null)}
                placeholder="Nama lengkap kamu"
                style={{
                  ...inputStyle,
                  borderColor: focused === 'nama' ? '#0d3b2e' : '#e2e8f0',
                  boxShadow: focused === 'nama' ? '0 0 0 3px rgba(13,59,46,0.08)' : 'none',
                }}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label style={labelStyle}>Email</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                placeholder="email@contoh.com"
                style={{
                  ...inputStyle,
                  borderColor: focused === 'email' ? '#0d3b2e' : '#e2e8f0',
                  boxShadow: focused === 'email' ? '0 0 0 3px rgba(13,59,46,0.08)' : 'none',
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label style={labelStyle}>Password</label>
              <Link href="#" style={{ fontSize: 12, color: '#0d3b2e', fontWeight: 600, textDecoration: 'none' }}>
                Lupa password?
              </Link>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
                placeholder="Masukkan password"
                style={{
                  ...inputStyle,
                  paddingRight: 44,
                  borderColor: focused === 'password' ? '#0d3b2e' : '#e2e8f0',
                  boxShadow: focused === 'password' ? '0 0 0 3px rgba(13,59,46,0.08)' : 'none',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', padding: 0 }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 4,
              width: '100%',
              padding: '14px',
              borderRadius: 12,
              background: loading ? '#e2e8f0' : '#0d3b2e',
              color: loading ? '#94a3b8' : 'white',
              fontSize: 15,
              fontWeight: 700,
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              fontFamily: 'inherit',
              transition: 'all 0.2s',
              boxShadow: loading ? 'none' : '0 4px 20px rgba(13,59,46,0.25)',
              letterSpacing: '-0.01em',
            }}
            onMouseEnter={e => { if (!loading) (e.currentTarget.style.background = '#1a5c44'); }}
            onMouseLeave={e => { if (!loading) (e.currentTarget.style.background = '#0d3b2e'); }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="spin-dot" />
                Memproses...
              </span>
            ) : (
              <>Masuk <ArrowRight size={16} /></>
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '28px 0', animation: 'fadeUp 0.6s 0.4s both' }}>
          <div style={{ flex: 1, height: 1, background: '#f1f5f9' }} />
          <span style={{ fontSize: 12, color: '#cbd5e1', fontWeight: 500 }}>atau lanjutkan dengan</span>
          <div style={{ flex: 1, height: 1, background: '#f1f5f9' }} />
        </div>

        {/* Google */}
        <button
          style={{
            width: '100%',
            padding: '13px',
            borderRadius: 12,
            border: '1.5px solid #e2e8f0',
            background: 'white',
            fontSize: 14,
            fontWeight: 600,
            color: '#374151',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            fontFamily: 'inherit',
            transition: 'border-color 0.15s, box-shadow 0.15s',
            animation: 'fadeUp 0.6s 0.45s both',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </button>

        {/* Footer note */}
        <p style={{ fontSize: 11, color: '#cbd5e1', textAlign: 'center', marginTop: 32, lineHeight: 1.7, animation: 'fadeUp 0.6s 0.5s both' }}>
          Dengan masuk, Anda menyetujui{' '}
          <Link href="/how-it-works" style={{ color: '#64748b', fontWeight: 600, textDecoration: 'none' }}>Syarat & Ketentuan</Link>
          {' '}dan{' '}
          <Link href="/how-it-works" style={{ color: '#64748b', fontWeight: 600, textDecoration: 'none' }}>Kebijakan Privasi</Link>
          {' '}Findor.
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spin-dot {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          display: inline-block;
          animation: spin 0.7s linear infinite;
        }
        @media (max-width: 768px) {
          .login-left { display: none !important; }
          .login-right { width: 100% !important; padding: 40px 24px !important; }
        }
      `}</style>
    </main>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  color: '#374151',
  letterSpacing: '0.03em',
  display: 'block',
  marginBottom: 7,
  textTransform: 'uppercase',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 10,
  fontSize: 14,
  border: '1.5px solid #e2e8f0',
  outline: 'none',
  fontFamily: 'inherit',
  color: '#0f172a',
  background: '#fafafa',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};
