// 📚 Datos base: letras, imágenes y palabras clave
const alphabetData = [
  {
    letter: 'A',
    frontImage: 'img/Letra/Letras A-J/1.png',
    image: 'img/Imagen/Img A-J/A.jpg',
    word: 'airplane',
    example: 'The airplane flies high in the sky.'
  },
  {
    letter: 'B',
    frontImage: 'img/Letra/Letras A-J/2.png',
    image: 'img/Imagen/Img A-J/B.jpg',
    word: 'ball',
    example: 'She kicks the ball across the yard..'
  },
  {
    letter: 'C',
    frontImage: 'img/Letra/Letras A-J/3.png',
    image: 'img/Imagen/Img A-J/C.jpg',
    word: 'cake',
    example: 'We made a chocolate cake for my birthday.'
  },
  {
    letter: 'D',
    frontImage: 'img/Letra/Letras A-J/4.png',
    image: 'img/Imagen/Img A-J/D.jpg',
    word: 'drum',
    example: 'He plays the drum in the band.'
  },
  {
    letter: 'E',
    frontImage: 'img/Letra/Letras A-J/5.png',
    image: 'img/Imagen/Img A-J/E.jpg',
    word: 'elephant',
    example: 'The elephant has big ears.'
  },
  {
    letter: 'F',
    frontImage: 'img/Letra/Letras A-J/6.png',
    image: 'img/Imagen/Img A-J/F.jpg',
    word: 'fish',
    example: 'The fish swims in the aquarium.'
  },
  {
    letter: 'G',
    frontImage: 'img/Letra/Letras A-J/7.png',
    image: 'img/Imagen/Img A-J/G.jpg',
    word: 'Guitar',
    example: 'She plays the guitar beautifully.'
  },
  {
    letter: 'H',
    frontImage: 'img/Letra/Letras A-J/8.png',
    image: 'img/Imagen/Img A-J/H.jpg',
    word: 'horse',
    example: 'The horse runs fast on the farm.'

  },
  {
    letter: 'I',
    frontImage: 'img/Letra/Letras A-J/9.png',
    image: 'img/Imagen/Img A-J/I.jpg',
    word: 'ice',
    example: 'I put ice in my juice.'
  },
  {
    letter: 'J',
    frontImage: 'img/Letra/Letras A-J/10.png',
    image: 'img/Imagen/Img A-J/J.jpg',
    word: 'Jelly',
    example: 'Jelly is sweet and wobbly.'
  },
  {
    letter: 'K',
    frontImage: 'img/letra/B.png',
    image: 'img/imagen/B.png',
    word: 'ball',
    example: 'She kicks the ball across the yard..'
  },
  {
    letter: 'L',
    frontImage: 'img/letra/B.png',
    image: 'img/imagen/B.png',
    word: 'ball',
    example: 'She kicks the ball across the yard..'
  },
  {
    letter: 'M',
    frontImage: 'img/letra/M.png',
    image: 'img/imagen/M.png',
    word: 'monkey',
    example: 'The monkey swings from tree to tree.'
  },
  {
    letter: 'N',
    frontImage: 'img/letra/B.png',
    image: 'img/imagen/B.png',
    word: 'ball',
    example: 'She kicks the ball across the yard..'
  },
  {
    letter: 'O',
    frontImage: 'img/letra/B.png',
    image: 'img/imagen/B.png',
    word: 'ball',
    example: 'She kicks the ball across the yard..'
  },
  {
    letter: 'P',
    frontImage: 'img/letra/P.png',
    image: 'img/imagen/P.png',
    word: 'penguin',
    example: 'The penguin waddles on the ice.'
  },
  {
    letter: 'Q',
    frontImage: 'img/letra/B.png',
    image: 'img/imagen/B.png',
    word: 'ball',
    example: 'She kicks the ball across the yard..'
  },
  {
    letter: 'R',
    frontImage: 'img/letra/B.png',
    image: 'img/imagen/B.png',
    word: 'ball',
    example: 'She kicks the ball across the yard..'
  },
  {
    letter: 'S',
    frontImage: 'img/letra/B.png',
    image: 'img/imagen/B.png',
    word: 'ball',
    example: 'She kicks the ball across the yard..'
  },
  {
    letter: 'T',
    frontImage: 'img/letra/B.png',
    image: 'img/imagen/B.png',
    word: 'ball',
    example: 'She kicks the ball across the yard..'
  },
  {
    letter: 'U',
    frontImage: 'img/letra/B.png',
    image: 'img/imagen/B.png',
    word: 'ball',
    example: 'She kicks the ball across the yard..'
  },
  {
    letter: 'V',
    frontImage: 'img/letra/B.png',
    image: 'img/imagen/B.png',
    word: 'ball',
    example: 'She kicks the ball across the yard..'
  },
  {
    letter: 'W',
    frontImage: 'img/letra/B.png',
    image: 'img/imagen/B.png',
    word: 'ball',
    example: 'She kicks the ball across the yard..'
  },
  {
    letter: 'X',
    frontImage: 'img/letra/B.png',
    image: 'img/imagen/B.png',
    word: 'ball',
    example: 'She kicks the ball across the yard..'
  },
  {
    letter: 'Y',
    frontImage: 'img/letra/B.png',
    image: 'img/imagen/B.png',
    word: 'ball',
    example: 'She kicks the ball across the yard..'
  },
  {
    letter: 'Z',
    frontImage: 'img/letra/B.png',
    image: 'img/imagen/B.png',
    word: 'ball',
    example: 'She kicks the ball across the yard..'
  },
  
];

// 🔗 Referencias DOM
const cardContainer = document.getElementById('cardContainer');
const extraContent = document.getElementById('extraContent');

// 🧠 Estado actual
let currentCard = null;

// 🔤 Generar las cartas del alfabeto
alphabetData.forEach((item) => {
  const card = document.createElement('div');
  card.className = 'flip-card';
  card.innerHTML = `
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img src="${item.frontImage}" alt="${item.letter}" class="letter-image" />
      </div>
      <div class="flip-card-back">
        <img src="${item.image}" alt="${item.word}" />
      </div>
    </div>
  `;
  card.addEventListener('click', () => handleCardClick(item, card));
  cardContainer.appendChild(card);
});

// 🔄 Manejo del click en la carta
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
    showCardInRightColumn(item);
  }
}

// 👉 Mostrar imagen y pista en la columna derecha
function showCardInRightColumn(item) {
  extraContent.innerHTML = `
    <h2>¿Qué palabra representa esta imagen?</h2>
    <img src="${item.image}" alt="${item.word}" style="max-width: 100%; margin-bottom: 10px;" />
    <p>Pista: la palabra tiene <strong>${item.word.length}</strong> letras.</p>
    <input type="text" id="guessInput" placeholder="Escribe tu respuesta aquí" />
    <button id="checkButton">Verificar</button>
    <p id="feedback"></p>
    <button id="play-audio-btn" disabled style="opacity: 0.5;">🔊 Escuchar pronunciación</button>
    <button id="resetButton">↩️ Volver a la letra</button>
  `;

  document.getElementById('checkButton').addEventListener('click', checkGuess);
  document.getElementById('resetButton').addEventListener('click', resetCard);

  document.getElementById('play-audio-btn').addEventListener('click', () => {
    if (!currentCard || !currentCard.word) return;

    const utterance = new SpeechSynthesisUtterance(`${currentCard.word}`);
    utterance.lang = 'en-US';

    const voices = speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) utterance.voice = englishVoice;

    speechSynthesis.speak(utterance);
  });
}

// ✅ Verificar la respuesta del usuario
function checkGuess() {
  const userGuess = document.getElementById('guessInput').value.trim().toLowerCase();
  const playAudioBtn = document.getElementById('play-audio-btn');

  if (userGuess === currentCard.word.toLowerCase()) {
    document.getElementById('feedback').innerHTML = `
       ${currentCard.word}  - ✅ ¡Correcto!<br />
      Ejemplo: ${highlightWord(currentCard.example, currentCard.word)}
    `;
    playAudioBtn.disabled = false;
    playAudioBtn.style.opacity = '1'; // Visualmente activo
  } else {
    document.getElementById('feedback').textContent = '❌ Intenta de nuevo.';
    playAudioBtn.disabled = true;
    playAudioBtn.style.opacity = '0.5'; // Visualmente desactivado
  }
}

// ✏️ Subrayar la palabra en la frase
function highlightWord(sentence, word) {
  const regex = new RegExp(`\\b(${word})\\b`, 'i');
  return sentence.replace(regex, `<span style="text-decoration: underline; color: #0077cc;">$1</span>`);
}

// 🔁 Reiniciar la carta
function resetCard() {
  if (currentCard?.element) {
    currentCard.element.classList.remove('flipped');
    currentCard = null;
    extraContent.innerHTML = `
      <h2>¿Qué palabra representa esta imagen?</h2>
      <input type="text" id="guessInput" placeholder="Escribe tu respuesta aquí" />
      <button id="checkButton">Verificar</button>
      <p id="feedback"></p>
    `;
    document.getElementById('checkButton').addEventListener('click', checkGuess);
  }
}

window.addEventListener('load', () => {
  const startButton = document.getElementById('startButton');
  const modal = document.getElementById('introModal');
  const video = document.getElementById('introVideo');

  // Opción 1: ocultar al hacer clic
  startButton.addEventListener('click', () => {
    ocultarModalConAnimacion(modal);
  });

  // Opción 2: ocultar automáticamente al terminar el video
  video.addEventListener('ended', () => {
    ocultarModalConAnimacion(modal);
  });

  function ocultarModalConAnimacion(modal) {
    modal.classList.add('hidden'); // activa transición CSS
    setTimeout(() => {
      modal.style.display = 'none'; // lo oculta completamente
    }, 500); // tiempo igual al de la transición
  }
});