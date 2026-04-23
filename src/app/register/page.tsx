'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight, Users, ShieldCheck, CheckCircle } from 'lucide-react';

type Role = 'user' | 'admin';

const ROLES: { key: Role; label: string; desc: string; perks: string[]; icon: React.ReactNode; color: string; bg: string; border: string }[] = [
  {
    key: 'user',
    label: 'User',
    desc: 'Saya ingin mencari & memesan vendor event',
    perks: ['Akses 500+ vendor terverifikasi', 'Booking & kelola event', 'Garansi dana kembali'],
    icon: <Users size={22} />,
    color: '#0369a1',
    bg: '#e0f2fe',
    border: '#7dd3fc',
  },
  {
    key: 'admin',
    label: 'Admin',
    desc: 'Saya ingin mengelola platform Findor',
    perks: ['Kelola seluruh vendor & user', 'Verifikasi pendaftaran vendor', 'Akses dashboard & analitik'],
    icon: <ShieldCheck size={22} />,
    color: '#1a3c34',
    bg: '#f0fdf4',
    border: '#86efac',
  },
];

export default function RegisterPage() {
  const [role, setRole] = useState<Role>('user');
  const [step, setStep] = useState<'role' | 'form'>('role');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));

  const canSubmit = form.name && form.email && form.phone && form.password.length >= 8 && form.password === form.confirm;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1500);
  };

  const activeRole = ROLES.find(r => r.key === role)!;

  if (done) {
    return (
      <main style={{ minHeight: '100vh', background: '#f5f5f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        <div style={{ textAlign: 'center', maxWidth: 440, padding: '0 24px' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <CheckCircle size={40} color="#16a34a" />
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: '#111827', marginBottom: 10, letterSpacing: '-0.5px' }}>Akun Berhasil Dibuat!</h2>
          <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.8, marginBottom: 8 }}>
            Selamat datang di Findor, <strong>{form.name}</strong>!
          </p>
          <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.8, marginBottom: 32 }}>
            {role === 'admin'
              ? 'Akun admin Anda sudah aktif. Silakan masuk untuk mengakses dashboard pengelolaan platform.'
              : 'Akun Anda sudah aktif. Mulai jelajahi vendor premium pilihan Findor.'}
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/login" style={{ padding: '11px 24px', borderRadius: 999, background: '#1a3c34', color: 'white', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              Masuk Sekarang
            </Link>
            {role === 'user' && (
              <Link href="/browse" style={{ padding: '11px 24px', borderRadius: 999, border: '1.5px solid #e5e7eb', color: '#374151', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                Jelajahi Vendor
              </Link>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: '#f5f5f0', display: 'flex', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>

      {/* Left panel */}
      <div style={{ flex: 1, background: '#1a3c34', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 64px', position: 'relative', overflow: 'hidden' }} className="login-left">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }} />
        <div style={{ position: 'relative' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <img src="/logo_findor.jpg" alt="Findor" style={{ height: 56, width: 'auto', objectFit: 'contain' }} />
          </Link>
          <div style={{ marginTop: 60 }}>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 900, color: 'white', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 20 }}>
              Bergabung dengan<br />Komunitas Findor.
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, maxWidth: 340 }}>
              Daftarkan diri Anda dan mulai pengalaman event premium bersama ratusan vendor terpercaya.
            </p>
          </div>
          {/* Active role perks */}
          <div style={{ marginTop: 48, background: 'rgba(255,255,255,0.07)', borderRadius: 16, padding: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', marginBottom: 14 }}>
              KEUNTUNGAN SEBAGAI {activeRole.label.toUpperCase()}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {activeRole.perks.map(p => (
                <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CheckCircle size={14} color="#4ade80" />
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ width: 500, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px', background: 'white', overflowY: 'auto' }} className="login-right">

        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#111827', letterSpacing: '-0.5px', marginBottom: 6 }}>Buat Akun Baru</h1>
          <p style={{ fontSize: 13, color: '#6b7280' }}>
            Sudah punya akun?{' '}
            <Link href="/login" style={{ color: '#1a3c34', fontWeight: 700, textDecoration: 'none' }}>Masuk di sini</Link>
          </p>
        </div>

        {/* Step: pilih role */}
        {step === 'role' && (
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#374151', letterSpacing: '0.05em', marginBottom: 12 }}>DAFTAR SEBAGAI</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              {ROLES.map(r => (
                <button
                  key={r.key}
                  onClick={() => setRole(r.key)}
                  style={{
                    padding: '16px 18px', borderRadius: 14,
                    border: `2px solid ${role === r.key ? r.border : '#e5e7eb'}`,
                    background: role === r.key ? r.bg : 'white',
                    cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'inherit',
                    display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
                  }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: role === r.key ? 'white' : '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: role === r.key ? r.color : '#9ca3af', flexShrink: 0 }}>
                    {r.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: role === r.key ? r.color : '#111827', marginBottom: 2 }}>{r.label}</p>
                    <p style={{ fontSize: 12, color: role === r.key ? r.color : '#6b7280', opacity: role === r.key ? 0.8 : 1 }}>{r.desc}</p>
                  </div>
                  {role === r.key && (
                    <div style={{ marginLeft: 'auto', width: 20, height: 20, borderRadius: '50%', background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle size={12} color="white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep('form')}
              style={{ width: '100%', padding: '13px', borderRadius: 999, background: '#1a3c34', color: 'white', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'inherit' }}
            >
              Lanjut sebagai {activeRole.label} <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Step: isi form */}
        {step === 'form' && (
          <div>
            {/* Role badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: activeRole.bg, border: `1px solid ${activeRole.border}`, borderRadius: 999, padding: '5px 12px', marginBottom: 20 }}>
              <span style={{ color: activeRole.color }}>{activeRole.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: activeRole.color }}>Mendaftar sebagai {activeRole.label}</span>
              <button onClick={() => setStep('role')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: activeRole.color, fontSize: 11, fontWeight: 600, fontFamily: 'inherit', marginLeft: 4 }}>Ubah</button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={labelStyle}>Nama Lengkap *</label>
                <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Nama lengkap Anda" required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Email *</label>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="email@contoh.com" required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>No. WhatsApp *</label>
                <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="08xxxxxxxxxx" required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Password * <span style={{ color: '#9ca3af', fontWeight: 400 }}>min. 8 karakter</span></label>
                <div style={{ position: 'relative' }}>
                  <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => set('password', e.target.value)} placeholder="Buat password" required style={{ ...inputStyle, paddingRight: 44 }} />
                  <button type="button" onClick={() => setShowPass(v => !v)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex' }}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Konfirmasi Password *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirm ? 'text' : 'password'} value={form.confirm} onChange={e => set('confirm', e.target.value)} placeholder="Ulangi password" required
                    style={{ ...inputStyle, paddingRight: 44, borderColor: form.confirm && form.confirm !== form.password ? '#fca5a5' : '#e5e7eb' }}
                  />
                  <button type="button" onClick={() => setShowConfirm(v => !v)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex' }}>
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {form.confirm && form.confirm !== form.password && (
                  <p style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>Password tidak cocok</p>
                )}
              </div>

              <button
                type="submit" disabled={!canSubmit || loading}
                style={{
                  marginTop: 6, width: '100%', padding: '13px', borderRadius: 999,
                  background: canSubmit && !loading ? '#1a3c34' : '#e5e7eb',
                  color: canSubmit && !loading ? 'white' : '#9ca3af',
                  fontSize: 14, fontWeight: 700, border: 'none',
                  cursor: canSubmit && !loading ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  fontFamily: 'inherit', transition: 'all 0.2s',
                }}
              >
                {loading ? 'Membuat akun...' : <>Buat Akun {activeRole.label} <ArrowRight size={16} /></>}
              </button>
            </form>
          </div>
        )}

        <p style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center', marginTop: 24, lineHeight: 1.7 }}>
          Dengan mendaftar, Anda menyetujui <Link href="/how-it-works" style={{ color: '#1a3c34', fontWeight: 600 }}>Syarat & Ketentuan</Link> dan <Link href="/how-it-works" style={{ color: '#1a3c34', fontWeight: 600 }}>Kebijakan Privasi</Link> Findor.
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
