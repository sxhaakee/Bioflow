// Sample product data - In production, fetch from API
const allProducts = [
    {
        id: 1,
        name: 'Premium Fish Meal',
        category: 'fish-meal',
        price: 1200,
        rating: 4.8,
        reviews: 124,
        description: 'High-protein fish meal made from fresh fish waste. Perfect for animal feed and aquaculture.',
        image: 'product1.jpg',
        badge: 'Popular',
        inStock: true
    },
    {
        id: 2,
        name: 'Pure Fish Oil',
        category: 'fish-oil',
        price: 1800,
        rating: 4.9,
        reviews: 98,
        description: 'Rich in omega-3 fatty acids. Ideal for supplements and animal nutrition.',
        image: 'product2_.jpg',
        badge: 'New',
        badgeType: 'new',
        inStock: true
    },
    {
        id: 3,
        name: 'Organic Fish Fertilizer',
        category: 'fertilizer',
        price: 800,
        rating: 4.7,
        reviews: 156,
        description: 'Nutrient-rich organic fertilizer from fish waste. Boosts plant growth naturally.',
        image: 'product3.jpeg',
        badge: 'Sale',
        badgeType: 'sale',
        inStock: true
    },
    {
        id: 4,
        name: 'Fish Bone Meal',
        category: 'fish-meal',
        price: 950,
        rating: 4.6,
        reviews: 87,
        description: 'Ground fish bones rich in calcium and phosphorus. Excellent for soil enrichment.',
        image: 'product1.jpg',
        inStock: true
    },
    {
        id: 5,
        name: 'Fish Hydrolysate',
        category: 'fertilizer',
        price: 1100,
        rating: 4.8,
        reviews: 112,
        description: 'Liquid fish fertilizer with beneficial microorganisms. Easy to apply and fast-acting.',
        image: 'product2_.jpg',
        badge: 'Popular',
        inStock: true
    },
    {
        id: 6,
        name: 'Fish Scales Extract',
        category: 'fish-waste',
        price: 650,
        rating: 4.5,
        reviews: 73,
        description: 'Collagen-rich fish scales extract. Used in cosmetics and supplements.',
        image: 'scales.jpg',
        inStock: true
    },
    {
        id: 7,
        name: 'Fish Protein Concentrate',
        category: 'fish-meal',
        price: 1500,
        rating: 4.9,
        reviews: 145,
        description: 'High-quality protein concentrate for animal feed and human consumption.',
        image: 'product1.jpg',
        badge: 'New',
        badgeType: 'new',
        inStock: true
    },
    {
        id: 8,
        name: 'Fish Emulsion Fertilizer',
        category: 'fertilizer',
        price: 720,
        rating: 4.6,
        reviews: 91,
        description: 'Concentrated liquid fertilizer. Provides immediate nutrients to plants.',
        image: 'product3.jpeg',
        inStock: true
    },
    {
        id: 9,
        name: 'Dried Fish Waste',
        category: 'fish-waste',
        price: 550,
        rating: 4.4,
        reviews: 68,
        description: 'Dried and processed fish waste. Versatile material for various applications.',
        image: 'product2_.jpg',
        inStock: true
    }
];

let filteredProducts = [...allProducts];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const productsContainer = document.getElementById('productsContainer');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const loadingIndicator = document.getElementById('loadingIndicator');
const noProducts = document.getElementById('noProducts');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', debounce(filterProducts, 300));
    categoryFilter.addEventListener('change', filterProducts);
    sortFilter.addEventListener('change', filterProducts);
}

// Load and display products
function loadProducts() {
    showLoading();
    
    // Simulate API call delay
    setTimeout(() => {
        hideLoading();
        renderProducts(filteredProducts);
    }, 500);
}

// Render products
function renderProducts(products) {
    productsContainer.innerHTML = '';
    
    if (products.length === 0) {
        noProducts.style.display = 'block';
        return;
    }
    
    noProducts.style.display = 'none';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
    
    // Add animation
    animateProducts();
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.opacity = '0';
    
    const badgeHTML = product.badge ? 
        `<div class="product-badge ${product.badgeType || ''}">${product.badge}</div>` : '';
    
    const stars = generateStars(product.rating);
    
    card.innerHTML = `
        <div class="product-image-container">
            <img src="${product.image}" alt="${product.name}" class="product-image" 
                 onerror="this.src='placeholder-product.jpg'">
            ${badgeHTML}
        </div>
        <div class="product-info">
            <div class="product-category">${formatCategory(product.category)}</div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-meta">
                <div class="product-price">₹${product.price.toLocaleString()}</div>
                <div class="product-rating">
                    ${stars}
                    <span>(${product.reviews})</span>
                </div>
            </div>
            <div class="product-actions">
                <button class="btn-add-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart
                </button>
                <button class="btn-wishlist" onclick="toggleWishlist(${product.id})">
                    <i class="far fa-heart"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Format category
function formatCategory(category) {
    const categories = {
        'fish-meal': 'Fish Meal',
        'fish-oil': 'Fish Oil',
        'fertilizer': 'Organic Fertilizer',
        'fish-waste': 'Fish Waste'
    };
    return categories[category] || category;
}

// Filter products
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const sortBy = sortFilter.value;
    
    // Filter by search and category
    filteredProducts = allProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || product.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    // Sort products
    sortProducts(sortBy);
    
    // Render filtered products
    renderProducts(filteredProducts);
}

// Sort products
function sortProducts(sortBy) {
    switch(sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Default order
            filteredProducts = [...allProducts].filter(p => 
                filteredProducts.some(fp => fp.id === p.id)
            );
    }
}

// Add to cart
function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    showNotification(`${product.name} added to cart!`, 'success');
}

// Toggle wishlist
function toggleWishlist(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const index = wishlist.findIndex(item => item.id === productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        showNotification(`${product.name} removed from wishlist`, 'info');
    } else {
        wishlist.push(product);
        showNotification(`${product.name} added to wishlist!`, 'success');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Animate products on load
function animateProducts() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'fadeInUp 0.5s ease-out forwards';
        }, index * 50);
    });
}

// Show loading
function showLoading() {
    loadingIndicator.style.display = 'block';
    productsContainer.style.display = 'none';
    noProducts.style.display = 'none';
}

// Hide loading
function hideLoading() {
    loadingIndicator.style.display = 'none';
    productsContainer.style.display = 'grid';
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 90px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 0.8rem;
        z-index: 1100;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        min-width: 250px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification i {
        font-size: 1.3rem;
    }
    
    .notification.success {
        border-left: 4px solid var(--success);
    }
    
    .notification.success i {
        color: var(--success);
    }
    
    .notification.info {
        border-left: 4px solid var(--info);
    }
    
    .notification.info i {
        color: var(--info);
    }
    
    .notification span {
        color: var(--gray-800);
        font-weight: 500;
    }
`;
document.head.appendChild(style);
