document.addEventListener('DOMContentLoaded', () => {
  // Elementos principales
  const cardContainer = document.getElementById('cardContainer');
  const introModalEl = document.getElementById('introModal');
  const startButton = document.getElementById('startButton');
  const previewOffcanvasEl = document.getElementById('previewOffcanvas');
  const previewContent = document.getElementById('previewContent');

  // Estado actual de la carta seleccionada
  let currentCard = null;

  // Inicializar Bootstrap modal y offcanvas
  const introModal = new bootstrap.Modal(introModalEl, { backdrop: 'static', keyboard: false });
  const previewOffcanvas = new bootstrap.Offcanvas(previewOffcanvasEl);

  // Mostrar modal de introducción al cargar la página
  introModal.show();

  // Al hacer clic en "Comenzar", ocultar modal de introducción
  startButton.addEventListener('click', () => {
    introModal.hide();
  });

  // Reproducir video en mute para evitar bloqueo automático
  const video = document.getElementById('introVideo');
  if (video) {
    video.muted = true;
    video.play().catch(error => {
      console.warn('⚠️ No se pudo reproducir automáticamente el video:', error);
    });

    video.addEventListener('ended', () => {
      introModal.hide();
    });
  }

  // Cargar datos desde archivo JSON
  async function cargarDatosDesdeJSON() {
    try {
      const response = await fetch('letters.json');
      if (!response.ok) throw new Error('No se pudo cargar el archivo JSON');

      const data = await response.json();
      generarCartas(data);
    } catch (error) {
      console.error('Error al cargar el JSON:', error);
      cardContainer.innerHTML = '<p class="text-danger">❌ No se pudo cargar el contenido.</p>';
    }
  }

  // Generar cartas del alfabeto con flip y eventos
  function generarCartas(alphabetData) {
    alphabetData.forEach((item) => {
      const col = document.createElement('div');
      col.className = 'col-6 col-sm-4 col-md-3 col-lg-2';

      const card = document.createElement('div');
      card.className = 'flip-card card shadow-sm';
      card.style.cursor = 'pointer';

      card.innerHTML = `
        <div class="flip-card-inner">
          <div class="flip-card-front card-body d-flex justify-content-center align-items-center p-2">
            <img src="${item.frontImage}" alt="${item.letter}" class="letter-image img-fluid" />
          </div>
          <div class="flip-card-back card-body d-flex justify-content-center align-items-center p-2">
            <img src="${item.image}" alt="${item.word}" class="img-fluid" />
          </div>
        </div>
      `;

      card.addEventListener('click', () => handleCardClick(item, card));
      col.appendChild(card);
      cardContainer.appendChild(col);
    });
  }

  // Manejo del clic en carta para flip y mostrar preview
  function handleCardClick(item, cardElement) {
    const isFlipped = cardElement.classList.contains('flipped');

    if (isFlipped && currentCard?.element === cardElement) {
      resetCard();
    } else {
      if (currentCard?.element) {
        currentCard.element.classList.remove('flipped');
      }
      cardElement.classList.add('flipped');
      currentCard = { ...item, element: cardElement };
      mostrarVistaPrevia(item);
    }
  }

  // Mostrar offcanvas lateral con contenido dinámico y quiz
  function mostrarVistaPrevia(item) {
    previewContent.innerHTML = `
      <h2>¿Qué palabra representa esta imagen?</h2>
      <img src="${item.image}" alt="${item.word}" class="img-fluid mb-3" />
      <p>Pista: la palabra tiene <strong>${item.word.length}</strong> letras.</p>
      <input type="text" id="guessInput" class="form-control mb-2" placeholder="Escribe tu respuesta aquí" />
      <button id="checkButton" class="btn btn-primary w-100 mb-2">Verificar</button>
      <p id="feedback" class="mb-2"></p>
      <button id="play-audio-btn" class="btn btn-secondary w-100 mb-2" disabled style="opacity: 0.5;">🔊 Escuchar pronunciación</button>
      <button id="resetButton" class="btn btn-outline-secondary w-100">↩️ Volver a la letra</button>
    `;

    previewOffcanvas.show();

    document.getElementById('checkButton').addEventListener('click', () => checkGuess(item));
    document.getElementById('resetButton').addEventListener('click', resetCard);
    document.getElementById('play-audio-btn').addEventListener('click', () => reproducirAudio(item.word));
  }

  // Reproducir audio de la palabra con SpeechSynthesis
  function reproducirAudio(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    const voices = speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) utterance.voice = englishVoice;
    speechSynthesis.speak(utterance);
  }

  // Verificar respuesta del usuario y mostrar feedback
  function checkGuess(item) {
    const userGuess = document.getElementById('guessInput').value.trim().toLowerCase();
    const playAudioBtn = document.getElementById('play-audio-btn');
    const feedback = document.getElementById('feedback');

    if (userGuess === item.word.toLowerCase()) {
      feedback.innerHTML = `
        ${item.word} - ✅ ¡Correcto!<br />
        Ejemplo: ${highlightWord(item.example, item.word)}
      `;
      playAudioBtn.disabled = false;
      playAudioBtn.style.opacity = '1';
    } else {
      feedback.textContent = '❌ Intenta de nuevo.';
      playAudioBtn.disabled = true;
      playAudioBtn.style.opacity = '0.5';
    }
  }

  // Subrayar palabra en la frase ejemplo
  function highlightWord(sentence, word) {
    const regex = new RegExp(`\\b(${word})\\b`, 'i');
    return sentence.replace(regex, `<span style="text-decoration: underline; color: #0077cc;">$1</span>`);
  }

  // Reiniciar carta y cerrar offcanvas
  function resetCard() {
    if (currentCard?.element) {
      currentCard.element.classList.remove('flipped');
      currentCard = null;
      previewOffcanvas.hide();
    }
  }

  // Cargar cartas desde JSON al iniciar
  cargarDatosDesdeJSON();
});
