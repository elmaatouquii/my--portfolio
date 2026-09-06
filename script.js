document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: stop observing once revealed
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
});


window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.8)';
    }
});




document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.href && this.href !== '#') {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            setTimeout(() => {
                this.innerHTML = this.textContent;
            }, 2000);
        }
    });
});


function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}


const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    typeWriter(heroSubtitle, originalText, 100);
}





const navHamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (navHamburger && mobileMenu) {
    navHamburger.addEventListener('click', () => {
        navHamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close the menu once a link is tapped
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navHamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}
function sendToWhatsApp(event) {
    event.preventDefault();

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let message = document.getElementById("message").value;

    let phoneNumber = "212705912597"; // حيد + وخليه غير الرقم الدولي

    let text = 
        "📩 New message from Portfolio %0A%0A" +
        "👤 First Name: " + firstName + "%0A" +
        "👤 Last Name: " + lastName + "%0A" +
        "💬 Message: " + message;

    let url = "https://wa.me/" + phoneNumber + "?text=" + text;

    window.open(url, "_blank");
}


// Back to top button
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}