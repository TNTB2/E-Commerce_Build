document.addEventListener("DOMContentLoaded", function () {
    const csvFilePath = "../products/products.csv"; 

    fetch(csvFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(csvData => {
            const rows = csvData.trim().split("\n").map(row => row.split(","));
            if (rows.length > 1) {
                generateProductCards(rows); // Pass the entire data without category filter
            } else {
                console.error("CSV file is empty or incorrectly formatted.");
            }
        })
        .catch(error => console.error("Error loading CSV:", error));

    function generateProductCards(data) {
        const gallery = document.querySelector(".product-slider"); // Use product-slider for Slick slider
        if (!gallery) {
            console.error("Gallery element not found.");
            return;
        }
        gallery.innerHTML = ""; // Clear previous products

        // Filter data to include only new products
        const filteredData = data.filter((row, index) => {
            if (index === 0) return false; // Skip header row
            const isNew = row[5]?.trim().toLowerCase() === 'true'; // Check if the product is marked as new
            return isNew; // Only include products marked as new
        });

        filteredData.forEach(row => {
            const [title, image, price, category, subcategory, isNew] = row.map(cell => cell.trim());

            if (title && image && price) {
                const productCard = document.createElement("div");
                productCard.classList.add("card"); // Apply card class for styling
                productCard.innerHTML = `
                    <img src="${image}" alt="${title}" onerror="this.src='../media/default.jpg'">
                    <div class="card-content">
                        <h3 class="card-title">${title}</h3>
                        <p class="card-price">Price: $${price}</p>
                        <button class="btn" onclick="openModal('${title}', '${image}', '${price}')">View</button>
                    </div>
                `;
                gallery.appendChild(productCard); // Append the product card to the gallery (which is the slider in this case)
            }
        });

        // Reinitialize the Slick slider to include the newly added products
        if (gallery.classList.contains('slick-initialized')) {
            $(gallery).slick('unslick'); // Destroy the existing slider
        }

        $(gallery).slick({
            autoplay: true,
            autoplaySpeed: 3000,  // The time between each slide in milliseconds
            dots: true,           // Show navigation dots
            arrows: true,         // Enable navigation arrows
            infinite: true,       // Infinite scrolling of images
            speed: 500,           // Transition speed in milliseconds
            slidesToShow: 4,      // Show 4 products at a time
            slidesToScroll: 1,    // Scroll one product at a time
            adaptiveHeight: true, // Adjust the height dynamically based on the slide content
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3, // Show 3 products on medium screens
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2, // Show 2 products on small screens
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1, // Show 1 product on very small screens
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }
});
