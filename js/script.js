// Shannan & Robert — Wedding Site
// Placeholder ceremony time is used below (13:00-23:00) until the real time is confirmed.
// Update WEDDING_START / WEDDING_END when times are finalised (also update wedding.ics).

document.addEventListener('DOMContentLoaded', function () {
  var WEDDING_START = new Date('2027-08-02T13:00:00+01:00');
  var WEDDING_END = new Date('2027-08-02T23:00:00+01:00');

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Countdown timer ---------- */
  var elDays = document.getElementById('cd-days');
  var elHours = document.getElementById('cd-hours');
  var elMins = document.getElementById('cd-mins');
  var elSecs = document.getElementById('cd-secs');

  function pad(n) { return String(n).padStart(2, '0'); }

  function updateCountdown() {
    var now = new Date();
    var diff = WEDDING_START - now;

    if (diff <= 0) {
      elDays.textContent = '00';
      elHours.textContent = '00';
      elMins.textContent = '00';
      elSecs.textContent = '00';
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    var mins = Math.floor((diff / (1000 * 60)) % 60);
    var secs = Math.floor((diff / 1000) % 60);

    elDays.textContent = pad(days);
    elHours.textContent = pad(hours);
    elMins.textContent = pad(mins);
    elSecs.textContent = pad(secs);
  }

  if (elDays) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ---------- Google Calendar link ---------- */
  var gcalLink = document.getElementById('gcalLink');
  if (gcalLink) {
    function toGcalDate(d) {
      return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }
    var params = new URLSearchParams({
      action: 'TEMPLATE',
      text: 'Shannan & Robert’s Wedding',
      dates: toGcalDate(WEDDING_START) + '/' + toGcalDate(WEDDING_END),
      location: 'Bilsington Priory, Bilsington, Ashford, Kent, TN25 7AU',
      details: 'We can’t wait to celebrate with you! Details at this website.'
    });
    gcalLink.href = 'https://calendar.google.com/calendar/render?' + params.toString();
  }

  /* ---------- RSVP conditional fields ---------- */
  var attendingRadios = document.querySelectorAll('input[name="Attending"]');
  var attendingFields = document.getElementById('attendingFields');

  attendingRadios.forEach(function (radio) {
    radio.addEventListener('change', function () {
      if (this.value === 'Joyfully Accepts') {
        attendingFields.classList.remove('hidden');
      } else {
        attendingFields.classList.add('hidden');
      }
    });
  });

  /* ---------- RSVP guest count: show name/food fields per guest ---------- */
  var guestCount = document.getElementById('guestCount');

  function updateGuestFields() {
    var count = parseInt(guestCount.value, 10) || 1;
    document.querySelectorAll('[data-guest]').forEach(function (block) {
      var show = parseInt(block.dataset.guest, 10) <= count;
      block.classList.toggle('hidden', !show);
      block.querySelectorAll('input, select').forEach(function (field) {
        field.disabled = !show;
      });
    });
  }

  if (guestCount) {
    guestCount.addEventListener('change', updateGuestFields);
    updateGuestFields();
  }
});
