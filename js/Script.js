// This event listener waits for the entire HTML document to be fully loaded and parsed.
document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu Toggle Functionality ---
    // This code handles the opening and closing of the mobile navigation menu.
    const navbarToggler = document.querySelector('.navbar-toggler');
    const mobileNav = document.querySelector('.mobile-nav');
    if (navbarToggler && mobileNav) {
        navbarToggler.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
        });
    }

    // --- Smooth Scroll for All Navigation Links ---
    // This makes the page scroll smoothly when a nav link is clicked.
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    allNavLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
            }
        });
    });

    // --- Hero Section Animations ---

    // 1. Typing Animation for the Main Title
    const typingTextElement = document.getElementById('typing-text');
    // UPDATED: New brand name
    const textToType = "KYNECTED";
    let i = 0;
    function typeWriter() {
        if (typingTextElement && i < textToType.length) {
            typingTextElement.innerHTML += textToType.charAt(i);
            i++;
            // ADJUST TYPING SPEED: Lower number is faster (e.g., 100). Higher is slower (e.g., 300).
            setTimeout(typeWriter, 140); 
        }
    }
    if(typingTextElement) typeWriter();

    // 2. Cycling Taglines
    const taglineElement = document.getElementById('cycling-tagline');
    const taglines = [
        "One call, simplify your life...",
        "One call, get connected...",
        "One call for every solution!"
    ];
    let taglineIndex = 0;
    function cycleTaglines() {
        if (!taglineElement) return;
        taglineElement.style.opacity = 0;
        setTimeout(() => {
            taglineElement.textContent = taglines[taglineIndex];
            taglineElement.style.opacity = 1;
            taglineIndex++;
            if (taglineIndex < taglines.length) {
                // ADJUST TAGLINE DISPLAY TIME: Time in milliseconds (e.g., 2500 is 2.5 seconds).
                setTimeout(cycleTaglines, 1500);
            }
        }, 500); // This is the fade transition time.
    }
    // Start the tagline cycling after the main title has finished typing.
    setTimeout(cycleTaglines, (textToType.length * 150) + 500);


    // 3. Interactive Particle Background
    const canvas = document.getElementById('particle-canvas');
    // UPDATED: Check if the screen is wider than a typical mobile phone (768px) before running the animation.
    // This prevents lag on less powerful devices.
    if (canvas && window.innerWidth > 768) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = canvas.parentElement.offsetHeight;

        let particlesArray;

        // --- EDITABLE PARAMETERS for Particle Effect ---
        const particleParams = {
            // NUMBER of particles. Higher number = more dense.
            count: (canvas.height * canvas.width) / 9000, 
            // COLORS of the particles. Add more 'rgba' values to the array for more variety.
            colors: ['rgba(233, 159, 71, 0.2)', 'rgba(0, 168, 150, 0.2)'], 
            // MOUSE INTERACTION RADIUS: Larger number = particles react from further away.
            mouseRadius: 150, 
            // PARTICLE SPEED: Higher number = faster movement.
            speed: 0.4 
        };
        // --- End of Editable Parameters ---

        const mouse = { x: null, y: null, radius: particleParams.mouseRadius };

        window.addEventListener('mousemove', function(event) {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) { this.directionX = -this.directionX; }
                if (this.y > canvas.height || this.y < 0) { this.directionY = -this.directionY; }

                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius + this.size) {
                    if (mouse.x < this.x && this.x < canvas.width - this.size * 10) { this.x += 5; }
                    if (mouse.x > this.x && this.x > this.size * 10) { this.x -= 5; }
                    if (mouse.y < this.y && this.y < canvas.height - this.size * 10) { this.y += 5; }
                    if (mouse.y > this.y && this.y > this.size * 10) { this.y -= 5; }
                }
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            for (let i = 0; i < particleParams.count; i++) {
                // EDITABLE PARAMETER: Particle size range (e.g., (Math.random() * 5) + 1 means size is between 1 and 6).
                let size = (Math.random() * 5) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * particleParams.speed) - (particleParams.speed / 2);
                let directionY = (Math.random() * particleParams.speed) - (particleParams.speed / 2);
                let color = particleParams.colors[Math.floor(Math.random() * particleParams.colors.length)];
                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
        }
        
        init();
        animate();

        window.addEventListener('resize', function() {
            canvas.width = innerWidth;
            canvas.height = canvas.parentElement.offsetHeight;
            mouse.radius = particleParams.mouseRadius;
            init();
        });
    }

    // --- Scroll-triggered Fade-in Animation ---
    const animatedElements = document.querySelectorAll('.fade-in');
    // This creates an "observer" that watches for elements entering the viewport.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If an element is intersecting (visible), add the 'is-visible' class.
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 }); // The animation triggers when 10% of the element is visible.
    
    // Tell the observer to watch each element with the 'fade-in' class.
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});