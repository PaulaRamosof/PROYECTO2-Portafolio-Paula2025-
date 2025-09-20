document.addEventListener('DOMContentLoaded', () => {
  const cardContainer = document.getElementById('cardContainer');
  const introModalEl = document.getElementById('introModal');
  const startButton = document.getElementById('startButton');
  const previewContent = document.getElementById('previewContent');
  const previewModalEl = document.getElementById('previewModal');
  const video = document.getElementById('introVideo');

  let currentCard = null;

  const introModal = new bootstrap.Modal(introModalEl, {
    backdrop: 'static',
    keyboard: false
  });

  const previewModal = new bootstrap.Modal(previewModalEl);

  // Mostrar el modal con accesibilidad activa
  setTimeout(() => {
    introModalEl.removeAttribute('inert');
    introModalEl.removeAttribute('aria-hidden');
    introModal.show();
  }, 100);

  // Cerrar el modal al hacer clic en "Comenzar"
  startButton.addEventListener('click', () => {
    introModal.hide();
    introModalEl.setAttribute('aria-hidden', 'true');
    introModalEl.setAttribute('inert', '');

    if (video) {
      video.play().catch(error => {
        console.warn('⚠️ No se pudo reproducir el video tras interacción:', error);
      });
    }
  });

  // Reproducir el video si el navegador lo permite
  if (video) {
    video.muted = true;
    video.play().catch(error => {
      console.warn('⚠️ No se pudo reproducir automáticamente el video de introducción:', error);
    });

    // Cerrar el modal cuando el video termine
    video.addEventListener('ended', () => {
      introModal.hide();
      introModalEl.setAttribute('aria-hidden', 'true');
      introModalEl.setAttribute('inert', '');
    });
  }

  previewModalEl.addEventListener('hidden.bs.modal', () => {
    resetCard();
  });

  async function cargarDatosDesdeJSON() {
    try {
      const response = await fetch('https://raw.githubusercontent.com/PaulaRamosof/PROYECTO2-Portafolio-Paula2025-/refs/heads/master/letters.JSON');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      generarCartas(data);
    } catch (error) {
      console.error('Error al cargar el JSON:', error);
      cardContainer.innerHTML = '<p class="text-danger">❌ No se pudo cargar el contenido. Asegúrate de que "letters.json" exista y sea accesible.</p>';
    }
  }

  function generarCartas(alphabetData) {
    alphabetData.forEach((item) => {
      const col = document.createElement('div');
      col.className = 'col-4 col-sm-3 col-md-2 col-lg-1';

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

  function handleCardClick(item, cardElement) {
    const isFlipped = cardElement.classList.contains('flipped');

    if (isFlipped && currentCard?.element === cardElement) {
      // Ya está volteada, no hacemos nada
    } else {
      if (currentCard?.element) {
        currentCard.element.classList.remove('flipped');
      }
      cardElement.classList.add('flipped');
      currentCard = { ...item, element: cardElement };
      mostrarVistaPrevia(item);
    }
  }

  function mostrarVistaPrevia(item) {
    previewContent.innerHTML = `
      <h2 class="mb-3">¿Qué palabra representa esta imagen?</h2>
      <img src="${item.image}" alt="${item.word}" class="img-fluid mb-3 rounded shadow" style="max-height: 300px;" />
      <p>Pista: la palabra tiene <strong>${item.word.length}</strong> letras.</p>
      <input type="text" id="guessInput" class="form-control mb-2" placeholder="Escribe tu respuesta aquí" />
      <button id="checkButton" class="btn btn-primary w-100 mb-2">Verificar</button>
      <p id="feedback" class="mb-2"></p>
      <button id="play-audio-btn" class="btn btn-secondary w-100 mb-2" disabled style="opacity: 0.5;">🔊 Escuchar pronunciación</button>
      <button id="resetButton" class="btn btn-outline-secondary w-100">↩️ Volver a la letra</button>
    `;

    previewModal.show();

    document.getElementById('checkButton').addEventListener('click', () => checkGuess(item));
    document.getElementById('resetButton').addEventListener('click', () => {
      previewModal.hide();
    });
    document.getElementById('play-audio-btn').addEventListener('click', () => reproducirAudio(item.word));
  }

  function reproducirAudio(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    const voices = speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en-US'));
    if (englishVoice) utterance.voice = englishVoice;
    speechSynthesis.speak(utterance);
  }

  function checkGuess(item) {
    const userGuess = document.getElementById('guessInput').value.trim().toLowerCase();
    const playAudioBtn = document.getElementById('play-audio-btn');
    const feedback = document.getElementById('feedback');

    if (userGuess === item.word.toLowerCase()) {
      feedback.innerHTML = `
        ${item.word} - ✅ ¡Correcto!<br />
        <span class="example-sentence">${highlightWord(item.example, item.word)}</span>
      `;
      playAudioBtn.disabled = false;
      playAudioBtn.style.opacity = '1';
    } else {
      feedback.textContent = '❌ Intenta de nuevo.';
      playAudioBtn.disabled = true;
      playAudioBtn.style.opacity = '0.5';
    }
  }

  function highlightWord(sentence, word) {
    const regex = new RegExp(`\\b(${word})\\b`, 'i');
    return sentence.replace(regex, `<span style="text-decoration: underline; color: #0077cc;">$1</span>`);
  }

  function resetCard() {
    if (currentCard?.element) {
      currentCard.element.classList.remove('flipped');
      currentCard = null;
    }
  }

  cargarDatosDesdeJSON();
});
