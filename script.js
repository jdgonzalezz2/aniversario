// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Generar corazones flotantes de fondo
    const bgAnimation = document.getElementById('bg-animation');
    const colors = ['#ffb3c6', '#ff8fab', '#fb6f92', '#ffe5ec'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Propiedades aleatorias
        const left = Math.random() * 100; // Posición horizontal base
        const size = Math.random() * 20 + 10; // Tamaño entre 10 y 30px
        const duration = Math.random() * 7 + 8; // Duración de 8 a 15 segundos
        const delay = Math.random() * 5; // Retraso
        const bgColor = colors[Math.floor(Math.random() * colors.length)];
        
        heart.style.left = `${left}vw`;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;
        heart.style.background = bgColor;
        
        bgAnimation.appendChild(heart);
        
        // Loop: eliminar una vez finalice para no saturar la memoria y recrear uno nuevo
        setTimeout(() => {
            heart.remove();
            createHeart();
        }, (duration + delay) * 1000);
    }
    
    // Iniciar el efecto esparciendo corazones iniciales
    for (let i = 0; i < 20; i++) {
        setTimeout(createHeart, Math.random() * 4000);
    }

    // Generar Diario Dinámicamente
    const images = [
        "WhatsApp Image 2026-04-02 at 1.02.41 PM.jpeg",
        "WhatsApp Image 2026-04-02 at 1.02.42 PM.jpeg",
        "WhatsApp Image 2026-04-02 at 1.15.42 PM (1).jpeg",
        "WhatsApp Image 2026-04-02 at 1.15.42 PM (10).jpeg",
        "WhatsApp Image 2026-04-02 at 1.15.42 PM (11).jpeg",
        "WhatsApp Image 2026-04-02 at 1.15.42 PM (12).jpeg",
        "WhatsApp Image 2026-04-02 at 1.15.42 PM (13).jpeg",
        "WhatsApp Image 2026-04-02 at 1.15.42 PM (2).jpeg",
        "WhatsApp Image 2026-04-02 at 1.15.42 PM (3).jpeg",
        "WhatsApp Image 2026-04-02 at 1.15.42 PM (4).jpeg",
        "WhatsApp Image 2026-04-02 at 1.15.42 PM (5).jpeg",
        "WhatsApp Image 2026-04-02 at 1.15.42 PM (6).jpeg",
        "WhatsApp Image 2026-04-02 at 1.15.42 PM (7).jpeg",
        "WhatsApp Image 2026-04-02 at 1.15.42 PM (8).jpeg",
        "WhatsApp Image 2026-04-02 at 1.15.42 PM (9).jpeg",
        "WhatsApp Image 2026-04-02 at 1.15.42 PM.jpeg",
        "WhatsApp Image 2026-04-02 at 1.15.43 PM (1).jpeg",
        "WhatsApp Image 2026-04-02 at 1.15.43 PM (2).jpeg",
        "WhatsApp Image 2026-04-02 at 1.15.43 PM (3).jpeg",
        "WhatsApp Image 2026-04-02 at 1.15.43 PM (4).jpeg",
        "WhatsApp Image 2026-04-02 at 1.15.43 PM (5).jpeg",
        "WhatsApp Image 2026-04-02 at 1.15.43 PM (6).jpeg",
        "WhatsApp Image 2026-04-02 at 1.15.43 PM.jpeg"
    ];

    const frasesDeAmor = [
        "Mi sonrisa favorita eres tú",
        "Cada instante contigo es mágico",
        "Gracias por cruzarte en mi camino",
        "Eres el mejor regalo de mi vida",
        "Contigo todo tiene más color",
        "Mi lugar seguro en el mundo",
        "7 meses juntos y contando...",
        "Eres mi casualidad más bonita",
        "Mi universo entero",
        "Me haces mejor persona cada día",
        "Te elijo hoy y siempre",
        "Nunca creí amar tanto a alguien",
        "Mi compañera de vida y locuras",
        "Eres arte en todas tus formas",
        "Tu risa es mi música favorita",
        "Tengo tanta suerte de tenerte",
        "A tu lado el tiempo vuela",
        "Amo cada pequeño detalle de ti",
        "Eres el pedacito de felicidad que me tocó",
        "Tus abrazos reinician mi vida",
        "Nuestra historia es mi favorita",
        "Dueña absoluta de mi corazón",
        "Te amo con toda mi alma"
    ];

    const timelineContainer = document.getElementById('diary-timeline');
    if (timelineContainer) {
        images.forEach((img, index) => {
            const side = index % 2 === 0 ? 'left' : 'right';
            const tilt = (Math.random() * 4 - 2).toFixed(1); 
            const frase = frasesDeAmor[index] || "Juntos por siempre";
            
            const entry = document.createElement('div');
            entry.className = `diary-entry ${side} hidden-element`;
            
            entry.innerHTML = `
                <div class="diary-card" style="transform: rotate(${tilt}deg)">
                    <div class="tape"></div>
                    <img src="assets/${img}" alt="Recuerdo ${index + 1}" loading="lazy">
                    <div class="diary-caption">${frase}</div>
                </div>
            `;
            timelineContainer.appendChild(entry);
        });
    }

    // Animaciones al hacer scroll (Intersection Observer)
    const hiddenElements = document.querySelectorAll('.hidden-element');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    hiddenElements.forEach((el) => observer.observe(el));

    // Lógica del Modal (Carta Sorpresa)
    const modal = document.getElementById('letter-modal');
    const openBtn = document.getElementById('open-letter-btn');
    const closeBtn = document.querySelector('.close-btn');

    openBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evita scrollear cuando el modal está abierto
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaura el scroll
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Pequeño extra interactivo: Corazones salientes cada vez que se hace click
    document.body.addEventListener('click', (e) => {
        // Ignorar si hace click en el boton para no recargar la pantalla
        if(e.target.closest('.modal-content') || e.target.closest('.primary-btn')) return;
        
        const clickHeart = document.createElement('div');
        clickHeart.innerHTML = '✨'; // Estrellitas como magia!
        clickHeart.style.position = 'fixed';
        clickHeart.style.left = `${e.clientX - 10}px`;
        clickHeart.style.top = `${e.clientY - 10}px`;
        clickHeart.style.fontSize = '24px';
        clickHeart.style.pointerEvents = 'none';
        clickHeart.style.zIndex = '9999';
        clickHeart.style.transition = 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1s ease-out';
        
        document.body.appendChild(clickHeart);
        
        // Forzar reflujo
        clickHeart.getBoundingClientRect();
        
        // Iniciar animación de click
        requestAnimationFrame(() => {
            clickHeart.style.transform = 'translateY(-80px) scale(1.5)';
            clickHeart.style.opacity = '0';
        });
        
        // Remover después de terminar
        setTimeout(() => {
            clickHeart.remove();
        }, 1000);
    });
});
