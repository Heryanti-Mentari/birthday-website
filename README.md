# 🚀 Little Astronaut — Level 5 Unlocked

Website statis (HTML + CSS + JS + Firebase Firestore) untuk GitHub Pages.

## 1–3. Ganti nama, foto, pesan
Buka `script.js`, edit bagian paling atas `birthdayConfig`:
- Nama: `name` (otomatis dipakai di semua tempat). Pengirim: `sender`.
- Pesan kartu: `messages.main`, pesan rahasia: `messages.secret` (`{name}` = nama anak).
- Foto: taruh `age-1.jpeg` … `age-5.jpeg` di `assets/images/` (atau ubah path di `photos`). Ukuran ideal: persegi, ±1000px, maks 1–2 MB. Kalau foto belum ada, tampil emoji pengganti.

## 4. Musik & Sound Effect
Path diatur di `birthdayConfig` (`music` dan `sounds`) pada `script.js`. Kalau file tidak ada, website tetap jalan tanpa suara.
- Musik latar: `assets/audio/kids-adventure.mp3` (**"Kids Adventure" — RomanSenykMusic**, Pixabay).
- Sound effect (format `.wav`, opsional):
  - `assets/sounds/rocket.wav` — peluncuran roket
  - `assets/sounds/star.wav` — mengumpulkan bintang
  - `assets/sounds/gift.wav` — membuka hadiah
  - `assets/sounds/mixkit-cheering-crowd-loud-whistle-610.wav` — kemenangan
  - `assets/sounds/message.mp3` — pesan guestbook *(format MP3; tanpa file ini efek pesan dilewati dan situs tetap berfungsi)*

## 4b. Mini Arcade — 4 Game
Semua game ada dalam satu menu **LITTLE ASTRONAUT ARCADE** (section `#arcade` di `index.html`):

| Game | Cara main | Kondisi selesai |
|---|---|---|
| **Catch the Stars** | Tap bintang ⭐ yang berpindah-pindah | 5/5 bintang terkumpul |
| **Afiq's Birthday Football Cup** | Pilih KIRI / TENGAH / KANAN, maksimal 5 tendangan | 5 tendangan selesai |
| **Space Memory Match** | Buka 2 kartu, cari 6 pasang | Semua pasang ditemukan |
| **Rocket Dash** | Arrow ← → (desktop) atau tahan tombol ◀ ▶ (HP) | 10 ⭐ terkumpul atau nyawa habis |

Catatan penting:
- Setiap game punya tombol **← ARCADE** dan **🔄 PLAY AGAIN**; pindah game otomatis menghentikan timer/animasi game sebelumnya, dan hanya game aktif yang menerima input.
- Menyelesaikan game **tidak wajib dan tidak otomatis** membuka modal hadiah. Hadiah selalu bisa dibuka dari section **Birthday Gift** atau lewat tombol 🎉 LANJUT KE PERAYAAN ULANG TAHUN setelah menu arcade.
- Tombol **BUKA HADIAH SPESIAL 🎁** di akhir Catch the Stars juga membuka hadiah yang sama.
- Semua game tetap berjalan tanpa file audio (efek suara bersifat opsional, memakai `AudioManager` yang sudah ada; tidak ada instance musik tambahan).

### Uji otomatis (opsional)
Karena tidak ada test runner di repo ini, halaman menyediakan hook `window.ArcadeTest` (`open`, `back`, `activeGame`, `football.setKeeper/kick/state`, `memory.state`, `dash.force/state`) agar mudah diuji lewat DevTools Console / headless Chrome. Hook ini tidak mengubah alur permainan normal dan tidak menyimpan data ke mana pun.

## 5. Setup Firebase (yang harus kamu isi sendiri)
1. https://console.firebase.google.com → **Add project**.
2. **Build → Firestore Database → Create database** (mode production).
3. **Project settings → Your apps → Web (`</>`)** → daftarkan app → salin `firebaseConfig`.
4. Tempel nilainya ke `firebaseConfig` di `script.js` (ganti semua `ISI_DI_SINI`). Config ini memang publik; keamanan diatur oleh Rules.
5. **Firestore → Rules** → tempel lalu **Publish**:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    match /messages/{id} {
      allow read: if resource.data.approved == true;
      allow create: if request.resource.data.keys().hasOnly(['name','message','approved','createdAt'])
        && request.resource.data.name is string
        && request.resource.data.name.size() > 0 && request.resource.data.name.size() <= 30
        && request.resource.data.message is string
        && request.resource.data.message.size() > 0 && request.resource.data.message.size() <= 300
        && request.resource.data.approved == true;
      allow update, delete: if false;
    }
  }
}
```
6. (Disarankan) **Authentication → Settings → Authorized domains**: pastikan `username.github.io` ada.

### Moderasi
Buka Firebase Console → Firestore → koleksi `messages` → klik dokumen → ubah `approved` menjadi `false` (atau hapus dokumen). Pesan langsung hilang dari website.

## 6. Menjalankan lokal
Jangan buka dengan klik dua kali (musik/Firebase butuh http). Jalankan: `python -m http.server 8000` lalu buka `http://localhost:8000`.

## 7. Deploy ke GitHub Pages
1. Buat repo `birthday-website`, upload semua isi folder ini.
2. **Settings → Pages → Deploy from a branch → `main` / root → Save**.
3. Buka `https://username.github.io/birthday-website/` dan bagikan lewat WhatsApp.
