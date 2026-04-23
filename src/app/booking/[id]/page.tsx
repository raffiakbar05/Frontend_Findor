'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Lock, CloudUpload, Copy, CheckCircle, MessageCircle } from 'lucide-react';

const VENDOR_DATA: Record<string, any> = {
  'melody-aura-sound': { name: 'Melody Aura Sound', paket: 'Grand Concert System', tanggal: 'Sabtu, 24 Agu 2024', dp: 15000000 },
  'atelier-decor': { name: 'Atelier Decor', paket: 'Grand Wedding Decor', tanggal: 'Sabtu, 24 Agu 2024', dp: 45000000 },
  'visual-soul-studio': { name: 'Visual Soul Studio', paket: 'Cinematic Full Day', tanggal: 'Sabtu, 24 Agu 2024', dp: 20000000 },
  'savory-palette': { name: 'Savory Palette', paket: 'Premium Gala Dinner', tanggal: 'Sabtu, 24 Agu 2024', dp: 5000000 },
  'lumina-studio': { name: 'Lumina Studio Jakarta', paket: 'Grand Wedding Day', tanggal: 'Sabtu, 24 Agu 2024', dp: 8500000 },
};

function getFallback(slug: string) {
  const name = slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return { name, paket: 'Paket Standar', tanggal: 'Sabtu, 24 Agu 2024', dp: 5000000 };
}

const STEPS = [
  { label: 'DETAIL', done: true },
  { label: 'PEMBAYARAN', active: true },
  { label: 'KONFIRMASI', active: false },
];

const VA_NUMBER = '8802 0812 3456 7890';

export default function BookingPage() {
  const params = useParams();
  const slug = params?.id as string;
  const vendor = VENDOR_DATA[slug] || getFallback(slug);

  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(VA_NUMBER.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  const handleSubmit = () => {
    if (!file) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f5f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        <div style={{ textAlign: 'center', maxWidth: 420, padding: '0 24px' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <CheckCircle size={36} color="#16a34a" />
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#111827', marginBottom: 12 }}>Transaksi Dikirim!</h2>
          <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, marginBottom: 32 }}>
            Bukti pembayaran Anda sedang diverifikasi. Biasanya selesai dalam <strong>15–30 menit</strong>. Kami akan menghubungi Anda segera.
          </p>
          <Link href="/" style={{ display: 'inline-block', padding: '12px 32px', borderRadius: 999, background: '#1a3c34', color: 'white', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: '#f5f5f0', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>

      {/* Top bar */}
      <div style={{ background: 'white', borderBottom: '1px solid #f0f0f0', padding: '0 32px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href={`/vendor/${slug}`} style={{ display: 'flex', alignItems: 'center', color: '#6b7280', textDecoration: 'none' }}>
            <ArrowLeft size={18} />
          </Link>
          <span style={{ fontSize: 20, fontWeight: 900, color: '#1a3c34' }}><img src="/logo_findor.jpg" alt="Findor" style={{ height: 44, width: 'auto', objectFit: 'contain' }} /></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 999, padding: '6px 14px' }}>
          <Lock size={13} color="#16a34a" />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#16a34a', letterSpacing: '0.06em' }}>SECURE CHECKOUT</span>
        </div>
      </div>

      {/* Stepper */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, padding: '32px 24px 0' }}>
        {STEPS.map((step, i) => (
          <div key={step.label} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: step.done ? '#1a3c34' : step.active ? '#1a3c34' : '#e5e7eb',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: step.done || step.active ? 'white' : '#9ca3af',
                fontWeight: 700, fontSize: 14
              }}>
                {step.done ? <CheckCircle size={18} /> : i + 1}
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: step.done || step.active ? '#1a3c34' : '#9ca3af' }}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ width: 80, height: 2, background: i === 0 ? '#1a3c34' : '#e5e7eb', margin: '0 8px', marginBottom: 20 }} />
            )}
          </div>
        ))}
      </div>

      {/* Heading */}
      <div style={{ textAlign: 'center', padding: '28px 24px 32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 999, padding: '5px 14px', marginBottom: 16 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f97316', display: 'inline-block' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#ea580c', letterSpacing: '0.08em' }}>LANGKAH TERAKHIR</span>
        </div>
        <h1 style={{ fontSize: 34, fontWeight: 900, color: '#111827', letterSpacing: '-0.8px', marginBottom: 10, lineHeight: 1.2 }}>
          Lengkapi Transaksi Anda
        </h1>
        <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.8, maxWidth: 400, margin: '0 auto' }}>
          Upload bukti transfer untuk mengamankan tanggal bersama vendor pilihan Anda.
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'flex-start' }}>

        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Booking summary */}
          <div style={{ background: 'white', borderRadius: 20, padding: 28, border: '1px solid #e5e7eb', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#f97316', letterSpacing: '0.1em', background: '#fff7ed', padding: '4px 10px', borderRadius: 999, border: '1px solid #fed7aa' }}>PILIHAN BOOKING</span>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 16, fontWeight: 900, color: '#1a3c34' }}>F</span>
              </div>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111827', lineHeight: 1.3, marginBottom: 20 }}>{vendor.name}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              <div style={{ background: '#f9fafb', borderRadius: 12, padding: '12px 14px' }}>
                <p style={{ fontSize: 10, color: '#9ca3af', marginBottom: 4, fontWeight: 600, letterSpacing: '0.05em' }}>TANGGAL EVENT</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{vendor.tanggal}</p>
              </div>
              <div style={{ background: '#f9fafb', borderRadius: 12, padding: '12px 14px' }}>
                <p style={{ fontSize: 10, color: '#9ca3af', marginBottom: 4, fontWeight: 600, letterSpacing: '0.05em' }}>PAKET</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{vendor.paket}</p>
              </div>
            </div>

          </div>

          {/* Payment instructions */}
          <div style={{ background: 'white', borderRadius: 16, padding: 28, border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 16 }}>🏦</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>Instruksi Pembayaran</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Step 1 */}
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#1a3c34', color: 'white', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>1</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Transfer ke Virtual Account</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: copied ? '#f0fdf4' : '#f9fafb', border: `1.5px solid ${copied ? '#86efac' : '#e5e7eb'}`, borderRadius: 12, padding: '12px 16px', transition: 'all 0.2s' }}>
                    <span style={{ fontSize: 17, fontWeight: 800, color: '#111827', letterSpacing: '0.06em', flex: 1, fontVariantNumeric: 'tabular-nums' }}>{VA_NUMBER}</span>
                    <button onClick={handleCopy} style={{ background: copied ? '#dcfce7' : '#f3f4f6', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, color: copied ? '#16a34a' : '#374151', fontSize: 12, fontWeight: 700, fontFamily: 'inherit', padding: '6px 12px', borderRadius: 8, transition: 'all 0.2s' }}>
                      {copied ? <CheckCircle size={13} /> : <Copy size={13} />}
                      {copied ? 'Tersalin!' : 'Salin'}
                    </button>
                  </div>
                  <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 6 }}>Bank Central Asia (BCA) – a/n Findor Marketplace</p>
                </div>
              </div>

              {/* Step 2 */}
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#1a3c34', color: 'white', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>2</div>
                <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>Pastikan jumlah transfer sesuai dengan Total Down Payment termasuk kode unik jika ada.</p>
              </div>

              {/* Step 3 */}
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#1a3c34', color: 'white', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>3</div>
                <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>Screenshot atau simpan PDF bukti transaksi yang berhasil.</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'white', borderRadius: 20, padding: 28, border: '1px solid #e5e7eb', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#111827', marginBottom: 6, textAlign: 'center' }}>Upload Bukti Transaksi</h3>
              <p style={{ fontSize: 12, color: '#6b7280', textAlign: 'center', lineHeight: 1.7 }}>
                Upload bukti pembayaran yang sudah disepakati bersama vendor melalui WhatsApp.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '8px 12px', marginTop: 12 }}>
                <MessageCircle size={13} color="#16a34a" />
                <span style={{ fontSize: 11, color: '#15803d', fontWeight: 600 }}>Nominal DP sudah disetujui via WhatsApp dengan vendor</span>
              </div>
            </div>

            {/* Drop zone */}
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${dragging ? '#1a3c34' : file ? '#16a34a' : '#d1d5db'}`,
                borderRadius: 16, padding: '36px 20px', textAlign: 'center',
                cursor: 'pointer', transition: 'all 0.25s',
                background: dragging ? '#f0fdf4' : file ? '#f0fdf4' : '#fafafa',
                marginBottom: 20,
                boxShadow: dragging ? 'inset 0 0 0 4px rgba(26,60,52,0.06)' : 'none'
              }}
            >
              <input ref={inputRef} type="file" accept=".png,.jpg,.jpeg,.pdf" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && setFile(e.target.files[0])} />
              <div style={{ width: 56, height: 56, borderRadius: 16, background: file ? 'linear-gradient(135deg, #dcfce7, #bbf7d0)' : 'linear-gradient(135deg, #e6f4f1, #d1fae5)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                {file ? <CheckCircle size={26} color="#16a34a" /> : <CloudUpload size={26} color="#1a3c34" />}
              </div>
              {file ? (
                <>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#16a34a', marginBottom: 4 }}>{file.name}</p>
                  <p style={{ fontSize: 12, color: '#9ca3af' }}>Klik untuk ganti file</p>
                </>
              ) : (
                <>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#374151', marginBottom: 4 }}>Klik untuk pilih file</p>
                  <p style={{ fontSize: 12, color: '#9ca3af' }}>atau drag & drop di sini</p>
                </>
              )}
            </div>

            {/* Verified badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 20 }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#1a3c34', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle size={11} color="white" />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', letterSpacing: '0.08em' }}>VERIFIED PAYMENT GATEWAY</span>
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={!file}
              style={{
                width: '100%', padding: '16px', borderRadius: 999,
                background: file ? 'linear-gradient(135deg, #f97316, #ea580c)' : '#e5e7eb',
                color: file ? 'white' : '#9ca3af',
                fontSize: 15, fontWeight: 800, border: 'none',
                cursor: file ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.2s', fontFamily: 'inherit',
                boxShadow: file ? '0 4px 16px rgba(249,115,22,0.35)' : 'none',
                letterSpacing: '0.01em'
              }}
            >
              Konfirmasi Pembayaran →
            </button>

            <p style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center', marginTop: 10, lineHeight: 1.6 }}>
              Dengan submit, Anda menyetujui <a href="#" style={{ color: '#1a3c34', fontWeight: 600 }}>Syarat & Ketentuan</a> dan{' '}
              <a href="#" style={{ color: '#1a3c34', fontWeight: 600 }}>Kebijakan Refund</a> Findor.
              Booking biasanya diverifikasi dalam 15–30 menit.
            </p>
          </div>
        </div>
      </div>

      {/* Bantuan */}
      <div style={{ maxWidth: 960, margin: '0 auto 60px', padding: '0 24px' }}>
        <div style={{ background: '#1a3c34', borderRadius: 16, padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: 'white', marginBottom: 6 }}>Butuh bantuan segera?</h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>Tim concierge kami tersedia 24/7 untuk membantu pembayaran dan detail booking Anda.</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ padding: '10px 20px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              Chat dengan Kami
            </button>
            <button style={{ padding: '10px 20px', borderRadius: 999, background: '#25D366', border: 'none', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit' }}>
              <MessageCircle size={14} /> WhatsApp Concierge
            </button>
          </div>
        </div>
      </div>

      {/* Simple footer */}
      <div style={{ borderTop: '1px solid #e5e7eb', background: 'white', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <span style={{ fontSize: 18, fontWeight: 900, color: '#1a3c34', display: 'block', marginBottom: 4 }}><img src="/logo_findor.jpg" alt="Findor" style={{ height: 44, width: 'auto', objectFit: 'contain' }} /></span>
          <p style={{ fontSize: 11, color: '#9ca3af' }}>© 2024 Findor Marketplace. The Curated Gallery for Premium Events.</p>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Kebijakan Privasi', 'Syarat & Ketentuan', 'Cookie Policy', 'Dukungan Vendor'].map(l => (
            <a key={l} href="#" style={{ fontSize: 12, color: '#9ca3af', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      </div>
    </main>
  );
}
