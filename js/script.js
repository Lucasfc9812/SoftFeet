document.addEventListener('DOMContentLoaded', () => {

    // === STATE ===
    let currentQty = 1;
    let currentColor = 'verde'; // default

    // === DOM ELEMENTS ===
    const qtyDisplay = document.getElementById('qty-display');
    const btnPlus = document.getElementById('btn-plus');
    const btnMinus = document.getElementById('btn-minus');
    const colorBtns = document.querySelectorAll('.color-btn');
    const checkoutBtn = document.getElementById('btn-checkout');
    const colorNameDisplay = document.getElementById('color-name');

    // === COUNTDOWN TIMER ===
    let timeLeft = 15 * 60; // 15 minutos em segundos
    const countdownEl = document.getElementById('countdown');

    if (countdownEl) {
        setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            countdownEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

            if (timeLeft > 0) {
                timeLeft--;
            } else {
                timeLeft = 15 * 60; // Reset
            }
        }, 1000);
    }

    // === STOCK COUNTER (Simulated) ===
    const stockEl = document.getElementById('stock-count');
    if (stockEl) {
        let stock = 7;
        setInterval(() => {
            if (Math.random() > 0.7 && stock > 3) {
                stock--;
                stockEl.textContent = stock;
            }
        }, 30000); // A cada 30 segundos
    }

    // === COLOR SELECTION ===
    if (colorBtns.length > 0) {
        colorBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                colorBtns.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                currentColor = btn.getAttribute('data-color');

                // Update color name display
                const colorNames = {
                    'verde': 'Verde',
                    'rosa': 'Rosa'
                };
                if (colorNameDisplay) {
                    colorNameDisplay.textContent = colorNames[currentColor] || currentColor;
                }

                // Change product image
                const newImage = btn.getAttribute('data-image');
                const productImg = document.getElementById('product-img-main');
                if (newImage && productImg) {
                    productImg.src = newImage;
                }
            });
        });
    }

    // === QUANTITY SELECTION ===
    if (btnPlus) {
        btnPlus.addEventListener('click', () => {
            if (currentQty < 3) {
                currentQty++;
                qtyDisplay.textContent = currentQty;
            } else {
                alert('Máximo de 3 unidades por pedido!');
            }
        });
    }

    if (btnMinus) {
        btnMinus.addEventListener('click', () => {
            if (currentQty > 1) {
                currentQty--;
                qtyDisplay.textContent = currentQty;
            }
        });
    }

    // === CHECKOUT REDIRECT ===
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            let redirectUrl = '';

            if (currentColor === 'verde') {
                if (currentQty === 1) redirectUrl = 'https://googleverde1.com';
                else if (currentQty === 2) redirectUrl = 'https://googleverde2.com';
                else if (currentQty === 3) redirectUrl = 'https://googleverde3.com';
            } else if (currentColor === 'rosa') {
                if (currentQty === 1) redirectUrl = 'https://googlerosa1.com';
                else if (currentQty === 2) redirectUrl = 'https://googlerosa2.com';
                else if (currentQty === 3) redirectUrl = 'https://googlerosa3.com';
            }

            if (redirectUrl) {
                checkoutBtn.innerHTML = '<span class="btn-text">PROCESSANDO...</span>';
                checkoutBtn.style.opacity = '0.7';
                window.location.href = redirectUrl;
            }
        });
    }

    // === FAQ ACCORDION ===
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Open clicked if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // === SMOOTH SCROLL ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // === EXIT INTENT POPUP (Optional - commented out) ===
    /*
    let exitIntentShown = false;
    document.addEventListener('mouseout', (e) => {
        if (!exitIntentShown && e.clientY < 50) {
            exitIntentShown = true;
            alert('ESPERE! Não perca seu desconto de 50%!');
        }
    });
    */
});
