const bookingData = document.getElementById("bookingData");
const price = Number(bookingData.dataset.price);

flatpickr("#checkin", {
  minDate: "today",
  dateFormat: "Y-m-d",
  onChange(selectedDates) {
    checkoutPicker.set("minDate", selectedDates[0]);
    calculateDays();
  }
});

const checkoutPicker = flatpickr("#checkout", {
  minDate: "today",
  dateFormat: "Y-m-d",
  onChange() {
    calculateDays();
  }
});

function calculateDays() {
  const checkin = document.querySelector("#checkin").value;
  const checkout = document.querySelector("#checkout").value;

  if (checkin && checkout) {
    const start = new Date(checkin.split("/").reverse().join("-"));
    const end = new Date(checkout.split("/").reverse().join("-"));

    const days = Math.ceil(
      (end - start) / (1000 * 60 * 60 * 24)
    );

    if (days > 0) {
      document.getElementById("totalDays").innerText = `${days} Days`;
      document.getElementById("nightCount").innerText = days;

      const subtotal = price * days;
      const gst = Math.round(subtotal * 0.18);
      const total = subtotal + gst;

      document.getElementById("totalPrice").innerText =
        `₹${subtotal.toLocaleString("en-IN")}`;

      document.getElementById("gstAmount").innerText =
        `₹${gst.toLocaleString("en-IN")}`;

      document.getElementById("finalTotal").innerText =
        `₹${total.toLocaleString("en-IN")}`;
    }
  }
}

// const form = document.querySelector(".needs-validation");

// form.addEventListener("submit", function (e) {

//  const checkin = document.getElementById("checkin");
//  const checkout = document.getElementById("checkout");
//  const guests = document.querySelector('select[name="guests"]');

//  if (
//    checkin.value === "" ||
//    checkout.value === "" ||
//    guests.value === ""
//  ) {
//    e.preventDefault();

//    alert("Please select Check-in, Check-out and Guests");

//    return false;
//  }

// });