'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Heart, Star, MapPin,
  CheckCircle, Trash2, ArrowRight, Search,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type UserData = { id: number; name: string; role: string; isVendor: boolean };

type WishlistItem = {
  id: string; name: string; kategori: string; lokasi: string;
  rating: number; reviews: number; harga: string; img: string;
  verified: boolean; savedAt: string;
};

const DUMMY_WISHLIST: WishlistItem[] = [
  { id: 'melody-aura-sound', name: 'Melody Aura Sound', kategori: 'Sound & Audio Specialist', lokasi: 'Suleman, Jakarta', rating: 4.9, reviews: 241, harga: 'Rp 15jt', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80', verified: true, savedAt: '2 hari lalu' },
  { id: 'atelier-decor', name: 'Atelier Decor', kategori: 'Floral & Art Direction', lokasi: 'Tangerang Selatan', rating: 5.0, reviews: 92, harga: 'Rp 45jt', img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80', verified: true, savedAt: '5 hari lalu' },
  { id: 'visual-soul-studio', name: 'Visual Soul Studio', kategori: 'Cinematic Documentation', lokasi: 'Kemang, Jakarta', rating: 4.8, reviews: 180, harga: 'Rp 20jt', img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80', verified: true, savedAt: '1 minggu lalu' },
  { id: 'savory-palette', name: 'Savory Palette', kategori: 'Premium Catering Group', lokasi: 'Kelion Jenal, Jakarta', rating: 4.9, reviews: 310, harga: 'Rp 350rb', img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80', verified: false, savedAt: '2 minggu lalu' },
];

export default function WishlistPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [items, setItems] = useState<WishlistItem[]>(DUMMY_WISHLIST);
  const [search, setSearch] = useState('');
  const [removed, setRemoved] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      const parsed: UserData | null = stored ? JSON.parse(stored) : null;
      if (!parsed) { router.push('/login'); return; }
      setUser(parsed);
    } catch { router.push('/login'); }
  }, [router]);

  const handleRemove = (id: string) => {
    setRemoved(id);
    setTimeout(() => {
      setItems(prev => prev.filter(i => i.id !== id));
      setRemoved(null);
    }, 300);
  };

  if (!user) return null;

  const filtered = items.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.kategori.toLowerCase().includes(search.toLowerCase())
  );

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

        <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px' }}>
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
                  <Heart size={22} color="white"/>
                </div>
                <h1 style={{
                  fontFamily:'Fraunces, serif', fontSize:28, fontWeight:900,
                  color:'white', letterSpacing:'-0.8px', lineHeight:1,
                }}>
                  Wishlist
                </h1>
              </div>
              <p style={{ fontSize:14, color:'rgba(255,255,255,0.5)' }}>
                {items.length} vendor tersimpan
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'32px 32px 80px' }}>

        {/* Toolbar */}
        <div style={{
          background:'white', borderRadius:16, border:'1px solid #eeede9',
          boxShadow:'0 1px 4px rgba(0,0,0,0.04)',
          padding:'16px 20px', marginBottom:24,
          display:'flex', alignItems:'center', gap:12,
        }}>
          <div style={{ position:'relative', flex:1 }}>
            <Search size={15} color="#c4c2bb" style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)' }}/>
            <input
              value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Cari vendor di wishlist..."
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
          <div style={{ fontSize:13, color:'#9ca3af', fontWeight:500, whiteSpace:'nowrap' }}>
            {filtered.length} vendor
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{
            background:'white', borderRadius:20, border:'1px solid #eeede9',
            boxShadow:'0 1px 4px rgba(0,0,0,0.04)', padding:'64px 24px', textAlign:'center',
          }}>
            <div style={{ width:72, height:72, borderRadius:20, background:'#f5f4f0', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
              <Heart size={32} color="#c4c2bb"/>
            </div>
            <div style={{ fontSize:16, fontWeight:700, color:'#111827', marginBottom:6 }}>
              {search ? 'Vendor tidak ditemukan' : 'Wishlist masih kosong'}
            </div>
            <div style={{ fontSize:13, color:'#9ca3af', marginBottom:24, lineHeight:1.6 }}>
              {search ? 'Coba kata kunci lain.' : 'Simpan vendor favoritmu agar mudah ditemukan kembali.'}
            </div>
            {!search && (
              <Link href="/browse" style={{
                display:'inline-flex', alignItems:'center', gap:6,
                padding:'10px 22px', borderRadius:999,
                background:'#0D3B2E', color:'white',
                fontSize:13, fontWeight:700, textDecoration:'none',
              }}>
                Jelajahi Vendor
              </Link>
            )}
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:20 }}>
            {filtered.map(item => (
              <div key={item.id} style={{
                background:'white', borderRadius:20,
                border:'1px solid #eeede9',
                boxShadow:'0 1px 4px rgba(0,0,0,0.04)',
                overflow:'hidden',
                opacity: removed === item.id ? 0 : 1,
                transform: removed === item.id ? 'scale(0.96)' : 'scale(1)',
                transition:'opacity 0.25s, transform 0.25s',
              }}>
                {/* Image */}
                <div style={{ position:'relative', height:180, overflow:'hidden', background:'#f5f4f0' }}>
                  <img src={item.img} alt={item.name} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s' }}
                    onMouseEnter={e=>(e.currentTarget.style.transform='scale(1.05)')}
                    onMouseLeave={e=>(e.currentTarget.style.transform='scale(1)')}
                  />
                  {/* Badges */}
                  <div style={{ position:'absolute', top:10, left:10, display:'flex', gap:6 }}>
                    {item.verified && (
                      <span style={{ display:'inline-flex', alignItems:'center', gap:4, background:'rgba(255,255,255,0.92)', backdropFilter:'blur(8px)', color:'#15803D', fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:999 }}>
                        <CheckCircle size={9}/> Verified
                      </span>
                    )}
                  </div>
                  {/* Rating */}
                  <div style={{ position:'absolute', top:10, right:10, background:'rgba(255,255,255,0.92)', backdropFilter:'blur(8px)', borderRadius:999, padding:'3px 8px', display:'flex', alignItems:'center', gap:4 }}>
                    <Star size={10} fill="#F5A623" color="#F5A623"/>
                    <span style={{ fontSize:11, fontWeight:700, color:'#111827' }}>{item.rating}</span>
                  </div>
                  {/* Remove btn */}
                  <button onClick={()=>handleRemove(item.id)} style={{
                    position:'absolute', bottom:10, right:10,
                    width:32, height:32, borderRadius:'50%',
                    background:'rgba(255,255,255,0.92)', backdropFilter:'blur(8px)',
                    border:'none', cursor:'pointer',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    transition:'background 0.15s',
                  }}
                    onMouseEnter={e=>(e.currentTarget.style.background='#fef2f2')}
                    onMouseLeave={e=>(e.currentTarget.style.background='rgba(255,255,255,0.92)')}
                    title="Hapus dari wishlist"
                  >
                    <Trash2 size={13} color="#dc2626"/>
                  </button>
                </div>

                {/* Content */}
                <div style={{ padding:'16px 18px' }}>
                  <div style={{ fontSize:15, fontWeight:800, color:'#111827', marginBottom:3 }}>{item.name}</div>
                  <div style={{ fontSize:12, color:'#9ca3af', marginBottom:8 }}>{item.kategori}</div>
                  <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:12, color:'#6b7280', marginBottom:14 }}>
                    <MapPin size={11}/> {item.lokasi}
                  </div>

                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:12, borderTop:'1px solid #f5f4f0' }}>
                    <div>
                      <div style={{ fontSize:10, color:'#c4c2bb', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em' }}>Mulai dari</div>
                      <div style={{ fontSize:16, fontWeight:900, color:'#0D3B2E', fontFamily:'Fraunces, serif' }}>{item.harga}</div>
                    </div>
                    <Link href={`/vendor/${item.id}`} style={{
                      display:'inline-flex', alignItems:'center', gap:5,
                      padding:'8px 14px', borderRadius:999,
                      background:'#0D3B2E', color:'white',
                      fontSize:12, fontWeight:700, textDecoration:'none',
                      transition:'background 0.15s',
                    }}
                      onMouseEnter={e=>(e.currentTarget.style.background='#145740')}
                      onMouseLeave={e=>(e.currentTarget.style.background='#0D3B2E')}
                    >
                      Lihat <ArrowRight size={11}/>
                    </Link>
                  </div>

                  <div style={{ fontSize:11, color:'#c4c2bb', marginTop:8 }}>
                    Disimpan {item.savedAt}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
