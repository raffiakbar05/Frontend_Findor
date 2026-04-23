'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight, Users, ShieldCheck } from 'lucide-react';

type Role = 'user' | 'admin';

const ROLES: { key: Role; label: string; desc: string; icon: React.ReactNode; color: string; bg: string }[] = [
  {
    key: 'user',
    label: 'User',
    desc: 'Cari & booking vendor event',
    icon: <Users size={20} />,
    color: '#0369a1',
    bg: '#e0f2fe',
  },
  {
    key: 'admin',
    label: 'Admin',
    desc: 'Kelola platform Findor',
    icon: <ShieldCheck size={20} />,
    color: '#1a3c34',
    bg: '#f0fdf4',
  },
];

export default function LoginPage() {
  const [role, setRole] = useState<Role>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  const activeRole = ROLES.find(r => r.key === role)!;

  return (
    <main style={{ minHeight: '100vh', background: '#f5f5f0', display: 'flex', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>

      {/* Left panel */}
      <div style={{ flex: 1, background: '#1a3c34', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 64px', position: 'relative', overflow: 'hidden' }} className="login-left">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }} />
        <div style={{ position: 'relative' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <img src="/logo_findor.jpg" alt="Findor" style={{ height: 56, width: 'auto', objectFit: 'contain' }} />
          </Link>
          <div style={{ marginTop: 60 }}>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 900, color: 'white', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 20 }}>
              Selamat Datang<br />Kembali.
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, maxWidth: 340 }}>
              Platform kurasi vendor event premium terpercaya di Indonesia. Masuk untuk melanjutkan.
            </p>
          </div>
          <div style={{ marginTop: 60, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { val: '500+', label: 'Vendor Terverifikasi' },
              { val: '12.000+', label: 'Event Sukses' },
              { val: '98%', label: 'Tingkat Kepuasan' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 900, color: 'white' }}>{s.val}</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ width: 480, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 48px', background: 'white', overflowY: 'auto' }} className="login-right">

        <div style={{ marginBottom: 36 }}>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#111827', letterSpacing: '-0.5px', marginBottom: 6 }}>Masuk ke Akun</h1>
          <p style={{ fontSize: 13, color: '#6b7280' }}>
            Belum punya akun?{' '}
            <Link href="/register" style={{ color: '#1a3c34', fontWeight: 700, textDecoration: 'none' }}>Daftar sekarang</Link>
          </p>
        </div>

        {/* Role selector */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#374151', letterSpacing: '0.05em', marginBottom: 10 }}>MASUK SEBAGAI</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {ROLES.map(r => (
              <button
                key={r.key}
                onClick={() => setRole(r.key)}
                style={{
                  padding: '12px 8px', borderRadius: 12, border: `2px solid ${role === r.key ? r.color : '#e5e7eb'}`,
                  background: role === r.key ? r.bg : 'white',
                  cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'inherit',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                }}
              >
                <span style={{ color: role === r.key ? r.color : '#9ca3af' }}>{r.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: role === r.key ? r.color : '#6b7280' }}>{r.label}</span>
                <span style={{ fontSize: 10, color: role === r.key ? r.color : '#9ca3af', textAlign: 'center', lineHeight: 1.4 }}>{r.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="email@contoh.com"
              style={inputStyle}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label style={labelStyle}>Password</label>
              <Link href="#" style={{ fontSize: 12, color: '#1a3c34', fontWeight: 600, textDecoration: 'none' }}>Lupa password?</Link>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Masukkan password"
                style={{ ...inputStyle, paddingRight: 44 }}
              />
              <button type="button" onClick={() => setShowPass(v => !v)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex' }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 8, width: '100%', padding: '13px', borderRadius: 999,
              background: loading ? '#e5e7eb' : '#1a3c34',
              color: loading ? '#9ca3af' : 'white',
              fontSize: 14, fontWeight: 700, border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontFamily: 'inherit', transition: 'all 0.2s',
            }}
          >
            {loading ? 'Memproses...' : <>Masuk sebagai {activeRole.label} <ArrowRight size={16} /></>}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
          <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
          <span style={{ fontSize: 12, color: '#9ca3af' }}>atau</span>
          <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
        </div>

        <button style={{ width: '100%', padding: '12px', borderRadius: 999, border: '1.5px solid #e5e7eb', background: 'white', fontSize: 14, fontWeight: 600, color: '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontFamily: 'inherit' }}>
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Lanjutkan dengan Google
        </button>

        <p style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center', marginTop: 28, lineHeight: 1.7 }}>
          Dengan masuk, Anda menyetujui <Link href="/how-it-works" style={{ color: '#1a3c34', fontWeight: 600 }}>Syarat & Ketentuan</Link> dan <Link href="/how-it-works" style={{ color: '#1a3c34', fontWeight: 600 }}>Kebijakan Privasi</Link> Findor.
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .login-left { display: none !important; }
          .login-right { width: 100% !important; padding: 40px 24px !important; }
        }
      `}</style>
    </main>
  );
}

const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 700, color: '#374151', letterSpacing: '0.03em', display: 'block', marginBottom: 6 };
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px', borderRadius: 10, fontSize: 13,
  border: '1.5px solid #e5e7eb', outline: 'none', fontFamily: 'inherit',
  color: '#111827', background: 'white', boxSizing: 'border-box',
};
