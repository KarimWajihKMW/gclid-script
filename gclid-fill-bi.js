/* gclid-fill.js  –  injects stored or URL gclid into the form */
(function () {
  // 1) get gclid from URL, localStorage, or cookie
  var gclid =
    new URLSearchParams(window.location.search).get('gclid') ||
    localStorage.getItem('gclid') ||
    (document.cookie.match(/(?:^|;\s*)gclid=([^;]+)/) || [])[1];

  if (!gclid) return;                       // nothing to do

  // 2) keep trying until the field exists, then fill it
  var attempts = 0;
  var timer = setInterval(function () {
    var input =
      document.querySelector('input[name="gclid"]') ||
      document.querySelector('input[id*="118258911"]');   // <- field ID
    if (input) {
      input.value = gclid;
      clearInterval(timer);
      /* uncomment next line if you prefer to hide the field after filling
         input.closest('[data-role="control"]').style.display = 'none'; */
    }
    if (++attempts > 40) clearInterval(timer);             // stop after 8 s
  }, 200);
})();
