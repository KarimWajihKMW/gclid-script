/* gclid-fill-funding.js – injects stored or URL gclid into the FUNDING form */
(function () {
  // 1) get gclid from URL, localStorage, or cookie
  var gclid =
        new URLSearchParams(window.location.search).get('gclid') ||
        localStorage.getItem('gclid') ||
        (document.cookie.match(/(?:^|;\s*)gclid=([^;]+)/) || [])[1];

  if (!gclid) return;                       // nothing to do

  // 2) keep trying until the input exists, then fill it
  var tries  = 0;
  var timer  = setInterval(function () {
    var inp =
          document.querySelector('input[name="gclid"]') ||          // fallback
          document.querySelector('input[id*="118251003"]');         // field ID
    if (inp) {
      inp.value = gclid;
      clearInterval(timer);
      // optionally hide the field after filling:
      // inp.closest('[data-role="control"]').style.display = 'none';
      console.log('[gclid-fill-funding] filled gclid:', gclid);
    }
    if (++tries > 40) clearInterval(timer);   // stop after 8 s
  }, 200);
})();
