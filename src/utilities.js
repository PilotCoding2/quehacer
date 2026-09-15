const displayHome = (homeBtn, content) => {
    content.innerHTML = '';
    const allButtons = document.querySelectorAll('.nav-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('selected');
    });
    homeBtn.classList.add('selected');
    content.innerHTML += 
    `
    <div class="home-wrapper">
        <h1 class="main-title">¡El Mero Sabor de Sinaloa!</h1>
        <p class="description"> Bienvenido a <strong>La Carreta del Pacífico</strong>. Aquí no andamos con rodeos: puros mariscos frescos, clamatos bien helados y el sazón auténtico de las calles de Culiacán y el malecón de Mazatlán.</p>
        <div class="highlights">
            <p>🦐 Mariscos frescos todos los días</p>
            <p>🌶️ El toque exacto de chiltepín</p>
            <p>🍻 Ambiente 100% familiar</p>
        </div>
    </div>
    `;
    
}

const displayMenu = (menuBtn, content) => {
    content.innerHTML = '';
    const allButtons = document.querySelectorAll('.nav-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('selected');
    });
    menuBtn.classList.add('selected');
    content.innerHTML += 
    `
    <div class="menu-wrapper">
        <h1 class="main-title">Nuestro Menú</h1>
        <div class="menu-category">
            <h2>Barra Fría</h2>
            <div class="menu-item">
                <h3>Aguachile Verde de Camarón</h3>
                <p>Camarón crudo curtido al momento en jugo de limón, con pepino, cebolla morada y su toque de chiltepín. ¡Picosito y fresco!</p>
                <span class="price">$190</span>
            </div>
            <div class="menu-item">
                <h3>Ceviche Mitotero</h3>
                <p>Ceviche de sierra finamente picada con zanahoria, pepino y bañado en nuestro clamato especial de la casa.</p>
                <span class="price">$160</span>
            </div>
        </div>
        <div class="menu-category">
            <h2>Pa'l Antojo</h2>
            <div class="menu-item">
                <h3>Tacos Gobernador</h3>
                <p>La joya de Mazatlán. Camarón guisado con chile poblano, cebolla y una costra de queso fundido en tortilla de maíz doradita.</p>
                <span class="price">$75 c/u</span>
            </div>
            <div class="menu-item">
                <h3>Sushi Culichi</h3>
                <p>Rollo empanizado relleno de camarón, aguacate, pepino y queso crema. Coronado con ensalada tampico y salsa de anguila.</p>
                <span class="price">$180</span>
            </div>
        </div>
    </div>
    `;
}

const displayAbout = (aboutBtn, content) => {
    content.innerHTML = '';
    const allButtons = document.querySelectorAll('.nav-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('selected');
    });
    aboutBtn.classList.add('selected');
    content.innerHTML = 
    `
    <div class="about-wrapper">
        <h1 class="main-title">Nuestra Historia</h1>
        <div class="about-content">
            <p>Todo empezó en una pequeña carreta. Queríamos compartir lo que significa comer de verdad en Sinaloa: con buena música sonando de fondo, una cerveza bien fría en la mano y el mejor marisco frente a ti.</p>
            <p>Traemos nuestros ingredientes directamente desde el norte. Nuestro chile chiltepín, la salsa negra y el callo de hacha son 100% auténticos para garantizar que cada bocado te transporte al Pacífico.</p>
            <p><strong>¡Date una vuelta y siéntete como en el malecón!</strong></p>
            
            <div class="contact-info">
                <h3>Visítanos</h3>
                <p>📍 Ubicación: Av. Camarón Sábalo 123, Zona Dorada</p>
                <p>⏰ Horario: Lunes a Domingo de 11:00 am a 8:00 pm</p>
                <p>📞 Reservas: (555) 123-4567</p>
            </div>
        </div>
    </div>
    `;
}

export { displayHome, displayMenu, displayAbout };