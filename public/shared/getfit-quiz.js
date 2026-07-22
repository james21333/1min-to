/* GetFit quiz — shared by all path aliases. Edit this file to update every URL. */
(function () {
  const root = document.getElementById("getfit-root");
  if (!root) return;
  root.innerHTML = '<div class="app">\n    <div class="top">\n      <a class="brand" href="/">1min<span>.to</span></a>\n      <button type="button" class="skip" id="skipBtn">Skip quiz</button>\n    </div>\n    <div class="progress" id="progress"><i id="progressBar"></i></div>\n\n    <section class="screen active" data-screen="gender">\n      <h1>Let’s personalize your plan</h1>\n      <p class="sub">1 minute. A few questions. A clearer path for your goals to get fit.</p>\n      <div class="options" data-key="gender" data-auto="1">\n        <button type="button" class="opt" data-value="Female">Female</button>\n        <button type="button" class="opt" data-value="Male">Male</button>\n        <button type="button" class="opt" data-value="Prefer not to say">Prefer not to say</button>\n      </div>\n      <p class="legal">By continuing, you agree to our terms and privacy policy.</p>\n    </section>\n\n    <section class="screen" data-screen="age">\n      <h2>What age range are you in?</h2>\n      <p class="sub">Helps us match the right pace for getting fit.</p>\n      <div class="options" data-key="age" data-auto="1">\n        <button type="button" class="opt" data-value="18-29">18 – 29</button>\n        <button type="button" class="opt" data-value="30-39">30 – 39</button>\n        <button type="button" class="opt" data-value="40-49">40 – 49</button>\n        <button type="button" class="opt" data-value="50+">50+</button>\n      </div>\n    </section>\n\n    <section class="screen" data-screen="goal">\n      <h2>What’s your main goal?</h2>\n      <p class="sub">Choose as many as you’d like.</p>\n      <div class="options" data-key="goal" data-multi="1">\n        <button type="button" class="opt multi" data-value="Slim down steadily">Slim down steadily</button>\n        <button type="button" class="opt multi" data-value="Keep the results long-term">Keep the results long-term</button>\n        <button type="button" class="opt multi" data-value="Feel stronger and more energetic">Feel stronger and more energetic</button>\n        <button type="button" class="opt multi" data-value="Feel confident in my clothes again">Feel confident in my clothes again</button>\n        <button type="button" class="opt multi" data-value="All of the above">All of the above</button>\n      </div>\n      <button type="button" class="btn" data-next disabled>Continue</button>\n    </section>\n\n    <section class="screen" data-screen="bridge">\n      <div class="bridge">\n        <p class="stat">10,000+</p>\n        <h2>You’re in good company</h2>\n        <p class="sub" style="margin-bottom:0">People with similar goals use a simple daily plan to reset habits, build consistency, and finally feel themselves getting fit — without another extreme routine.</p>\n      </div>\n      <button type="button" class="btn" data-next>Continue</button>\n    </section>\n\n    <section class="screen" data-screen="amount">\n      <h2>How far do you want to go with getting fit?</h2>\n      <div class="options" data-key="amount" data-auto="1">\n        <button type="button" class="opt" data-value="A light refresh">A light refresh</button>\n        <button type="button" class="opt" data-value="A noticeable change">A noticeable change</button>\n        <button type="button" class="opt" data-value="A big transformation">A big transformation</button>\n        <button type="button" class="opt" data-value="An all-in reset">An all-in reset</button>\n      </div>\n    </section>\n\n    <section class="screen" data-screen="tried">\n      <h2>What have you already tried?</h2>\n      <p class="sub">Choose as many as you’d like.</p>\n      <div class="options" data-key="tried" data-multi="1">\n        <button type="button" class="opt multi" data-value="Food tracking">Food tracking</button>\n        <button type="button" class="opt multi" data-value="Gym / workouts">Gym / workouts</button>\n        <button type="button" class="opt multi" data-value="Meal plans / coaching">Meal plans / coaching</button>\n        <button type="button" class="opt multi" data-value="Supplements">Supplements</button>\n        <button type="button" class="opt multi" data-value="Nothing yet">Nothing yet</button>\n      </div>\n      <button type="button" class="btn" data-next disabled>Continue</button>\n    </section>\n\n    <section class="screen" data-screen="stuck">\n      <h2>What usually gets in the way?</h2>\n      <div class="options" data-key="stuck" data-auto="1">\n        <button type="button" class="opt" data-value="Cravings">Cravings that won’t quit</button>\n        <button type="button" class="opt" data-value="Busy schedule">A busy schedule</button>\n        <button type="button" class="opt" data-value="Yo-yo results">Results that don’t stick</button>\n        <button type="button" class="opt" data-value="Motivation">Motivation fading after a few weeks</button>\n      </div>\n    </section>\n\n    <section class="screen" data-screen="timeline">\n      <h2>When do you want to see real change?</h2>\n      <div class="options" data-key="timeline" data-auto="1">\n        <button type="button" class="opt" data-value="ASAP">As soon as possible</button>\n        <button type="button" class="opt" data-value="1-2 months">In the next 1–2 months</button>\n        <button type="button" class="opt" data-value="Steady">Steady progress over time</button>\n      </div>\n    </section>\n\n    <section class="screen" data-screen="analyzing">\n      <div class="loader">\n        <div class="spinner" aria-hidden="true"></div>\n        <h2>Creating your analysis…</h2>\n        <ul class="checks" id="analyzeChecks">\n          <li>Matching your goal profile…</li>\n          <li>Looking at habit blockers…</li>\n          <li>Building a simple daily plan…</li>\n        </ul>\n      </div>\n    </section>\n\n    <section class="screen" data-screen="summary">\n      <h2>Summary of your get-fit profile</h2>\n      <div class="summary" id="summaryCards"></div>\n      <button type="button" class="btn" data-next>Continue</button>\n    </section>\n\n    <section class="screen" data-screen="offer">\n      <h2>Ready for a plan that actually fits your life?</h2>\n      <p class="sub">Based on your answers, we’ll show you a straightforward next step built around getting fit — not another extreme reset.</p>\n      <div class="cta-art" aria-hidden="true">🧍 → ✨</div>\n      <button type="button" class="btn" id="offerBtn">Yes, show my plan</button>\n      <button type="button" class="btn secondary" id="offerSkip">Skip for now</button>\n      <p class="foot-note">1min.to · GetFit</p>\n    </section>\n\n    <section class="screen" data-screen="matching">\n      <div class="loader">\n        <div class="spinner" aria-hidden="true"></div>\n        <h2>Matching you to the best program…</h2>\n        <ul class="checks" id="matchChecks">\n          <li>Reviewing your get-fit goals…</li>\n          <li>Comparing program fits…</li>\n          <li>Selecting your best match…</li>\n        </ul>\n      </div>\n    </section>\n\n    <section class="screen" data-screen="found">\n      <div class="loader found-match">\n        <h2 class="found-title">Found a Match!</h2>\n        <div class="bridge found-card">\n          <p class="found-brand">Factor75.com</p>\n          <p class="found-offer">50% off First Box</p>\n        </div>\n        <p class="sub found-redirect">Taking you there now…</p>\n      </div>\n    </section>\n  </div>';

const redirect_url = "https://factor75.com";

    const answers = {};
    const screens = [...document.querySelectorAll(".screen")];
    const progress = document.getElementById("progress");
    const progressBar = document.getElementById("progressBar");
    const questionScreens = screens.filter((s) => !["analyzing", "summary", "offer", "matching", "found"].includes(s.dataset.screen));

    function goTo(name) {
      screens.forEach((s) => s.classList.toggle("active", s.dataset.screen === name));
      const idx = questionScreens.findIndex((s) => s.dataset.screen === name);
      if (idx >= 0) {
        progress.classList.add("on");
        progressBar.style.width = ((idx + 1) / questionScreens.length) * 100 + "%";
      } else {
        progress.classList.toggle("on", name === "summary" || name === "offer");
        if (name === "summary" || name === "offer") progressBar.style.width = "100%";
        if (name === "matching" || name === "found") progress.classList.remove("on");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function nextFrom(el) {
      const current = el.closest(".screen");
      const i = screens.indexOf(current);
      const next = screens[i + 1];
      if (!next) return;
      if (next.dataset.screen === "analyzing") {
        goTo("analyzing");
        runAnalysis();
      } else if (next.dataset.screen === "matching") {
        // Offer CTAs handle matching; summary continues to offer.
        goTo("offer");
      } else {
        goTo(next.dataset.screen);
      }
    }

    function monthLabel() {
      const d = new Date();
      d.setMonth(d.getMonth() + 2);
      return d.toLocaleString("en-US", { month: "long" });
    }

    function runChecklist(selector, onDone, delay) {
      const items = [...document.querySelectorAll(selector)];
      items.forEach((li) => li.classList.remove("on"));
      items.forEach((li, i) => {
        setTimeout(() => li.classList.add("on"), 450 + i * 550);
      });
      setTimeout(onDone, delay || 2200);
    }

    function runAnalysis() {
      runChecklist("#analyzeChecks li", () => {
        const cards = document.getElementById("summaryCards");
        cards.innerHTML = `
          <div><strong>Goal</strong>${[].concat(answers.goal || []).join(", ") || "Getting fit steadily"}</div>
          <div><strong>Target</strong>${answers.amount || "Personalized"}</div>
          <div><strong>Main blocker</strong>${answers.stuck || "Habits"}</div>
          <div><strong>Expected visible progress</strong>By ${monthLabel()}</div>
        `;
        goTo("summary");
      });
    }

    function runMatching() {
      goTo("matching");
      runChecklist("#matchChecks li", () => {
        goTo("found");
        setTimeout(() => {
          window.location.href = redirect_url;
        }, 1800);
      });
    }

    function openOffer() {
      runMatching();
    }

    document.querySelectorAll(".options").forEach((group) => {
      const key = group.dataset.key;
      const multi = group.dataset.multi === "1";
      const auto = group.dataset.auto === "1";
      const continueBtn = group.parentElement.querySelector("[data-next]");

      group.querySelectorAll(".opt").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (multi) {
            if (btn.dataset.value === "All of the above" || btn.dataset.value === "Nothing yet") {
              group.querySelectorAll(".opt").forEach((b) => b.classList.remove("selected"));
              btn.classList.add("selected");
            } else {
              const exclusive = group.querySelector('[data-value="All of the above"], [data-value="Nothing yet"]');
              if (exclusive) exclusive.classList.remove("selected");
              btn.classList.toggle("selected");
            }
            const selected = [...group.querySelectorAll(".opt.selected")].map((b) => b.dataset.value);
            answers[key] = selected;
            if (continueBtn) continueBtn.disabled = selected.length === 0;
          } else {
            group.querySelectorAll(".opt").forEach((b) => b.classList.remove("selected"));
            btn.classList.add("selected");
            answers[key] = btn.dataset.value;
            if (auto) setTimeout(() => nextFrom(btn), 180);
          }
        });
      });
    });

    document.querySelectorAll("[data-next]").forEach((btn) => {
      btn.addEventListener("click", () => nextFrom(btn));
    });

    document.getElementById("skipBtn").addEventListener("click", openOffer);
    document.getElementById("offerBtn").addEventListener("click", openOffer);
    document.getElementById("offerSkip").addEventListener("click", openOffer);
})();
