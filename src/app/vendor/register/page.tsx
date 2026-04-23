'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, Upload, Plus, X } from 'lucide-react';
import Navbar from '@/components/Navbar';

const STEPS = ['Informasi Bisnis', 'Kategori & Paket', 'Dokumen & Portofolio', 'Konfirmasi'];

const CATEGORIES = [
  'Sound System', 'Stage & Rigging', 'Decoration', 'Catering Service',
  'Documentation', 'Entertainment', 'Lighting Design', 'Wedding Organizer',
  'Photo Booth', 'Florist', 'MC & Host', 'Venue',
];

const CITIES = [
  'Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang',
  'Makassar', 'Palembang', 'Tangerang', 'Depok', 'Bekasi',
  'Yogyakarta', 'Bali', 'Bogor', 'Malang', 'Solo',
];

type Form = {
  // Step 1
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  instagram: string;
  whatsapp: string;
  // Step 2
  category: string;
  description: string;
  packages: { name: string; price: string; desc: string }[];
  // Step 3
  ktpFile: File | null;
  npwpFile: File | null;
  portfolioFiles: File[];
  agreeTerms: boolean;
};

const INIT: Form = {
  businessName: '', ownerName: '', email: '', phone: '',
  city: '', address: '', instagram: '', whatsapp: '',
  category: '', description: '',
  packages: [{ name: '', price: '', desc: '' }],
  ktpFile: null, npwpFile: null, portfolioFiles: [],
  agreeTerms: false,
};

export default function VendorRegisterPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(INIT);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof Form, val: any) => setForm(f => ({ ...f, [key]: val }));

  const setPackage = (i: number, key: string, val: string) => {
    const pkgs = [...form.packages];
    pkgs[i] = { ...pkgs[i], [key]: val };
    set('packages', pkgs);
  };

  const addPackage = () => {
    if (form.packages.length < 4) set('packages', [...form.packages, { name: '', price: '', desc: '' }]);
  };

  const removePackage = (i: number) => {
    if (form.packages.length > 1) set('packages', form.packages.filter((_, idx) => idx !== i));
  };

  const canNext = () => {
    if (step === 0) return form.businessName && form.ownerName && form.email && form.phone && form.city;
    if (step === 1) return form.category && form.description && form.packages[0].name && form.packages[0].price;
    if (step === 2) return form.ktpFile && form.portfolioFiles.length >= 3 && form.agreeTerms;
    return true;
  };

  if (submitted) {
    return (
      <main style={{ minHeight: '100vh', background: '#f5f5f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        <div style={{ textAlign: 'center', maxWidth: 460, padding: '0 24px' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <CheckCircle size={40} color="#16a34a" />
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: '#111827', marginBottom: 12, letterSpacing: '-0.5px' }}>Pendaftaran Terkirim!</h2>
          <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.8, marginBottom: 32 }}>
            Tim kurasi Findor akan meninjau pendaftaran <strong>{form.businessName}</strong> dalam <strong>3–5 hari kerja</strong>. Kami akan menghubungi Anda melalui email <strong>{form.email}</strong>.
          </p>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 999, background: '#1a3c34', color: 'white', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
            Kembali ke Beranda
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: '#f5f5f0', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <Navbar />

      {/* Header */}
      <div style={{ background: '#1a3c34', padding: '60px 24px 48px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 900, color: 'white', letterSpacing: '-0.8px', marginBottom: 10 }}>
          Daftarkan Layanan Anda
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
          Bergabung dengan 500+ vendor premium yang sudah dipercaya ribuan klien di Indonesia.
        </p>
      </div>

      {/* Stepper */}
      <div style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '20px 24px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
          {STEPS.map((label, i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: i < step ? '#16a34a' : i === step ? '#1a3c34' : '#e5e7eb',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: i <= step ? 'white' : '#9ca3af', fontWeight: 700, fontSize: 13,
                }}>
                  {i < step ? <CheckCircle size={16} /> : i + 1}
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: i <= step ? '#1a3c34' : '#9ca3af', whiteSpace: 'nowrap' }}>
                  {label.toUpperCase()}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ width: 60, height: 2, background: i < step ? '#16a34a' : '#e5e7eb', margin: '0 6px', marginBottom: 20 }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{ background: 'white', borderRadius: 20, padding: '36px 40px', border: '1px solid #e5e7eb', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>

          {/* ── STEP 0: Informasi Bisnis ── */}
          {step === 0 && (
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 4 }}>Informasi Bisnis</h2>
              <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 28 }}>Isi data dasar bisnis dan kontak Anda.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <Field label="Nama Bisnis *" value={form.businessName} onChange={v => set('businessName', v)} placeholder="cth. Melody Aura Sound" />
                  <Field label="Nama Pemilik *" value={form.ownerName} onChange={v => set('ownerName', v)} placeholder="Nama lengkap" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <Field label="Email *" type="email" value={form.email} onChange={v => set('email', v)} placeholder="email@bisnis.com" />
                  <Field label="No. WhatsApp *" type="tel" value={form.phone} onChange={v => set('phone', v)} placeholder="08xxxxxxxxxx" />
                </div>
                <SelectField label="Kota *" value={form.city} onChange={v => set('city', v)} options={CITIES} placeholder="Pilih kota" />
                <Field label="Alamat Lengkap" value={form.address} onChange={v => set('address', v)} placeholder="Jl. ..." />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <Field label="Instagram" value={form.instagram} onChange={v => set('instagram', v)} placeholder="@username" />
                  <Field label="No. WhatsApp Bisnis *" type="tel" value={form.whatsapp} onChange={v => set('whatsapp', v)} placeholder="628xxxxxxxxxx" />
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 1: Kategori & Paket ── */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 4 }}>Kategori & Paket</h2>
              <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 28 }}>Pilih kategori dan tambahkan paket layanan Anda.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Kategori */}
                <div>
                  <label style={labelStyle}>Kategori Layanan *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 8 }}>
                    {CATEGORIES.map(cat => (
                      <button key={cat} onClick={() => set('category', cat)} style={{
                        padding: '9px 12px', borderRadius: 10, fontSize: 12, fontWeight: 600,
                        border: `1.5px solid ${form.category === cat ? '#1a3c34' : '#e5e7eb'}`,
                        background: form.category === cat ? '#f0fdf4' : 'white',
                        color: form.category === cat ? '#1a3c34' : '#6b7280',
                        cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'inherit',
                      }}>
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Deskripsi */}
                <div>
                  <label style={labelStyle}>Deskripsi Bisnis *</label>
                  <textarea
                    value={form.description}
                    onChange={e => set('description', e.target.value)}
                    placeholder="Ceritakan tentang bisnis Anda, keunggulan, dan pengalaman..."
                    rows={4}
                    style={{ ...inputStyle, resize: 'vertical', marginTop: 6 }}
                  />
                </div>

                {/* Paket */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <label style={labelStyle}>Paket Layanan * <span style={{ color: '#9ca3af', fontWeight: 400 }}>(maks. 4)</span></label>
                    {form.packages.length < 4 && (
                      <button onClick={addPackage} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: '#1a3c34', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                        <Plus size={14} /> Tambah Paket
                      </button>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {form.packages.map((pkg, i) => (
                      <div key={i} style={{ background: '#f9fafb', borderRadius: 12, padding: '16px', border: '1px solid #e5e7eb', position: 'relative' }}>
                        {form.packages.length > 1 && (
                          <button onClick={() => removePackage(i)} style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
                            <X size={14} />
                          </button>
                        )}
                        <p style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', marginBottom: 10, letterSpacing: '0.05em' }}>PAKET {i + 1}</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                          <input value={pkg.name} onChange={e => setPackage(i, 'name', e.target.value)} placeholder="Nama paket" style={inputStyle} />
                          <input value={pkg.price} onChange={e => setPackage(i, 'price', e.target.value)} placeholder="cth. Rp 5.000.000" style={inputStyle} />
                        </div>
                        <input value={pkg.desc} onChange={e => setPackage(i, 'desc', e.target.value)} placeholder="Deskripsi singkat paket..." style={inputStyle} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: Dokumen & Portofolio ── */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 4 }}>Dokumen & Portofolio</h2>
              <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 28 }}>Upload dokumen legalitas dan minimal 3 foto portofolio event.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <FileUploadField
                  label="KTP Pemilik *"
                  hint="JPG, PNG atau PDF · Maks. 5MB"
                  file={form.ktpFile}
                  onChange={f => set('ktpFile', f)}
                />
                <FileUploadField
                  label="NPWP Bisnis"
                  hint="JPG, PNG atau PDF · Maks. 5MB (opsional)"
                  file={form.npwpFile}
                  onChange={f => set('npwpFile', f)}
                />

                {/* Portofolio */}
                <div>
                  <label style={labelStyle}>Foto Portofolio * <span style={{ color: '#9ca3af', fontWeight: 400 }}>minimal 3 foto</span></label>
                  <div
                    onClick={() => document.getElementById('portfolio-input')?.click()}
                    style={{
                      border: `2px dashed ${form.portfolioFiles.length >= 3 ? '#16a34a' : '#d1d5db'}`,
                      borderRadius: 14, padding: '28px 20px', textAlign: 'center',
                      cursor: 'pointer', background: form.portfolioFiles.length >= 3 ? '#f0fdf4' : '#fafafa',
                      marginTop: 8, transition: 'all 0.2s',
                    }}
                  >
                    <input
                      id="portfolio-input" type="file" multiple accept=".jpg,.jpeg,.png"
                      style={{ display: 'none' }}
                      onChange={e => {
                        const files = Array.from(e.target.files || []);
                        set('portfolioFiles', [...form.portfolioFiles, ...files].slice(0, 10));
                      }}
                    />
                    <Upload size={24} color={form.portfolioFiles.length >= 3 ? '#16a34a' : '#9ca3af'} style={{ margin: '0 auto 10px' }} />
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>
                      {form.portfolioFiles.length > 0 ? `${form.portfolioFiles.length} foto dipilih` : 'Klik untuk upload foto'}
                    </p>
                    <p style={{ fontSize: 12, color: '#9ca3af' }}>JPG, PNG · Maks. 10 foto</p>
                  </div>
                  {form.portfolioFiles.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                      {form.portfolioFiles.map((f, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f3f4f6', borderRadius: 8, padding: '5px 10px' }}>
                          <span style={{ fontSize: 11, color: '#374151', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
                          <button onClick={() => set('portfolioFiles', form.portfolioFiles.filter((_, idx) => idx !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex' }}>
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Syarat */}
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                  <input
                    type="checkbox" checked={form.agreeTerms}
                    onChange={e => set('agreeTerms', e.target.checked)}
                    style={{ marginTop: 2, accentColor: '#1a3c34', width: 15, height: 15, flexShrink: 0 }}
                  />
                  <span style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.7 }}>
                    Saya menyetujui <Link href="/how-it-works" style={{ color: '#1a3c34', fontWeight: 600 }}>Standar & Aturan Findor</Link> dan bersedia menjalani proses verifikasi 5 tahap sebelum profil saya ditampilkan.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* ── STEP 3: Konfirmasi ── */}
          {step === 3 && (
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 4 }}>Konfirmasi Data</h2>
              <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 28 }}>Periksa kembali data Anda sebelum mengirim pendaftaran.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SummaryCard title="Informasi Bisnis">
                  <Row label="Nama Bisnis" value={form.businessName} />
                  <Row label="Pemilik" value={form.ownerName} />
                  <Row label="Email" value={form.email} />
                  <Row label="WhatsApp" value={form.phone} />
                  <Row label="Kota" value={form.city} />
                  {form.instagram && <Row label="Instagram" value={form.instagram} />}
                  {form.whatsapp && <Row label="WA Bisnis" value={form.whatsapp} />}
                </SummaryCard>

                <SummaryCard title="Kategori & Paket">
                  <Row label="Kategori" value={form.category} />
                  <Row label="Jumlah Paket" value={`${form.packages.length} paket`} />
                  {form.packages.map((p, i) => p.name && <Row key={i} label={`Paket ${i + 1}`} value={`${p.name} — ${p.price}`} />)}
                </SummaryCard>

                <SummaryCard title="Dokumen">
                  <Row label="KTP" value={form.ktpFile?.name || '-'} />
                  <Row label="NPWP" value={form.npwpFile?.name || 'Tidak dilampirkan'} />
                  <Row label="Portofolio" value={`${form.portfolioFiles.length} foto`} />
                </SummaryCard>

                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '14px 16px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <CheckCircle size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: 1 }} />
                  <p style={{ fontSize: 12, color: '#15803d', lineHeight: 1.7 }}>
                    Setelah submit, tim Findor akan meninjau pendaftaran Anda dalam <strong>3–5 hari kerja</strong>. Notifikasi akan dikirim ke email <strong>{form.email}</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 36, paddingTop: 24, borderTop: '1px solid #f3f4f6' }}>
            {step > 0 ? (
              <button onClick={() => setStep(s => s - 1)} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                <ArrowLeft size={16} /> Kembali
              </button>
            ) : (
              <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#6b7280', textDecoration: 'none' }}>
                <ArrowLeft size={16} /> Batal
              </Link>
            )}

            {step < STEPS.length - 1 ? (
              <button
                onClick={() => canNext() && setStep(s => s + 1)}
                disabled={!canNext()}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '12px 28px', borderRadius: 999,
                  background: canNext() ? '#1a3c34' : '#e5e7eb',
                  color: canNext() ? 'white' : '#9ca3af',
                  fontSize: 14, fontWeight: 700, border: 'none',
                  cursor: canNext() ? 'pointer' : 'not-allowed', fontFamily: 'inherit',
                  transition: 'all 0.2s',
                }}
              >
                Lanjut <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '12px 28px', borderRadius: 999,
                  background: 'linear-gradient(135deg, #f97316, #ea580c)',
                  color: 'white', fontSize: 14, fontWeight: 700, border: 'none',
                  cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: '0 4px 16px rgba(249,115,22,0.35)',
                }}
              >
                Kirim Pendaftaran <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// ── Reusable components ──

const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 700, color: '#374151', letterSpacing: '0.03em' };
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', borderRadius: 10, fontSize: 13,
  border: '1.5px solid #e5e7eb', outline: 'none', fontFamily: 'inherit',
  color: '#111827', background: 'white', boxSizing: 'border-box',
};

function Field({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ ...inputStyle, marginTop: 6 }} />
    </div>
  );
}

function SelectField({ label, value, onChange, options, placeholder }: { label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder: string }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} style={{ ...inputStyle, marginTop: 6 }}>
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function FileUploadField({ label, hint, file, onChange }: { label: string; hint: string; file: File | null; onChange: (f: File) => void }) {
  const id = label.replace(/\s/g, '-').toLowerCase();
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <div
        onClick={() => document.getElementById(id)?.click()}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          border: `1.5px solid ${file ? '#16a34a' : '#e5e7eb'}`,
          borderRadius: 12, padding: '12px 16px', cursor: 'pointer',
          background: file ? '#f0fdf4' : '#fafafa', marginTop: 6, transition: 'all 0.2s',
        }}
      >
        <input id={id} type="file" accept=".jpg,.jpeg,.png,.pdf" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && onChange(e.target.files[0])} />
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: file ? '#15803d' : '#374151', marginBottom: 2 }}>
            {file ? file.name : 'Klik untuk upload'}
          </p>
          <p style={{ fontSize: 11, color: '#9ca3af' }}>{hint}</p>
        </div>
        {file ? <CheckCircle size={18} color="#16a34a" /> : <Upload size={18} color="#9ca3af" />}
      </div>
    </div>
  );
}

function SummaryCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#f9fafb', borderRadius: 14, padding: '18px 20px', border: '1px solid #e5e7eb' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: '#1a3c34', letterSpacing: '0.08em', marginBottom: 12 }}>{title.toUpperCase()}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: 12, color: '#9ca3af' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#111827', maxWidth: 280, textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</span>
    </div>
  );
}
