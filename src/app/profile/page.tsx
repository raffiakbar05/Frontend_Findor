'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Camera, Mail, Phone, MapPin, Calendar, Shield,
  CheckCircle, Edit3, Save, X, ArrowLeft,
  Receipt, Heart, Star, Store,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type UserData = {
  id: number; name: string; role: string; isVendor: boolean;
  phone?: string; location?: string; bio?: string; joinDate?: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', location: '', bio: '' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      const parsed: UserData | null = stored ? JSON.parse(stored) : null;
      if (!parsed) { router.push('/login'); return; }
      const full: UserData = {
        joinDate: new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
        phone: '', location: '', bio: '', ...parsed,
      };
      setUser(full);
      setForm({ name: full.name, phone: full.phone || '', location: full.location || '', bio: full.bio || '' });
    } catch { router.push('/login'); }
  }, [router]);

  const handleSave = () => {
    if (!user) return;
    const updated = { ...user, ...form };
    localStorage.setItem('user', JSON.stringify(updated));
    setUser(updated);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCancel = () => {
    if (!user) return;
    setForm({ name: user.name, phone: user.phone || '', location: user.location || '', bio: user.bio || '' });
    setEditing(false);
  };

  if (!user) return null;

  const initial = user.name.charAt(0).toUpperCase();

  return (
    <main style={{ minHeight: '100vh', background: '#F7F6F2', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <Navbar />

      {/* ── HERO BANNER — full bleed dari top, navbar transparan di atasnya ── */}
      <div style={{
        background: 'linear-gradient(135deg, #0D3B2E 0%, #145740 50%, #1a6b4e 100%)',
        position: 'relative', overflow: 'hidden',
        paddingTop: 88,   /* tinggi navbar pill ~72px + 16px top offset */
        paddingBottom: 80,
      }}>
        {/* decorative rings */}
        <div style={{ position:'absolute', top:-60, right:-60, width:400, height:400, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.05)' }} />
        <div style={{ position:'absolute', top:-20, right:60, width:220, height:220, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.04)' }} />
        <div style={{ position:'absolute', bottom:-80, left:60, width:280, height:280, borderRadius:'50%', background:'rgba(245,166,35,0.06)' }} />
        <div style={{ position:'absolute', top:80, left:-60, width:200, height:200, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.04)' }} />

        <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px' }}>
          {/* back link */}
          <Link href="/" style={{
            display:'inline-flex', alignItems:'center', gap:6,
            color:'rgba(255,255,255,0.45)', fontSize:13, fontWeight:500,
            textDecoration:'none', transition:'color 0.15s', marginBottom:36,
          }}
            onMouseEnter={e=>(e.currentTarget.style.color='rgba(255,255,255,0.85)')}
            onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.45)')}
          >
            <ArrowLeft size={14}/> Beranda
          </Link>

          {/* ── PROFILE HEADER ── */}
          <div style={{
            display:'flex', alignItems:'flex-end', justifyContent:'space-between',
            flexWrap:'wrap', gap:20,
          }}>
            {/* Avatar + info */}
            <div style={{ display:'flex', alignItems:'center', gap:24 }}>
              <div style={{ position:'relative', flexShrink:0 }}>
                <div style={{
                  width:96, height:96, borderRadius:'50%',
                  background:'linear-gradient(145deg, #1C3D2E 0%, #2D6A4F 100%)',
                  border:'3px solid rgba(255,255,255,0.2)',
                  boxShadow:'0 8px 32px rgba(0,0,0,0.3)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:36, fontWeight:900, color:'white',
                  fontFamily:'Fraunces, serif', letterSpacing:'-1px',
                }}>
                  {initial}
                </div>
                <button style={{
                  position:'absolute', bottom:2, right:2,
                  width:28, height:28, borderRadius:'50%',
                  background:'#F5A623', border:'2px solid rgba(255,255,255,0.3)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,0.2)',
                }}>
                  <Camera size={12} color="#0D3B2E" strokeWidth={2.5}/>
                </button>
              </div>

              <div>
                <h1 style={{
                  fontFamily:'Fraunces, serif', fontSize:28, fontWeight:900,
                  color:'white', letterSpacing:'-0.8px', marginBottom:10, lineHeight:1,
                }}>
                  {user.name}
                </h1>
                <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap' }}>
                  <span style={{
                    display:'inline-flex', alignItems:'center', gap:4,
                    background:'rgba(255,255,255,0.12)', color:'rgba(255,255,255,0.85)',
                    fontSize:11, fontWeight:700, padding:'4px 10px',
                    borderRadius:999, letterSpacing:'0.05em',
                    backdropFilter:'blur(8px)',
                  }}>
                    <CheckCircle size={10}/> Terverifikasi
                  </span>
                  <span style={{
                    display:'inline-flex', alignItems:'center', gap:4,
                    background:'rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.7)',
                    fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:999,
                  }}>
                    {user.role === 'admin' ? 'Administrator' : 'User'}
                  </span>
                  {user.isVendor && (
                    <span style={{
                      display:'inline-flex', alignItems:'center', gap:4,
                      background:'rgba(245,166,35,0.2)', color:'#F5A623',
                      fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:999,
                    }}>
                      <Store size={10}/> Vendor Aktif
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display:'flex', gap:8 }}>
              {!editing ? (
                <button onClick={()=>setEditing(true)} style={{
                  display:'flex', alignItems:'center', gap:8,
                  padding:'10px 22px', borderRadius:999,
                  background:'rgba(255,255,255,0.12)', color:'white',
                  fontSize:13, fontWeight:700,
                  border:'1.5px solid rgba(255,255,255,0.2)',
                  cursor:'pointer', fontFamily:'inherit',
                  backdropFilter:'blur(12px)',
                  transition:'all 0.2s',
                }}
                  onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.2)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.35)'; }}
                  onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.2)'; }}
                >
                  <Edit3 size={14}/> Edit Profil
                </button>
              ) : (
                <>
                  <button onClick={handleCancel} style={{
                    display:'flex', alignItems:'center', gap:7,
                    padding:'10px 18px', borderRadius:999,
                    background:'rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.7)',
                    fontSize:13, fontWeight:600,
                    border:'1.5px solid rgba(255,255,255,0.15)', cursor:'pointer', fontFamily:'inherit',
                  }}>
                    <X size={13}/> Batal
                  </button>
                  <button onClick={handleSave} style={{
                    display:'flex', alignItems:'center', gap:7,
                    padding:'10px 22px', borderRadius:999,
                    background:'#F5A623', color:'#0D3B2E',
                    fontSize:13, fontWeight:800, border:'none',
                    cursor:'pointer', fontFamily:'inherit',
                    boxShadow:'0 4px 16px rgba(245,166,35,0.4)',
                  }}>
                    <Save size={13}/> Simpan
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>  {/* end banner */}

      {/* ── BODY ── */}
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'32px 32px 80px' }}>

        {/* Toast */}
        {saved && (
          <div style={{
            display:'flex', alignItems:'center', gap:10,
            background:'#0D3B2E', color:'white',
            padding:'12px 20px', borderRadius:12, marginBottom:24,
            fontSize:13, fontWeight:600,
            boxShadow:'0 4px 20px rgba(13,59,46,0.25)',
            animation:'toastIn 0.3s cubic-bezier(0.22,1,0.36,1)',
          }}>
            <CheckCircle size={16} color="#4ade80"/> Profil berhasil disimpan
          </div>
        )}

        {/* Stats bar */}
        <div style={{
          display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:28,
        }}>
          {[
            { icon:<Receipt size={20}/>, label:'Transaksi', value:'0', color:'#0369a1', bg:'#e0f2fe', href:'/transaksi' },
            { icon:<Heart size={20}/>, label:'Wishlist', value:'0', color:'#be185d', bg:'#fdf2f8', href:'/wishlist' },
            { icon:<Star size={20}/>, label:'Review Diberikan', value:'0', color:'#d97706', bg:'#fef9ec', href:'#' },
          ].map(s=>(
            <Link key={s.label} href={s.href} style={{ textDecoration:'none' }}>
              <div style={{
                background:'white', borderRadius:16, padding:'20px 24px',
                border:'1px solid #eeede9',
                boxShadow:'0 1px 4px rgba(0,0,0,0.04)',
                display:'flex', alignItems:'center', gap:16,
                transition:'box-shadow 0.2s, transform 0.2s', cursor:'pointer',
              }}
                onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.boxShadow='0 4px 16px rgba(0,0,0,0.08)'; (e.currentTarget as HTMLDivElement).style.transform='translateY(-2px)';}}
                onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.boxShadow='0 1px 4px rgba(0,0,0,0.04)'; (e.currentTarget as HTMLDivElement).style.transform='translateY(0)';}}
              >
                <div style={{
                  width:48, height:48, borderRadius:14,
                  background:s.bg, color:s.color,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  flexShrink:0,
                }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{ fontSize:26, fontWeight:900, color:'#111827', fontFamily:'Fraunces, serif', lineHeight:1 }}>{s.value}</div>
                  <div style={{ fontSize:12, color:'#9ca3af', marginTop:4, fontWeight:500 }}>{s.label}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Main grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:24, alignItems:'start' }}>

          {/* ── LEFT ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>

            {/* Personal Info */}
            <div style={{
              background:'white', borderRadius:20,
              border:'1px solid #eeede9',
              boxShadow:'0 1px 4px rgba(0,0,0,0.04)',
              overflow:'hidden',
            }}>
              <div style={{
                padding:'22px 28px', borderBottom:'1px solid #f5f4f0',
                display:'flex', alignItems:'center', justifyContent:'space-between',
              }}>
                <div>
                  <h2 style={{ fontSize:15, fontWeight:800, color:'#111827', letterSpacing:'-0.2px' }}>Informasi Pribadi</h2>
                  <p style={{ fontSize:12, color:'#9ca3af', marginTop:2 }}>Data diri yang ditampilkan di profil kamu</p>
                </div>
              </div>

              <div style={{ padding:'28px', display:'flex', flexDirection:'column', gap:22 }}>
                <Field label="Nama Lengkap" value={form.name} editing={editing}
                  onChange={v=>setForm(f=>({...f,name:v}))} placeholder="Nama lengkap kamu" />

                {/* Email read-only */}
                <div>
                  <label style={labelSt}>Email</label>
                  <div style={{
                    display:'flex', alignItems:'center', gap:12,
                    padding:'11px 16px', background:'#fafaf8',
                    borderRadius:12, border:'1.5px solid #eeede9',
                  }}>
                    <Mail size={15} color="#c4c2bb"/>
                    <span style={{ fontSize:14, color:'#6b7280', flex:1 }}>
                      {user.name.toLowerCase().replace(/\s+/g,'')}@findor.id
                    </span>
                    <span style={{
                      fontSize:10, fontWeight:700, color:'#9ca3af',
                      background:'#f3f4f6', padding:'3px 8px', borderRadius:999,
                      letterSpacing:'0.04em',
                    }}>TERKUNCI</span>
                  </div>
                </div>

                <Field label="Nomor Telepon" value={form.phone} editing={editing}
                  onChange={v=>setForm(f=>({...f,phone:v}))} placeholder="+62 8xx xxxx xxxx"
                  icon={<Phone size={15} color="#c4c2bb"/>} />

                <Field label="Lokasi" value={form.location} editing={editing}
                  onChange={v=>setForm(f=>({...f,location:v}))} placeholder="Kota, Provinsi"
                  icon={<MapPin size={15} color="#c4c2bb"/>} />

                {/* Bio */}
                <div>
                  <label style={labelSt}>Bio</label>
                  {editing ? (
                    <textarea
                      value={form.bio}
                      onChange={e=>setForm(f=>({...f,bio:e.target.value}))}
                      placeholder="Ceritakan sedikit tentang dirimu..."
                      rows={4}
                      style={{
                        width:'100%', padding:'11px 16px',
                        borderRadius:12, fontSize:14,
                        border:'1.5px solid #d1d5db',
                        fontFamily:'inherit', color:'#111827',
                        resize:'vertical', outline:'none',
                        transition:'border-color 0.15s',
                        boxSizing:'border-box', lineHeight:1.6,
                      }}
                      onFocus={e=>(e.currentTarget.style.borderColor='#0D3B2E')}
                      onBlur={e=>(e.currentTarget.style.borderColor='#d1d5db')}
                    />
                  ) : (
                    <p style={{
                      fontSize:14, color: form.bio ? '#374151' : '#c4c2bb',
                      lineHeight:1.7, padding:'11px 16px',
                      background:'#fafaf8', borderRadius:12,
                      border:'1.5px solid #eeede9', minHeight:72,
                      fontStyle: form.bio ? 'normal' : 'italic',
                    }}>
                      {form.bio || 'Belum ada bio. Klik Edit Profil untuk menambahkan.'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Security */}
            <div style={{
              background:'white', borderRadius:20,
              border:'1px solid #eeede9',
              boxShadow:'0 1px 4px rgba(0,0,0,0.04)',
              overflow:'hidden',
            }}>
              <div style={{ padding:'22px 28px', borderBottom:'1px solid #f5f4f0' }}>
                <h2 style={{ fontSize:15, fontWeight:800, color:'#111827', letterSpacing:'-0.2px' }}>Keamanan Akun</h2>
                <p style={{ fontSize:12, color:'#9ca3af', marginTop:2 }}>Kelola password dan verifikasi akun</p>
              </div>
              <div style={{ padding:'20px 28px', display:'flex', flexDirection:'column', gap:10 }}>
                {[
                  { icon:<Shield size={17}/>, label:'Password', sub:'Terakhir diubah baru-baru ini', action:'Ubah Password', iconBg:'#f0fdf4', iconColor:'#15803D' },
                  { icon:<Mail size={17}/>, label:'Verifikasi Email', sub:'Email sudah terverifikasi', action:null, iconBg:'#e0f2fe', iconColor:'#0369a1', verified:true },
                ].map(item=>(
                  <div key={item.label} style={{
                    display:'flex', alignItems:'center', justifyContent:'space-between',
                    padding:'14px 18px', background:'#fafaf8',
                    borderRadius:14, border:'1px solid #f0efeb',
                  }}>
                    <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                      <div style={{
                        width:40, height:40, borderRadius:12,
                        background:item.iconBg, color:item.iconColor,
                        display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                      }}>
                        {item.icon}
                      </div>
                      <div>
                        <div style={{ fontSize:14, fontWeight:700, color:'#111827' }}>{item.label}</div>
                        <div style={{ fontSize:12, color: item.verified ? '#15803D' : '#9ca3af', marginTop:2 }}>{item.sub}</div>
                      </div>
                    </div>
                    {item.action && (
                      <button style={{
                        fontSize:12, fontWeight:700, color:'#0D3B2E',
                        background:'white', border:'1.5px solid #d1d5db',
                        padding:'7px 14px', borderRadius:999,
                        cursor:'pointer', fontFamily:'inherit',
                        transition:'all 0.15s',
                      }}
                        onMouseEnter={e=>{e.currentTarget.style.borderColor='#0D3B2E'; e.currentTarget.style.background='#f0fdf4';}}
                        onMouseLeave={e=>{e.currentTarget.style.borderColor='#d1d5db'; e.currentTarget.style.background='white';}}
                      >
                        {item.action}
                      </button>
                    )}
                    {item.verified && (
                      <span style={{ display:'flex', alignItems:'center', gap:4, fontSize:12, fontWeight:700, color:'#15803D' }}>
                        <CheckCircle size={13}/> Verified
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>

            {/* Account detail */}
            <div style={{
              background:'white', borderRadius:20,
              border:'1px solid #eeede9',
              boxShadow:'0 1px 4px rgba(0,0,0,0.04)',
              overflow:'hidden',
            }}>
              <div style={{ padding:'22px 24px', borderBottom:'1px solid #f5f4f0' }}>
                <h2 style={{ fontSize:15, fontWeight:800, color:'#111827', letterSpacing:'-0.2px' }}>Detail Akun</h2>
              </div>
              <div style={{ padding:'20px 24px', display:'flex', flexDirection:'column', gap:0 }}>
                {[
                  { icon:<Calendar size={15}/>, label:'Bergabung', value: user.joinDate || '-' },
                  { icon:<Shield size={15}/>, label:'Tipe Akun', value: user.role === 'admin' ? 'Administrator' : 'User' },
                  { icon:<Store size={15}/>, label:'Status Vendor', value: user.isVendor ? 'Aktif' : 'Bukan Vendor', green: user.isVendor },
                  { icon:<CheckCircle size={15}/>, label:'Status Akun', value:'Aktif', green:true },
                ].map((row, i, arr)=>(
                  <div key={row.label} style={{
                    display:'flex', alignItems:'center', justifyContent:'space-between',
                    padding:'13px 0',
                    borderBottom: i < arr.length-1 ? '1px solid #f5f4f0' : 'none',
                  }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, color:'#9ca3af' }}>
                      {row.icon}
                      <span style={{ fontSize:13, color:'#6b7280', fontWeight:500 }}>{row.label}</span>
                    </div>
                    <span style={{
                      fontSize:13, fontWeight:700,
                      color: row.green ? '#15803D' : '#111827',
                    }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vendor CTA */}
            {!user.isVendor ? (
              <div style={{
                borderRadius:20, overflow:'hidden',
                border:'1px solid #eeede9',
                boxShadow:'0 1px 4px rgba(0,0,0,0.04)',
              }}>
                <div style={{
                  background:'linear-gradient(135deg, #0D3B2E 0%, #145740 100%)',
                  padding:'28px 24px', position:'relative', overflow:'hidden',
                }}>
                  <div style={{ position:'absolute', top:-30, right:-30, width:120, height:120, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.08)' }} />
                  <div style={{ position:'absolute', bottom:-20, right:20, width:80, height:80, borderRadius:'50%', background:'rgba(245,166,35,0.1)' }} />
                  <div style={{ position:'relative' }}>
                    <div style={{
                      width:44, height:44, borderRadius:12,
                      background:'rgba(245,166,35,0.15)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      marginBottom:16,
                    }}>
                      <Store size={20} color="#F5A623"/>
                    </div>
                    <div style={{ fontSize:17, fontWeight:800, color:'white', marginBottom:8, fontFamily:'Fraunces, serif', letterSpacing:'-0.3px' }}>
                      Mulai Jual Jasa
                    </div>
                    <p style={{ fontSize:13, color:'rgba(255,255,255,0.55)', lineHeight:1.6, marginBottom:20 }}>
                      Jangkau ribuan klien premium dan kembangkan bisnis event-mu bersama Findor.
                    </p>
                    <Link href="/vendor/register" style={{
                      display:'inline-flex', alignItems:'center', gap:6,
                      background:'#F5A623', color:'#0D3B2E',
                      fontSize:13, fontWeight:800, padding:'10px 20px',
                      borderRadius:999, textDecoration:'none',
                      boxShadow:'0 4px 16px rgba(245,166,35,0.35)',
                    }}>
                      Daftar Sebagai Vendor
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{
                background:'white', borderRadius:20,
                border:'1px solid #eeede9',
                boxShadow:'0 1px 4px rgba(0,0,0,0.04)',
                padding:'22px 24px',
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
                  <div style={{ width:40, height:40, borderRadius:12, background:'#fef9ec', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Store size={18} color="#d97706"/>
                  </div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:800, color:'#111827' }}>Vendor Aktif</div>
                    <div style={{ fontSize:12, color:'#9ca3af' }}>Kelola layanan kamu</div>
                  </div>
                </div>
                <Link href="/vendor/register" style={{
                  display:'flex', alignItems:'center', justifyContent:'center',
                  padding:'10px', borderRadius:12,
                  background:'#f5f4f0', color:'#0D3B2E',
                  fontSize:13, fontWeight:700, textDecoration:'none',
                  transition:'background 0.15s',
                }}>
                  Kelola Layanan
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes toastIn {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @media (max-width: 860px) {
          .profile-main-grid { grid-template-columns: 1fr !important; }
          .profile-stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

function Field({ label, value, editing, onChange, placeholder, icon }: {
  label: string; value: string; editing: boolean;
  onChange: (v: string) => void; placeholder: string; icon?: React.ReactNode;
}) {
  return (
    <div>
      <label style={labelSt}>{label}</label>
      {editing ? (
        <div style={{ position:'relative' }}>
          {icon && <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}>{icon}</span>}
          <input
            value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
            style={{
              width:'100%', padding: icon ? '11px 16px 11px 40px' : '11px 16px',
              borderRadius:12, fontSize:14,
              border:'1.5px solid #d1d5db',
              fontFamily:'inherit', color:'#111827',
              outline:'none', transition:'border-color 0.15s, box-shadow 0.15s',
              boxSizing:'border-box',
            }}
            onFocus={e=>{ e.currentTarget.style.borderColor='#0D3B2E'; e.currentTarget.style.boxShadow='0 0 0 3px rgba(13,59,46,0.08)'; }}
            onBlur={e=>{ e.currentTarget.style.borderColor='#d1d5db'; e.currentTarget.style.boxShadow='none'; }}
          />
        </div>
      ) : (
        <div style={{
          display:'flex', alignItems:'center', gap:12,
          padding:'11px 16px', background:'#fafaf8',
          borderRadius:12, border:'1.5px solid #eeede9',
          minHeight:44,
        }}>
          {icon}
          <span style={{ fontSize:14, color: value ? '#374151' : '#c4c2bb', fontStyle: value ? 'normal' : 'italic' }}>
            {value || placeholder}
          </span>
        </div>
      )}
    </div>
  );
}

const labelSt: React.CSSProperties = {
  display:'block', fontSize:11, fontWeight:700,
  color:'#9ca3af', letterSpacing:'0.07em',
  textTransform:'uppercase', marginBottom:7,
};
