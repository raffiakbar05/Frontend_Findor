'use client';
import Link from 'next/link';
import {
  Star, CheckCircle, Zap, Shield,
  ArrowRight, ChevronRight, Volume2, Lightbulb,
  Camera, UtensilsCrossed, Tent, Music, MapPin
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CATEGORIES = [
  { icon: <Volume2 size={22} />, label: 'Sound System', count: 87 },
  { icon: <Tent size={22} />, label: 'Stage & Rigging', count: 124, featured: true },
  { icon: <Lightbulb size={22} />, label: 'Decoration', count: 203 },
  { icon: <UtensilsCrossed size={22} />, label: 'Catering Service', count: 156, featured: true },
  { icon: <Camera size={22} />, label: 'Documentation', count: 91 },
  { icon: <Music size={22} />, label: 'Entertainment', count: 64 },
  { icon: <Lightbulb size={22} />, label: 'Lighting Design', count: 48, featured: true },
];

const POPULAR_VENDORS = [
  { name: 'Melody Aura Sound', category: 'Sound & Audio Specialist', location: 'Suleman, Jakarta', price: 'Rp 15jt', rating: 4.9, reviews: 241, img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80' },
  { name: 'Atelier Decor', category: 'Floral & Art Direction', location: 'Tangerang Selatan', price: 'Rp 45jt', rating: 5.0, reviews: 92, img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80' },
  { name: 'Visual Soul Studio', category: 'Cinematic Documentation', location: 'Kemang, Jakarta', price: 'Rp 20jt', rating: 4.8, reviews: 180, img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80' },
  { name: 'Savory Palette', category: 'Premium Catering Group', location: 'Kelion Jenal, Jakarta', price: 'Rp 350rb', rating: 4.9, reviews: 310, img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80' },
];

const TRUST_ITEMS = [
  { icon: <Shield size={18} />, title: 'Garansi Layanan', desc: 'Dana kembali 100% jika vendor tidak hadir di hari H.' },
  { icon: <CheckCircle size={18} />, title: 'Verifikasi 5 Tahap', desc: 'Kami mengecek langsung kualitas fisik peralatan vendor.' },
];

export default function HomePage() {

  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'var(--forest)',
      }}>
        {/* Background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.25,
        }} />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(13,59,46,0.95) 50%, rgba(13,59,46,0.5) 100%)',
        }} />

        <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '120px 24px 80px', width: '100%' }}>
          {/* Label */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', borderRadius: 'var(--radius-full)', padding: '6px 14px', marginBottom: 28, border: '1px solid rgba(255,255,255,0.15)' }} className="animate-fade-up">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--amber)' }} />
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 500, letterSpacing: '0.04em' }}>THE CURATED GALLERY</span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up-delay-1" style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 'clamp(42px, 6vw, 80px)',
            fontWeight: 900,
            color: 'var(--white)',
            lineHeight: 1.05,
            letterSpacing: '-2px',
            maxWidth: 640,
            marginBottom: 32,
          }}>
            Wujudkan Event<br />
            Tanpa Kompromi<span style={{ color: 'var(--amber)' }}>.</span>
          </h1>

          {/* CTA Button */}
          <div className="animate-fade-up-delay-2" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/browse" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 16, padding: '14px 32px' }}>
              Cari Vendor <ArrowRight size={18} />
            </Link>
            <Link href="/browse" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 16, padding: '14px 32px' }}>
              Lihat Semua Vendor
            </Link>
          </div>
        </div>
      </section>

      {/* ── KATEGORI UTAMA ── */}
      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 32, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: 6 }}>Kategori Utama</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>Temukan spesialis untuk setiap detail acara Anda.</p>
            </div>
            <Link href="/search" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--forest)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
              Lihat Semua Kategori <ChevronRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {CATEGORIES.map((cat, i) => (
              <Link key={cat.label} href={`/search?kategori=${cat.label}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'transform 0.25s',
                  background: cat.featured ? 'var(--forest)' : 'var(--gray-50)',
                  border: cat.featured ? 'none' : '1px solid var(--gray-100)',
                  aspectRatio: (i === 1 || i === 6) ? '1' : 'auto',
                  padding: cat.featured ? 0 : 24,
                  minHeight: 120,
                  display: 'flex',
                  alignItems: cat.featured ? 'flex-end' : 'center',
                }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>

                  {cat.featured ? (
                    <>
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,59,46,0.9) 0%, rgba(13,59,46,0.2) 100%)' }} />
                      <div style={{ position: 'relative', padding: 20 }}>
                        <div style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>{cat.icon}</div>
                        <div style={{ fontWeight: 700, color: 'var(--white)', fontSize: 16 }}>{cat.label}</div>
                        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{cat.count} Vendor Terverifikasi</div>
                      </div>
                    </>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ color: 'var(--forest)' }}>{cat.icon}</div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 15 }}>{cat.label}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{cat.count} vendor</div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── VENDOR TERPOPULER ── */}
      <section style={{ padding: '80px 0', background: 'var(--gray-50)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 32, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: 6 }}>Vendor Terpopuler</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>Yang paling banyak dicari dan dipercaya oleh klien premium.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {POPULAR_VENDORS.map(v => (
              <Link key={v.name} href={`/vendor/${v.name.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none' }}>
                <div className="vendor-card">
                  <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                    <img src={v.img} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
                    <div style={{ position: 'absolute', top: 10, left: 10 }}>
                      <span className="badge badge-verified"><CheckCircle size={10} /> VERIFIED</span>
                    </div>
                    <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(255,255,255,0.9)', borderRadius: 'var(--radius-full)', padding: '3px 8px', fontSize: 12, fontWeight: 700, color: 'var(--forest)', display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Star size={10} fill="var(--amber)" color="var(--amber)" /> {v.rating}
                    </div>
                  </div>
                  <div style={{ padding: 16 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                      {v.name}
                      <CheckCircle size={14} color="var(--verified-green)" fill="var(--verified-green)" />
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>{v.category}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
                      <MapPin size={11} /> {v.location}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Starts from</span>
                        <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--forest)' }}>{v.price}</div>
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--amber)', fontWeight: 600, textDecoration: 'underline' }}>Lihat Portfolio</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST SECTION ── */}
      <section id="kurator" style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            {/* Left text */}
            <div>
              <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 36, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: 16, lineHeight: 1.15 }}>
                Kurasi Ketat Untuk<br />Keamanan Anda.
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
                Setiap vendor dengan badge <strong>Terpercaya</strong> telah melewati verifikasi legalitas, pengecekan peralatan, dan audit riwayat pekerjaan.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
                {TRUST_ITEMS.map(item => (
                  <div key={item.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--verified-green)', flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 2 }}>{item.title}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/how-it-works" className="btn-forest" style={{ display: 'inline-flex' }}>
                Pelajari Standar Findor <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right visual */}
            <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '3/4', background: 'var(--forest)' }}>
                <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80" alt="vendor" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, mixBlendMode: 'luminosity' }} />
                <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'var(--amber)', borderRadius: 'var(--radius-sm)', padding: '6px 12px' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--forest)' }}>⚡ EDITOR'S CHOICE</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--gray-100)', padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center' }}>Standard Kualitas Global</div>
                </div>
                <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '1', background: 'var(--forest)', position: 'relative' }}>
                  <img src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80" alt="speaker" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                  <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10 }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--white)', fontFamily: 'Fraunces, serif' }}>500+</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Vendor Terverifikasi</div>
                  </div>
                  <div style={{ position: 'absolute', top: 10, right: 10 }}>
                    <span className="badge badge-verified"><CheckCircle size={10} /> CERTIFIED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '80px 24px', background: 'var(--forest)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 36, fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.5px', marginBottom: 16, lineHeight: 1.2 }}>
            Punya Vendor Event Berkualitas?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>
            Dapatkan akses ke ribuan klien premium di seluruh Indonesia. Mulai kembangkan bisnis event Anda hari ini.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/vendor/register" className="btn-primary">Daftar Sebagai Vendor</Link>
            <Link href="#" className="btn-secondary">Hubungi Consultant</Link>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 1024px) {
          section > div > div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          section > div > div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: 1fr !important;
          }
          section > div > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}