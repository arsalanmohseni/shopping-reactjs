import express from "express";

const app = express();
const PORT = 5000;
const PRODUCTS = [
    { name: "Product 1", id: 1, price: 10.99 },
    { name: "Product 2", id: 2, price: 19.99 },
    { name: "Product 3", id: 3, price: 9.99 },
];

/**
 * Finds a product in the PRODUCTS array based on the provided search term.
 *
 * @param {string|number} searchTerm - The term to search for in the product name, id, or price.
 * @return {object|null} The product object if found, otherwise null.
 */
const findProduct = (searchTerm) => {
    return PRODUCTS.find((product) => {
        if (
            product.name === searchTerm ||
            product.id === parseInt(searchTerm) ||
            product.price === parseFloat(searchTerm)
        );
        {
            return product;
        }
    });
};

app.get("/products", (req, res) => {
    let searchTerm = req.query.Search;
    searchTerm = decodeURI(searchTerm);
    const foundProduct = findProduct(searchTerm);
    if (foundProduct) {
        res.json(foundProduct);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
