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
        if (cookieGate) cookieGate.classList.add('visible');
        if (cookieBackdrop) cookieBackdrop.classList.add('visible');
        document.body.classList.add('cookie-gate-active');
    }

    function hideCookieGate() {
        if (cookieGate) cookieGate.classList.remove('visible');
        if (cookieBackdrop) cookieBackdrop.classList.remove('visible');
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
    // EVENTS FORM — localStorage storage + CSV download
    // =============================================
    var otherCheck = document.getElementById('evt-other-check');
    var otherField = document.getElementById('other-event-field');
    if (otherCheck && otherField) {
        otherCheck.addEventListener('change', function () {
            otherField.style.display = this.checked ? 'block' : 'none';
        });
    }

    var REGISTRATIONS_KEY = 'kynected_event_registrations';
    var formStatus = document.getElementById('events-form-status');
    var submitBtn = document.getElementById('evtSubmitBtn');

    function getRegistrations() {
        try {
            return JSON.parse(localStorage.getItem(REGISTRATIONS_KEY) || '[]');
        } catch (e) { return []; }
    }

    function saveRegistration(entry) {
        var list = getRegistrations();
        list.push(entry);
        localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(list));
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', function () {
            var nameEl = document.getElementById('evtName');
            var emailEl = document.getElementById('evtEmail');
            var consentEl = document.getElementById('mailing-consent');

            if (!nameEl || !nameEl.value.trim()) {
                formStatus.className = 'events-form-status error';
                formStatus.textContent = 'Please enter your name.';
                return;
            }
            if (!emailEl || !emailEl.value.trim() || !emailEl.value.includes('@')) {
                formStatus.className = 'events-form-status error';
                formStatus.textContent = 'Please enter a valid email address.';
                return;
            }
            if (!consentEl || !consentEl.checked) {
                formStatus.className = 'events-form-status error';
                formStatus.textContent = 'Please tick the consent box to continue.';
                return;
            }

            var selected = [];
            document.querySelectorAll('#events-form input[type="checkbox"]:checked').forEach(function (cb) {
                if (cb.id !== 'mailing-consent' && cb.id !== 'evt-other-check') selected.push(cb.value);
            });
            if (otherCheck && otherCheck.checked) {
                var detail = document.getElementById('evtOtherDetail');
                if (detail && detail.value.trim()) selected.push('Other: ' + detail.value.trim());
            }

            var entryName  = nameEl.value.trim();
            var entryEmail = emailEl.value.trim();
            var entryEvts  = selected.join(', ') || 'None specified';
            var entryDate  = new Date().toLocaleString('en-GB');

            var entry = { name: entryName, email: entryEmail, events: entryEvts, date: entryDate };

            // 1. Save to localStorage for admin CSV download
            saveRegistration(entry);
            // --- GA4 EVENT TRACKING START ---
if (typeof gtag === 'function') {
    gtag('event', 'event_registration', {
        'event_category': 'Engagement',
        'event_label': entryEvts,
        'value': 1
    });
}
           

            // 2. Send to kynectedsolutions@outlook.com via Formspark
            var formData = new FormData();
            formData.append('_subject', 'Kynected Events Interest — ' + entryName);
            formData.append('name', entryName);
            formData.append('email', entryEmail);
            formData.append('events_interested_in', entryEvts);
            formData.append('date', entryDate);
            formData.append('form_type', 'events_mailing_list');

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            fetch('https://submit-form.com/IcUWdakJn', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(function (res) {
                formStatus.className = 'events-form-status success';
                formStatus.textContent = "You\u2019re on the list! We\u2019ll be in touch when dates are confirmed.";
            }).catch(function () {
                // Still saved to localStorage — let user know
                formStatus.className = 'events-form-status success';
                formStatus.textContent = "Registered! We\u2019ll be in touch soon.";
            }).finally(function () {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Register Interest';
                // Reset fields
                nameEl.value = '';
                emailEl.value = '';
                if (consentEl) consentEl.checked = false;
                document.querySelectorAll('#events-form input[type="checkbox"]').forEach(function (cb) { cb.checked = false; });
                if (otherField) otherField.style.display = 'none';
                var od = document.getElementById('evtOtherDetail');
                if (od) od.value = '';
            });
        });
    }

    // Secret admin shortcut: type "kynected-admin" anywhere on the page
    // to download a CSV of all event registrations
    var adminBuffer = '';
    document.addEventListener('keypress', function (e) {
        adminBuffer += e.key;
        if (adminBuffer.length > 14) adminBuffer = adminBuffer.slice(-14);
        if (adminBuffer === 'kynected-admin') {
            adminBuffer = '';
            var list = getRegistrations();
            if (!list.length) {
                alert('No registrations saved yet.');
                return;
            }
            var csv = 'Name,Email,Events Interested In,Date Registered\n';
            list.forEach(function (r) {
                csv += '"' + r.name + '","' + r.email + '","' + r.events + '","' + r.date + '"\n';
            });
            var blob = new Blob([csv], { type: 'text/csv' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'kynected_event_registrations.csv';
            a.click();
            URL.revokeObjectURL(url);
        }
    });


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