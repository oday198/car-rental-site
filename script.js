// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Rental calculator functions
function openCalculator(carName, price) {
    document.getElementById('carSelect').value = price;
    document.getElementById('daysInput').focus();
    const calculator = document.querySelector('.calc-container');
    const headerOffset = 500;
    const elementPosition = calculator.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

function calculateRental() {
    const carSelect = document.getElementById('carSelect');
    const daysInput = document.getElementById('daysInput');
    const resultDiv = document.getElementById('calcResult');
    const resultText = document.getElementById('resultText');
    const whatsappBtn=document.getElementById('whatsappBtn');

    const dailyRate = parseFloat(carSelect.value);
    const days = parseInt(daysInput.value);

    if (!dailyRate || !days || days < 1) {
        alert('Please select a car and enter valid number of days');
        return;
    }

    const carName = carSelect.options[carSelect.selectedIndex].text.split(' - ')[0];
    let totalCost = dailyRate * days;
    let discount = 0;

    if (days >= 30) {
        discount = totalCost * 0.1;
        totalCost = totalCost - discount;
    }

    let resultHTML = `
        <h4>${carName}</h4>
        <p>Daily Rate: $${dailyRate}</p>
        <p>Rental Period: ${days} days</p>
        <p>Subtotal: $${(dailyRate * days).toLocaleString()}</p>
    `;

    if (discount > 0) {
        resultHTML += `
            <p style="color: #4ecdc4;">Long-term Discount (10%): -$${discount.toLocaleString()}</p>
        `;
    }

    resultHTML += `
        <hr style="margin: 1rem 0; border: 1px solid rgba(255,255,255,0.3);">
        <p style="font-size: 1.5rem; font-weight: bold;">Total: $${totalCost.toLocaleString()}</p>
    `;

    resultText.innerHTML = resultHTML;
    resultDiv.classList.add('show');
     
     whatsappBtn.style.display = 'block';
      whatsappBtn.href = `https://wa.me/76870313?text=I%20want%20to%20rent%20${encodeURIComponent(carName)}%20for%20${days}%20days%20(Total:%20$${totalCost.toLocaleString()})`;
}

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out';
        }
    });
}, observerOptions);

document.querySelectorAll('.car-card').forEach(card => {
    observer.observe(card);
});

// Hero Slider Functionality
const heroSlides = document.querySelector('.hero-slides');
const slides = document.querySelectorAll('.hero-slide');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
let currentSlide = 0;
let slideInterval;
const slideCount = slides.length;

function goToSlide(index) {
    heroSlides.style.transform = `translateX(-${index * 100}%)`;
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    goToSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    goToSlide(currentSlide);
}

// Auto slide every 5 seconds
function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
}

// Initialize slider
goToSlide(0);
startAutoSlide();

// Arrow controls
leftArrow.addEventListener('click', () => {
    clearInterval(slideInterval);
    prevSlide();
    startAutoSlide();
});

rightArrow.addEventListener('click', () => {
    clearInterval(slideInterval);
    nextSlide();
    startAutoSlide();
});

// Pause on hover
const hero = document.querySelector('.hero');
hero.addEventListener('mouseenter', () => clearInterval(slideInterval));
hero.addEventListener('mouseleave', startAutoSlide);

// Article content data
const articles = {
    1: {
        title: "5 Most Instagrammable Places in Lebanon",
        content: `
            <img src="https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Jeita Grotto">
            <h2>1. Jeita Grotto</h2>
            <p>This magnificent limestone cave system is one of Lebanon's most famous natural wonders. The upper grotto features stunning stalactites and stalagmites, while the lower grotto can be explored by boat on an underground river.</p>
            
            <h2>2. Baalbek Roman Ruins</h2>
            <p>The colossal Roman temple complex features some of the best-preserved Roman architecture in the world. The Temple of Bacchus is particularly photogenic at golden hour.</p>
            
            <h2>3. Byblos Old Town</h2>
            <p>This ancient Phoenician port city offers charming cobblestone streets, a picturesque harbor, and the historic Crusader castle overlooking the Mediterranean.</p>
            
            <h2>4. Harissa Our Lady of Lebanon</h2>
            <p>The iconic white statue of the Virgin Mary offers panoramic views of Jounieh Bay. Take the téléphérique for stunning aerial shots.</p>
            
            <h2>5. Qadisha Valley</h2>
            <p>This UNESCO-listed valley features dramatic cliffs, ancient monasteries carved into rock faces, and beautiful hiking trails through cedar forests.</p>
            
            <p><strong>Pro Tip:</strong> Rent a comfortable SUV to easily access all these locations and capture the perfect shots at golden hour.</p>
        `
    },
    2: {
        title: "Off-the-Beaten-Path Locations in Lebanon",
        content: `
            <img src="https://images.unsplash.com/photo-1582655299221-2b6bff351df0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Hidden Lebanon">
            <h2>Discover Lebanon's Best Kept Secrets</h2>
            <p>Beyond the well-known tourist spots, Lebanon hides numerous breathtaking locations that most visitors never see. Here are our top recommendations:</p>
            
            <h2>1. Batroun's Hidden Beach</h2>
            <p>While Batroun is known for its beaches, few find the secret cove near the old Phoenician wall. Crystal clear waters and perfect swimming conditions.</p>
            
            <h2>2. Tannourine Cedar Reserve</h2>
            <p>Less crowded than the famous Cedars of God, this reserve offers beautiful hiking trails through ancient cedar forests with stunning valley views.</p>
            
            <h2>3. Douma's Traditional Houses</h2>
            <p>This mountain village features beautifully preserved 19th century Lebanese architecture and authentic local experiences away from tourist crowds.</p>
            
            <h2>4. Anjar's Umayyad Ruins</h2>
            <p>Often overshadowed by Baalbek, this 8th century Umayyad city features unique architecture blending Roman and Arabic styles.</p>
            
            <h2>5. Nahr Ibrahim Valley</h2>
            <p>Follow this scenic river valley to discover waterfalls, natural pools, and the legendary Cave of Adonis from Phoenician mythology.</p>
            
            <p><strong>Travel Tip:</strong> A 4x4 vehicle is recommended for some of these locations, especially during winter months.</p>
        `
    },
    3: {
        title: "Lebanese Culinary Road Trip",
        content: `
            <img src="https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Lebanese Food">
            <h2>The Ultimate Lebanese Food Journey</h2>
            <p>Lebanon is a food lover's paradise. This itinerary takes you to the best culinary spots across the country:</p>
            
            <h2>Day 1: Beirut Breakfast & Street Food</h2>
            <p>Start with manoushe at Barbar in Hamra, then explore the street food scene in Bourj Hammoud for authentic Armenian-Lebanese fusion.</p>
            
            <h2>Day 2: Mountain Vineyards</h2>
            <p>Head to the Bekaa Valley for wine tasting at Chateau Ksara, followed by lunch at a local vineyard restaurant.</p>
            
            <h2>Day 3: Coastal Seafood</h2>
            <p>Drive south to Tyre for the freshest seafood at Abu Joseph, right on the harbor.</p>
            
            <h2>Day 4: Traditional Mountain Cuisine</h2>
            <p>In the Chouf mountains, try authentic home-style cooking at Beit al-Qamar in Deir el-Qamar.</p>
            
            <h2>Day 5: Sweet Finale</h2>
            <p>End your trip with Lebanon's famous sweets - visit Hallab in Tripoli for the best knefeh.</p>
            
            <p><strong>Pro Tip:</strong> Rent a comfortable sedan for this food tour - you'll need the trunk space for all the delicious souvenirs!</p>
        `
    },
    4: {
        title: "Best Scenic Drives for Your Rental",
        content: `
            <img src="https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Scenic Drives">
            <h2>Lebanon's Most Beautiful Road Trips</h2>
            <p>With your AL-AnsariPremium rental, explore these breathtaking routes:</p>
            
            <h2>1. Beirut to Faraya</h2>
            <p>This mountain route offers stunning views as you climb from sea level to the ski slopes. Stop at Mzaar for panoramic views.</p>
            
            <h2>2. Coastal Highway North</h2>
            <p>Follow the Mediterranean coast past historic cities like Byblos and Batroun, with countless beach stops along the way.</p>
            
            <h2>3. Chouf Mountain Circuit</h2>
            <p>Wind through cedar forests and traditional villages, with stops at Beiteddine Palace and Deir el-Qamar.</p>
            
            <h2>4. Qadisha Valley Loop</h2>
            <p>A dramatic drive through one of Lebanon's most spectacular natural landscapes, with ancient monasteries along the way.</p>
            
            <h2>5. Southern Vineyard Route</h2>
            <p>Discover Lebanon's wine country with stops at boutique wineries and charming Bekaa Valley villages.</p>
            
            <p><strong>Driving Tip:</strong> Consider upgrading to one of our luxury SUVs for the most comfortable experience on mountain roads.</p>
        `
    },
    5: {
        title: "Essential Road Trip Tips",
        content: `
            <img src="https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Road Trip">
            <h2>Your Perfect Lebanese Road Trip</h2>
            <p>Follow these tips to make the most of your Lebanese adventure:</p>
            
            <h2>1. Choose the Right Vehicle</h2>
            <p>Consider your itinerary - compact cars for cities, SUVs for mountains, and luxury vehicles for coastal cruising.</p>
            
            <h2>2. Understand Lebanese Driving</h2>
            <p>Be prepared for assertive local driving styles. Defensive driving is recommended, especially in Beirut.</p>
            
            <h2>3. Plan Your Stops</h2>
            <p>Lebanon is small but mountainous. What looks close on a map might take longer than expected.</p>
            
            <h2>4. Local SIM Card</h2>
            <p>Get a local SIM for navigation - Google Maps works well for most locations in Lebanon.</p>
            
            <h2>5. Cash is King</h2>
            <p>While cards are accepted in cities, many rural areas prefer cash (Lebanese Pounds or USD).</p>
            
            <h2>6. Parking Tips</h2>
            <p>In cities, valet parking is common and affordable. Always remove valuables from sight.</p>
            
            <h2>7. Road Conditions</h2>
            <p>Main highways are excellent, but some mountain roads may be narrow or winding.</p>
            
            <p><strong>Bonus:</strong> Ask our team for personalized route recommendations when you pick up your rental!</p>
        `
    }
};

// Article modal functions
function openArticle(id) {
    const article = articles[id];
    const modal = document.getElementById('articleModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = `
        <div class="article-full">
            <h1>${article.title}</h1>
            ${article.content}
            <div style="margin-top: 2rem; text-align: center;">
                <a href="#cars" class="cta-button" onclick="closeModal()">Rent Your Car Now</a>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('articleModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside content
window.onclick = function(event) {
    const modal = document.getElementById('articleModal');
    if (event.target == modal) {
        closeModal();
    }
}