// Sample deals data
const deals = [
    {
        id: 1,
        title: 'Premium Fish Meal Bundle',
        description: 'High-protein fish meal perfect for animal feed. Bulk discount available!',
        image: 'product1.jpg',
        originalPrice: 1500,
        dealPrice: 999,
        discount: 33,
        stock: 50,
        sold: 35,
        rating: 4.8,
        reviews: 124,
        badge: '33% OFF',
        endsIn: new Date().getTime() + (5 * 60 * 60 * 1000) // 5 hours from now
    },
    {
        id: 2,
        title: 'Organic Fish Fertilizer Pack',
        description: 'Nutrient-rich organic fertilizer. Special offer for bulk orders!',
        image: 'product3.jpeg',
        originalPrice: 1200,
        dealPrice: 799,
        discount: 33,
        stock: 100,
        sold: 78,
        rating: 4.9,
        reviews: 98,
        badge: 'HOT DEAL',
        endsIn: new Date().getTime() + (3 * 60 * 60 * 1000)
    },
    {
        id: 3,
        title: 'Fish Oil Concentrate',
        description: 'Pure fish oil rich in omega-3. Limited stock available!',
        image: 'product2_.jpg',
        originalPrice: 2000,
        dealPrice: 1499,
        discount: 25,
        stock: 30,
        sold: 22,
        rating: 4.7,
        reviews: 87,
        badge: '25% OFF',
        endsIn: new Date().getTime() + (8 * 60 * 60 * 1000)
    },
    {
        id: 4,
        title: 'Fish Bone Meal Special',
        description: 'Ground fish bones rich in calcium. Great for gardens!',
        image: 'product1.jpg',
        originalPrice: 950,
        dealPrice: 649,
        discount: 32,
        stock: 75,
        sold: 45,
        rating: 4.6,
        reviews: 112,
        badge: 'BEST SELLER',
        endsIn: new Date().getTime() + (6 * 60 * 60 * 1000)
    },
    {
        id: 5,
        title: 'Fish Hydrolysate Combo',
        description: 'Liquid fish fertilizer combo pack. Save big on this bundle!',
        image: 'product2_.jpg',
        originalPrice: 1400,
        dealPrice: 999,
        discount: 29,
        stock: 60,
        sold: 48,
        rating: 4.8,
        reviews: 145,
        badge: 'COMBO DEAL',
        endsIn: new Date().getTime() + (4 * 60 * 60 * 1000)
    },
    {
        id: 6,
        title: 'Fish Scales Extract Premium',
        description: 'Collagen-rich extract. Perfect for cosmetic applications!',
        image: 'scales.jpg',
        originalPrice: 850,
        dealPrice: 599,
        discount: 30,
        stock: 40,
        sold: 28,
        rating: 4.5,
        reviews: 73,
        badge: '30% OFF',
        endsIn: new Date().getTime() + (7 * 60 * 60 * 1000)
    }
];

const flashDeals = [
    {
        id: 101,
        title: 'Flash Sale: Fish Meal 10kg',
        description: 'Limited quantity! First come, first served.',
        image: 'product1.jpg',
        originalPrice: 800,
        dealPrice: 499,
        stock: 20,
        sold: 18
    },
    {
        id: 102,
        title: 'Flash Sale: Organic Fertilizer 5kg',
        description: 'Hurry! Only a few left in stock.',
        image: 'product3.jpeg',
        originalPrice: 600,
        dealPrice: 399,
        stock: 15,
        sold: 12
    }
];

// DOM Elements
const dealsGrid = document.getElementById('dealsGrid');
const flashDealsContainer = document.getElementById('flashDeals');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderDeals();
    renderFlashDeals();
    startCountdown();
    updateAllDealTimers();
    setInterval(updateAllDealTimers, 1000);
});

// Render main deals
function renderDeals() {
    dealsGrid.innerHTML = '';
    
    deals.forEach((deal, index) => {
        const card = createDealCard(deal);
        card.style.opacity = '0';
        dealsGrid.appendChild(card);
        
        // Animate cards
        setTimeout(() => {
            card.style.animation = 'fadeInUp 0.5s ease-out forwards';
        }, index * 100);
    });
}

// Create deal card
function createDealCard(deal) {
    const card = document.createElement('div');
    card.className = 'deal-card';
    
    const percentSold = Math.round((deal.sold / deal.stock) * 100);
    const timeLeft = calculateTimeLeft(deal.endsIn);
    
    card.innerHTML = `
        <div class="deal-badge">${deal.badge}</div>
        <div class="deal-image-container">
            <img src="${deal.image}" alt="${deal.title}" class="deal-image" 
                 onerror="this.src='placeholder-product.jpg'">
            <div class="deal-timer-overlay">
                <div class="deal-timer" data-end="${deal.endsIn}">
                    <i class="fas fa-clock"></i>
                    <span class="timer-text">Calculating...</span>
                </div>
            </div>
        </div>
        <div class="deal-info">
            <h3 class="deal-title">${deal.title}</h3>
            <p class="deal-description">${deal.description}</p>
            
            <div class="deal-pricing">
                <span class="deal-price-current">₹${deal.dealPrice.toLocaleString()}</span>
                <span class="deal-price-original">₹${deal.originalPrice.toLocaleString()}</span>
                <span class="deal-discount">${deal.discount}% OFF</span>
            </div>
            
            <div class="deal-stats">
                <div class="deal-stat">
                    <div class="deal-stat-number">${deal.rating}</div>
                    <div class="deal-stat-label">Rating</div>
                </div>
                <div class="deal-stat">
                    <div class="deal-stat-number">${deal.reviews}</div>
                    <div class="deal-stat-label">Reviews</div>
                </div>
                <div class="deal-stat">
                    <div class="deal-stat-number">${deal.stock - deal.sold}</div>
                    <div class="deal-stat-label">Left</div>
                </div>
            </div>
            
            <div class="deal-progress">
                <div class="deal-progress-label">
                    <span>Sold: ${deal.sold}/${deal.stock}</span>
                    <span>${percentSold}%</span>
                </div>
                <div class="deal-progress-bar">
                    <div class="deal-progress-fill" style="width: ${percentSold}%"></div>
                </div>
            </div>
            
            <div class="deal-actions">
                <button class="btn-deal btn-deal-primary" onclick="buyDeal(${deal.id})">
                    <i class="fas fa-shopping-cart"></i>
                    Buy Now
                </button>
                <button class="btn-deal btn-deal-secondary" onclick="viewDeal(${deal.id})">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Render flash deals
function renderFlashDeals() {
    flashDealsContainer.innerHTML = '';
    
    flashDeals.forEach(deal => {
        const percentSold = Math.round((deal.sold / deal.stock) * 100);
        const item = document.createElement('div');
        item.className = 'flash-deal-item';
        
        item.innerHTML = `
            <img src="${deal.image}" alt="${deal.title}" class="flash-deal-image" 
                 onerror="this.src='placeholder-product.jpg'">
            <div class="flash-deal-content">
                <h3 class="flash-deal-title">${deal.title}</h3>
                <p>${deal.description}</p>
                <div class="flash-deal-price">
                    ₹${deal.dealPrice} 
                    <span style="text-decoration: line-through; color: var(--gray-500); font-size: 1.2rem; margin-left: 0.5rem;">
                        ₹${deal.originalPrice}
                    </span>
                </div>
                <div class="deal-progress" style="max-width: 400px;">
                    <div class="deal-progress-label">
                        <span>Only ${deal.stock - deal.sold} left!</span>
                        <span>${percentSold}% sold</span>
                    </div>
                    <div class="deal-progress-bar">
                        <div class="deal-progress-fill" style="width: ${percentSold}%"></div>
                    </div>
                </div>
            </div>
            <button class="btn btn-primary" onclick="buyDeal(${deal.id})" 
                    style="padding: 1rem 2rem; white-space: nowrap;">
                <i class="fas fa-bolt"></i> Grab Deal
            </button>
        `;
        
        flashDealsContainer.appendChild(item);
    });
}

// Main countdown timer (24 hours)
function startCountdown() {
    const endTime = new Date();
    endTime.setHours(23, 59, 59, 999);
    
    function update() {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        if (distance < 0) {
            // Reset to next day
            endTime.setDate(endTime.getDate() + 1);
            return;
        }
        
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }
    
    update();
    setInterval(update, 1000);
}

// Update individual deal timers
function updateAllDealTimers() {
    const timers = document.querySelectorAll('.deal-timer');
    
    timers.forEach(timer => {
        const endTime = parseInt(timer.dataset.end);
        const timeLeft = calculateTimeLeft(endTime);
        const textEl = timer.querySelector('.timer-text');
        
        if (timeLeft.expired) {
            textEl.textContent = 'Deal Expired';
            textEl.style.color = '#f44336';
        } else {
            textEl.textContent = `${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`;
        }
    });
}

// Calculate time left
function calculateTimeLeft(endTime) {
    const now = new Date().getTime();
    const distance = endTime - now;
    
    if (distance < 0) {
        return { expired: true };
    }
    
    return {
        hours: Math.floor(distance / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        expired: false
    };
}

// Buy deal
function buyDeal(dealId) {
    const deal = [...deals, ...flashDeals].find(d => d.id === dealId);
    if (!deal) return;
    
    // Add to cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === dealId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...deal,
            quantity: 1,
            price: deal.dealPrice
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    showNotification(`${deal.title} added to cart!`, 'success');
}

// View deal details
function viewDeal(dealId) {
    const deal = deals.find(d => d.id === dealId);
    if (!deal) return;
    
    showNotification(`Viewing details for: ${deal.title}`, 'info');
    // In a real app, navigate to product detail page
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
