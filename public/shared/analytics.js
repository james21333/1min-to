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

  function landingVariant() {
    return window.location.pathname.replace(/^\/+|\/+$/g, '') || 'home';
  }

  function quizSessionId() {
    var key = 'onemin_quiz_sid';
    try {
      var sid = sessionStorage.getItem(key);
      if (!sid) {
        sid = 'q_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        sessionStorage.setItem(key, sid);
      }
      return sid;
    } catch (e) {
      return 'q_unknown';
    }
  }

  window.oneminAnalytics = {
    landingVariant: landingVariant,
    quizSessionId: quizSessionId,

    track: function (eventName, params) {
      if (typeof window.gtag !== 'function') return;
      var base = {
        landing_variant: landingVariant(),
        quiz_name: 'getfit',
        quiz_session_id: quizSessionId(),
        page_path: window.location.pathname
      };
      window.gtag('event', eventName, Object.assign(base, params || {}));
    },

    trackQuizStep: function (stepName, stepIndex, stepType, totalSteps) {
      var pct = totalSteps ? Math.round((stepIndex / totalSteps) * 100) : 0;
      this.track('quiz_step_view', {
        step_name: stepName,
        step_index: stepIndex,
        step_type: stepType || 'question',
        progress_pct: pct
      });
    },

    trackQuizStart: function (totalSteps) {
      this.track('quiz_start', { total_steps: totalSteps });
    },

    trackQuizSkip: function (fromStep, fromIndex) {
      this.track('quiz_skip', {
        from_step: fromStep,
        from_step_index: fromIndex
      });
    },

    trackQuizOffer: function (action) {
      this.track('quiz_offer_click', { offer_action: action });
    },

    trackQuizComplete: function (exitRoute) {
      this.track('quiz_complete', { exit_route: exitRoute || 'main' });
    }
  };
})();
