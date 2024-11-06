const files = {
    "fruits": "/Fruits",
    "vegetables": "/Veg",
    "baked": "/Baked"
};

function searchProducts() {
    const query = document.getElementById("search-input").value.toLowerCase();
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Clear previous results

    console.log("Search query:", query); // Check query value

    if (files[query]) {
        console.log("Exact match found:", files[query]); // Verify if exact match logic is working
        window.location.href = files[query];
        return;
    }

    // Display suggestions if no exact match
    for (const [product, url] of Object.entries(files)) {
        if (product.includes(query)) {
            const result = document.createElement("div");
            result.classList.add("result-item");

            const highlightedText = product.replace(
                new RegExp(query, "gi"),
                (match) => `<span class="highlight">${match}</span>`
            );

            result.innerHTML = `<a href="${url}" target="_self">${highlightedText}</a>`;
            resultsDiv.appendChild(result);
            console.log("Adding suggestion:", product); // Log each suggestion added
        }
    }
}
