// script.js — controls slideshows, booking modal, VIP toggle, mobile nav, and form submit

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Hero slideshow ----------
  const heroSlides = Array.from(document.querySelectorAll('.hero-slide'));
  const heroDots = Array.from(document.querySelectorAll('.hero-dot'));
  let heroIndex = 0;
  function showHero(n) {
    heroSlides.forEach((s, i) => s.classList.toggle('active', i === n));
    heroDots.forEach((d, i) => d.classList.toggle('active', i === n));
  }
  function startHeroAuto() {
    showHero(heroIndex);
    heroIndex = (heroIndex + 1) % heroSlides.length;
    window._heroTimer = setTimeout(startHeroAuto, 4000);
  }
  startHeroAuto();

  // manual dot click
  heroDots.forEach(d => d.addEventListener('click', e => {
    clearTimeout(window._heroTimer);
    heroIndex = Number(e.currentTarget.dataset.index);
    showHero(heroIndex);
    heroIndex = (heroIndex + 1) % heroSlides.length;
    window._heroTimer = setTimeout(startHeroAuto, 4000);
  }));

  // ---------- Room slider (manual controls) ----------
  const roomCards = Array.from(document.querySelectorAll('.room-card'));
  const prevRoom = document.getElementById('prevRoom');
  const nextRoom = document.getElementById('nextRoom');
  let roomIndex = 0;
  function showRoom(index){
    // scroll selected card into center (works on wide screens)
    const card = roomCards[index];
    if(!card) return;
    card.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});
  }
  prevRoom.addEventListener('click', ()=>{ roomIndex = (roomIndex - 1 + roomCards.length) % roomCards.length; showRoom(roomIndex); });
  nextRoom.addEventListener('click', ()=>{ roomIndex = (roomIndex + 1) % roomCards.length; showRoom(roomIndex); });

  // ---------- Booking modal ----------
  const bookingModal = document.getElementById('bookingModal');
  const openBooking = document.getElementById('openBooking');
  const closeBooking = document.getElementById('closeBooking');
  const cancelBooking = document.getElementById('cancelBooking');
  const bookingForm = document.getElementById('bookingForm');
  const roomType = document.getElementById('roomType');
  const vipBlock = document.getElementById('vipBlock');

  function openModal(){ bookingModal.classList.add('open'); bookingModal.setAttribute('aria-hidden','false'); }
  function closeModal(){ bookingModal.classList.remove('open'); bookingModal.setAttribute('aria-hidden','true'); }

  openBooking.addEventListener('click', openModal);
  closeBooking.addEventListener('click', closeModal);
  cancelBooking.addEventListener('click', closeModal);

  // show VIP textarea only when VIP selected
  roomType.addEventListener('change', (e) => {
    if(e.target.value === 'vip') vipBlock.classList.remove('hidden');
    else vipBlock.classList.add('hidden');
  });

  // Booking form submit (demo: prints data to console)
  bookingForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const data = {
      name: document.getElementById('fullName').value.trim(),
      email: document.getElementById('email').value.trim(),
      checkIn: document.getElementById('checkIn').value,
      checkOut: document.getElementById('checkOut').value,
      people: document.getElementById('totalPeople').value,
      rooms: document.getElementById('totalRooms').value,
      idProof: document.getElementById('idProof').value.trim(),
      roomType: roomType.value,
      vipRequests: document.getElementById('vipRequests').value.trim()
    };
    // Very basic validation example
    if(!data.name || !data.email){ alert('Please enter name and email'); return; }
    console.table(data);
    alert('Booking request received (demo). We would now send this to the server.');
    bookingForm.reset();
    vipBlock.classList.add('hidden');
    closeModal();
  });

  // ---------- Mobile nav toggle ----------
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');
  mobileToggle.addEventListener('click', () => {
    if(mainNav.style.display === 'flex'){ mainNav.style.display = 'none'; }
    else{ mainNav.style.display = 'flex'; mainNav.style.flexDirection = 'column'; mainNav.style.gap = '12px'; }
  });

  // ---------- Misc ----------
  // set year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // close modal with escape key
  document.addEventListener('keydown', (ev) => { if(ev.key === 'Escape') closeModal(); });
});
