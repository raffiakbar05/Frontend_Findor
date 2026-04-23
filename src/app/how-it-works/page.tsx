'use client';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, Users, Store, Shield, Star, Clock, MessageCircle, FileText, Ban } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const USER_RULES = [
  {
    icon: <CheckCircle size={18} />,
    type: 'do',
    title: 'Komunikasi Lewat WhatsApp',
    desc: 'Semua negosiasi harga, detail paket, dan kesepakatan dilakukan langsung via WhatsApp dengan vendor.',
  },
  {
    icon: <CheckCircle size={18} />,
    type: 'do',
    title: 'Upload Bukti Transaksi yang Valid',
    desc: 'Setelah transfer, upload screenshot atau PDF bukti pembayaran yang jelas dan terbaca.',
  },
  {
    icon: <CheckCircle size={18} />,
    type: 'do',
    title: 'Booking Minimal 14 Hari Sebelum Event',
    desc: 'Pastikan melakukan booking setidaknya 2 minggu sebelum tanggal acara agar vendor dapat mempersiapkan diri.',
  },
  {
    icon: <CheckCircle size={18} />,
    type: 'do',
    title: 'Konfirmasi Detail Event Secara Lengkap',
    desc: 'Sampaikan lokasi, durasi, jumlah tamu, dan kebutuhan teknis secara jelas kepada vendor.',
  },
  {
    icon: <XCircle size={18} />,
    type: 'dont',
    title: 'Dilarang Membatalkan Sepihak',
    desc: 'Pembatalan kurang dari 7 hari sebelum event tidak mendapat refund. Hubungi tim Findor untuk mediasi.',
  },
  {
    icon: <XCircle size={18} />,
    type: 'dont',
    title: 'Dilarang Transaksi di Luar Platform',
    desc: 'Semua pembayaran DP wajib melalui Virtual Account Findor. Transaksi langsung ke vendor tidak dilindungi garansi.',
  },
  {
    icon: <XCircle size={18} />,
    type: 'dont',
    title: 'Dilarang Memberikan Ulasan Palsu',
    desc: 'Ulasan hanya boleh diberikan oleh user yang benar-benar menggunakan layanan vendor tersebut.',
  },
];

const VENDOR_RULES = [
  {
    icon: <CheckCircle size={18} />,
    type: 'do',
    title: 'Respons WhatsApp Maksimal 2 Jam',
    desc: 'Vendor wajib merespons pesan dari calon klien dalam waktu 2 jam di jam kerja (08.00–20.00).',
  },
  {
    icon: <CheckCircle size={18} />,
    type: 'do',
    title: 'Informasi Paket Harus Akurat',
    desc: 'Deskripsi paket, harga, dan ketersediaan yang ditampilkan di profil harus sesuai dengan kondisi aktual.',
  },
  {
    icon: <CheckCircle size={18} />,
    type: 'do',
    title: 'Hadir Tepat Waktu di Hari H',
    desc: 'Vendor wajib tiba di lokasi minimal 2 jam sebelum acara dimulai untuk persiapan.',
  },
  {
    icon: <CheckCircle size={18} />,
    type: 'do',
    title: 'Laporkan Kendala Segera',
    desc: 'Jika ada hambatan teknis atau force majeure, vendor wajib menginformasikan ke klien dan tim Findor sesegera mungkin.',
  },
  {
    icon: <XCircle size={18} />,
    type: 'dont',
    title: 'Dilarang Menolak Klien Tanpa Alasan',
    desc: 'Penolakan booking hanya diperbolehkan jika tanggal sudah terisi atau ada alasan teknis yang valid.',
  },
  {
    icon: <XCircle size={18} />,
    type: 'dont',
    title: 'Dilarang Menaikkan Harga Mendadak',
    desc: 'Harga yang sudah disepakati via WhatsApp tidak boleh diubah secara sepihak setelah klien melakukan DP.',
  },
  {
    icon: <XCircle size={18} />,
    type: 'dont',
    title: 'Dilarang Menggunakan Peralatan Tidak Layak',
    desc: 'Semua peralatan yang digunakan harus sesuai dengan yang tertera di paket dan dalam kondisi baik.',
  },
];

const VERIFICATION_STEPS = [
  { step: '01', title: 'Verifikasi Identitas', desc: 'KTP pemilik usaha dan NPWP bisnis diperiksa oleh tim Findor.' },
  { step: '02', title: 'Audit Portofolio', desc: 'Minimal 10 dokumentasi event nyata yang dapat diverifikasi.' },
  { step: '03', title: 'Pengecekan Peralatan', desc: 'Tim teknis Findor melakukan inspeksi fisik peralatan utama.' },
  { step: '04', title: 'Uji Respons & Komunikasi', desc: 'Simulasi interaksi klien untuk menilai profesionalisme vendor.' },
  { step: '05', title: 'Review Riwayat Kerja', desc: 'Wawancara dengan minimal 3 klien terdahulu sebagai referensi.' },
];

export default function HowItWorksPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#f5f5f0', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ background: '#1a3c34', padding: '80px 24px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }} />
        <div style={{ position: 'relative', maxWidth: 640, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 999, padding: '5px 14px', marginBottom: 20 }}>
            <Shield size={12} color="rgba(255,255,255,0.7)" />
            <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.08em' }}>STANDAR FINDOR</span>
          </div>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: 'white', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 16 }}>
            Aturan & Standar<br />Platform Findor
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, maxWidth: 480, margin: '0 auto' }}>
            Panduan lengkap untuk user dan vendor agar setiap event berjalan profesional, aman, dan sesuai ekspektasi.
          </p>
        </div>
      </section>

      {/* Tabs content */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '60px 24px' }}>

        {/* User Rules */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} color="#0369a1" />
            </div>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111827', letterSpacing: '-0.3px' }}>Aturan untuk User</h2>
              <p style={{ fontSize: 13, color: '#6b7280' }}>Berlaku untuk semua pengguna yang mencari dan memesan vendor di Findor.</p>
            </div>
          </div>

          <div style={{ height: 1, background: '#e5e7eb', margin: '24px 0' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {USER_RULES.map((rule, i) => (
              <div key={i} style={{
                background: 'white',
                borderRadius: 16,
                padding: '20px 22px',
                border: `1px solid ${rule.type === 'do' ? '#d1fae5' : '#fee2e2'}`,
                display: 'flex',
                gap: 14,
                alignItems: 'flex-start',
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: rule.type === 'do' ? '#dcfce7' : '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: rule.type === 'do' ? '#16a34a' : '#dc2626' }}>
                  {rule.icon}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 4 }}>{rule.title}</p>
                  <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6 }}>{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vendor Rules */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Store size={20} color="#d97706" />
            </div>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111827', letterSpacing: '-0.3px' }}>Aturan untuk Vendor</h2>
              <p style={{ fontSize: 13, color: '#6b7280' }}>Berlaku untuk semua vendor yang terdaftar dan aktif di platform Findor.</p>
            </div>
          </div>

          <div style={{ height: 1, background: '#e5e7eb', margin: '24px 0' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {VENDOR_RULES.map((rule, i) => (
              <div key={i} style={{
                background: 'white',
                borderRadius: 16,
                padding: '20px 22px',
                border: `1px solid ${rule.type === 'do' ? '#d1fae5' : '#fee2e2'}`,
                display: 'flex',
                gap: 14,
                alignItems: 'flex-start',
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: rule.type === 'do' ? '#dcfce7' : '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: rule.type === 'do' ? '#16a34a' : '#dc2626' }}>
                  {rule.icon}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 4 }}>{rule.title}</p>
                  <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6 }}>{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Steps */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Star size={20} color="#16a34a" />
            </div>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111827', letterSpacing: '-0.3px' }}>Proses Verifikasi 5 Tahap</h2>
              <p style={{ fontSize: 13, color: '#6b7280' }}>Setiap vendor melewati seleksi ketat sebelum tampil di platform.</p>
            </div>
          </div>

          <div style={{ height: 1, background: '#e5e7eb', margin: '24px 0' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {VERIFICATION_STEPS.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', position: 'relative', paddingBottom: i < VERIFICATION_STEPS.length - 1 ? 28 : 0 }}>
                {i < VERIFICATION_STEPS.length - 1 && (
                  <div style={{ position: 'absolute', left: 19, top: 44, width: 2, height: 'calc(100% - 16px)', background: '#e5e7eb' }} />
                )}
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1a3c34', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: 'white' }}>{s.step}</span>
                </div>
                <div style={{ background: 'white', borderRadius: 14, padding: '16px 20px', flex: 1, border: '1px solid #e5e7eb' }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 4 }}>{s.title}</p>
                  <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sanksi */}
        <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 20, padding: '28px 32px', display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 64 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AlertTriangle size={22} color="#ea580c" />
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#9a3412', marginBottom: 8 }}>Sanksi Pelanggaran</h3>
            <p style={{ fontSize: 13, color: '#7c2d12', lineHeight: 1.7, marginBottom: 12 }}>
              Pelanggaran terhadap aturan di atas dapat mengakibatkan:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                'Peringatan tertulis pertama dan kedua',
                'Pembekuan akun sementara (7–30 hari)',
                'Penghapusan permanen dari platform Findor',
                'Pelaporan ke pihak berwenang untuk kasus penipuan',
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Ban size={12} color="#ea580c" />
                  <span style={{ fontSize: 13, color: '#7c2d12' }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: '#1a3c34', borderRadius: 20, padding: '36px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: 'white', marginBottom: 6 }}>Ada pertanyaan soal aturan ini?</h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>Tim Findor siap membantu Anda memahami standar platform kami.</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/" style={{ padding: '10px 22px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: 'white', fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              Kembali ke Beranda
            </Link>
            <a href="https://wa.me/628001234567" target="_blank" rel="noreferrer" style={{ padding: '10px 22px', borderRadius: 999, background: '#25D366', border: 'none', color: 'white', fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <MessageCircle size={14} /> Hubungi Kami
            </a>
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}
