function initPalino() {
  const message = document.createElement('div');
  message.id = 'palino-message';

  // Funzione per aggiornare il testo basato sulla lingua
  function updateMessageText() {
    const lang = localStorage.getItem('lang') || 'it';
    const translations = window.translations && window.translations[lang];
    message.textContent = translations ? translations.palino_message : 'Poso auitarti ?';
  }

  updateMessageText(); // Imposta il testo iniziale

  document.body.appendChild(message);

  const showDelay = 15000;
  const hideDelay = 5000;

  setTimeout(() => {
    message.classList.add('visible');
    setTimeout(() => {
      message.classList.remove('visible');
    }, hideDelay);
  }, showDelay);

  // Ascolta il cambio lingua (se esiste un evento)
  window.addEventListener('languageChanged', updateMessageText);
}

document.addEventListener('DOMContentLoaded', initPalino);
