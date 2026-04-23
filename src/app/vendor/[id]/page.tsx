'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import {
  Star, MapPin, CheckCircle, Share2, Heart, ChevronRight,
  MessageCircle, FileText, Shield, RotateCcw, Grid3x3,
  ChevronLeft, ChevronRight as ChevronR, Zap, Award
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock data — nanti bisa diganti dengan fetch dari Supabase
const VENDOR_DATA: Record<string, any> = {
  'melody-aura-sound': {
    name: 'Melody Aura Sound',
    category: 'Sound & Audio Specialist',
    location: 'Suleman, Jakarta',
    rating: 4.9,
    reviews: 241,
    since: '2018',
    language: 'ID, EN',
    style: 'Professional',
    verified: true,
    fastRespon: true,
    trusted: true,
    whatsapp: '6281234560001',
    startingPrice: 15000000,
    about: 'Melody Aura Sound adalah spesialis sound system profesional berbasis di Jakarta. Kami menyediakan layanan audio berkualitas tinggi untuk berbagai jenis event — dari corporate gathering hingga konser besar. Dengan pengalaman lebih dari 6 tahun dan peralatan berstandar internasional, kami telah melayani 500+ event di seluruh Indonesia.',
    images: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80',
      'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=400&q=80',
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80',
    ],
    packages: [
      { name: 'Basic Sound Setup', desc: 'Line Array 2 pcs, Mixer Digital, 2 Mic Wireless', price: 15000000, tag: null },
      { name: 'Grand Concert System', desc: 'Full Line Array, FOH Console, Monitor System, Crew', price: 45000000, tag: 'BEST SELLER' },
    ],
    mapAddress: 'Jl. Suleman No. 12, Jakarta Selatan',
    reviews_list: [
      { name: 'Rizky M.', avatar: 'https://i.pravatar.cc/40?img=1', rating: 5, comment: 'Sound systemnya luar biasa jernih! Tim sangat profesional dan tepat waktu. Event corporate kami berjalan sempurna.' },
      { name: 'Sari W.', avatar: 'https://i.pravatar.cc/40?img=5', rating: 5, comment: 'Fast response, harga kompetitif, hasil memuaskan. Sudah 3x pakai untuk acara kampus dan selalu memuaskan.' },
    ],
  },
  'atelier-decor': {
    name: 'Atelier Decor',
    category: 'Floral & Art Direction',
    location: 'Tangerang Selatan',
    rating: 5.0,
    reviews: 92,
    since: '2016',
    language: 'ID, EN',
    style: 'Editorial',
    verified: true,
    fastRespon: true,
    trusted: false,
    whatsapp: '6281234560002',
    startingPrice: 45000000,
    about: 'Atelier Decor adalah studio dekorasi premium yang menghadirkan estetika floral dan art direction kelas dunia untuk event pernikahan dan korporat. Dengan pendekatan editorial yang unik, setiap dekorasi kami menjadi karya seni tersendiri.',
    images: [
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80',
      'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=400&q=80',
      'https://images.unsplash.com/photo-1561494937-a4d13c9c9e2a?w=400&q=80',
    ],
    packages: [
      { name: 'Essential Floral', desc: 'Dekorasi meja, backdrop, bunga segar import', price: 45000000, tag: null },
      { name: 'Grand Wedding Decor', desc: 'Full venue styling, floral arch, ceiling installation, photo booth', price: 120000000, tag: 'BEST SELLER' },
    ],
    mapAddress: 'Jl. BSD Raya No. 8, Tangerang Selatan',
    reviews_list: [
      { name: 'Amalia K.', avatar: 'https://i.pravatar.cc/40?img=10', rating: 5, comment: 'Dekorasi pernikahan kami terlihat seperti dari majalah! Atelier Decor benar-benar memahami visi kami.' },
      { name: 'Dimas W.', avatar: 'https://i.pravatar.cc/40?img=15', rating: 5, comment: 'Sangat detail dan profesional. Tim mereka ramah dan selalu memberikan saran terbaik.' },
    ],
  },
  'visual-soul-studio': {
    name: 'Visual Soul Studio',
    category: 'Cinematic Documentation',
    location: 'Kemang, Jakarta',
    rating: 4.8,
    reviews: 180,
    since: '2019',
    language: 'ID, EN',
    style: 'Cinematic',
    verified: true,
    fastRespon: false,
    trusted: true,
    whatsapp: '6281234560003',
    startingPrice: 20000000,
    about: 'Visual Soul Studio menghadirkan dokumentasi sinematik berkualitas film untuk setiap momen penting Anda. Dengan kamera cinema-grade dan tim editor berpengalaman, kami memastikan setiap frame bercerita.',
    images: [
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
      'https://images.unsplash.com/photo-1500531279542-fc8490c8ea4d?w=400&q=80',
      'https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=400&q=80',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80',
    ],
    packages: [
      { name: 'Essential Documentation', desc: '8 Jam Coverage, 2 Videografer, Highlight 3 menit', price: 20000000, tag: null },
      { name: 'Cinematic Full Day', desc: '12 Jam Coverage, 3 Kamera, Drone, Full Edit + Color Grading', price: 55000000, tag: 'BEST SELLER' },
    ],
    mapAddress: 'Jl. Kemang Raya No. 45, Jakarta Selatan',
    reviews_list: [
      { name: 'Budi S.', avatar: 'https://i.pravatar.cc/40?img=20', rating: 5, comment: 'Video wedding kami seperti film bioskop! Kualitas luar biasa, tim sangat profesional.' },
      { name: 'Linda P.', avatar: 'https://i.pravatar.cc/40?img=25', rating: 4, comment: 'Hasil editing sangat memuaskan. Pengiriman tepat waktu sesuai perjanjian.' },
    ],
  },
  'savory-palette': {
    name: 'Savory Palette',
    category: 'Premium Catering Group',
    location: 'Kelion Jenal, Jakarta',
    rating: 4.9,
    reviews: 310,
    since: '2015',
    language: 'ID',
    style: 'Modern Indonesian',
    verified: true,
    fastRespon: true,
    trusted: true,
    whatsapp: '6281234560004',
    startingPrice: 350000,
    about: 'Savory Palette adalah kelompok catering premium yang mengkhususkan diri dalam masakan Indonesia modern dan fusion untuk event korporat, pernikahan, dan gathering eksklusif. Kami melayani dari 50 hingga 5.000 tamu.',
    images: [
      'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80',
      'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
    ],
    packages: [
      { name: 'Basic Package', desc: '3 menu utama, 2 minuman, setup buffet standard', price: 350000, tag: null, unit: '/pax' },
      { name: 'Premium Gala Dinner', desc: '7 course meal, live cooking station, dedicated chef team', price: 850000, tag: 'BEST SELLER', unit: '/pax' },
    ],
    mapAddress: 'Jl. Kelion Jenal No. 22, Jakarta Timur',
    reviews_list: [
      { name: 'Hendra K.', avatar: 'https://i.pravatar.cc/40?img=30', rating: 5, comment: 'Makanan lezat, presentasi cantik, pelayanan profesional. Tamu corporate kami sangat puas!' },
      { name: 'Maya R.', avatar: 'https://i.pravatar.cc/40?img=35', rating: 5, comment: 'Sudah 4x pakai untuk event kantor. Selalu konsisten dan tidak pernah mengecewakan.' },
    ],
  },
};

// Fallback untuk vendor yang tidak ada di data
function getFallbackVendor(slug: string) {
  const name = slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    name,
    category: 'Event Vendor',
    location: 'Jakarta',
    rating: 4.8,
    reviews: 50,
    since: '2020',
    language: 'ID',
    style: 'Professional',
    verified: true,
    fastRespon: false,
    trusted: false,
    whatsapp: '6281234560000',
    startingPrice: 5000000,
    about: 'Vendor profesional untuk kebutuhan event Anda.',
    images: ['https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80'],
    packages: [
      { name: 'Paket Standar', desc: 'Layanan standar profesional', price: 5000000, tag: null },
    ],
    mapAddress: 'Jakarta',
    reviews_list: [],
  };
}

function formatPrice(price: number) {
  if (price >= 1000000) return `Rp ${(price / 1000000).toFixed(0)}.${price % 1000000 >= 500000 ? '5' : '0'}00.000`;
  if (price >= 1000) return `Rp ${(price / 1000).toFixed(0)}rb`;
  return `Rp ${price.toLocaleString('id-ID')}`;
}

// Simple calendar component
function AvailabilityCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9)); // Oct 2024
  const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Mock: penuh di tanggal tertentu
  const fullDays = [5, 12, 18, 25, 26];
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const prev = () => setCurrentMonth(new Date(year, month - 1));
  const next = () => setCurrentMonth(new Date(year, month + 1));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontWeight: 600, fontSize: 14 }}>{MONTH_NAMES[month]} {year}</span>
        <div style={{ display: 'flex', gap: 4 }}>
          <button onClick={prev} style={{ background: 'none', border: '1px solid var(--gray-200)', borderRadius: 6, padding: '4px 8px', cursor: 'pointer' }}><ChevronLeft size={14} /></button>
          <button onClick={next} style={{ background: 'none', border: '1px solid var(--gray-200)', borderRadius: 6, padding: '4px 8px', cursor: 'pointer' }}><ChevronR size={14} /></button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, padding: '4px 0' }}>{d}</div>
        ))}
        {days.map((day, i) => (
          <div key={i} style={{
            textAlign: 'center',
            fontSize: 13,
            padding: '6px 4px',
            borderRadius: 6,
            background: day && fullDays.includes(day) ? '#FEF2F2' : day ? '#F0FDF4' : 'transparent',
            color: !day ? 'transparent' : fullDays.includes(day) ? '#EF4444' : 'var(--verified-green)',
            fontWeight: day ? 600 : 400,
            cursor: day && !fullDays.includes(day) ? 'pointer' : 'default',
          }}>
            {day || ''}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--verified-green)', display: 'inline-block' }} />
          Tersedia
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444', display: 'inline-block' }} />
          Penuh
        </div>
      </div>
    </div>
  );
}

export default function VendorDetailPage() {
  const params = useParams();
  const slug = params?.id as string;
  const vendor = VENDOR_DATA[slug] || getFallbackVendor(slug);
  const [saved, setSaved] = useState(false);

  return (
    <main style={{ minHeight: '100vh', background: 'var(--white)' }}>
      <Navbar />

      <div style={{ paddingTop: 64 }}>
        {/* Breadcrumb */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/" style={{ color: 'var(--text-muted)', fontSize: 13, textDecoration: 'none' }}>Explore</Link>
          <ChevronRight size={14} color="var(--text-muted)" />
          <Link href={`/search?kategori=${vendor.category}`} style={{ color: 'var(--text-muted)', fontSize: 13, textDecoration: 'none' }}>{vendor.category}</Link>
          <ChevronRight size={14} color="var(--text-muted)" />
          <span style={{ color: 'var(--text-primary)', fontSize: 13, fontWeight: 500 }}>{vendor.name}</span>
        </div>

        {/* Header */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 32, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: 8 }}>
                {vendor.name}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Star size={16} fill="var(--amber)" color="var(--amber)" />
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{vendor.rating}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>({vendor.reviews} Reviews)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-secondary)', fontSize: 14 }}>
                  <MapPin size={14} />
                  {vendor.location}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-full)', padding: '8px 16px', cursor: 'pointer', fontSize: 14, color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}>
                <Share2 size={15} /> Share
              </button>
              <button onClick={() => setSaved(!saved)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: saved ? '#FFF0F0' : 'var(--gray-50)', border: `1px solid ${saved ? '#FECACA' : 'var(--gray-200)'}`, borderRadius: 'var(--radius-full)', padding: '8px 16px', cursor: 'pointer', fontSize: 14, color: saved ? '#EF4444' : 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s' }}>
                <Heart size={15} fill={saved ? '#EF4444' : 'none'} /> Save
              </button>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, borderRadius: 'var(--radius-xl)', overflow: 'hidden', maxHeight: 460 }}>
            <div style={{ overflow: 'hidden' }}>
              <img src={vendor.images[0]} alt={vendor.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
            </div>
            <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 12 }}>
              {vendor.images.slice(1, 3).map((img: string, i: number) => (
                <div key={i} style={{ overflow: 'hidden', position: 'relative' }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
                  {i === 1 && vendor.images.length > 3 && (
                    <button style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)', border: 'none', borderRadius: 'var(--radius-sm)', padding: '8px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, fontFamily: 'DM Sans, sans-serif', color: 'var(--text-primary)' }}>
                      <Grid3x3 size={14} /> See All 48 Photos
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48 }}>

          {/* LEFT */}
          <div>
            {/* Badges */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
              {vendor.verified && <span className="badge badge-verified"><CheckCircle size={11} /> Verified Vendor</span>}
              {vendor.fastRespon && <span className="badge badge-fast"><Zap size={11} /> Fast Respon</span>}
              {vendor.trusted && <span className="badge badge-trusted"><Award size={11} /> Vendor Terpercaya</span>}
            </div>

            {/* About */}
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700, marginBottom: 12 }}>About the Vendor</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7 }}>{vendor.about}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 24 }}>
                {[
                  { label: 'SINCE', value: vendor.since },
                  { label: 'LANGUAGE', value: vendor.language },
                  { label: 'STYLE', value: vendor.style },
                ].map(item => (
                  <div key={item.label}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-primary)' }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Packages */}
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Service Packages</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {vendor.packages.map((pkg: any, i: number) => (
                  <div key={i} style={{
                    borderRadius: 'var(--radius-lg)',
                    padding: 20,
                    border: pkg.tag ? 'none' : '1px solid var(--gray-200)',
                    background: pkg.tag ? 'var(--forest)' : 'var(--white)',
                    position: 'relative',
                  }}>
                    {pkg.tag && (
                      <span style={{ position: 'absolute', top: -10, left: 16, background: 'var(--amber)', color: 'var(--forest)', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 'var(--radius-full)', letterSpacing: '0.05em' }}>
                        {pkg.tag}
                      </span>
                    )}
                    <div style={{ fontWeight: 700, fontSize: 16, color: pkg.tag ? 'var(--white)' : 'var(--text-primary)', marginBottom: 8 }}>{pkg.name}</div>
                    <p style={{ fontSize: 13, color: pkg.tag ? 'rgba(255,255,255,0.7)' : 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 16 }}>{pkg.desc}</p>
                    <div style={{ fontSize: 12, color: pkg.tag ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)', marginBottom: 4 }}>Starts from</div>
                    <div style={{ fontWeight: 800, fontSize: 20, color: pkg.tag ? 'var(--white)' : 'var(--forest)', marginBottom: 12 }}>
                      Rp {pkg.price.toLocaleString('id-ID')}{pkg.unit || ''}
                    </div>
                    <button style={{ background: 'none', border: `1px solid ${pkg.tag ? 'rgba(255,255,255,0.4)' : 'var(--gray-300)'}`, borderRadius: 'var(--radius-full)', padding: '6px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: pkg.tag ? 'var(--white)' : 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}>
                      View Details →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700 }}>Vendor Location</h2>
                <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{vendor.mapAddress}</span>
              </div>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: 200, background: 'var(--gray-100)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Map placeholder — integrate Leaflet.js here */}
                <div style={{ textAlign: 'center' }}>
                  <MapPin size={32} color="var(--forest)" />
                  <div style={{ marginTop: 8, fontWeight: 600, color: 'var(--text-primary)' }}>{vendor.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{vendor.mapAddress}</div>
                </div>
                <button style={{ position: 'absolute', bottom: 12, right: 12, background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-sm)', padding: '8px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, fontFamily: 'DM Sans, sans-serif' }}>
                  <Grid3x3 size={13} /> Open Maps
                </button>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700 }}>Client Love</h2>
                <Link href="#" style={{ color: 'var(--forest)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>See All {vendor.reviews} Reviews</Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {vendor.reviews_list.map((r: any, i: number) => (
                  <div key={i} style={{ borderRadius: 'var(--radius-md)', padding: 20, background: 'var(--gray-50)', borderLeft: '3px solid var(--amber)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <img src={r.avatar} alt={r.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</div>
                        <div style={{ display: 'flex', gap: 2 }}>
                          {Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={11} fill="var(--amber)" color="var(--amber)" />)}
                        </div>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic' }}>"{r.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Sticky booking card */}
          <div>
            <div style={{ position: 'sticky', top: 80, borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-200)', padding: 24, boxShadow: 'var(--shadow-md)', background: 'var(--white)' }}>
              {/* Price */}
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Starting Price</div>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 700, color: 'var(--forest)' }}>
                  Rp {vendor.startingPrice.toLocaleString('id-ID')}
                </div>
              </div>

              {/* Calendar */}
              <div style={{ marginBottom: 20, borderTop: '1px solid var(--gray-100)', paddingTop: 20 }}>
                <AvailabilityCalendar />
              </div>

              {/* CTA buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a
                  href={`https://wa.me/${vendor.whatsapp}?text=Halo,%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(vendor.name)}%20di%20Findor`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#25D366', color: 'var(--white)', fontWeight: 700, fontSize: 15, padding: '14px', borderRadius: 'var(--radius-full)', textDecoration: 'none', transition: 'all 0.2s', fontFamily: 'DM Sans, sans-serif' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#1ebe5d')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#25D366')}>
                  <MessageCircle size={18} /> Hubungi via WhatsApp
                </a>
                <Link href={`/booking/${slug}`} className="btn-primary" style={{ justifyContent: 'center', width: '100%', padding: '14px', textAlign: 'center' }}>
                  Submit Transaksi
                </Link>
                <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)' }}>Bebas biaya konsultasi awal via Findor</p>
              </div>

              {/* Trust badges */}
              <div style={{ borderTop: '1px solid var(--gray-100)', marginTop: 20, paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: <Shield size={15} />, title: 'Jaminan Transaksi', desc: 'Pembayaran aman dengan sistem escrow Findor.' },
                  { icon: <RotateCcw size={15} />, title: 'Kebijakan Batal', desc: 'Refund 100% jika pembatalan > 30 hari.' },
                ].map(item => (
                  <div key={item.title} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ color: 'var(--forest)', flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>{item.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .vendor-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}