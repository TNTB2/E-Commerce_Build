function openModal(title, image, price) {
    // Set the modal content
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalImage').src = image;
    document.getElementById('modalPrice').innerText = price;

    // Show the modal
    document.getElementById('productModal').style.display = 'block';
}

function closeModal() {
    // Hide the modal
    document.getElementById('productModal').style.display = 'none';
}

// Optional: Close the modal if the user clicks outside of the modal content
window.onclick = function (event) {
    if (event.target === document.getElementById('productModal')) {
        closeModal();
    }
}