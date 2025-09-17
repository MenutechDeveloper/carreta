let deferredPrompt;

document.addEventListener('DOMContentLoaded', () => {
  const installContainer = document.getElementById('installContainer'); // usamos el contenedor clicable
  const iosPopup = document.getElementById('iosPopup');
  const closeIosPopup = document.getElementById('closeIosPopup');

  // === iOS popup ===
  function isIOS() {
    return /iphone|ipad|ipod/i.test(navigator.userAgent);
  }
  if (closeIosPopup) {
    closeIosPopup.addEventListener('click', () => {
      iosPopup.style.display = 'none';
    });
  }
  // === end iOS popup ===

  // Elementos de animación
  const anim = document.getElementById('installAnimation');
  const text = document.getElementById('installText');
  const progressCircle = document.getElementById('progressCircle');

  // Evento que detecta si la PWA se puede instalar
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installContainer.classList.add('instalable');
  });

  // Al hacer clic en el botón de instalación
  installContainer.addEventListener('click', async (e) => {
    e.preventDefault(); // evitamos que el <a> dispare cosas raras

    // === iOS popup ===
    if (isIOS()) {
      if (iosPopup) iosPopup.style.display = 'flex';
      return; // Salimos antes de deferredPrompt
    }
    // === end iOS popup ===

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === 'accepted') {
        console.log('✅ User accepted to install the app');

        // MOSTRAR ANIMACIÓN
        if (anim && text && progressCircle) {
          anim.style.display = 'flex';
          text.textContent = 'Installing...';

          // Resetear progreso
          progressCircle.setAttribute('stroke-dasharray', `0 999`);
          progressCircle.setAttribute('stroke', '#666'); // gris inicial

          // Iniciar animación de progreso (3s)
          setTimeout(() => {
            progressCircle.setAttribute('stroke-dasharray', `380 999`); // círculo casi completo
          }, 50);

          // Después de 3s cambiamos el texto y el color a verde
          setTimeout(() => {
            text.textContent = 'App installed';
            progressCircle.setAttribute('stroke', '#28a745'); // verde elegante
          }, 3000);

          // Ocultar animación después de 4s
          setTimeout(() => {
            anim.style.display = 'none';
          }, 4000);
        }

      } else {
        console.log('❌ User declined the installation');
      }
      deferredPrompt = null;
    } else {
      alert('This app is already installed');
    }
  });
});

// Inicializa Firebase Messaging
const messaging = firebase.messaging();
messaging.requestPermission()
  .then(() => messaging.getToken({ vapidKey: 'BBWGV_mbSdoU8vi0Al-d79Dg4o02LUncG8Gqt4FUnhvKLk5TdNi' }))
  .then((currentToken) => { if(currentToken) console.log('✅ User token:', currentToken); })
  .catch((err) => console.error('❌ Error getting token:', err));

messaging.onMessage((payload) => {
  console.log('🔔 Foreground message received:', payload);
  new Notification(payload.notification.title, {
    body: payload.notification.body
  });
});
