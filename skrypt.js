document.addEventListener('DOMContentLoaded', function () {
  const envelope = document.querySelector('.envelope');
  const letter = document.querySelector('.letter');
  const closeBtn = document.querySelector('.close');

  if (!envelope) return;

  function setOpen(open){
    envelope.classList.toggle('open', open);
    envelope.setAttribute('aria-expanded', !!open);
    if (letter) letter.setAttribute('aria-hidden', !open);
    // focus management: focus close button when opened
    if (open && closeBtn) closeBtn.focus();
    if (!open) envelope.focus();
  }

  envelope.addEventListener('click', function (e){
    // toggle open state
    const isOpen = envelope.classList.contains('open');
    setOpen(!isOpen);
  });

  // keyboard: Enter or Space toggles
  envelope.addEventListener('keydown', function (e){
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar'){
      e.preventDefault();
      setOpen(!envelope.classList.contains('open'));
    }
    if (e.key === 'Escape' && envelope.classList.contains('open')) {
      setOpen(false);
    }
  });

  if (closeBtn){
    closeBtn.addEventListener('click', function (e){
      e.stopPropagation();
      setOpen(false);
    });
  }

  // close when click outside letter but inside envelope (optional)
  document.addEventListener('click', function (e){
    if (!envelope.classList.contains('open')) return;
    if (!envelope.contains(e.target)) setOpen(false);
  });
});

document.addEventListener('DOMContentLoaded', () => {
	// funkcja ustalająca max-width dla wszystkich sekcji na podstawie szerokości ekranu
	function adjustLayout() {
		const w = window.innerWidth || document.documentElement.clientWidth;
		const dpr = window.devicePixelRatio || 1;
		// domyślne wartości (możesz je zmienić)
		let maxWidth = '900px';

		// dostosowanie według szerokości urządzenia
		if (w <= 420) {
			// telefony małe
			maxWidth = '95vw';
		} else if (w <= 768) {
			// większe telefony / małe tablety
			maxWidth = '720px';
		} else if (w <= 1024) {
			// tablety / małe laptopy
			maxWidth = '900px';
		} else {
			// duże ekrany
			maxWidth = '1100px';
		}

		// opcjonalne korekty z uwzględnieniem devicePixelRatio (np. high-DPI zmniejszamy trochę)
		if (dpr >= 2 && w <= 768) {
			// na małych ekranach o wysokim DPR lepiej użyć nieco większego marginesu -> zostawiamy 94vw
			maxWidth = (maxWidth.endsWith('vw')) ? '94vw' : maxWidth;
		}

		document.querySelectorAll('section').forEach(sec => {
			sec.style.maxWidth = maxWidth;
		});
	}

	// uruchom przy starcie
	adjustLayout();

	// reaguj na zmianę rozmiaru i orientacji
	window.addEventListener('resize', () => {
		// debounce prosty
		clearTimeout(window.__adjustLayoutTimeout);
		window.__adjustLayoutTimeout = setTimeout(adjustLayout, 120);
	});
	window.addEventListener('orientationchange', () => {
		setTimeout(adjustLayout, 200);
	});
});