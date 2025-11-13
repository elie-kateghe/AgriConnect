// Sample data for products (in a real app, this would come from an API)
const products = [
    {
        id: 1,
        name: 'Tomates Bio',
        category: 'Légumes',
        price: 2.99,
        unit: 'kg',
        image: 'https://images.unsplash.com/photo-1592841200221-05e4f8d3b9c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        farmer: 'Ferme du Soleil',
        rating: 4.5
    },
    {
        id: 2,
        name: 'Pommes Golden',
        category: 'Fruits',
        price: 1.99,
        unit: 'kg',
        image: 'https://images.unsplash.com/photo-1568702846993-8b3b8383fcf2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        farmer: 'Verger de la Vallée',
        rating: 4.8
    },
    {
        id: 3,
        name: 'Lait Frais',
        category: 'Produits Laitiers',
        price: 1.20,
        unit: 'litre',
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        farmer: 'Ferme des 3 Vallées',
        rating: 4.7
    },
    {
        id: 4,
        name: 'Œufs Bio',
        category: 'Œufs',
        price: 3.50,
        unit: 'douzaine',
        image: 'https://images.unsplash.com/photo-1587486913049-53fc88980bea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        farmer: 'Ferme du Coq Doré',
        rating: 4.9
    }
];

// Sample data for farmers
const farmers = [
    {
        id: 1,
        name: 'Jean Dupont',
        location: 'Bordeaux, France',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        bio: 'Producteur bio depuis 15 ans, je mets tout mon savoir-faire au service de la qualité de mes produits.',
        rating: 4.8,
        products: ['Légumes', 'Fruits']
    },
    {
        id: 2,
        name: 'Marie Martin',
        location: 'Toulouse, France',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        bio: 'Éleveuse passionnée, je propose des produits laitiers de grande qualité issus de mon élevage en plein air.',
        rating: 4.9,
        products: ['Produits Laitiers', 'Œufs']
    },
    {
        id: 3,
        name: 'Pierre Dubois',
        location: 'Lyon, France',
        image: 'https://randomuser.me/api/portraits/men/68.jpg',
        bio: 'Cultivateur de céréales et producteur de farine bio. La qualité et le respect de la terre sont mes priorités.',
        rating: 4.7,
        products: ['Céréales', 'Farines']
    }
];

// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const productsContainer = document.getElementById('products-container');
const farmersContainer = document.getElementById('farmers-container');
const searchInput = document.querySelector('.search-bar input');
const categorySelect = document.querySelector('.search-bar select');
const searchButton = document.querySelector('.search-bar button');

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : 
        '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Display products
function displayProducts(productsToDisplay) {
    productsContainer.innerHTML = productsToDisplay.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-meta">
                    <div class="product-seller">
                        <i class="fas fa-user"></i> ${product.farmer}
                    </div>
                    <div class="product-rating">
                        ${generateStarRating(product.rating)}
                    </div>
                </div>
                <div class="product-meta">
                    <div class="product-price">${product.price}€ / ${product.unit}</div>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Ajouter
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Display farmers
function displayFarmers(farmersToDisplay) {
    farmersContainer.innerHTML = farmersToDisplay.map(farmer => `
        <div class="farmer-card">
            <div class="farmer-avatar">
                <img src="${farmer.image}" alt="${farmer.name}">
            </div>
            <div class="farmer-info">
                <h3 class="farmer-name">${farmer.name}</h3>
                <div class="farmer-location">
                    <i class="fas fa-map-marker-alt"></i> ${farmer.location}
                </div>
                <div class="farmer-rating">
                    ${generateStarRating(farmer.rating)}
                </div>
                <p class="farmer-bio">${farmer.bio}</p>
                <div class="farmer-products">
                    <strong>Produits :</strong> ${farmer.products.join(', ')}
                </div>
                <a href="#" class="btn btn-outline" style="margin-top: 15px;">
                    Voir les produits
                </a>
            </div>
        </div>
    `).join('');
}

// Generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}

// Filter products
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categorySelect.value.toLowerCase();
    
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                            product.category.toLowerCase().includes(searchTerm) ||
                            product.farmer.toLowerCase().includes(searchTerm);
        
        const matchesCategory = !category || product.category.toLowerCase() === category;
        
        return matchesSearch && matchesCategory;
    });
    
    displayProducts(filteredProducts.length > 0 ? filteredProducts : products);
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // In a real app, you would add the product to a shopping cart
        alert(`${product.name} a été ajouté à votre panier !`);
        
        // Here you would typically update the cart in localStorage or send to a backend
        // Example: updateCart(product);
    }
}

// Search functionality
searchButton.addEventListener('click', filterProducts);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        filterProducts();
    }
});
categorySelect.addEventListener('change', filterProducts);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Display initial products and farmers
    displayProducts(products);
    displayFarmers(farmers);
    
    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .product-card, .farmer-card, .news-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    document.querySelectorAll('.feature-card, .product-card, .farmer-card, .news-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Form validation for newsletter
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        if (emailInput.value && isValidEmail(emailInput.value)) {
            // In a real app, you would send this to your server
            alert('Merci de vous être abonné à notre newsletter !');
            emailInput.value = '';
        } else {
            alert('Veuillez entrer une adresse email valide.');
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Shopping cart functionality (simplified)
let cart = [];

function updateCart() {
    // In a real app, this would update the cart UI
    console.log('Cart updated:', cart);
    // localStorage.setItem('cart', JSON.stringify(cart));
}

// In a real app, you would load the cart from localStorage on page load
// const savedCart = localStorage.getItem('cart');
// if (savedCart) {
//     cart = JSON.parse(savedCart);
//     updateCart();
// }
