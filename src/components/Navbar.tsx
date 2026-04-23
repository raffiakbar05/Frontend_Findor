'use client';
import Link from 'next/link';
import { Bell, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleKurator = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === '/') {
      document.getElementById('kurator')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#kurator');
    }
    setOpen(false);
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--gray-100)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img src="/logo_findor.jpg" alt="Findor" style={{ height: 52, width: 'auto', objectFit: 'contain' }} />
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
          <Link href="/browse" style={{ color: 'var(--text-secondary)', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--forest)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
            Jelajahi Vendor
          </Link>
          <Link href="#cara-kerja" style={{ color: 'var(--text-secondary)', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--forest)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
            Cara Kerja
          </Link>
          <a href="#kurator" onClick={handleKurator} style={{ color: 'var(--text-secondary)', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s', cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--forest)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
            Kurator Kami
          </a>
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/login" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 14px', borderRadius: 999, color: 'var(--text-secondary)', transition: 'all 0.2s', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--forest)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            Masuk
          </Link>
          <Link href="/register" style={{ background: 'var(--gray-100)', border: 'none', cursor: 'pointer', padding: '8px 16px', borderRadius: 999, color: 'var(--text-primary)', fontSize: 14, fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--gray-200)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--gray-100)')}
          >
            Daftar
          </Link>
          <Link href="/vendor/register" className="btn-forest" style={{ marginLeft: 8 }}>
            Daftarkan Layanan
          </Link>
          {/* Mobile menu toggle */}
          <button onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }} className="mobile-menu-btn">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: 'var(--white)', borderTop: '1px solid var(--gray-100)', padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Link href="/browse" style={{ color: 'var(--text-primary)', fontWeight: 500, textDecoration: 'none' }} onClick={() => setOpen(false)}>Jelajahi Vendor</Link>
          <Link href="#cara-kerja" style={{ color: 'var(--text-primary)', fontWeight: 500, textDecoration: 'none' }} onClick={() => setOpen(false)}>Cara Kerja</Link>
          <a href="#kurator" onClick={handleKurator} style={{ color: 'var(--text-primary)', fontWeight: 500, textDecoration: 'none', cursor: 'pointer' }}>Kurator Kami</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
