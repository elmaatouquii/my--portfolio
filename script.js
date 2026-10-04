// Défilement fluide vers les sections
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


// Animations d'apparition au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
});


// Couleur de la navbar au scroll (corrigée : même palette que le design)
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    navbar.style.background = window.scrollY > 100
        ? 'rgba(20, 20, 20, 0.95)'
        : 'rgba(20, 20, 20, 0.85)';
});


// Menu mobile
const navHamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (navHamburger && mobileMenu) {
    navHamburger.addEventListener('click', () => {
        navHamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Ferme le menu après un clic sur un lien
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navHamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}


// Formulaire de contact -> WhatsApp (avec suivi GA4)
function sendToWhatsApp(event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const message = document.getElementById("message").value;

    const phoneNumber = "212705912597"; // numéro international, sans le +

    const text =
        "📩 Nouveau message depuis le Portfolio\n\n" +
        "👤 Prénom : " + firstName + "\n" +
        "👤 Nom : " + lastName + "\n" +
        "💬 Message : " + message;

    // Suivi GA4 : combien de personnes cliquent sur WhatsApp
    if (typeof gtag === "function") {
        gtag("event", "click_whatsapp", { location: "contact_form" });
    }

    const url = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(text);
    window.open(url, "_blank", "noopener");
}


// Suivi GA4 : clic sur le bouton d'appel et le téléchargement du CV
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        if (typeof gtag === "function") {
            gtag("event", "click_phone", { location: "portfolio" });
        }
    });
});

const cvLink = document.querySelector('a[href$=".pdf"]');
if (cvLink) {
    cvLink.addEventListener('click', () => {
        if (typeof gtag === "function") {
            gtag("event", "download_cv");
        }
    });
}


// Bouton retour en haut
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