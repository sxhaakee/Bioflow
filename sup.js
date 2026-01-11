// DOM Elements
const productsContainer = document.getElementById('products-container');
const recentOrdersBody = document.getElementById('recent-orders-body');
const addProductBtn = document.getElementById('add-product-btn');
const productModal = document.getElementById('product-modal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const productForm = document.getElementById('product-form');
const imageUpload = document.getElementById('product-images');
const imagePreview = document.getElementById('image-preview');

// Sample data (Replace with actual API calls in production)
let products = [];
let orders = [];

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadDashboardData();
    setupEventListeners();
    setupNavigation();
});

// Check if user is authenticated
function checkAuth() {
    // In a real app, check authentication token from localStorage or session
    // Temporarily disabled for demo purposes
    // const isAuthenticated = localStorage.getItem('authToken') !== null;
    // if (!isAuthenticated) {
    //     window.location.href = 'login.html';
    // }
    
    // Set a demo auth token for testing
    if (!localStorage.getItem('authToken')) {
        localStorage.setItem('authToken', 'demo-token-12345');
    }
}

// Load dashboard data
async function loadDashboardData() {
    try {
        // Simulate API calls
        await Promise.all([
            fetchProducts(),
            fetchRecentOrders()
        ]);
        
        renderProducts();
        renderRecentOrders();
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showNotification('Failed to load dashboard data', 'error');
    }
}

// Fetch products from API
async function fetchProducts() {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            // Sample data - replace with actual API call
            products = [
                {
                    id: 1,
                    name: 'Premium Fish Meal',
                    category: 'fish-meal',
                    price: 1200,
                    quantity: 150,
                    description: 'High-protein fish meal made from fresh fish waste',
                    images: ['product1.jpg']
                },
                {
                    id: 2,
                    name: 'Fish Oil',
                    category: 'fish-oil',
                    price: 1800,
                    quantity: 80,
                    description: 'Pure fish oil rich in omega-3 fatty acids',
                    images: ['product2_.jpg']
                },
                {
                    id: 3,
                    name: 'Organic Fertilizer',
                    category: 'fertilizer',
                    price: 800,
                    quantity: 200,
                    description: 'Nutrient-rich organic fertilizer from fish waste',
                    images: ['product3.jpeg']
                }
            ];
            resolve(products);
        }, 500);
    });
}

// Fetch recent industry requests
async function fetchRecentOrders() {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            // Sample data - replace with actual API call
            orders = [
                {
                    id: 'REQ-1001',
                    customer: 'Green Fertilizers Ltd',
                    product: 'Fish Heads & Bones',
                    amount: '₹15/kg',
                    quantity: '200 kg',
                    status: 'pending',
                    date: '2024-01-15'
                },
                {
                    id: 'REQ-1002',
                    customer: 'Animal Feed Corp',
                    product: 'Mixed Fish Waste',
                    amount: '₹12/kg',
                    quantity: '500 kg',
                    status: 'processing',
                    date: '2024-01-14'
                },
                {
                    id: 'REQ-1003',
                    customer: 'Cosmetics Industries',
                    product: 'Fish Scales',
                    amount: '₹20/kg',
                    quantity: '100 kg',
                    status: 'completed',
                    date: '2024-01-13'
                }
            ];
            resolve(orders);
        }, 500);
    });
}

// Render products in the UI
function renderProducts() {
    if (!productsContainer) return;
    
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.images[0] || 'placeholder-product.jpg'}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-category">${formatCategory(product.category)}</p>
                <p class="product-price">₹${product.price.toLocaleString()}</p>
                <p class="product-quantity">In Stock: ${product.quantity} kg</p>
                <div class="product-actions">
                    <button class="btn btn-secondary edit-product" data-id="${product.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger delete-product" data-id="${product.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });
    
    // Add event listeners to action buttons
    document.querySelectorAll('.edit-product').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('button').dataset.id);
            editProduct(productId);
        });
    });
    
    document.querySelectorAll('.delete-product').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('button').dataset.id);
            deleteProduct(productId);
        });
    });
}

// Render recent industry requests in the UI
function renderRecentOrders() {
    if (!recentOrdersBody) return;
    
    recentOrdersBody.innerHTML = '';
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${order.id}</strong></td>
            <td>${order.customer}</td>
            <td>${order.product}</td>
            <td>${order.quantity}</td>
            <td><strong>${order.amount}</strong></td>
            <td>
                <button class="btn btn-sm btn-primary view-order" data-id="${order.id}">
                    <i class="fas fa-handshake"></i> Accept
                </button>
            </td>
        `;
        recentOrdersBody.appendChild(row);
    });
    
    // Add event listeners to accept request buttons
    document.querySelectorAll('.view-order').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const orderId = e.target.closest('button').dataset.id;
            acceptRequest(orderId);
        });
    });
}

// Format category for display
function formatCategory(category) {
    const categories = {
        'fish-waste': 'Fish Waste',
        'fish-meal': 'Fish Meal',
        'fish-oil': 'Fish Oil',
        'fertilizer': 'Organic Fertilizer'
    };
    return categories[category] || category;
}

// Format status for display
function formatStatus(status) {
    return status.charAt(0).toUpperCase() + status.slice(1);
}

// Setup event listeners
function setupEventListeners() {
    // Add product button
    if (addProductBtn) {
        addProductBtn.addEventListener('click', openAddProductModal);
    }
    
    // Close modal buttons
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    // Click outside modal to close
    window.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeModal();
        }
    });
    
    // Product form submission
    if (productForm) {
        productForm.addEventListener('submit', handleProductSubmit);
    }
    
    // Image upload preview
    if (imageUpload) {
        imageUpload.addEventListener('change', handleImageUpload);
    }
}

// Open Add Product Modal
function openAddProductModal() {
    if (!productModal) return;
    productModal.style.display = 'flex';
    
    // Reset form
    if (productForm) productForm.reset();
    imagePreview.innerHTML = '';
    
    // Set modal title
    const modalTitle = productModal.querySelector('h3');
    if (modalTitle) modalTitle.textContent = 'Add New Product';
    
    // Show modal
    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeModal() {
    if (!productModal) return;
    
    productModal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset form
    if (productForm) {
        productForm.reset();
        productForm.dataset.editId = '';
    }
    
    // Clear image preview
    if (imagePreview) imagePreview.innerHTML = '';
}

// Handle image upload and preview
function handleImageUpload(e) {
    const files = e.target.files;
    
    if (!files || files.length === 0) return;
    
    imagePreview.innerHTML = '';
    
    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) return;
        
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'preview-image';
            imagePreview.appendChild(img);
        };
        
        reader.readAsDataURL(file);
    });
}
// Handle product form submission
async function handleProductSubmit(e) {
    e.preventDefault();
    
    try {
        // Get form data
        const productData = {
            id: Date.now(),
            name: document.getElementById('product-name').value,
            category: document.getElementById('product-category').value,
            price: parseFloat(document.getElementById('product-price').value),
            quantity: parseInt(document.getElementById('product-quantity').value),
            description: document.getElementById('product-description').value,
            location: document.getElementById('product-name').value,
            images: ['product1.jpg'],
            rating: 4.5,
            reviews: 0
        };
        
        // Add to products array
        products.push(productData);
        
        // Save to localStorage
        localStorage.setItem('supplierProducts', JSON.stringify(products));
        
        // Re-render products
        renderProducts();
        
        // Close modal
        if (productModal) productModal.style.display = 'none';
        
        // Show success notification
        showNotification('Waste listing added successfully! View it in "My Listings"', 'success');
        
        // Reset form
        if (productForm) productForm.reset();
        if (imagePreview) imagePreview.innerHTML = '';
        
    } catch (error) {
        console.error('Error saving product:', error);
        showNotification('Failed to save product', 'error');
    }
}

// Add a new product
async function addProduct(productData) {
    // In a real app, make an API call to save the product
    return new Promise((resolve) => {
        setTimeout(() => {
            const newProduct = {
                ...productData,
                id: Date.now(),
                images: productData.images.length ? productData.images : ['placeholder-product.jpg']
            };
            
            products.unshift(newProduct);
            resolve(newProduct);
        }, 500);
    });
}

// Update an existing product
async function updateProduct(productId, productData) {
    // In a real app, make an API call to update the product
    return new Promise((resolve) => {
        setTimeout(() => {
            const index = products.findIndex(p => p.id === parseInt(productId));
            
            if (index !== -1) {
                products[index] = {
                    ...products[index],
                    ...productData,
                    id: parseInt(productId)
                };
            }
            
            resolve(products[index]);
        }, 500);
    });
}

// Edit product
function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Set form values
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-quantity').value = product.quantity;
    document.getElementById('product-description').value = product.description || '';
    
    // Set edit mode
    productForm.dataset.editId = productId;
    
    // Set modal title
    const modalTitle = productModal.querySelector('h3');
    if (modalTitle) modalTitle.textContent = 'Edit Product';
    
    // Show modal
    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Delete product
async function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
        // In a real app, make an API call to delete the product
        await new Promise(resolve => {
            setTimeout(() => {
                products = products.filter(p => p.id !== productId);
                resolve();
            }, 500);
        });
        
        renderProducts();
        showNotification('Product deleted successfully', 'success');
    } catch (error) {
        console.error('Error deleting product:', error);
        showNotification('Failed to delete product', 'error');
    }
}

// Accept industry request
function acceptRequest(requestId) {
    const request = orders.find(o => o.id === requestId);
    if (!request) return;
    
    if (confirm(`Accept request from ${request.customer}?\n\nWaste Type: ${request.product}\nQuantity: ${request.quantity}\nPrice: ${request.amount}`)) {
        showNotification(`Request ${requestId} accepted! Industry will be notified.`, 'success');
        // In a real app, make API call to accept the request
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // In a real app, use a proper notification library
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto-remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add some basic notification styles
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
    
    .notification.fade-out {
        opacity: 0;
        transition: opacity 0.3s ease;
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
    
    .notification.warning {
        background-color: #ff9800;
    }
`;
document.head.appendChild(style);

// Show notification after adding to DOM
setTimeout(() => {
    const notification = document.querySelector('.notification');
    if (notification) notification.classList.add('show');
}, 100);

// Setup navigation between sections
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Get section to show
            const section = link.getAttribute('data-section');
            
            // Show appropriate content
            showSection(section);
        });
    });
    
    // Logout functionality
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('authToken');
                window.location.href = 'login.html';
            }
        });
    }
}

function showSection(section) {
    // Hide all sections first
    document.querySelectorAll('.content-area > div').forEach(div => {
        div.style.display = 'none';
    });
    
    // Show requested section
    switch(section) {
        case 'dashboard':
            document.querySelector('.stats-container').style.display = 'grid';
            document.querySelector('.recent-orders').style.display = 'block';
            break;
        case 'settings':
            showSettings();
            break;
        case 'earnings':
            showEarnings();
            break;
        case 'pickups':
            showPickups();
            break;
        case 'requests':
            showRequests();
            break;
        case 'listings':
            showListings();
            break;
    }
}

function showSettings() {
    const contentArea = document.querySelector('.content-area');
    contentArea.innerHTML = `
        <div class="settings-section">
            <h2 style="margin-bottom: 2rem;">Account Settings</h2>
            
            <div class="settings-card">
                <h3><i class="fas fa-user"></i> Profile Information</h3>
                <form id="profileForm" style="margin-top: 1.5rem;">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" value="Supplier Name" id="fullName">
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" value="supplier@bioflow.com" id="email">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Phone</label>
                            <input type="tel" value="+91 98765 43210" id="phone">
                        </div>
                        <div class="form-group">
                            <label>Business Name</label>
                            <input type="text" value="Mumbai Fish Market" id="businessName">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Address</label>
                        <textarea rows="3" id="address">123 Marine Drive, Mumbai, Maharashtra 400001</textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Save Changes</button>
                </form>
            </div>

            <div class="settings-card" style="margin-top: 2rem;">
                <h3><i class="fas fa-lock"></i> Change Password</h3>
                <form id="passwordForm" style="margin-top: 1.5rem;">
                    <div class="form-group">
                        <label>Current Password</label>
                        <input type="password" id="currentPassword">
                    </div>
                    <div class="form-group">
                        <label>New Password</label>
                        <input type="password" id="newPassword">
                    </div>
                    <div class="form-group">
                        <label>Confirm New Password</label>
                        <input type="password" id="confirmPassword">
                    </div>
                    <button type="submit" class="btn btn-primary">Update Password</button>
                </form>
            </div>

            <div class="settings-card" style="margin-top: 2rem;">
                <h3><i class="fas fa-bell"></i> Notification Preferences</h3>
                <div style="margin-top: 1.5rem;">
                    <label style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; cursor: pointer;">
                        <input type="checkbox" checked> Email notifications for new requests
                    </label>
                    <label style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; cursor: pointer;">
                        <input type="checkbox" checked> SMS alerts for accepted deals
                    </label>
                    <label style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; cursor: pointer;">
                        <input type="checkbox"> Weekly summary reports
                    </label>
                    <button class="btn btn-primary" style="margin-top: 1rem;">Save Preferences</button>
                </div>
            </div>
        </div>
    `;
    
    // Add form handlers
    document.getElementById('profileForm').addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Profile updated successfully!', 'success');
    });
    
    document.getElementById('passwordForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const newPass = document.getElementById('newPassword').value;
        const confirmPass = document.getElementById('confirmPassword').value;
        
        if (newPass !== confirmPass) {
            showNotification('Passwords do not match!', 'error');
            return;
        }
        
        showNotification('Password updated successfully!', 'success');
        e.target.reset();
    });
}

function showEarnings() {
    const contentArea = document.querySelector('.content-area');
    contentArea.innerHTML = `
        <div class="earnings-section">
            <h2 style="margin-bottom: 2rem;">Earnings Overview</h2>
            
            <div class="stats-container">
                <div class="stat-card">
                    <div class="stat-icon" style="background: #e8f5e9;">
                        <i class="fas fa-dollar-sign" style="color: #388e3c;"></i>
                    </div>
                    <div class="stat-info">
                        <h3>Total Earnings</h3>
                        <p class="stat-number">₹45,230</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon" style="background: #e3f2fd;">
                        <i class="fas fa-calendar-check" style="color: #1976d2;"></i>
                    </div>
                    <div class="stat-info">
                        <h3>This Month</h3>
                        <p class="stat-number">₹12,450</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon" style="background: #fff8e1;">
                        <i class="fas fa-clock" style="color: #ffa000;"></i>
                    </div>
                    <div class="stat-info">
                        <h3>Pending</h3>
                        <p class="stat-number">₹3,200</p>
                    </div>
                </div>
            </div>

            <div class="recent-orders" style="margin-top: 2rem;">
                <h3>Transaction History</h3>
                <div class="orders-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Industry</th>
                                <th>Waste Type</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2024-01-05</td>
                                <td>Green Fertilizers Ltd</td>
                                <td>Fish Heads</td>
                                <td>50 kg</td>
                                <td>₹750</td>
                                <td><span class="status-badge success">Paid</span></td>
                            </tr>
                            <tr>
                                <td>2024-01-03</td>
                                <td>Ocean Feed Co.</td>
                                <td>Mixed Waste</td>
                                <td>100 kg</td>
                                <td>₹1,200</td>
                                <td><span class="status-badge success">Paid</span></td>
                            </tr>
                            <tr>
                                <td>2024-01-02</td>
                                <td>Coastal Industries</td>
                                <td>Fish Scales</td>
                                <td>30 kg</td>
                                <td>₹600</td>
                                <td><span class="status-badge warning">Pending</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function showPickups() {
    const contentArea = document.querySelector('.content-area');
    
    // Load pickups from localStorage
    const pickups = JSON.parse(localStorage.getItem('supplierPickups')) || [];
    
    const pickupsHTML = pickups.length > 0 ? pickups.map(pickup => `
        <tr>
            <td>${pickup.id}</td>
            <td>${pickup.date} - ${pickup.time}</td>
            <td>${pickup.pickup}</td>
            <td>${pickup.wasteType}</td>
            <td>${pickup.quantity} kg</td>
            <td>${pickup.driver}</td>
            <td><span class="status-badge ${pickup.status}">${pickup.status}</span></td>
            <td><button class="btn-action" onclick="cancelPickup('${pickup.id}')">Cancel</button></td>
        </tr>
    `).join('') : '<tr><td colspan="8" style="text-align: center; padding: 2rem;">No pickups scheduled yet</td></tr>';
    
    contentArea.innerHTML = `
        <div class="pickups-section">
            <h2 style="margin-bottom: 2rem;">Scheduled Pickups</h2>
            
            <div class="recent-orders">
                <div class="orders-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Pickup ID</th>
                                <th>Date & Time</th>
                                <th>Location</th>
                                <th>Waste Type</th>
                                <th>Quantity</th>
                                <th>Driver</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${pickupsHTML}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <button class="btn btn-primary" style="margin-top: 2rem;" onclick="window.location.href='truck.html'">
                <i class="fas fa-plus"></i> Schedule New Pickup
            </button>
        </div>
    `;
}

function showRequests() {
    const contentArea = document.querySelector('.content-area');
    contentArea.innerHTML = `
        <div class="requests-section">
            <h2 style="margin-bottom: 2rem;">Industry Requests</h2>
            
            <div class="recent-orders">
                <div class="orders-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>Industry</th>
                                <th>Waste Type</th>
                                <th>Quantity</th>
                                <th>Price Offered</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="requests-body">
                            <!-- Will be populated -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    renderRecentOrders();
}

function showListings() {
    const contentArea = document.querySelector('.content-area');
    contentArea.innerHTML = `
        <div class="listings-section">
            <h2 style="margin-bottom: 2rem;">My Waste Listings</h2>
            <div id="products-container" class="products-grid"></div>
            <button class="btn btn-primary" style="margin-top: 2rem;" onclick="document.getElementById('add-product-btn').click()">
                <i class="fas fa-plus"></i> Add New Listing
            </button>
        </div>
    `;
    
    renderProducts();
}

function cancelPickup(pickupId) {
    if (confirm('Are you sure you want to cancel this pickup?')) {
        showNotification('Pickup cancelled successfully!', 'success');
    }
}
