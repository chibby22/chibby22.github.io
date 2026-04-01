document.addEventListener('DOMContentLoaded', function () {

    // =============================================
    // COOKIE CONSENT — Persistent via localStorage
    // Gate only shows if no stored decision exists.
    // =============================================
    var COOKIE_KEY = 'kynected_consent_v2';
    var cookieGate = document.getElementById('cookie-gate');
    var cookieBackdrop = document.getElementById('cookie-backdrop');
    var analyticsToggle = document.getElementById('analytics-toggle');
    var btnAcceptAll = document.getElementById('cookie-accept-all');
    var btnSaveCustom = document.getElementById('cookie-save-custom');
    var btnEssentialOnly = document.getElementById('cookie-essential-only');
    var btnReopen = document.getElementById('cookie-reopen');
    var analyticsLoaded = false;

    function showCookieGate() {
        if (cookieGate) cookieGate.classList.remove('hidden');
        if (cookieBackdrop) cookieBackdrop.classList.remove('hidden');
        document.body.classList.add('cookie-gate-active');
    }

    function hideCookieGate() {
        if (cookieGate) cookieGate.classList.add('hidden');
        if (cookieBackdrop) cookieBackdrop.classList.add('hidden');
        document.body.classList.remove('cookie-gate-active');
    }

    function loadAnalytics() {
        if (analyticsLoaded) return;
        analyticsLoaded = true;
        var scripts = document.querySelectorAll('script[type="text/plain"][data-cookiecategory="analytics"]');
        scripts.forEach(function (script) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            if (script.src) {
                s.src = script.src;
                s.async = true;
            } else {
                s.innerHTML = script.innerHTML;
            }
            document.head.appendChild(s);
        });
    }

    function saveConsent(level) {
        // Store with a timestamp so you can expire old consents if needed
        var data = { level: level, date: Date.now() };
        try {
            localStorage.setItem(COOKIE_KEY, JSON.stringify(data));
        } catch (e) {
            // If localStorage is blocked, fall back to session
            sessionStorage.setItem(COOKIE_KEY, JSON.stringify(data));
        }
        hideCookieGate();
        if (level === 'all') loadAnalytics();
    }

    function getStoredConsent() {
        try {
            var raw = localStorage.getItem(COOKIE_KEY) || sessionStorage.getItem(COOKIE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    // On load — check if decision already stored
    var stored = getStoredConsent();
    if (!stored) {
        // First visit or cleared storage — show gate
        showCookieGate();
    } else {
        // Decision exists — never show gate again unless user reopens
        hideCookieGate();
        if (stored.level === 'all') loadAnalytics();
    }

    if (btnAcceptAll) btnAcceptAll.addEventListener('click', function () { saveConsent('all'); });
    if (btnSaveCustom) btnSaveCustom.addEventListener('click', function () {
        saveConsent(analyticsToggle && analyticsToggle.checked ? 'all' : 'essential');
    });
    if (btnEssentialOnly) btnEssentialOnly.addEventListener('click', function () { saveConsent('essential'); });
    if (btnReopen) btnReopen.addEventListener('click', function () {
        var s = getStoredConsent();
        if (analyticsToggle) analyticsToggle.checked = s ? s.level === 'all' : true;
        showCookieGate();
    });


    // =============================================
    // MOBILE MENU
    // =============================================
    var navbarToggler = document.querySelector('.navbar-toggler');
    var mobileNav = document.querySelector('.mobile-nav');
    if (navbarToggler && mobileNav) {
        navbarToggler.addEventListener('click', function () {
            var open = mobileNav.classList.toggle('active');
            navbarToggler.setAttribute('aria-expanded', String(open));
        });
    }


    // =============================================
    // SMOOTH SCROLL
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var offset = (document.querySelector('.site-header') || { offsetHeight: 70 }).offsetHeight;
                window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
            }
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                if (navbarToggler) navbarToggler.setAttribute('aria-expanded', 'false');
            }
        });
    });


    // =============================================
    // HERO — Typing + Taglines
    // =============================================
    var typingEl = document.getElementById('typing-text');
    var textToType = 'KYNECTED';
    var ti = 0;
    function typeWriter() {
        if (typingEl && ti < textToType.length) {
            typingEl.innerHTML += textToType.charAt(ti++);
            setTimeout(typeWriter, 140);
        }
    }
    if (typingEl) typeWriter();

    var taglineEl = document.getElementById('cycling-tagline');
    var taglines = ['One call, simplify your life...', 'One call, get connected...', 'One call for every solution!'];
    var tIdx = 0;
    function cycleTaglines() {
        if (!taglineEl) return;
        taglineEl.style.opacity = 0;
        setTimeout(function () {
            taglineEl.textContent = taglines[tIdx];
            taglineEl.style.opacity = 1;
            tIdx++;
            if (tIdx < taglines.length) setTimeout(cycleTaglines, 1500);
        }, 500);
    }
    setTimeout(cycleTaglines, textToType.length * 150 + 500);


    // =============================================
    // PARTICLE CANVAS
    // =============================================
    var canvas = document.getElementById('particle-canvas');
    if (canvas && window.innerWidth > 768) {
        var ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = canvas.parentElement.offsetHeight;
        var particles = [];
        var params = { count: (canvas.height * canvas.width) / 9000, colors: ['rgba(233,159,71,0.2)', 'rgba(0,168,150,0.2)'], speed: 0.4, mouseRadius: 150 };
        var mouse = { x: null, y: null };

        window.addEventListener('mousemove', function (e) { mouse.x = e.x; mouse.y = e.y; });

        function Particle(x, y, dx, dy, size, color) { this.x = x; this.y = y; this.dx = dx; this.dy = dy; this.size = size; this.color = color; }
        Particle.prototype.draw = function () { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fillStyle = this.color; ctx.fill(); };
        Particle.prototype.update = function () {
            if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
            if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;
            var dx = mouse.x - this.x, dy = mouse.y - this.y, dist = Math.sqrt(dx*dx+dy*dy);
            if (dist < params.mouseRadius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size*10) this.x += 5;
                if (mouse.x > this.x && this.x > this.size*10) this.x -= 5;
                if (mouse.y < this.y && this.y < canvas.height - this.size*10) this.y += 5;
                if (mouse.y > this.y && this.y > this.size*10) this.y -= 5;
            }
            this.x += this.dx; this.y += this.dy; this.draw();
        };

        function initParticles() {
            particles = [];
            for (var j = 0; j < params.count; j++) {
                var s = Math.random()*5+1;
                particles.push(new Particle(Math.random()*(canvas.width-s*4)+s*2, Math.random()*(canvas.height-s*4)+s*2, (Math.random()-0.5)*params.speed, (Math.random()-0.5)*params.speed, s, params.colors[Math.floor(Math.random()*2)]));
            }
        }
        function animate() { requestAnimationFrame(animate); ctx.clearRect(0,0,canvas.width,canvas.height); particles.forEach(function(p){p.update();}); }
        initParticles(); animate();
        window.addEventListener('resize', function () { canvas.width = window.innerWidth; canvas.height = canvas.parentElement.offsetHeight; initParticles(); });
    }


    // =============================================
    // SERVICES ACCORDION
    // =============================================
    var accordionBtns = document.querySelectorAll('.accordion-service-btn');
    accordionBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var panelId = this.getAttribute('aria-controls');
            var panel = document.getElementById(panelId);
            var isOpen = panel && panel.classList.contains('open');
            accordionBtns.forEach(function (b) {
                var p = document.getElementById(b.getAttribute('aria-controls'));
                if (p) p.classList.remove('open');
                b.classList.remove('active');
                b.setAttribute('aria-expanded', 'false');
            });
            if (!isOpen && panel) {
                panel.classList.add('open');
                this.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Touch support for flip cards on mobile — tap to flip
    document.querySelectorAll('.flip-card').forEach(function (card) {
        card.addEventListener('click', function () {
            if (window.innerWidth <= 768) return; // handled by CSS on mobile
            this.classList.toggle('flipped');
        });
    });


    // =============================================
    // CLEANING INTERACTIVE TABS
    // =============================================
    var cleaningTabs = document.querySelectorAll('.cleaning-tab');
    var cleaningPanels = document.querySelectorAll('.cleaning-tab-panel');
    cleaningTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            cleaningTabs.forEach(function (t) { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
            cleaningPanels.forEach(function (p) { p.classList.remove('active'); });
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            var target = document.getElementById(this.dataset.target);
            if (target) target.classList.add('active');
        });
    });


    // =============================================
    // EVENTS FORM — show/hide Other field + submit
    // =============================================
    var otherCheck = document.getElementById('evt-other-check');
    var otherField = document.getElementById('other-event-field');
    if (otherCheck && otherField) {
        otherCheck.addEventListener('change', function () {
            otherField.style.display = this.checked ? 'block' : 'none';
        });
    }

    var eventsForm = document.getElementById('events-form');
    var formStatus = document.getElementById('events-form-status');

    if (eventsForm) {
        eventsForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var name = document.getElementById('evtName').value.trim();
            var email = document.getElementById('evtEmail').value.trim();

            // Collect selected events
            var selected = [];
            eventsForm.querySelectorAll('input[type="checkbox"]:checked').forEach(function (cb) {
                if (cb.name !== 'mailing_consent' && cb.name !== 'event_other_check') selected.push(cb.value);
            });
            if (document.getElementById('evt-other-check') && document.getElementById('evt-other-check').checked) {
                var otherDetail = eventsForm.querySelector('input[name="event_other_detail"]');
                if (otherDetail && otherDetail.value.trim()) selected.push('Other: ' + otherDetail.value.trim());
            }

            // Build submission payload for Formspark
            var payload = {
                _subject: 'Kynected Events Interest — ' + name,
                name: name,
                email: email,
                events_interested_in: selected.length ? selected.join(', ') : 'No events selected',
                mailing_list: 'Yes — consented',
                submitted_at: new Date().toLocaleString('en-GB')
            };

            // Disable button while submitting
            var submitBtn = eventsForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            fetch('https://submit-form.com/IcUWdakJn', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(function (res) {
                if (res.ok) {
                    formStatus.className = 'events-form-status success';
                    formStatus.textContent = "You're on the list! We'll email you when events are confirmed.";
                    eventsForm.reset();
                    if (otherField) otherField.style.display = 'none';
                } else {
                    throw new Error('Submission failed');
                }
            })
            .catch(function () {
                formStatus.className = 'events-form-status error';
                formStatus.textContent = 'Something went wrong. Please try again or email us directly.';
            })
            .finally(function () {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Register Interest';
            });
        });
    }


    // =============================================
    // SCROLL FADE-IN
    // =============================================
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(function (el) { observer.observe(el); });

});