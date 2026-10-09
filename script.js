/* ===== 1. EDIT BAGIAN INI SAJA (nama, foto, pesan) ===== */
const birthdayConfig = {
  name: 'Muhammad Afiq Zayyan',
  age: 5,
  sender: 'Heryanti Rima Mentari',
  photos: {
    age1: 'assets/images/age-1.jpeg',
    age2: 'assets/images/age-2.jpeg',
    age3: 'assets/images/age-3.jpeg',
    age4: 'assets/images/age-4.jpeg',
    age5: 'assets/images/age-5.jpeg',
  },
  captions: {
    age1: 'Petualangan kecilmu baru saja dimulai. 💫',
    age2: 'Dunia terasa semakin seru untuk dijelajahi! 🌍',
    age3: 'Semakin banyak cerita, tawa, dan hal baru. ⭐',
    age4: 'Selangkah lagi menuju petualangan yang lebih besar! 🚀',
    age5: 'Hari ini, petualangan LEVEL 5 dimulai! 🎉',
  },
  music: 'assets/audio/kids-adventure.mp3',
  sounds: { rocket: 'assets/sounds/rocket.wav', gift: 'assets/sounds/gift.wav', message: 'assets/sounds/message.mp3', star: 'assets/sounds/star.wav', victory: 'assets/sounds/mixkit-cheering-crowd-loud-whistle-610.wav' },
  messages: {
    // {name} otomatis diganti nama anak. Satu teks = satu paragraf.
    // Ucapan utama (Birthday Gift modal)
    main: [
      'Yeay! Hari ini astronaut kecil kita resmi naik level ke LEVEL 5! 🎉',
      'Semoga Afiq selalu sehat, tumbuh menjadi anak yang baik, ceria, berani mencoba hal-hal baru, dan tidak pernah kehabisan rasa ingin tahu.',
      'Semoga hari-harimu dipenuhi tawa, permainan seru, teman-teman baik, dan banyak hal menyenangkan untuk ditemukan. Jangan takut bermimpi besar, ya, karena ada begitu banyak petualangan hebat yang menunggumu!',
      'Terus tumbuh, terus belajar, terus tersenyum, dan tetap jadi Afiq yang istimewa. Semoga setiap langkah kecilmu membawa banyak kebahagiaan dan cerita indah.',
    ],
    giftOutro: ['Your next adventure starts now! 🌙✨', 'Happy 5th Birthday, Little Astronaut! 🪐💙'],
    // Secret Message (pesan tersembunyi)
    secretTitle: '🌙 Psst... ada pesan rahasia untukmu!',
    secret: [
      'Hai, Kapten Afiq! 👨‍🚀⭐',
      'Selamat ya, kamu sudah berhasil sampai ke LEVEL 5! Semoga Afiq selalu sehat, bahagia, tumbuh jadi anak yang baik, berani mencoba hal-hal baru, dan selalu punya banyak alasan untuk tersenyum.',
      'Teruslah bermimpi besar dan jelajahi dunia dengan rasa ingin tahu yang luar biasa. Karena petualangan seru masih panjang dan banyak hal indah yang menunggumu!',
    ],
    secretSurprise: [
      'Oh iya, Kapten... 🤫🎁',
      'Misinya belum benar-benar selesai, lho! Ada hadiah spesial yang masih dalam perjalanan dan akan menyusul untukmu. Jadi, tunggu kejutan berikutnya, ya! 😉',
    ],
    secretOutro: ['Sampai jumpa di misi selanjutnya, Little Astronaut!', 'Mission status: Loved beyond the stars. 🚀💙'],
  },
};

/* ===== 2. ISI DARI FIREBASE CONSOLE (lihat README) ===== */
const firebaseConfig = {
  apiKey: 'AIzaSyCnHeviKMmMkyt6cglX5YGn0YBdiNDZRfs',
  authDomain: 'birthday-website-b3e7a.firebaseapp.com',
  projectId: 'birthday-website-b3e7a',
  storageBucket: 'birthday-website-b3e7a.firebasestorage.app',
  messagingSenderId: '112824051114',
  appId: '1:112824051114:web:9e64c5327206137c29f7d3',
};

/* ===== Kode di bawah ini tidak perlu diubah ===== */
const $ = (id) => document.getElementById(id);
const C = birthdayConfig;
const fill = (t) => t.replace(/\{name\}/g, C.name);
const el = (tag, cls, text) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
};

document.title = 'Little Astronaut — Level ' + C.age + ' · ' + C.name;
document.querySelectorAll('[data-name]').forEach((e) => (e.textContent = C.name));
const signLine = 'With love,\n' + C.sender + ' ❤️';
$('modalSign').textContent = signLine;
$('endSign').textContent = (C.sender || '').trim() || 'Your Family 💙';

// stars (layered for depth)
(function () {
  const mk = (box, count, min, max, near) => {
    if (!box) return;
    for (let i = 0; i < count; i++) {
      const s = el('i', 'star' + (near ? ' near' : ''));
      const z = (min + Math.random() * (max - min)).toFixed(1);
      const tint = Math.random();
      if (tint > 0.86) s.classList.add('gold');
      else if (tint > 0.72) s.classList.add('cyan');
      const dur = (2.4 + Math.random() * 3).toFixed(1);
      const drift = (9 + Math.random() * 10).toFixed(1);
      s.style.cssText = `left:${(Math.random() * 100).toFixed(2)}%;top:${(Math.random() * 100).toFixed(2)}%;width:${z}px;height:${z}px;opacity:${(0.35 + Math.random() * 0.6).toFixed(2)};animation-duration:${dur}s,${drift}s;animation-delay:${(Math.random() * 4).toFixed(1)}s,${(Math.random() * 6).toFixed(1)}s`;
      box.appendChild(s);
    }
  };
  mk($('stars'), 66, 1, 2.4, false);
  mk($('starsNear'), 24, 2, 3.6, true);
})();

// slow-drifting cosmic dust (lighter on small screens)
(function () {
  const box = $('dust');
  if (!box) return;
  const count = innerWidth < 640 ? 14 : 26;
  for (let i = 0; i < count; i++) {
    const d = el('i', '');
    const z = (1 + Math.random() * 2.4).toFixed(1);
    d.style.cssText = `left:${(Math.random() * 100).toFixed(2)}%;top:${(Math.random() * 100).toFixed(2)}%;width:${z}px;height:${z}px;opacity:${(0.14 + Math.random() * 0.34).toFixed(2)};animation-duration:${(18 + Math.random() * 22).toFixed(1)}s;animation-delay:-${(Math.random() * 24).toFixed(1)}s`;
    box.appendChild(d);
  }
})();

// gentle parallax on desktop pointer move (disabled on touch, small screens, reduced motion)
(function () {
  const space = $('space');
  if (!space || !window.matchMedia) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (matchMedia('(pointer: coarse)').matches || innerWidth < 768) return;
  let curX = 0, curY = 0, tgtX = 0, tgtY = 0, raf = null;
  function frame() {
    raf = null;
    curX += (tgtX - curX) * 0.08;
    curY += (tgtY - curY) * 0.08;
    space.style.setProperty('--px', curX.toFixed(2) + 'px');
    space.style.setProperty('--py', curY.toFixed(2) + 'px');
    if (Math.abs(tgtX - curX) > 0.1 || Math.abs(tgtY - curY) > 0.1) raf = requestAnimationFrame(frame);
  }
  addEventListener(
    'pointermove',
    (e) => {
      tgtX = (e.clientX / innerWidth - 0.5) * 32;
      tgtY = (e.clientY / innerHeight - 0.5) * 32;
      if (!raf) raf = requestAnimationFrame(frame);
    },
    { passive: true },
  );
})();

// photos (fallback emoji kalau file belum ada)
function photo(src, alt, emoji, eager) {
  const img = new Image();
  img.alt = alt;
  img.loading = eager ? 'eager' : 'lazy';
  img.decoding = 'async';
  img.onerror = () => img.replaceWith(el('div', 'ph', emoji));
  img.src = src;
  return img;
}
$('heroPhoto').appendChild(photo(C.photos.age5, C.name + ' umur 5', '🚀', true));

const stops = [
  ['age1', '👶'],
  ['age2', '🧸'],
  ['age3', '🧒'],
  ['age4', '🦸'],
  ['age5', '🚀'],
];
stops.forEach(([k, emo], i) => {
  const s = el('div', 'stop' + (i === 4 ? ' final' : ''));
  const card = el('div', 'stop-card');
  card.appendChild(el('span', 'tag', emo + ' AGE ' + (i + 1)));
  const f = el('div', 'frame');
  f.appendChild(photo(C.photos[k], 'Umur ' + (i + 1), emo));
  card.appendChild(f);
  card.appendChild(el('p', '', C.captions[k]));
  s.appendChild(card);
  $('timeline').appendChild(s);
});
const io =
  'IntersectionObserver' in window
    ? new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('show');
              io.unobserve(e.target);
            }
          }),
        { threshold: 0.25 },
      )
    : null;
document.querySelectorAll('.stop').forEach((s) => (io ? io.observe(s) : s.classList.add('show')));

// audio: single background music instance + independent sound-effect pool
const AudioManager = (function () {
  const MUSIC_VOL = 0.28;
  // per-category volume; background music always stays lower than any sound effect
  const SFX_VOL = { rocket: 0.75, star: 0.6, gift: 0.7, victory: 0.65, message: 0.55 };
  // minimum gap per effect: prevents fast repeats / overlapping identical sounds
  const GAP = { rocket: 700, star: 260, gift: 500, victory: 1800, message: 600 };
  const pool = {};
  const last = {};
  let musicWanted = false; // background-music intent only — never gates sound effects

  const music = new Audio();
  music.loop = true;
  music.preload = 'none';
  music.volume = MUSIC_VOL;
  if (C.music) {
    music.src = C.music;
    music.addEventListener('error', () => console.warn('[audio] Musik latar gagal dimuat:', C.music));
  } else {
    console.warn('[audio] Tidak ada file musik latar yang dikonfigurasi.');
  }

  function playMusic() {
    musicWanted = true;
    if (!C.music || !music.paused) return; // never restart an already-playing track
    const p = music.play();
    if (p && p.catch) p.catch((e) => console.info('[audio] Musik menunggu interaksi pengguna:', e && e.name));
  }
  function pauseMusic() {
    musicWanted = false;
    try {
      music.pause();
    } catch (e) {}
  }
  function toggleMusic() {
    music.paused ? playMusic() : pauseMusic();
    return musicWanted;
  }
  function sfx(key) {
    const src = C.sounds && C.sounds[key];
    if (!src) return;
    const now = Date.now();
    if (last[key] && now - last[key] < (GAP[key] || 150)) return;
    last[key] = now;
    try {
      let a = pool[key];
      if (!a) {
        a = new Audio(src);
        a.preload = 'auto';
        a.addEventListener('error', () => {
          console.warn('[audio] SFX gagal dimuat:', key, src);
          pool[key] = null;
        });
        pool[key] = a;
      }
      a.volume = SFX_VOL[key] != null ? SFX_VOL[key] : 0.7;
      a.currentTime = 0;
      const p = a.play();
      if (p && p.catch) p.catch((e) => console.info('[audio] SFX tidak dapat diputar:', key, e && e.name));
    } catch (e) {}
  }
  // resume background music when the tab becomes visible again (never touches SFX)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && musicWanted && music.paused) {
      const p = music.play();
      if (p && p.catch) p.catch(() => {});
    }
  });
  return {
    music,
    playMusic,
    pauseMusic,
    toggleMusic,
    sfx,
    isMusicOn: () => musicWanted && !music.paused,
    isMusicWanted: () => musicWanted,
    stopSfx: () =>
      Object.values(pool).forEach((a) => {
        if (!a) return;
        try {
          a.pause();
          a.currentTime = 0;
        } catch (e) {}
      }),
  };
})();

function syncMusicBtn() {
  const on = AudioManager.isMusicOn();
  const b = $('musicBtn');
  b.textContent = on ? '🔊' : '🔇';
  b.classList.toggle('off', !on);
  b.setAttribute('aria-pressed', on ? 'true' : 'false');
  b.setAttribute('aria-label', on ? 'Matikan musik' : 'Nyalakan musik');
}
syncMusicBtn();
AudioManager.music.addEventListener('play', syncMusicBtn);
AudioManager.music.addEventListener('pause', syncMusicBtn);
$('musicBtn').onclick = () => {
  AudioManager.toggleMusic();
  syncMusicBtn();
};

// confetti
function confetti(n) {
  const c = $('confetti'),
    x = c.getContext('2d');
  c.width = innerWidth;
  c.height = innerHeight;
  const cols = ['#ffd54a', '#5ee7ff', '#b388ff', '#ffffff', '#ff8fb1'];
  const p = Array.from({ length: n }, () => ({
    x: Math.random() * c.width,
    y: -Math.random() * c.height * 0.5,
    r: 3 + Math.random() * 4,
    vy: 2 + Math.random() * 3,
    vx: Math.random() * 2 - 1,
    c: cols[(Math.random() * 5) | 0],
    a: Math.random() * 6,
  }));
  let t = 0;
  (function f() {
    x.clearRect(0, 0, c.width, c.height);
    p.forEach((q) => {
      q.x += q.vx + Math.sin((q.a += 0.05));
      q.y += q.vy;
      x.fillStyle = q.c;
      x.fillRect(q.x, q.y, q.r, q.r * 1.6);
    });
    if (++t < 230) requestAnimationFrame(f);
    else x.clearRect(0, 0, c.width, c.height);
  })();
}

// intro sequence
const lines = ['🌌 INCOMING MISSION...', 'Preparing a very special astronaut...', 'MISSION 0' + C.age, 'READY FOR TAKEOFF?'];
let li = 0;
(function next() {
  li++;
  if (li < lines.length) {
    setTimeout(() => {
      const t = $('introText');
      t.textContent = lines[li];
      t.style.animation = 'none';
      void t.offsetWidth;
      t.style.animation = '';
      next();
    }, 1500);
  } else setTimeout(() => $('startBtn').classList.remove('hidden'), 700);
})();
$('startBtn').onclick = () => {
  AudioManager.playMusic();
  syncMusicBtn();
  AudioManager.sfx('rocket');
  confetti(60);
  $('intro').classList.add('launch');
  setTimeout(() => {
    $('intro').remove();
    $('main').classList.remove('hidden');
    $('musicBtn').classList.remove('hidden');
    scrollTo(0, 0);
  }, 1900);
};

// gift + secret
function renderParas(box, arr, cls) {
  arr.forEach((t) => box.appendChild(el('p', cls || '', fill(t))));
}
$('giftBtn').onclick = () => openGift();
function openGift() {
  const box = $('modalBody');
  box.replaceChildren();
  renderParas(box, C.messages.main);
  renderParas(box, C.messages.giftOutro, 'gift-outro');
  $('modal').classList.remove('hidden');
  AudioManager.sfx('gift');
  confetti(160);
  $('modalClose').focus();
}
const closeModal = () => $('modal').classList.add('hidden');
$('modalClose').onclick = closeModal;
$('modal').onclick = (e) => {
  if (e.target === $('modal')) closeModal();
};
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
$('secretBtn').onclick = () => {
  const b = $('secretBox');
  if (b.classList.contains('hidden')) {
    b.replaceChildren();
    b.appendChild(el('h3', 'secret-title', C.messages.secretTitle));
    renderParas(b, C.messages.secret);
    const panel = el('div', 'secret-panel');
    renderParas(panel, C.messages.secretSurprise);
    b.appendChild(panel);
    renderParas(b, C.messages.secretOutro, 'secret-outro');
    b.appendChild(el('p', 'sign', '— ' + C.sender));
    b.classList.remove('hidden');
    b.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else b.classList.add('hidden');
};

// guestbook
const FB = 'https://www.gstatic.com/firebasejs/10.12.2/';
let db = null,
  fsdk = null,
  known = null;
const status = (m, cls) => {
  $('gbStatus').textContent = m;
  $('gbStatus').className = 'status ' + (cls || '');
};
function renderList(docs) {
  const list = $('gbList');
  const fresh = [];
  list.replaceChildren();
  docs.forEach((d) => {
    const isNew = known && !known.has(d.id);
    const card = el('article', 'card msg' + (isNew ? ' new' : ''));
    card.appendChild(el('h3', '', '🌍 ' + String(d.name || '').slice(0, 30)));
    card.appendChild(el('p', '', String(d.message || '').slice(0, 300)));
    list.appendChild(card);
    if (isNew) fresh.push(d.id);
  });
  known = new Set(docs.map((d) => d.id));
  $('gbLoading').classList.add('hidden');
  $('gbEmpty').classList.toggle('hidden', docs.length > 0);
  $('gbTotal').textContent = '🌍 ' + docs.length + ' Messages Received';
  if (fresh.length) {
    $('gbBanner').classList.remove('hidden');
    setTimeout(() => $('gbBanner').classList.add('hidden'), 4000);
  }
}
async function initFirebase() {
  if (!firebaseConfig.projectId || firebaseConfig.projectId.indexOf('ISI_') === 0) {
    $('gbLoading').classList.add('hidden');
    $('gbEmpty').classList.remove('hidden');
    status('Guestbook belum aktif (Firebase belum diisi).', 'err');
    return;
  }
  try {
    const [a, f] = await Promise.all([import(FB + 'firebase-app.js'), import(FB + 'firebase-firestore.js')]);
    fsdk = f;
    db = f.getFirestore(a.initializeApp(firebaseConfig));
    f.onSnapshot(
      f.query(f.collection(db, 'messages'), f.where('approved', '==', true)),
      (snap) => {
        const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        docs.sort((x, y) => ((y.createdAt && y.createdAt.seconds) || 9e12) - ((x.createdAt && x.createdAt.seconds) || 9e12));
        renderList(docs);
      },
      () => {
        $('gbLoading').classList.add('hidden');
        status('Pesan belum bisa dimuat. Coba muat ulang halaman ya 🌙', 'err');
      },
    );
  } catch (e) {
    $('gbLoading').classList.add('hidden');
    status('Guestbook sedang istirahat. Coba lagi nanti ya 🌙', 'err');
  }
}
$('gbMsg').addEventListener('input', () => ($('gbCount').textContent = $('gbMsg').value.length + '/300'));
$('gbFirst').onclick = () => $('gbName').focus();
$('gbForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = $('gbName').value.trim(),
    message = $('gbMsg').value.trim();
  if (!name) return status('Nama wajib diisi.', 'err');
  if (!message) return status('Ucapan wajib diisi.', 'err');
  if (name.length > 30) return status('Nama maksimal 30 karakter.', 'err');
  if (message.length > 300) return status('Ucapan maksimal 300 karakter.', 'err');
  if (!db) return status('Guestbook belum aktif. Coba lagi nanti ya.', 'err');
  const btn = $('gbSend');
  btn.disabled = true;
  btn.textContent = 'Sending...';
  status('Mengirim ke luar angkasa...');
  try {
    await fsdk.addDoc(fsdk.collection(db, 'messages'), { name, message, approved: true, createdAt: fsdk.serverTimestamp() });
    $('gbForm').reset();
    $('gbCount').textContent = '0/300';
    status('✨ Message sent to Mission Control!', 'ok');
    AudioManager.sfx('message');
    confetti(70);
  } catch (err) {
    status('Pesan gagal terkirim. Cek koneksi lalu coba lagi.', 'err');
  }
  btn.disabled = false;
  btn.textContent = '🚀 SEND TO SPACE';
});
initFirebase();


/* ===== MINI ARCADE — MENU + 4 GAMES ===== */
(function () {
  const reduceMotion = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* ---------- Game 1: Catch the Stars (preserved behaviour) ---------- */
  function createStarsGame() {
    const area = $('gameArea'),
      star = $('starBtn'),
      hint = $('gameHint'),
      progress = $('gameProgress'),
      pips = $('gamePips'),
      done = $('gameDone'),
      claim = $('claimGiftBtn'),
      restart = $('gameRestartBtn');
    const TOTAL = 5;
    const cheers = ['', 'Hebat! ⭐', 'Bagus! 🚀', 'Sedikit lagi! ⭐', 'Hampir sampai! 🚀'];
    let count = 0,
      busy = false,
      finished = false,
      active = false,
      moveTimer = null,
      tapTimer = null;

    if (pips) {
      pips.replaceChildren();
      for (let i = 0; i < TOTAL; i++) pips.appendChild(el('span', 'pip'));
    }
    function setProgress() {
      progress.textContent = 'STARS COLLECTED: ' + count + '/' + TOTAL;
      if (pips) [...pips.children].forEach((p, i) => p.classList.toggle('on', i < count));
    }
    function placeStar() {
      const pad = 12;
      const starW = star.offsetWidth || star.getBoundingClientRect().width || 74,
        starH = star.offsetHeight || star.getBoundingClientRect().height || 74;
      // Ukur lebar area dari rect DAN clientWidth lalu ambil yang terbesar: saat viewport
      // berubah/relayout, salah satunya bisa masih bernilai 0 (mis. area baru tampil).
      // Ini penting supaya bintang tidak terletak di luar area (terpotong oleh
      // overflow:hidden sehingga tidak bisa ditekan).
      const boxRect = area.getBoundingClientRect();
      const boxW = Math.max(area.clientWidth || 0, Math.round(boxRect.width));
      const boxH = Math.max(area.clientHeight || 0, Math.round(boxRect.height));
      const maxX = Math.max(0, boxW - starW - pad * 2);
      const maxY = Math.max(0, boxH - starH - pad * 2);
      const prevX = parseFloat(star.style.left),
        prevY = parseFloat(star.style.top);
      let x = pad,
        y = pad;
      for (let i = 0; i < 12; i++) {
        x = pad + Math.random() * maxX;
        y = pad + Math.random() * maxY;
        if (isNaN(prevX) || isNaN(prevY) || Math.hypot(x - prevX, y - prevY) > 90) break;
      }
      star.style.left = Math.min(x, maxX).toFixed(1) + 'px';
      star.style.top = Math.min(y, maxY).toFixed(1) + 'px';
    }
    function stopMoving() {
      if (moveTimer) {
        clearInterval(moveTimer);
        moveTimer = null;
      }
    }
    function startMoving() {
      stopMoving();
      if (reduceMotion || !active) return;
      moveTimer = setInterval(() => {
        if (active && !busy && !finished && !document.hidden) placeStar();
      }, 2600);
    }
    function spark() {
      const cx = star.offsetLeft + star.offsetWidth / 2,
        cy = star.offsetTop + star.offsetHeight / 2;
      for (let i = 0; i < 3; i++) {
        const s = el('span', 'spark', i === 1 ? '⭐' : '✨');
        s.style.left = cx + (Math.random() * 30 - 15) + 'px';
        s.style.top = cy + (Math.random() * 30 - 15) + 'px';
        s.style.animationDelay = (i * 0.05).toFixed(2) + 's';
        area.appendChild(s);
        setTimeout(() => s.remove(), 780);
      }
    }
    function finish() {
      if (finished) return;
      finished = true;
      stopMoving();
      star.classList.add('hidden');
      star.disabled = true;
      if (hint) hint.classList.add('hidden');
      progress.textContent = 'STARS COLLECTED: ' + TOTAL + '/' + TOTAL + ' ⭐';
      if (pips) [...pips.children].forEach((p) => p.classList.add('on'));
      done.classList.remove('hidden');
      AudioManager.sfx('victory');
      confetti(180);
      setTimeout(() => claim.focus(), 350);
    }
    function reset() {
      count = 0;
      busy = false;
      finished = false;
      stopMoving();
      star.disabled = false;
      star.classList.remove('hidden', 'tapped');
      if (hint) {
        hint.classList.remove('hidden');
        hint.textContent = 'Tap bintangnya! ⭐';
      }
      done.classList.add('hidden');
      setProgress();
      placeStar();
      startMoving();
    }
    star.onclick = () => {
      if (!active || busy || finished || star.disabled) return;
      busy = true;
      star.classList.add('tapped');
      spark();
      count++;
      setProgress();
      AudioManager.sfx('star');
      tapTimer = setTimeout(() => {
        tapTimer = null;
        star.classList.remove('tapped');
        if (count >= TOTAL) {
          busy = false;
          finish();
          return;
        }
        if (hint) hint.textContent = cheers[count] || '';
        placeStar();
        busy = false;
      }, 280);
    };
    claim.onclick = () => openGift();
    if (restart) restart.onclick = reset;
    let rt;
    window.addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        if (active && !finished) placeStar();
      }, 200);
    });
    document.addEventListener('visibilitychange', () => {
      if (!active) return;
      if (document.hidden) stopMoving();
      else if (!finished) startMoving();
    });
    return {
      start() {
        active = true;
        reset();
      },
      stop() {
        active = false;
        stopMoving();
        if (tapTimer) {
          clearTimeout(tapTimer);
          tapTimer = null;
        }
        busy = false;
        star.classList.remove('tapped');
      },
    };
  }

  /* ---------- Game 2: Penalty Shootout ---------- */
  function createFootballGame() {
    const ball = $('fbBall'),
      keeper = $('fbKeeper'),
      scoreEl = $('fbScore'),
      hint = $('fbHint'),
      actions = $('fbActions'),
      done = $('fbDone'),
      doneTitle = $('fbDoneTitle'),
      doneText = $('fbDoneText'),
      again = $('fbAgainBtn');
    const DIRS = ['left', 'center', 'right'];
    const MAX = 5;
    let goals = 0,
      kicks = 0,
      busy = false,
      finished = false,
      active = false,
      keeperOverride = null,
      timers = [];

    function later(fn, ms) {
      const t = setTimeout(() => {
        timers = timers.filter((x) => x !== t);
        fn();
      }, ms);
      timers.push(t);
    }
    function clearTimers() {
      timers.forEach(clearTimeout);
      timers = [];
    }
    function setActions(on) {
      [...actions.querySelectorAll('button')].forEach((b) => (b.disabled = !on));
    }
    function resetShot() {
      ball.className = 'ball';
      keeper.className = 'keeper';
    }
    function updateScore() {
      scoreEl.textContent = 'GOALS: ' + goals + ' · KICKS: ' + kicks + '/' + MAX;
    }
    function pickKeeper() {
      if (keeperOverride) {
        const k = keeperOverride;
        keeperOverride = null;
        return k;
      }
      return DIRS[(Math.random() * DIRS.length) | 0];
    }
    function finish() {
      if (finished) return;
      finished = true;
      busy = false;
      clearTimers();
      setActions(false);
      doneTitle.textContent = 'FULL TIME — ' + goals + ' GOL! ⚽';
      let msg;
      if (goals === MAX) msg = 'SEMPURNA! Semua tendangan jadi gol! Kamu bintang lapangan, Kapten Afiq! 🌟';
      else if (goals >= 3) msg = 'Hebat! Kamu mencetak ' + goals + ' gol. Tim ' + C.name.split(' ')[0] + ' luar biasa! 🎉';
      else if (goals >= 1) msg = 'Bagus! Kamu mencetak ' + goals + ' gol. Terus berlatih, ya! ⚽';
      else msg = 'Tidak apa-apa, yang penting kamu sudah berani mencoba! Main lagi yuk! 💪';
      doneText.textContent = msg;
      done.classList.remove('hidden');
      if (goals > 0) {
        AudioManager.sfx('victory');
        confetti(150);
      }
      later(() => again.focus(), 300);
    }
    function kick(dir) {
      if (!active || busy || finished || kicks >= MAX) return;
      if (DIRS.indexOf(dir) < 0) return;
      busy = true;
      setActions(false);
      hint.textContent = 'Bola meluncur... ⚽';
      const keeperDir = pickKeeper();
      ball.className = 'ball kick-' + dir;
      keeper.className = 'keeper dive-' + keeperDir;
      const isGoal = keeperDir !== dir;
      later(() => {
        if (isGoal) {
          goals++;
          hint.textContent = 'GOOOL! ⚽🎉';
          AudioManager.sfx('star');
        } else {
          ball.className = 'ball kick-' + dir + ' saved';
          hint.textContent = 'DITANGKAP! 🧤 Hebat kipernya!';
        }
      }, 520);
      later(() => {
        kicks++;
        updateScore();
        busy = false;
        if (kicks >= MAX) {
          finish();
          return;
        }
        resetShot();
        setActions(true);
        hint.textContent = 'Pilih arah tendangan berikutnya! 🥅';
      }, 1250);
    }
    function reset() {
      clearTimers();
      goals = 0;
      kicks = 0;
      busy = false;
      finished = false;
      keeperOverride = null;
      resetShot();
      updateScore();
      done.classList.add('hidden');
      hint.textContent = 'Pilih arah, lalu lihat aksinya! 🥅';
      setActions(true);
    }
    [...actions.querySelectorAll('[data-kick]')].forEach((b) => b.addEventListener('click', () => kick(b.dataset.kick)));
    if (again) again.onclick = reset;
    return {
      start() {
        active = true;
        reset();
      },
      stop() {
        active = false;
        busy = false;
        clearTimers();
        setActions(false);
      },
      reset,
      kick,
      _setKeeper(d) {
        keeperOverride = d || null;
      },
      _state() {
        return { goals, kicks, busy, finished, active };
      },
    };
  }

  /* ---------- Game 3: Space Memory Match ---------- */
  function createMemoryGame() {
    const grid = $('memGrid'),
      stats = $('memStats'),
      done = $('memDone'),
      doneText = $('memDoneText'),
      again = $('memAgainBtn');
    const ICONS = ['🚀', '🪐', '👨‍🚀', '⭐', '🌙', '☄️'];
    const PAIRS = ICONS.length;
    let first = null,
      second = null,
      lock = false,
      matched = 0,
      attempts = 0,
      active = false,
      finished = false,
      closeTimer = null;

    function clearTimer() {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
    }
    function updateStats() {
      stats.textContent = 'PASANGAN: ' + matched + '/' + PAIRS + ' · PERCOBAAN: ' + attempts;
    }
    function build() {
      clearTimer();
      grid.replaceChildren();
      first = second = null;
      lock = false;
      matched = 0;
      attempts = 0;
      finished = false;
      done.classList.add('hidden');
      const deck = [];
      ICONS.forEach((ic) => {
        deck.push(ic);
        deck.push(ic);
      });
      for (let i = deck.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
      deck.forEach((ic, idx) => {
        const card = el('button', 'mem-card');
        card.type = 'button';
        card.dataset.icon = ic;
        card.setAttribute('aria-label', 'Kartu memori ' + (idx + 1));
        const inner = el('span', 'mem-inner');
        inner.appendChild(el('span', 'mem-face back'));
        inner.appendChild(el('span', 'mem-face front', ic));
        card.appendChild(inner);
        card.addEventListener('click', () => flip(card));
        grid.appendChild(card);
      });
      updateStats();
    }
    function finish() {
      if (finished) return;
      finished = true;
      doneText.textContent = 'Kamu menemukan semua pasangan dalam ' + attempts + ' percobaan! Hebat, Kapten ' + C.name.split(' ')[0] + '! 🚀';
      done.classList.remove('hidden');
      AudioManager.sfx('victory');
      confetti(140);
    }
    function flip(card) {
      if (!active || lock || finished) return;
      if (card.classList.contains('matched') || card.classList.contains('flipped')) return;
      card.classList.add('flipped');
      if (!first) {
        first = card;
        return;
      }
      second = card;
      attempts++;
      updateStats();
      lock = true;
      if (first.dataset.icon === second.dataset.icon) {
        const a = first,
          b = second;
        first = second = null;
        a.classList.add('matched');
        b.classList.add('matched');
        a.classList.remove('flipped');
        b.classList.remove('flipped');
        matched++;
        updateStats();
        AudioManager.sfx('star');
        lock = false;
        if (matched >= PAIRS) finish();
      } else {
        closeTimer = setTimeout(() => {
          first.classList.remove('flipped');
          second.classList.remove('flipped');
          first = second = null;
          lock = false;
          closeTimer = null;
        }, 800);
      }
    }
    if (again)
      again.onclick = () => {
        if (active) build();
      };
    return {
      start() {
        active = true;
        build();
      },
      stop() {
        active = false;
        clearTimer();
        lock = true;
      },
      reset() {
        build();
      },
      _state() {
        return { matched, attempts, finished, active };
      },
    };
  }

  /* ---------- Game 4: Rocket Dash ---------- */
  function createDashGame() {
    const area = $('dashArea'),
      canvas = $('dashCanvas'),
      stats = $('dashStats'),
      doneBox = $('dashDone'),
      doneEmoji = $('dashDoneEmoji'),
      doneTitle = $('dashDoneTitle'),
      doneText = $('dashDoneText'),
      again = $('dashAgainBtn'),
      controls = $('dashControls');
    const TARGET = 10,
      LIVES = 3;
    const ctx = canvas.getContext('2d');
    let W = 0,
      H = 0,
      score = 0,
      lives = LIVES,
      finished = false,
      active = false,
      raf = null,
      last = 0;
    let stars = [],
      asteroids = [],
      starTimer = 0,
      astTimer = 0;
    const input = { left: false, right: false };
    const rocket = { x: 0, y: 0 };

    function measure() {
      const r = area.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width));
      H = Math.max(1, Math.round(r.height));
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rocket.y = H - H * 0.16;
      if (!rocket.x || rocket.x < 0 || rocket.x > W) rocket.x = W / 2;
    }
    function updateStats() {
      stats.textContent = '⭐ ' + score + '/' + TARGET + ' · ❤️ ' + lives;
    }
    function spawnStar() {
      const os = Math.max(24, W * 0.08);
      stars.push({ x: os + Math.random() * (W - os * 2), y: -os, r: os * 0.5, sp: H * (0.3 + Math.random() * 0.12) });
    }
    function spawnAst() {
      const os = Math.max(26, W * 0.09);
      asteroids.push({ x: os + Math.random() * (W - os * 2), y: -os, r: os * 0.5, sp: H * (0.36 + Math.random() * 0.14) });
    }
    function end(win) {
      if (finished) return;
      finished = true;
      if (raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }
      doneBox.classList.remove('hidden');
      doneEmoji.textContent = win ? '🎉' : '💫';
      doneTitle.textContent = win ? 'MISSION COMPLETE!' : 'MISSION OVER';
      doneText.textContent = win
        ? 'Kamu mengumpulkan ' + score + ' bintang dan menyelamatkan misi! Hebat, Kapten ' + C.name.split(' ')[0] + '! 🚀'
        : 'Kamu mengumpulkan ' + score + ' bintang. Roket butuh istirahat sebentar. Main lagi yuk! 💪';
      if (win) {
        AudioManager.sfx('victory');
        confetti(160);
      } else {
        confetti(50);
      }
    }
    function update(dt) {
      const dir = (input.left ? -1 : 0) + (input.right ? 1 : 0);
      const spd = W * 1.05 * (reduceMotion ? 0.7 : 1);
      rocket.x += dir * spd * dt;
      const rr = Math.max(14, W * 0.06);
      rocket.x = Math.max(rr, Math.min(W - rr, rocket.x));
      starTimer -= dt;
      if (starTimer <= 0) {
        spawnStar();
        starTimer = (reduceMotion ? 1.1 : 0.8) + Math.random() * 0.6;
      }
      astTimer -= dt;
      if (astTimer <= 0) {
        spawnAst();
        astTimer = (reduceMotion ? 1.5 : 1.05) + Math.random() * 0.8;
      }
      const hit = Math.max(16, W * 0.07);
      for (let i = stars.length - 1; i >= 0; i--) {
        const o = stars[i];
        o.y += o.sp * (reduceMotion ? 0.6 : 1) * dt;
        if (o.y > H + 40) {
          stars.splice(i, 1);
          continue;
        }
        if (Math.hypot(o.x - rocket.x, o.y - rocket.y) < o.r + hit) {
          stars.splice(i, 1);
          score++;
          updateStats();
          AudioManager.sfx('star');
          if (score >= TARGET) {
            end(true);
            return;
          }
        }
      }
      for (let i = asteroids.length - 1; i >= 0; i--) {
        const o = asteroids[i];
        o.y += o.sp * (reduceMotion ? 0.6 : 1) * dt;
        if (o.y > H + 40) {
          asteroids.splice(i, 1);
          continue;
        }
        if (Math.hypot(o.x - rocket.x, o.y - rocket.y) < o.r + hit) {
          asteroids.splice(i, 1);
          lives--;
          updateStats();
          if (lives <= 0) {
            end(false);
            return;
          }
        }
      }
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const font = 'px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",serif';
      const os = Math.max(24, W * 0.08);
      ctx.font = os + font;
      stars.forEach((o) => ctx.fillText('⭐', o.x, o.y));
      asteroids.forEach((o) => ctx.fillText('🪨', o.x, o.y));
      const rs = Math.max(28, W * 0.13);
      ctx.save();
      ctx.translate(rocket.x, rocket.y);
      const dir = (input.left ? -1 : 0) + (input.right ? 1 : 0);
      ctx.rotate(-Math.PI / 4 + dir * 0.18);
      ctx.font = rs + font;
      ctx.fillText('🚀', 0, 0);
      ctx.restore();
    }
    function loop(ts) {
      if (!active || finished) return;
      raf = requestAnimationFrame(loop);
      if (!last) {
        last = ts;
        return;
      }
      let dt = (ts - last) / 1000;
      last = ts;
      if (dt > 0.05) dt = 0.05;
      update(dt);
      draw();
    }
    function reset() {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }
      stars = [];
      asteroids = [];
      score = 0;
      lives = LIVES;
      finished = false;
      input.left = false;
      input.right = false;
      starTimer = 0.5;
      astTimer = 1.1;
      doneBox.classList.add('hidden');
      updateStats();
      measure();
      rocket.x = W / 2;
      last = 0;
      raf = requestAnimationFrame(loop);
    }
    function setInput(side, on) {
      if (side === 'left') input.left = on;
      else input.right = on;
    }
    document.addEventListener('keydown', (e) => {
      if (!active) return;
      if (e.key === 'ArrowLeft') {
        input.left = true;
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        input.right = true;
        e.preventDefault();
      }
    });
    document.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowLeft') input.left = false;
      else if (e.key === 'ArrowRight') input.right = false;
    });
    // Satu-satunya pendekatan dipilih via feature detection agar tidak ada aksi ganda.
    // Catatan: TIDAK ada preventDefault() di sini — pada WebKit (iOS Safari) membatalkan
    // pointerdown menekan event click, dan CSS `touch-action:none` di .dash-btn sudah
    // mencegah scroll/zoom/seleksi teks sehingga preventDefault tidak diperlukan.
    const dashBtns = [...controls.querySelectorAll('[data-dash]')];
    const attachDashBtn = (b, onDown, onUp, onLeave) => {
      const side = b.dataset.dash;
      const down = () => {
        b.classList.add('active');
        onDown(side);
      };
      const up = () => {
        b.classList.remove('active');
        onUp(side);
      };
      const leave = () => {
        b.classList.remove('active');
        onLeave(side);
      };
      if (window.PointerEvent) {
        b.addEventListener('pointerdown', down);
        b.addEventListener('pointerup', up);
        b.addEventListener('pointercancel', up);
        b.addEventListener('pointerleave', leave);
      } else if ('ontouchstart' in window) {
        b.addEventListener('touchstart', down, { passive: true });
        b.addEventListener('touchend', up);
        b.addEventListener('touchcancel', up);
        b.addEventListener('touchleave', leave);
      } else {
        b.addEventListener('mousedown', down);
        b.addEventListener('mouseup', up);
        b.addEventListener('mouseleave', leave);
      }
    };
    dashBtns.forEach((b) =>
      attachDashBtn(
        b,
        (side) => setInput(side, true),
        (side) => setInput(side, false),
        (side) => setInput(side, false),
      ),
    );
    let rz;
    window.addEventListener('resize', () => {
      if (!active) return;
      clearTimeout(rz);
      rz = setTimeout(measure, 150);
    });
    if (again) again.onclick = reset;
    return {
      start() {
        active = true;
        reset();
      },
      stop() {
        active = false;
        input.left = false;
        input.right = false;
        // lepas juga status visual tombol agar tidak ada tombol "nyangkut" saat game ditinggalkan
        dashBtns.forEach((b) => b.classList.remove('active'));
        if (raf) {
          cancelAnimationFrame(raf);
          raf = null;
        }
      },
      reset,
      force(type) {
        const os = Math.max(24, W * 0.08);
        if (type === 'star') stars.push({ x: rocket.x, y: rocket.y, r: os * 0.5, sp: 0 });
        else asteroids.push({ x: rocket.x, y: rocket.y, r: os * 0.5, sp: 0 });
      },
      _state() {
        return { score, lives, finished, active, running: !!raf };
      },
    };
  }

  /* ---------- Arcade controller ---------- */
  const menu = $('arcadeMenu'),
    continueBtn = $('toBirthdayBtn');
  const screens = {
    stars: $('screen-stars'),
    football: $('screen-football'),
    memory: $('screen-memory'),
    dash: $('screen-dash'),
  };
  const games = {
    stars: createStarsGame(),
    football: createFootballGame(),
    memory: createMemoryGame(),
    dash: createDashGame(),
  };
  let current = null;

  function open(id) {
    if (!games[id] || !screens[id]) return;
    if (current && current !== id && games[current]) games[current].stop();
    menu.classList.add('hidden');
    continueBtn.classList.add('hidden');
    Object.keys(screens).forEach((k) => screens[k].classList.toggle('hidden', k !== id));
    current = id;
    const arcade = $('arcade');
    if (arcade) arcade.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    games[id].start();
  }
  function backToArcade() {
    if (current && games[current]) games[current].stop();
    current = null;
    Object.keys(screens).forEach((k) => screens[k].classList.add('hidden'));
    menu.classList.remove('hidden');
    continueBtn.classList.remove('hidden');
    const arcade = $('arcade');
    if (arcade) arcade.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }
  document.querySelectorAll('[data-play]').forEach((b) => b.addEventListener('click', () => open(b.dataset.play)));
  document.querySelectorAll('[data-back]').forEach((b) => b.addEventListener('click', backToArcade));
  continueBtn.addEventListener('click', () => {
    const gift = document.querySelector('section.gift');
    if (gift) gift.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  });

  // deterministic hooks for automated testing (no effect on normal play)
  window.ArcadeTest = {
    open,
    back: backToArcade,
    activeGame: () => current,
    football: {
      start: () => open('football'),
      setKeeper: (d) => games.football._setKeeper(d),
      kick: (d) => games.football.kick(d),
      state: () => games.football._state(),
    },
    memory: { start: () => open('memory'), state: () => games.memory._state() },
    dash: {
      start: () => open('dash'),
      force: (t) => games.dash.force(t),
      state: () => games.dash._state(),
    },
    stars: { start: () => open('stars') },
  };
})();

