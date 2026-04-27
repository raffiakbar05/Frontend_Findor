'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Receipt, Clock, CheckCircle,
  XCircle, ChevronRight, Search, SlidersHorizontal,
  CalendarDays, MapPin, Star,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type UserData = { id: number; name: string; role: string; isVendor: boolean };

type Transaksi = {
  id: string; vendor: string; kategori: string; tanggal: string;
  lokasi: string; harga: number; status: 'menunggu' | 'dikonfirmasi' | 'selesai' | 'dibatalkan';
  img: string;
};

const DUMMY: Transaksi[] = [
  { id: 'TRX-001', vendor: 'Melody Aura Sound', kategori: 'Sound & Audio', tanggal: '12 Agustus 2025', lokasi: 'Jakarta Selatan', harga: 15000000, status: 'selesai', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=120&q=80' },
  { id: 'TRX-002', vendor: 'Atelier Decor', kategori: 'Dekorasi & Florist', tanggal: '28 September 2025', lokasi: 'Tangerang Selatan', harga: 45000000, status: 'dikonfirmasi', img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=120&q=80' },
  { id: 'TRX-003', vendor: 'Savory Palette', kategori: 'Catering Premium', tanggal: '5 Oktober 2025', lokasi: 'Jakarta Timur', harga: 12500000, status: 'menunggu', img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=120&q=80' },
  { id: 'TRX-004', vendor: 'Visual Soul Studio', kategori: 'Dokumentasi', tanggal: '3 Juli 2025', lokasi: 'Kemang, Jakarta', harga: 20000000, status: 'dibatalkan', img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=120&q=80' },
];

const STATUS_CONFIG = {
  menunggu:     { label: 'Menunggu',     color: '#d97706', bg: '#fef9ec', icon: <Clock size={12}/> },
  dikonfirmasi: { label: 'Dikonfirmasi', color: '#0369a1', bg: '#e0f2fe', icon: <CheckCircle size={12}/> },
  selesai:      { label: 'Selesai',      color: '#15803D', bg: '#DCFCE7', icon: <CheckCircle size={12}/> },
  dibatalkan:   { label: 'Dibatalkan',   color: '#dc2626', bg: '#fef2f2', icon: <XCircle size={12}/> },
};

const TABS = ['Semua', 'Menunggu', 'Dikonfirmasi', 'Selesai', 'Dibatalkan'];

export default function TransaksiPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState('Semua');
  const [search, setSearch] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      const parsed: UserData | null = stored ? JSON.parse(stored) : null;
      if (!parsed) { router.push('/login'); return; }
      setUser(parsed);
    } catch { router.push('/login'); }
  }, [router]);

  if (!user) return null;

  const filtered = DUMMY.filter(t => {
    const matchTab = activeTab === 'Semua' || t.status === activeTab.toLowerCase();
    const matchSearch = t.vendor.toLowerCase().includes(search.toLowerCase()) || t.kategori.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const stats = [
    { label: 'Total Transaksi', value: DUMMY.length, color: '#0369a1', bg: '#e0f2fe' },
    { label: 'Selesai', value: DUMMY.filter(t => t.status === 'selesai').length, color: '#15803D', bg: '#DCFCE7' },
    { label: 'Aktif', value: DUMMY.filter(t => t.status === 'dikonfirmasi' || t.status === 'menunggu').length, color: '#d97706', bg: '#fef9ec' },
    { label: 'Dibatalkan', value: DUMMY.filter(t => t.status === 'dibatalkan').length, color: '#dc2626', bg: '#fef2f2' },
  ];

  return (
    <main style={{ minHeight: '100vh', background: '#F7F6F2', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <Navbar />

      {/* ── HERO BANNER ── */}
      <div style={{
        background: 'linear-gradient(135deg, #0D3B2E 0%, #145740 50%, #1a6b4e 100%)',
        position: 'relative', overflow: 'hidden',
        paddingTop: 88, paddingBottom: 56,
      }}>
        <div style={{ position:'absolute', top:-60, right:-60, width:400, height:400, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.05)' }} />
        <div style={{ position:'absolute', bottom:-80, left:60, width:280, height:280, borderRadius:'50%', background:'rgba(245,166,35,0.06)' }} />
        <div style={{ position:'absolute', top:80, left:-60, width:200, height:200, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.04)' }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
          <Link href="/profile" style={{
            display:'inline-flex', alignItems:'center', gap:6,
            color:'rgba(255,255,255,0.45)', fontSize:13, fontWeight:500,
            textDecoration:'none', marginBottom:28, transition:'color 0.15s',
          }}
            onMouseEnter={e=>(e.currentTarget.style.color='rgba(255,255,255,0.85)')}
            onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.45)')}
          >
            <ArrowLeft size={14}/> Profil Saya
          </Link>

          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10 }}>
                <div style={{
                  width:48, height:48, borderRadius:14,
                  background:'rgba(255,255,255,0.1)', backdropFilter:'blur(8px)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <Receipt size={22} color="white"/>
                </div>
                <h1 style={{
                  fontFamily:'Fraunces, serif', fontSize:28, fontWeight:900,
                  color:'white', letterSpacing:'-0.8px', lineHeight:1,
                }}>
                  Transaksi Saya
                </h1>
              </div>
              <p style={{ fontSize:14, color:'rgba(255,255,255,0.5)', fontWeight:400 }}>
                Riwayat dan status semua booking vendor kamu
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'32px 32px 80px' }}>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:28 }}>
          {stats.map(s => (
            <div key={s.label} style={{
              background:'white', borderRadius:16, padding:'18px 20px',
              border:'1px solid #eeede9', boxShadow:'0 1px 4px rgba(0,0,0,0.04)',
              display:'flex', alignItems:'center', gap:14,
            }}>
              <div style={{ width:44, height:44, borderRadius:12, background:s.bg, color:s.color, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:20, fontWeight:900, fontFamily:'Fraunces, serif' }}>
                {s.value}
              </div>
              <div style={{ fontSize:12, color:'#9ca3af', fontWeight:500, lineHeight:1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Card */}
        <div style={{ background:'white', borderRadius:20, border:'1px solid #eeede9', boxShadow:'0 1px 4px rgba(0,0,0,0.04)', overflow:'hidden' }}>

          {/* Toolbar */}
          <div style={{ padding:'20px 24px', borderBottom:'1px solid #f5f4f0', display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, flexWrap:'wrap' }}>
            {/* Search */}
            <div style={{ position:'relative', flex:1, minWidth:200 }}>
              <Search size={15} color="#c4c2bb" style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)' }}/>
              <input
                value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Cari vendor atau kategori..."
                style={{
                  width:'100%', padding:'9px 14px 9px 36px',
                  borderRadius:10, fontSize:13,
                  border:'1.5px solid #eeede9', outline:'none',
                  fontFamily:'inherit', color:'#111827',
                  background:'#fafaf8', boxSizing:'border-box',
                  transition:'border-color 0.15s',
                }}
                onFocus={e=>(e.currentTarget.style.borderColor='#0D3B2E')}
                onBlur={e=>(e.currentTarget.style.borderColor='#eeede9')}
              />
            </div>
            <button style={{
              display:'flex', alignItems:'center', gap:6,
              padding:'9px 16px', borderRadius:10,
              border:'1.5px solid #eeede9', background:'#fafaf8',
              fontSize:13, fontWeight:600, color:'#6b7280',
              cursor:'pointer', fontFamily:'inherit',
            }}>
              <SlidersHorizontal size={14}/> Filter
            </button>
          </div>

          {/* Tabs */}
          <div style={{ padding:'0 24px', borderBottom:'1px solid #f5f4f0', display:'flex', gap:4, overflowX:'auto' }}>
            {TABS.map(tab => (
              <button key={tab} onClick={()=>setActiveTab(tab)} style={{
                padding:'14px 16px', fontSize:13, fontWeight:600,
                color: activeTab===tab ? '#0D3B2E' : '#9ca3af',
                background:'none', border:'none', cursor:'pointer',
                fontFamily:'inherit', whiteSpace:'nowrap',
                borderBottom: activeTab===tab ? '2px solid #0D3B2E' : '2px solid transparent',
                transition:'all 0.15s',
              }}>
                {tab}
              </button>
            ))}
          </div>

          {/* List */}
          <div style={{ padding:'8px 0' }}>
            {filtered.length === 0 ? (
              <EmptyState icon={<Receipt size={32} color="#c4c2bb"/>} title="Belum ada transaksi" desc="Transaksi kamu akan muncul di sini setelah booking vendor." cta="Jelajahi Vendor" href="/browse"/>
            ) : (
              filtered.map((t, i) => {
                const st = STATUS_CONFIG[t.status];
                return (
                  <div key={t.id} style={{
                    display:'flex', alignItems:'center', gap:16,
                    padding:'18px 24px',
                    borderBottom: i < filtered.length-1 ? '1px solid #f9f8f5' : 'none',
                    transition:'background 0.15s', cursor:'pointer',
                  }}
                    onMouseEnter={e=>(e.currentTarget.style.background='#fafaf8')}
                    onMouseLeave={e=>(e.currentTarget.style.background='transparent')}
                  >
                    {/* Thumbnail */}
                    <div style={{ width:64, height:64, borderRadius:14, overflow:'hidden', flexShrink:0, background:'#f5f4f0' }}>
                      <img src={t.img} alt={t.vendor} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                    </div>

                    {/* Info */}
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                        <span style={{ fontSize:15, fontWeight:700, color:'#111827' }}>{t.vendor}</span>
                        <span style={{
                          display:'inline-flex', alignItems:'center', gap:4,
                          fontSize:11, fontWeight:700, padding:'3px 8px', borderRadius:999,
                          background:st.bg, color:st.color,
                        }}>
                          {st.icon} {st.label}
                        </span>
                      </div>
                      <div style={{ fontSize:12, color:'#9ca3af', marginBottom:6 }}>{t.kategori} · {t.id}</div>
                      <div style={{ display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
                        <span style={{ display:'flex', alignItems:'center', gap:4, fontSize:12, color:'#6b7280' }}>
                          <CalendarDays size={12}/> {t.tanggal}
                        </span>
                        <span style={{ display:'flex', alignItems:'center', gap:4, fontSize:12, color:'#6b7280' }}>
                          <MapPin size={12}/> {t.lokasi}
                        </span>
                      </div>
                    </div>

                    {/* Price + action */}
                    <div style={{ textAlign:'right', flexShrink:0 }}>
                      <div style={{ fontSize:15, fontWeight:800, color:'#0D3B2E', fontFamily:'Fraunces, serif', marginBottom:8 }}>
                        Rp {t.harga.toLocaleString('id-ID')}
                      </div>
                      <div style={{ display:'flex', gap:6, justifyContent:'flex-end' }}>
                        {t.status === 'selesai' && (
                          <button style={{
                            display:'flex', alignItems:'center', gap:4,
                            padding:'6px 12px', borderRadius:999,
                            background:'#fef9ec', color:'#d97706',
                            fontSize:11, fontWeight:700, border:'none', cursor:'pointer', fontFamily:'inherit',
                          }}>
                            <Star size={11}/> Beri Review
                          </button>
                        )}
                        <button style={{
                          display:'flex', alignItems:'center', gap:4,
                          padding:'6px 12px', borderRadius:999,
                          background:'#f5f4f0', color:'#374151',
                          fontSize:11, fontWeight:700, border:'none', cursor:'pointer', fontFamily:'inherit',
                        }}>
                          Detail <ChevronRight size={11}/>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function EmptyState({ icon, title, desc, cta, href }: { icon: React.ReactNode; title: string; desc: string; cta: string; href: string }) {
  return (
    <div style={{ padding:'64px 24px', textAlign:'center' }}>
      <div style={{ width:72, height:72, borderRadius:20, background:'#f5f4f0', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
        {icon}
      </div>
      <div style={{ fontSize:16, fontWeight:700, color:'#111827', marginBottom:6 }}>{title}</div>
      <div style={{ fontSize:13, color:'#9ca3af', marginBottom:24, lineHeight:1.6 }}>{desc}</div>
      <Link href={href} style={{
        display:'inline-flex', alignItems:'center', gap:6,
        padding:'10px 22px', borderRadius:999,
        background:'#0D3B2E', color:'white',
        fontSize:13, fontWeight:700, textDecoration:'none',
      }}>
        {cta}
      </Link>
    </div>
  );
}
