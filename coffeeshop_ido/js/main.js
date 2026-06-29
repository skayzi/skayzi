// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger to X (optional simple animation by toggling class)
        mobileMenu.classList.toggle('open');
        
        if (mobileMenu.classList.contains('open')) {
            const bars = mobileMenu.querySelectorAll('.bar');
            bars[0].style.transform = 'translateY(9px) rotate(45deg)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'translateY(-9px) rotate(-45deg)';
        } else {
            const bars = mobileMenu.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking a link
const navItems = document.querySelectorAll('.nav-link');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('open');
            const bars = mobileMenu.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
});

// Sticky Navbar shrink effect on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.padding = '0';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
});

// Modal & WhatsApp Order Logic
const modal = document.getElementById("orderModal");
const closeBtn = document.querySelector(".close-modal");
const orderForm = document.getElementById("orderForm");
const modalItemName = document.getElementById("modalItemName");
const modalTotal = document.getElementById("modalTotal");
const itemPriceInput = document.getElementById("itemPrice");
const orderQtyInput = document.getElementById("orderQty");

// Format Rupiah
const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(number);
};

// Open Modal
document.querySelectorAll(".btn-pesan").forEach(button => {
    button.addEventListener("click", (e) => {
        const item = button.getAttribute("data-item");
        const price = parseInt(button.getAttribute("data-price"));
        
        modalItemName.textContent = item;
        itemPriceInput.value = price;
        orderQtyInput.value = 1;
        modalTotal.textContent = formatRupiah(price);
        
        modal.classList.add("show");
    });
});

// Close Modal
if(closeBtn) {
    closeBtn.addEventListener("click", () => {
        modal.classList.remove("show");
    });
}
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("show");
    }
});

// Update Total
if(orderQtyInput) {
    orderQtyInput.addEventListener("input", (e) => {
        let qty = parseInt(e.target.value) || 1;
        if (qty < 1) {
            qty = 1;
            e.target.value = 1;
        }
        const price = parseInt(itemPriceInput.value);
        modalTotal.textContent = formatRupiah(price * qty);
    });
}

// Submit Form -> WhatsApp
if(orderForm) {
    orderForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("orderName").value;
        const item = modalItemName.textContent;
        const qty = document.getElementById("orderQty").value;
        const notes = document.getElementById("orderNotes").value;
        const total = parseInt(itemPriceInput.value) * qty;
        
        let message = `Halo Kopi Tetangga, saya mau pesan:\n\n`;
        message += `Nama: ${name}\n`;
        message += `Pesanan: ${qty}x ${item}\n`;
        if (notes) {
            message += `Catatan: ${notes}\n`;
        }
        message += `Total: ${formatRupiah(total)}\n\n`;
        message += `Apakah bisa diproses?`;
        
        const waNumber = "6281234567890";
        const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
        
        window.open(waUrl, "_blank");
        
        modal.classList.remove("show");
        orderForm.reset();
    });
}

