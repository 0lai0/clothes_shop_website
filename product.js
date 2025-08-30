// Product page specific functionality

// Thumbnail image switching
document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
    thumb.addEventListener('click', function() {
        // Remove active class from all thumbnails
        document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        this.classList.add('active');
        
        // Update main image (in a real implementation, you would change the src)
        const mainImage = document.querySelector('.image-placeholder.main');
        const imageTexts = ['模特兒穿搭正面照', '模特兒穿搭側面照', '模特兒穿搭背面照', '布料質感細節特寫'];
        mainImage.textContent = imageTexts[index] || '商品圖片';
    });
});

// Size selection
document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all size buttons
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
    });
});

// Quantity selector
const qtyInput = document.querySelector('.qty-input');
const minusBtn = document.querySelector('.qty-btn.minus');
const plusBtn = document.querySelector('.qty-btn.plus');

minusBtn.addEventListener('click', function() {
    let currentValue = parseInt(qtyInput.value);
    if (currentValue > 1) {
        qtyInput.value = currentValue - 1;
    }
});

plusBtn.addEventListener('click', function() {
    let currentValue = parseInt(qtyInput.value);
    qtyInput.value = currentValue + 1;
});

// Prevent invalid input in quantity field
qtyInput.addEventListener('input', function() {
    let value = parseInt(this.value);
    if (isNaN(value) || value < 1) {
        this.value = 1;
    }
});

// Add to cart functionality
document.querySelector('.add-to-cart-btn').addEventListener('click', function() {
    const selectedSize = document.querySelector('.size-btn.active').textContent;
    const quantity = parseInt(qtyInput.value);
    const productName = document.querySelector('.product-title').textContent;
    const price = document.querySelector('.product-price-detail').textContent;
    
    // Add to cart (extend the existing cart functionality)
    const cartItem = {
        id: Date.now(), // Simple ID generation
        name: productName,
        size: selectedSize,
        quantity: quantity,
        price: price,
        image: '商品圖片' // In real implementation, this would be the actual image
    };
    
    // Get existing cart from localStorage or initialize empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => 
        item.name === cartItem.name && item.size === cartItem.size
    );
    
    if (existingItemIndex > -1) {
        // Update quantity if item exists
        cart[existingItemIndex].quantity += cartItem.quantity;
    } else {
        // Add new item to cart
        cart.push(cartItem);
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart icon
    updateCartIcon();
    
    // Show confirmation
    showAddToCartConfirmation(productName, selectedSize, quantity);
    
    // Animate button
    const btn = this;
    btn.style.transform = 'scale(0.95)';
    btn.textContent = '已加入購物車';
    btn.style.background = '#4CAF50';
    
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
        btn.textContent = '加入購物車';
        btn.style.background = '#333';
    }, 1500);
});

// Show add to cart confirmation
function showAddToCartConfirmation(productName, size, quantity) {
    // Create confirmation popup
    const popup = document.createElement('div');
    popup.className = 'cart-confirmation';
    popup.innerHTML = `
        <div class="confirmation-content">
            <h3>✓ 已加入購物車</h3>
            <p>${productName}</p>
            <p>尺寸: ${size} | 數量: ${quantity}</p>
            <button onclick="this.parentElement.parentElement.remove()">確定</button>
        </div>
    `;
    
    // Add styles
    popup.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const confirmationContent = popup.querySelector('.confirmation-content');
    confirmationContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 5px;
        text-align: center;
        max-width: 400px;
        margin: 20px;
        animation: slideIn 0.3s ease;
    `;
    
    const button = popup.querySelector('button');
    button.style.cssText = `
        background: #333;
        color: white;
        border: none;
        padding: 10px 20px;
        margin-top: 15px;
        cursor: pointer;
        border-radius: 2px;
    `;
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(popup);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (popup.parentElement) {
            popup.remove();
        }
    }, 3000);
}

// Update cart icon with item count
function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartIcon = document.querySelector('.cart-icon');
    
    if (totalItems > 0) {
        cartIcon.innerHTML = `🛍️ (${totalItems})`;
    } else {
        cartIcon.innerHTML = '🛍️';
    }
}

// Size guide popup
document.querySelector('.size-guide').addEventListener('click', function(e) {
    e.preventDefault();
    
    const sizeGuidePopup = document.createElement('div');
    sizeGuidePopup.innerHTML = `
        <div class="size-guide-content">
            <h3>尺寸指南</h3>
            <table>
                <tr><th>尺寸</th><th>胸圍 (cm)</th><th>肩寬 (cm)</th><th>衣長 (cm)</th></tr>
                <tr><td>XS</td><td>84</td><td>38</td><td>60</td></tr>
                <tr><td>S</td><td>88</td><td>40</td><td>62</td></tr>
                <tr><td>M</td><td>92</td><td>42</td><td>64</td></tr>
                <tr><td>L</td><td>96</td><td>44</td><td>66</td></tr>
                <tr><td>XL</td><td>100</td><td>46</td><td>68</td></tr>
            </table>
            <button onclick="this.parentElement.parentElement.remove()">關閉</button>
        </div>
    `;
    
    sizeGuidePopup.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const content = sizeGuidePopup.querySelector('.size-guide-content');
    content.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 5px;
        max-width: 500px;
        margin: 20px;
    `;
    
    const table = content.querySelector('table');
    table.style.cssText = `
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
    `;
    
    const cells = content.querySelectorAll('th, td');
    cells.forEach(cell => {
        cell.style.cssText = `
            border: 1px solid #ddd;
            padding: 10px;
            text-align: center;
        `;
    });
    
    const headers = content.querySelectorAll('th');
    headers.forEach(header => {
        header.style.background = '#f5f5f5';
        header.style.fontWeight = '500';
    });
    
    const closeBtn = content.querySelector('button');
    closeBtn.style.cssText = `
        background: #333;
        color: white;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        border-radius: 2px;
        display: block;
        margin: 0 auto;
    `;
    
    document.body.appendChild(sizeGuidePopup);
});

// Initialize cart icon on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartIcon();
});