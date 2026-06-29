let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addCart(nama, harga) {
  cart.push({
    nama: nama,

    harga: harga,
  });

  localStorage.setItem(
    "cart",

    JSON.stringify(cart),
  );

  alert("Produk masuk keranjang");
}

let cartBox = document.getElementById("cart");

let totalBox = document.getElementById("total");

let total = 0;

if (cartBox) {
  cart.forEach((item) => {
    cartBox.innerHTML += `


<div class="cart-item">


<h3>
${item.nama}
</h3>


<p>

Rp ${item.harga.toLocaleString()}

</p>


</div>


`;

    total += item.harga;
  });

  totalBox.innerHTML = "Total : Rp " + total.toLocaleString();
}

function checkoutWA() {
  let nomor = "6281234567890";

  let pesan = "Halo Luxor Furniture,%0ASaya ingin membeli:%0A%0A";

  cart.forEach((item) => {
    pesan += "- " + item.nama + " Rp " + item.harga.toLocaleString() + "%0A";
  });

  pesan += "%0ATotal : Rp " + total.toLocaleString();

  window.location.href = "https://wa.me/" + 6281234567890 + "?text=" + pesan;
}
