// Sample consumer orders data
const consumerOrders = [
    {
        id: 'ORD-2001',
        product: 'Premium Fish Meal',
        date: '2024-01-15',
        amount: '₹1,200',
        status: 'delivered',
        tracking: 'TRK123456'
    },
    {
        id: 'ORD-2002',
        product: 'Organic Fertilizer',
        date: '2024-01-14',
        amount: '₹800',
        status: 'in-transit',
        tracking: 'TRK123457'
    },
    {
        id: 'ORD-2003',
        product: 'Fish Oil',
        date: '2024-01-12',
        amount: '₹1,800',
        status: 'processing',
        tracking: 'TRK123458'
    },
    {
        id: 'ORD-2004',
        product: 'Fish Bone Meal',
        date: '2024-01-10',
        amount: '₹950',
        status: 'delivered',
        tracking: 'TRK123459'
    }
];

// Sample recommended products
const recommendedProducts = [
    {
        id: 1,
        name: 'Fish Hydrolysate',
        price: 1100,
        image: 'product2_.jpg',
        rating: 4.8
    },
    {
        id: 2,
        name: 'Fish Protein Concentrate',
        price: 1500,
        image: 'product1.jpg',
        rating: 4.9
    },
    {
        id: 3,
        name: 'Fish Emulsion Fertilizer',
        price: 720,
        image: 'product3.jpeg',
        rating: 4.6
    },
    {
        id: 4,
        name: 'Dried Fish Waste',
        price: 550,
        image: 'product2_.jpg',
        rating: 4.4
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    renderConsumerOrders();
    renderRecommendedProducts();
});

// Check authentication
function checkAuth() {
    // Set demo auth token for testing
    if (!localStorage.getItem('authToken')) {
        localStorage.setItem('authToken', 'consumer-demo-token-12345');
    }
}

// Render consumer orders
function renderConsumerOrders() {
    const ordersBody = document.getElementById('consumer-orders-body');
    if (!ordersBody) return;
    
    ordersBody.innerHTML = '';
    
    consumerOrders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${order.id}</strong></td>
            <td>${order.product}</td>
            <td>${formatDate(order.date)}</td>
            <td><strong>${order.amount}</strong></td>
            <td><span class="status ${order.status}">${formatStatus(order.status)}</span></td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="trackOrder('${order.tracking}')">
                    <i class="fas fa-truck"></i> Track
                </button>
            </td>
        `;
        ordersBody.appendChild(row);
    });
}

// Render recommended products
function renderRecommendedProducts() {
    const container = document.getElementById('recommended-products');
    if (!container) return;
    
    container.innerHTML = '';
    
    recommendedProducts.forEach(product => {
        const card = document.createElement('div');
        card.style.cssText = `
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
            cursor: pointer;
        `;
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" 
                 style="width: 100%; height: 180px; object-fit: cover;"
                 onerror="this.src='placeholder-product.jpg'">
            <div style="padding: 1rem;">
                <h4 style="color: var(--primary-color); margin-bottom: 0.5rem; font-size: 1.1rem;">
                    ${product.name}
                </h4>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <span style="font-size: 1.3rem; font-weight: 700; color: var(--primary-color);">
                        ₹${product.price.toLocaleString()}
                    </span>
                    <span style="color: var(--warning);">
                        <i class="fas fa-star"></i> ${product.rating}
                    </span>
                </div>
                <button class="btn btn-primary" style="width: 100%; padding: 0.6rem;" 
                        onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
        
        container.appendChild(card);
    });
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Format status
function formatStatus(status) {
    const statusMap = {
        'delivered': 'Delivered',
        'in-transit': 'In Transit',
        'processing': 'Processing',
        'pending': 'Pending',
        'cancelled': 'Cancelled'
    };
    return statusMap[status] || status;
}

// Track order
function trackOrder(trackingId) {
    showNotification(`Tracking order: ${trackingId}`, 'info');
    // In a real app, show tracking details modal or navigate to tracking page
}

// Add to cart
function addToCart(productId) {
    const product = recommendedProducts.find(p => p.id === productId);
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
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

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
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
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 4px;
        color: white;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1100;
        transform: translateX(120%);
        transition: transform 0.3s ease;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        background-color: #4caf50;
    }
    
    .notification.error {
        background-color: #f44336;
    }
    
    .notification.info {
        background-color: #2196f3;
    }
    
    .status.delivered {
        background: #e8f5e9;
        color: #388e3c;
    }
    
    .status.in-transit {
        background: #e3f2fd;
        color: #1976d2;
    }
    
    .status.processing {
        background: #fff3e0;
        color: #f57c00;
    }
    
    .btn-sm {
        padding: 6px 12px;
        font-size: 0.85rem;
    }
`;
document.head.appendChild(style);
