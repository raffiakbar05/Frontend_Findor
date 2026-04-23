'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, MapPin, Star, CheckCircle, SlidersHorizontal, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const KOTA = ['Semua Kota', 'Jakarta', 'Surabaya', 'Bandung', 'Yogyakarta', 'Bali', 'Malang', 'Sidoarjo'];

const KATEGORI = [
  'Semua Kategori',
  'Sound System',
  'Stage & Rigging',
  'Dekorasi',
  'Catering',
  'Dokumentasi',
  'Hiburan',
  'Lighting Design',
  'Wedding Organizer',
  'Photography',
];

const VENDORS = [
  { id: 'melody-aura-sound', name: 'Melody Aura Sound', kategori: 'Sound System', kota: 'Jakarta', lokasi: 'Sudirman, Jakarta', harga: 'Rp 15jt', rating: 4.9, ulasan: 241, verified: true, img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80', desc: 'Spesialis sound system profesional untuk berbagai skala acara.' },
  { id: 'atelier-decor', name: 'Atelier Decor', kategori: 'Dekorasi', kota: 'Tangerang', lokasi: 'Tangerang Selatan', harga: 'Rp 45jt', rating: 5.0, ulasan: 92, verified: true, img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80', desc: 'Dekorasi floral dan art direction untuk pernikahan mewah.' },
  { id: 'visual-soul-studio', name: 'Visual Soul Studio', kategori: 'Dokumentasi', kota: 'Jakarta', lokasi: 'Kemang, Jakarta', harga: 'Rp 20jt', rating: 4.8, ulasan: 180, verified: true, img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80', desc: 'Dokumentasi sinematik berkualitas tinggi untuk momen berharga.' },
  { id: 'savory-palette', name: 'Savory Palette', kategori: 'Catering', kota: 'Jakarta', lokasi: 'Kelapa Gading, Jakarta', harga: 'Rp 350rb', rating: 4.9, ulasan: 310, verified: true, img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80', desc: 'Catering premium dengan menu nusantara dan internasional.' },
  { id: 'lumina-studio', name: 'Lumina Studio Jakarta', kategori: 'Photography', kota: 'Jakarta', lokasi: 'Senopati, Jakarta Selatan', harga: 'Rp 8.5jt', rating: 4.9, ulasan: 124, verified: true, img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', desc: 'Studio fotografi pernikahan fine-art dengan sentuhan editorial.' },
  { id: 'spark-pro-light', name: 'Spark Pro Light', kategori: 'Lighting Design', kota: 'Surabaya', lokasi: 'Surabaya Pusat', harga: 'Rp 12jt', rating: 4.7, ulasan: 67, verified: true, img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80', desc: 'Desain pencahayaan artistik untuk panggung dan venue.' },
  { id: 'harmoni-wo', name: 'Harmoni Wedding Organizer', kategori: 'Wedding Organizer', kota: 'Bandung', lokasi: 'Dago, Bandung', harga: 'Rp 35jt', rating: 4.8, ulasan: 203, verified: true, img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80', desc: 'Wedding organizer berpengalaman dengan konsep yang personal.' },
  { id: 'sonic-systems', name: 'Sonic Systems Pro', kategori: 'Sound System', kota: 'Surabaya', lokasi: 'Surabaya Timur', harga: 'Rp 18jt', rating: 4.6, ulasan: 55, verified: false, img: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80', desc: 'Penyedia sound system skala besar untuk konser dan festival.' },
  { id: 'bali-stage-co', name: 'Bali Stage Co.', kategori: 'Stage & Rigging', kota: 'Bali', lokasi: 'Seminyak, Bali', harga: 'Rp 55jt', rating: 4.9, ulasan: 88, verified: true, img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80', desc: 'Konstruksi panggung dan rigging untuk event outdoor premium.' },
  { id: 'jogja-entertainment', name: 'Jogja Entertainment', kategori: 'Hiburan', kota: 'Yogyakarta', lokasi: 'Sleman, Yogyakarta', harga: 'Rp 8jt', rating: 4.7, ulasan: 142, verified: true, img: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=80', desc: 'Penyedia hiburan live music dan pertunjukan seni budaya.' },
  { id: 'malang-catering', name: 'Dapur Nusantara', kategori: 'Catering', kota: 'Malang', lokasi: 'Malang Kota', harga: 'Rp 200rb', rating: 4.5, ulasan: 76, verified: false, img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80', desc: 'Catering masakan nusantara autentik untuk acara keluarga.' },
  { id: 'bandung-photo', name: 'Capture Moment Studio', kategori: 'Photography', kota: 'Bandung', lokasi: 'Braga, Bandung', harga: 'Rp 6jt', rating: 4.6, ulasan: 98, verified: true, img: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80', desc: 'Fotografer profesional spesialis prewedding dan pernikahan.' },
];

export default function BrowsePage() {
  const [query, setQuery] = useState('');
  const [kota, setKota] = useState('Semua Kota');
  const [kategori, setKategori] = useState('Semua Kategori');
  const [sudahDicari, setSudahDicari] = useState(false);

  const hasil = useMemo(() => {
    if (!sudahDicari) return VENDORS;
    return VENDORS.filter(v => {
      const cocokQuery = !query || v.name.toLowerCase().includes(query.toLowerCase()) || v.kategori.toLowerCase().includes(query.toLowerCase()) || v.desc.toLowerCase().includes(query.toLowerCase());
      const cocokKota = kota === 'Semua Kota' || v.kota === kota;
      const cocokKategori = kategori === 'Semua Kategori' || v.kategori === kategori;
      return cocokQuery && cocokKota && cocokKategori;
    });
  }, [query, kota, kategori, sudahDicari]);

  const handleCari = () => setSudahDicari(true);
  const handleReset = () => { setQuery(''); setKota('Semua Kota'); setKategori('Semua Kategori'); setSudahDicari(false); };

  return (
    <main style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <Navbar />

      {/* Header */}
      <section style={{ background: 'var(--forest)', paddingTop: 100, paddingBottom: 48 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 8, letterSpacing: '0.06em', fontWeight: 600 }}>JELAJAHI VENDOR</p>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: 'white', marginBottom: 8, letterSpacing: '-1px' }}>
            Temukan Vendor Terbaik<br />untuk Acara Anda
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 32 }}>
            {VENDORS.length}+ vendor terverifikasi siap membantu mewujudkan acara impian Anda.
          </p>

          {/* Search & Filter Bar */}
          <div style={{ background: 'white', borderRadius: 16, padding: 8, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
            {/* Search input */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 200, padding: '8px 16px', background: '#f9fafb', borderRadius: 10 }}>
              <Search size={16} color="#9ca3af" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCari()}
                placeholder="Cari nama vendor atau layanan..."
                style={{ border: 'none', outline: 'none', flex: 1, fontSize: 14, color: '#111827', background: 'transparent', fontFamily: 'inherit' }}
              />
              {query && <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}><X size={14} color="#9ca3af" /></button>}
            </div>

            {/* Divider */}
            <div style={{ width: 1, height: 32, background: '#e5e7eb' }} />

            {/* Kategori */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: '#f9fafb', borderRadius: 10, minWidth: 180 }}>
              <SlidersHorizontal size={15} color="#9ca3af" />
              <select
                value={kategori}
                onChange={e => setKategori(e.target.value)}
                style={{ border: 'none', outline: 'none', fontSize: 14, color: '#374151', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500 }}
              >
                {KATEGORI.map(k => <option key={k}>{k}</option>)}
              </select>
            </div>

            {/* Divider */}
            <div style={{ width: 1, height: 32, background: '#e5e7eb' }} />

            {/* Kota */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: '#f9fafb', borderRadius: 10, minWidth: 160 }}>
              <MapPin size={15} color="#9ca3af" />
              <select
                value={kota}
                onChange={e => setKota(e.target.value)}
                style={{ border: 'none', outline: 'none', fontSize: 14, color: '#374151', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500 }}
              >
                {KOTA.map(k => <option key={k}>{k}</option>)}
              </select>
            </div>

            {/* Tombol Cari */}
            <button
              onClick={handleCari}
              style={{ padding: '12px 28px', borderRadius: 10, background: 'var(--forest)', color: 'white', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              Cari Vendor
            </button>
          </div>
        </div>
      </section>

      {/* Hasil */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Info hasil */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>
              {sudahDicari ? `${hasil.length} vendor ditemukan` : `Semua Vendor (${VENDORS.length})`}
            </p>
            {sudahDicari && (kota !== 'Semua Kota' || kategori !== 'Semua Kategori' || query) && (
              <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                {query && <span style={{ fontSize: 12, background: '#f0fdf4', color: '#16a34a', padding: '3px 10px', borderRadius: 999, fontWeight: 500 }}>"{query}"</span>}
                {kategori !== 'Semua Kategori' && <span style={{ fontSize: 12, background: '#f0fdf4', color: '#16a34a', padding: '3px 10px', borderRadius: 999, fontWeight: 500 }}>{kategori}</span>}
                {kota !== 'Semua Kota' && <span style={{ fontSize: 12, background: '#f0fdf4', color: '#16a34a', padding: '3px 10px', borderRadius: 999, fontWeight: 500 }}>{kota}</span>}
                <button onClick={handleReset} style={{ fontSize: 12, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, padding: '3px 0' }}>× Reset filter</button>
              </div>
            )}
          </div>
        </div>

        {/* Grid vendor */}
        {hasil.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontSize: 40, marginBottom: 16 }}>🔍</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Vendor tidak ditemukan</p>
            <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 24 }}>Coba ubah kata kunci, kategori, atau kota yang Anda cari.</p>
            <button onClick={handleReset} style={{ padding: '10px 24px', borderRadius: 999, background: 'var(--forest)', color: 'white', fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
              Tampilkan Semua Vendor
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {hasil.map(v => (
              <Link key={v.id} href={`/vendor/${v.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', border: '1px solid #f0f0f0', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
                >
                  {/* Gambar */}
                  <div style={{ position: 'relative', height: 200, overflow: 'hidden', background: '#e5e7eb' }}>
                    <img src={v.img} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {/* Badge verified */}
                    {v.verified && (
                      <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.95)', borderRadius: 999, padding: '4px 10px' }}>
                        <CheckCircle size={11} color="#16a34a" fill="#16a34a" />
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#16a34a' }}>TERVERIFIKASI</span>
                      </div>
                    )}
                    {/* Rating */}
                    <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.95)', borderRadius: 999, padding: '4px 10px' }}>
                      <Star size={11} fill="#f97316" color="#f97316" />
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>{v.rating}</span>
                      <span style={{ fontSize: 11, color: '#6b7280' }}>({v.ulasan})</span>
                    </div>
                    {/* Kategori tag */}
                    <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(26,60,52,0.85)', borderRadius: 999, padding: '4px 12px' }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: 'white' }}>{v.kategori}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: '18px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
                      <p style={{ fontSize: 16, fontWeight: 700, color: '#111827', lineHeight: 1.3 }}>{v.name}</p>
                    </div>
                    <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6, marginBottom: 12 }}>{v.desc}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 16 }}>
                      <MapPin size={12} color="#9ca3af" />
                      <span style={{ fontSize: 12, color: '#9ca3af' }}>{v.lokasi}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f3f4f6', paddingTop: 14 }}>
                      <div>
                        <p style={{ fontSize: 11, color: '#9ca3af', marginBottom: 2 }}>Mulai dari</p>
                        <p style={{ fontSize: 16, fontWeight: 800, color: '#1a3c34' }}>{v.harga}</p>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#f97316' }}>Lihat Portfolio →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />

      <style>{`
        @media (max-width: 1024px) {
          .vendor-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .vendor-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
