const express = require('express');
const items = require('./fakeDb');
const app = express();
app.use(express.json());

// GET /items
app.get('/items', (req, res) => {
    res.json(items);
});

// POST /items
app.post('/items', (req, res) => {
    const newItem = { name: req.body.name, price: req.body.price };
    items.push(newItem);
    res.status(201).json({ added: newItem });
});

// GET /items/:name
app.get('/items/:name', (req, res) => {
    const item = items.find(i => i.name === req.params.name);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
});

// PATCH /items/:name
app.patch('/items/:name', (req, res) => {
    const item = items.find(i => i.name === req.params.name);
    if (!item) return res.status(404).json({ message: "Item not found" });
    item.name = req.body.name || item.name;
    item.price = req.body.price || item.price;
    res.json({ updated: item });
});

// DELETE /items/:name
app.delete('/items/:name', (req, res) => {
    const itemIndex = items.findIndex(i => i.name === req.params.name);
    if (itemIndex === -1) return res.status(404).json({ message: "Item not found" });
    items.splice(itemIndex, 1);
    res.json({ message: "Deleted" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
