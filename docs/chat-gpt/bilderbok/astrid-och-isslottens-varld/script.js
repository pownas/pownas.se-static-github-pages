// Sida-bläddring med touch-svep och klick på vänster/höger del av sidan
(function(){
  const pages = Array.from(document.querySelectorAll('.page'));
  const total = pages.length;
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const indicator = document.querySelector('.page-indicator');

  let flippedCount = 0;

  function getNextNotFlipped() {
    return pages.find(p => !p.classList.contains('flipped'));
  }
  function getLastFlipped() {
    const flippedPages = pages.filter(p => p.classList.contains('flipped'));
    if (flippedPages.length === 0) return null;
    return flippedPages.reduce((a,b) => Number(a.dataset.page) > Number(b.dataset.page) ? a : b);
  }

  function updateIndicator(){
    indicator.textContent = `Sida ${Math.min(flippedCount + 1, total)} / ${total}`;
  }

  function flipNext(){
    if (flippedCount >= total) return;
    const nextPage = getNextNotFlipped();
    if (!nextPage) return;
    nextPage.classList.add('flipped');
    setTimeout(()=> {
      nextPage.style.zIndex = 0;
    }, 10);
    flippedCount++;
    updateIndicator();
  }

  function flipPrev(){
    if (flippedCount <= 0) return;
    const lastFlipped = getLastFlipped();
    if (!lastFlipped) return;
    lastFlipped.classList.remove('flipped');
    lastFlipped.style.zIndex = 100 - (Number(lastFlipped.dataset.page) - 1);
    flippedCount--;
    updateIndicator();
  }

  // Klick och touch på klick-områden
  pages.forEach(page => {
    const leftArea = page.querySelector('.click-area.left');
    const rightArea = page.querySelector('.click-area.right');

    // Klick vänster: bläddra bakåt
    if (leftArea) {
      leftArea.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        flipPrev();
      });
    }
    
    // Klick höger: bläddra framåt
    if (rightArea) {
      rightArea.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        flipNext();
      });
    }

    // Touch vänster/höger
    if (leftArea) {
      leftArea.addEventListener('touchend', function(e){
        e.preventDefault();
        e.stopPropagation();
        flipPrev();
      }, {passive: false});
    }
    
    if (rightArea) {
      rightArea.addEventListener('touchend', function(e){
        e.preventDefault();
        e.stopPropagation();
        flipNext();
      }, {passive: false});
    }

    // Touch-svep på hela sidan
    let touchStartX = null;
    let touchStartY = null;
    let touchStartTime = null;
    page.addEventListener('touchstart', function(e) {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
      }
    }, {passive:true});
    page.addEventListener('touchend', function(e) {
      if (touchStartX === null || touchStartY === null) return;
      const touchEnd = e.changedTouches[0];
      const dx = touchEnd.clientX - touchStartX;
      const dy = touchEnd.clientY - touchStartY;
      const dt = Date.now() - touchStartTime;
      // Endast horisontella snabba svep (minst 50px, mindre än 40px vertikalt, max 700ms)
      if (Math.abs(dx) > 50 && Math.abs(dy) < 40 && dt < 700) {
        if (dx < 0) {
          // Svep vänster - nästa sida
          const nextPage = getNextNotFlipped();
          if (nextPage === page && !page.classList.contains('flipped')) flipNext();
        } else if (dx > 0) {
          // Svep höger - föregående sida
          const lastFlipped = getLastFlipped();
          if (lastFlipped === page && page.classList.contains('flipped')) flipPrev();
        }
      }
      touchStartX = null;
      touchStartY = null;
      touchStartTime = null;
    }, {passive:true});
  });

  prevBtn.addEventListener('click', flipPrev);
  nextBtn.addEventListener('click', flipNext);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') flipNext();
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') flipPrev();
  });

  updateIndicator();

  prevBtn.addEventListener('keyup', (e) => { if (e.key === ' '|| e.key === 'Enter') flipPrev(); });
  nextBtn.addEventListener('keyup', (e) => { if (e.key === ' '|| e.key === 'Enter') flipNext(); });

})();