// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Product card hover effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Quick view functionality
document.querySelectorAll('.quick-view').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        // 這裡可以添加快速預覽的功能
        alert('快速預覽功能 - 可以在這裡添加產品詳細資訊的彈出視窗');
    });
});

// Shopping cart functionality (basic)
let cartItems = [];

document.querySelector('.cart-icon').addEventListener('click', function() {
    // 這裡可以添加購物車的功能
    alert(`購物車中有 ${cartItems.length} 件商品`);
});

// Add to cart functionality (can be extended)
function addToCart(productId, productName, price) {
    cartItems.push({
        id: productId,
        name: productName,
        price: price,
        quantity: 1
    });
    
    // Update cart icon with item count
    updateCartIcon();
}

function updateCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartItems.length > 0) {
        cartIcon.innerHTML = `🛍️ (${cartItems.length})`;
    } else {
        cartIcon.innerHTML = '🛍️';
    }
}

// Intersection Observer for animations
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
document.querySelectorAll('.product-card, .section-title, .story-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Search functionality (basic)
document.querySelector('.nav-icon').addEventListener('click', function() {
    const searchTerm = prompt('請輸入搜尋關鍵字：');
    if (searchTerm) {
        // 這裡可以添加搜尋功能
        alert(`搜尋：${searchTerm} - 搜尋功能可以在這裡實作`);
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // 初始化購物車圖示
    updateCartIcon();
    
    // 添加載入動畫
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});