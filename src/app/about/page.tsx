'use client';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Users, Star, Shield, Heart, Zap, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const STATS = [
  { value: '500+', label: 'Vendor Terverifikasi' },
  { value: '12.000+', label: 'Event Sukses' },
  { value: '98%', label: 'Tingkat Kepuasan' },
  { value: '34', label: 'Kota di Indonesia' },
];

const VALUES = [
  {
    icon: <Shield size={22} />,
    title: 'Kepercayaan',
    desc: 'Setiap vendor melewati verifikasi ketat sebelum tampil di platform. Kami tidak berkompromi soal kualitas.',
  },
  {
    icon: <Star size={22} />,
    title: 'Kurasi Ketat',
    desc: 'Bukan sekadar direktori. Findor adalah galeri terkurasi — hanya yang terbaik yang layak masuk.',
  },
  {
    icon: <Heart size={22} />,
    title: 'Berpihak pada Klien',
    desc: 'Garansi dana kembali, mediasi sengketa, dan dukungan 24/7 memastikan Anda selalu terlindungi.',
  },
  {
    icon: <Zap size={22} />,
    title: 'Efisiensi',
    desc: 'Temukan, negosiasi, dan booking vendor premium dalam satu platform — tanpa ribet, tanpa perantara.',
  },
];

const TEAM = [
  { name: 'Arya Wibisono', role: 'Co-Founder & CEO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { name: 'Nadira Putri', role: 'Co-Founder & CPO', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
  { name: 'Reza Mahendra', role: 'Head of Curation', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
  { name: 'Sinta Larasati', role: 'Head of Vendor Relations', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
];

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#f5f5f0', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ background: '#1a3c34', padding: '100px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }} />
        <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 999, padding: '5px 14px', marginBottom: 20 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.08em' }}>TENTANG KAMI</span>
          </div>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 900, color: 'white', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 20 }}>
            Kami Hadir untuk Membuat<br />Event Anda Tak Terlupakan
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, maxWidth: 520, margin: '0 auto' }}>
            Findor adalah platform kurasi vendor event premium pertama di Indonesia. Kami menghubungkan penyelenggara acara dengan vendor terbaik yang telah terverifikasi secara ketat.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'white', padding: '48px 24px', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {STATS.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'Fraunces, serif', fontSize: 36, fontWeight: 900, color: '#1a3c34', letterSpacing: '-1px', marginBottom: 4 }}>{s.value}</p>
              <p style={{ fontSize: 13, color: '#6b7280' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>

        {/* Cerita */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', marginBottom: 80 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#f97316', letterSpacing: '0.1em', marginBottom: 12 }}>CERITA KAMI</p>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 32, fontWeight: 800, color: '#111827', letterSpacing: '-0.5px', lineHeight: 1.2, marginBottom: 16 }}>
              Lahir dari Frustrasi,<br />Tumbuh dari Kepercayaan
            </h2>
            <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.8, marginBottom: 16 }}>
              Findor lahir pada 2022 ketika para pendirinya mengalami sendiri betapa sulitnya menemukan vendor event yang benar-benar bisa diandalkan. Banyak platform yang ada hanya menjadi direktori tanpa kurasi — siapa saja bisa masuk, kualitas tidak terjamin.
            </p>
            <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.8, marginBottom: 24 }}>
              Kami membangun Findor dengan satu prinsip: <strong style={{ color: '#111827' }}>hanya vendor yang benar-benar layak yang boleh tampil</strong>. Bukan yang paling banyak bayar, tapi yang paling berkualitas.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Didirikan di Jakarta, 2022', 'Hadir di 34 kota Indonesia', 'Didukung 500+ vendor terverifikasi'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckCircle size={15} color="#16a34a" />
                  <span style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '4/3' }}>
            <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80" alt="Findor story" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* Nilai */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#f97316', letterSpacing: '0.1em', marginBottom: 10 }}>NILAI KAMI</p>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 30, fontWeight: 800, color: '#111827', letterSpacing: '-0.5px' }}>Yang Kami Percaya</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {VALUES.map(v => (
              <div key={v.title} style={{ background: 'white', borderRadius: 18, padding: '24px 26px', border: '1px solid #e5e7eb', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a3c34', flexShrink: 0 }}>
                  {v.icon}
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 6 }}>{v.title}</p>
                  <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tim */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#f97316', letterSpacing: '0.1em', marginBottom: 10 }}>TIM KAMI</p>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 30, fontWeight: 800, color: '#111827', letterSpacing: '-0.5px' }}>Orang-orang di Balik Findor</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {TEAM.map(t => (
              <div key={t.name} style={{ background: 'white', borderRadius: 18, overflow: 'hidden', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                <div style={{ aspectRatio: '1', overflow: 'hidden' }}>
                  <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '16px 12px' }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 4 }}>{t.name}</p>
                  <p style={{ fontSize: 12, color: '#6b7280' }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: '#1a3c34', borderRadius: 24, padding: '48px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08 }} />
          <div style={{ position: 'relative' }}>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 30, fontWeight: 800, color: 'white', letterSpacing: '-0.5px', marginBottom: 12 }}>
              Siap Wujudkan Event Impian Anda?
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 28, maxWidth: 440, margin: '0 auto 28px' }}>
              Jelajahi ratusan vendor premium yang sudah terverifikasi dan siap membantu acara Anda.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/browse" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 999, background: '#f97316', color: 'white', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
                Cari Vendor <ArrowRight size={16} />
              </Link>
              <Link href="/how-it-works" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                Standar Findor
              </Link>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}
