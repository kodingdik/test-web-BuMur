/* =========================
   DATA MENU
========================= */
const prices = {
  nasgor: 15000,
  miegor: 12000,
};

const names = {
  nasgor: "Nasi Goreng",
  miegor: "Mie Goreng",
};

const qty = {
  nasgor: 0,
  miegor: 0,
};

/* =========================
   UPDATE QTY
========================= */
function changeQty(item, value, btn = null) {
  console.log("Klik:", item, value); // DEBUG

  qty[item] = Math.max(0, qty[item] + value);

  const qtyEl = document.getElementById(item);
  if (qtyEl) qtyEl.innerText = qty[item];

  updateSummary();

  if (value > 0 && btn) {
    animateToCart(btn);
  }
}

/* =========================
   UPDATE SUMMARY
========================= */
function updateSummary() {
  let totalItem = 0;
  let totalPrice = 0;

  for (let item in qty) {
    totalItem += qty[item];
    totalPrice += qty[item] * prices[item];
  }

  document.getElementById("totalItem").innerText = totalItem;
  document.getElementById("totalPrice").innerText =
    "Rp" + totalPrice.toLocaleString("id-ID");

  const cartCount = document.getElementById("cartCount");
  if (totalItem > 0) {
    cartCount.style.display = "inline-block";
    cartCount.innerText = totalItem;
  } else {
    cartCount.style.display = "none";
  }
}

/* =========================
   ANIMASI KE KANTONG
========================= */
function animateToCart(button) {
  const card = button.closest(".menu-card");
  const img = card.querySelector(".menu-img");
  const cart = document.querySelector(".cart");

  if (!img || !cart) return;

  const imgClone = img.cloneNode(true);
  imgClone.classList.add("fly");

  const imgRect = img.getBoundingClientRect();
  const cartRect = cart.getBoundingClientRect();

  imgClone.style.left = imgRect.left + "px";
  imgClone.style.top = imgRect.top + "px";

  document.body.appendChild(imgClone);

  setTimeout(() => {
    imgClone.style.left = cartRect.left + "px";
    imgClone.style.top = cartRect.top + "px";
    imgClone.style.opacity = "0";
    imgClone.style.transform = "scale(0.3)";
  }, 10);

  setTimeout(() => {
    imgClone.remove();
    cart.classList.add("shake");
    setTimeout(() => cart.classList.remove("shake"), 300);
  }, 700);
}
/* =========================
   OPEN QRIS
========================= */
function openQRIS() {
  let totalPrice = 0;
  for (let item in qty) {
    totalPrice += qty[item] * prices[item];
  }

  if (totalPrice === 0) {
    alert("Silakan pilih menu terlebih dahulu");
    return;
  }

  document.getElementById("qrisTotal").innerText =
    "Total Pembayaran: Rp" + totalPrice.toLocaleString("id-ID");

  document.getElementById("qrisModal").style.display = "flex";
}

/* =========================
   CLOSE QRIS
========================= */
function closeQRIS() {
  document.getElementById("qrisModal").style.display = "none";
}

/* =========================
   SEND WHATSAPP
========================= */
function sendWhatsApp() {
  let message = "*Pesanan Baru*%0A%0A";

  let totalPrice = 0;

  for (let item in qty) {
    if (qty[item] > 0) {
      message += `- ${names[item]} x${qty[item]}%0A`;
      totalPrice += qty[item] * prices[item];
    }
  }

  const notes = document.getElementById("notes").value;
  if (notes.trim() !== "") {
    message += `%0ACatatan:%0A${notes}%0A`;
  }

  message += `%0ATotal: Rp${totalPrice.toLocaleString("id-ID")}%0A`;
  message += `%0ASaya sudah melakukan pembayaran via QRIS.%0A`;
  message += `Bukti pembayaran akan saya kirimkan.`;

  const phone = "628997031225"; // GANTI NOMOR WA BU MUR
  const url = `https://wa.me/${phone}?text=${message}`;

  window.open(url, "_blank");
}
