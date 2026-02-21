// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger menu
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Menu Category Filter
const categoryBtns = document.querySelectorAll('.category-btn');
const menuItems = document.querySelectorAll('.menu-item');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');

        menuItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.classList.remove('hidden');
                item.style.position = 'relative';
            } else {
                item.classList.add('hidden');
                item.style.position = 'absolute';
            }
        });
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .menu-item, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;

    // Here you would typically send the data to a server
    // For demo purposes, we'll show a toast notification
    showToast(`Thank you ${name}! We'll get back to you at ${email}`);

    // Reset form
    contactForm.reset();
});

// Loading screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1500);
});

// Hero parallax effect on mouse move
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

hero.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

hero.addEventListener('mouseleave', () => {
    heroContent.style.transform = 'translate(0, 0)';
});

// Stats counter animation
const stats = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                let count = 0;
                const increment = target / 50;
                const suffix = stat.textContent.includes('K') ? 'K+' : '+';

                const updateCount = () => {
                    if (count < target) {
                        count += increment;
                        if (target >= 1000) {
                            stat.textContent = Math.floor(count / 1000) + 'K' + suffix;
                        } else {
                            stat.textContent = Math.floor(count) + suffix;
                        }
                        requestAnimationFrame(updateCount);
                    } else {
                        if (target >= 1000) {
                            stat.textContent = (target / 1000) + 'K' + suffix;
                        } else {
                            stat.textContent = target + suffix;
                        }
                    }
                };

                updateCount();
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add year to footer
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = footerYear.textContent.replace('2025', currentYear);
}

// Shopping Cart Functionality
let cart = [];

// Create cart icon
const cartIcon = document.createElement('div');
cartIcon.className = 'cart-icon';
cartIcon.innerHTML = `
    <span class="cart-icon-text">🛒</span>
    <span class="cart-count">0</span>
    <span class="cart-total">$0.00</span>
`;
document.body.appendChild(cartIcon);

// Create cart modal
const cartModal = document.createElement('div');
cartModal.className = 'cart-modal';
cartModal.innerHTML = `
    <div class="cart-modal-content">
        <div class="cart-modal-header">
            <h2>Your Order</h2>
            <button class="cart-close">&times;</button>
        </div>
        <div class="cart-items"></div>
        <div class="cart-modal-footer">
            <div class="cart-total-display">
                <span>Total:</span>
                <span class="cart-total-price">$0.00</span>
            </div>
            <button class="checkout-btn">Proceed to Checkout</button>
        </div>
    </div>
`;
document.body.appendChild(cartModal);

// Cart toggle
cartIcon.addEventListener('click', () => {
    cartModal.classList.add('active');
});

document.querySelector('.cart-close').addEventListener('click', () => {
    cartModal.classList.remove('active');
});

cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
    }
});

// Add to cart function
function addToCart(name, price, category) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, category, quantity: 1 });
    }

    updateCart();
    showToast(`${name} added to cart!`);
}

// Update cart display
function updateCart() {
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.querySelector('.cart-total');
    const cartTotalPrice = document.querySelector('.cart-total-price');
    const cartItems = document.querySelector('.cart-items');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartCount.textContent = totalItems;
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.category}</p>
                    <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${index})">&times;</button>
                </div>
            </div>
        `).join('');
    }
}

// Update quantity
window.updateQuantity = function(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCart();
};

// Remove from cart
window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCart();
};

// Add order buttons to menu items
document.querySelectorAll('.menu-item').forEach(item => {
    const orderBtn = document.createElement('button');
    orderBtn.className = 'order-btn';
    orderBtn.textContent = 'Add to Order';
    orderBtn.addEventListener('click', () => {
        const name = item.querySelector('h3').textContent;
        const priceText = item.querySelector('.price').textContent;
        const price = parseFloat(priceText.replace('$', ''));
        const category = item.getAttribute('data-category');
        addToCart(name, price, category);
    });
    item.querySelector('.menu-item-content').appendChild(orderBtn);
});

// Checkout button
document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    showToast(`Order placed! ${totalItems} item(s) - $${total.toFixed(2)}`);

    cart = [];
    updateCart();
    cartModal.classList.remove('active');
});

// Toast notification system
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Back to top button
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '↑';
backToTop.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
