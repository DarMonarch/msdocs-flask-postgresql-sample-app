document.addEventListener("DOMContentLoaded", function() {
    const addressModal = document.getElementById("address-modal");
    const closeBtn = document.querySelector(".close");
    const saveAddressBtn = document.getElementById("save-address-btn");

    window.editAddress = function() {
        addressModal.style.display = "flex";
    };

    closeBtn.addEventListener("click", () => {
        addressModal.style.display = "none";
    });

    saveAddressBtn.addEventListener("click", () => {
        const addressInput = document.getElementById("address-input").value;
        if (addressInput) {
            alert(`Address saved: ${addressInput}`);
            addressModal.style.display = "none";
        } else {
            alert("Please enter an address.");
        }
    });

    window.addEventListener("click", (e) => {
        if (e.target === addressModal) {
            addressModal.style.display = "none";
        }
    });
});
