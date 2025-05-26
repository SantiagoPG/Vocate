const translations = {
    es: {
      welcome: "Bienvenido a Vocate",
      description: `“Cultivada en la tierra, disfrutada en el alma”<br>
        Vocate nace en el corazón de Antioquia, fusionando tradición y creatividad para ofrecer una experiencia cervecera única.
        Esta bendita y refrescante cerveza artesanal destaca por su equilibrio perfecto entre cuerpo y sabor, con vibrantes notas cítricas que despiertan los sentidos.
        Con un 5% de alcohol, es ideal para quienes buscan disfrutar de una bebida ligera, pero con carácter.
        Su proceso de elaboración cuidadoso y el uso de ingredientes seleccionados garantizan una textura suave y un final limpio,
        convirtiéndola en una opción inolvidable para los amantes de la buena cerveza.`,
      price: "Precio: $13.000"
    },
    en: {
      welcome: "Welcome to Vocate",
      description: `“Grown in the earth, enjoyed in the soul”<br>
        Vocate is born in the heart of Antioquia, blending tradition and creativity to offer a unique craft beer experience.
        This blessed and refreshing beer stands out for its perfect balance between body and flavor, with vibrant citrus notes that awaken the senses.
        With 5% alcohol, it's ideal for those seeking a light yet characterful drink.
        Its careful brewing process and selected ingredients ensure a smooth texture and clean finish,
        making it an unforgettable choice for true beer lovers.`,
      price: "Price: $13,000"
    }
  };
  
  function setLanguage(lang) {
    localStorage.setItem("language", lang);
    updateTexts();
  }
  
  function updateTexts() {
    const lang = localStorage.getItem("language") || "es";
    const menuContent = document.getElementById("menu-content");
    if (menuContent) {
      menuContent.innerHTML = `
        <div class="menu-card">
          <h2>Cerveza Artesanal Vocate</h2>
          <p>${translations[lang].description}</p>
          <h3>${translations[lang].price}</h3>
          <button onclick="openModal('Cerveza Artesanal Vocate')">${lang === 'es' ? 'Pedir' : 'Order'}</button>
        </div>
      `;
    }
  }  
  
  function goToMenu() {
    window.location.href = "menu.html";
  }
  function openModal(productName) {
  document.getElementById("modal-product-name").innerText = productName;
  document.getElementById("order-modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("order-modal").classList.add("hidden");
}

const telegramToken = "7640380344:AAEfQgNMn68tjc1yZ7Qo-uiz2MzogKMYMS4";
const chatId = "43198400";

document.getElementById("order-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("customer-name").value.trim();
  const table = document.getElementById("table-number").value.trim();
  const product = document.getElementById("modal-product-name").textContent.trim();

  if (!name || !table) {
    alert("Por favor completa todos los campos.");
    return;
  }

  const message = `🧾 *Nuevo pedido recibido:*\n🍽️ Producto: *${product}*\n👤 Nombre: *${name}*\n🪑 Mesa: *${table}*`;

  // Enviar mensaje a Telegram
  fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "Markdown",
    }),
  })
    .then((response) => {
      if (response.ok) {
        alert("✅ Pedido enviado correctamente.");
        closeModal();
        document.getElementById("order-form").reset();
      } else {
        throw new Error("Error al enviar a Telegram.");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("❌ No se pudo enviar el pedido. Intenta de nuevo.");
    });
});


  
  document.addEventListener("DOMContentLoaded", updateTexts);