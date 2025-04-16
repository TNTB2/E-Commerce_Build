document.addEventListener("DOMContentLoaded", function () {
    const csvFilePath = "../products/products.csv"; 
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get('category') || "Home Decor"; 

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
                generateProductCards(rows, categoryFilter); // Only pass the category
            } else {
                console.error("CSV file is empty or incorrectly formatted.");
            }
        })
        .catch(error => console.error("Error loading CSV:", error));

    function generateProductCards(data, categoryFilter) {
        const gallery = document.querySelector(".gallery");
        if (!gallery) {
            console.error("Gallery element not found.");
            return;
        }
        gallery.innerHTML = ""; // Clear previous products

        // Create sections for each subcategory
        const subcategories = new Set(); // Track subcategories for the category

        // Loop through the data and collect subcategories
        data.forEach((row, index) => {
            if (index === 0) return; // Skip header row
            const category = row[3]?.trim(); // The category is in the 4th column (index 3)
            const subcategory = row[4]?.trim(); // The subcategory is in the 5th column (index 4)

            if (category === categoryFilter && subcategory) {
                subcategories.add(subcategory); // Add the subcategory to the set
            }
        });

        // Create sections for each subcategory
        subcategories.forEach(subcategory => {
            const section = document.createElement("section");
            section.classList.add("subcategory-section");

            // Add the subcategory title
            const sectionTitle = document.createElement("h2");
            sectionTitle.innerText = subcategory;
            section.appendChild(sectionTitle);

            // Create a container for the row of product cards
            const rowContainer = document.createElement("div");
            rowContainer.classList.add("subcategory-row");

            // Filter data by the current subcategory and create product cards
            const filteredData = data.filter((row, index) => {
                if (index === 0) return false; // Skip header row
                const category = row[3]?.trim();
                const productSubcategory = row[4]?.trim();
                return category === categoryFilter && productSubcategory === subcategory;
            });

            filteredData.forEach(row => {
                const [title, image, price, category, subcategory] = row.map(cell => cell.trim());

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
                    rowContainer.appendChild(productCard); // Append the product card to the rowContainer
                }
            });

            // Append the rowContainer to the section and then the section to the gallery
            section.appendChild(rowContainer);
            gallery.appendChild(section);
        });
    }
});
