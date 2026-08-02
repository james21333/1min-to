/**
 * Google Analytics 4 (gtag) for 1min.to — load on every page.
 * Measurement ID: G-XKNJN4ZHZE
 */
(function () {
  var GA_ID = 'G-XKNJN4ZHZE';
  if (window.__oneminGaLoaded) return;
  window.__oneminGaLoaded = true;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
  document.head.appendChild(s);

  gtag('js', new Date());
  gtag('config', GA_ID);
})();
