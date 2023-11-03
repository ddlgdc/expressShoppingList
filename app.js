import express from 'express';
import { json } from 'body-parser';
import items from './fakeDb';

const app = express();

app.use(json());

app.get('/items', (req, res) => {
    res.json(items);
});

app.post('/items', (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    res.json({ added: newItem });
});

app.get('/items/:name', (req, res) => {
    const name = req.params.name;
    const item = items.find((i) => i.name === name);
    if(item){
        res.json(item);
    }
    else {
        res.status(404).json({ error: 'Item not found' });
    }
});

app.patch('/items/:name', (req, res) => {
    const name = req.params.name;
    const updatedItem = req.body;
    const itemIndex = items.findIndex((i) => i.name === name);
    if(itemIndex !== -1){
        items[itemIndex] = { ...items[itemIndex], ...updatedItem };
        res.json({ updated: items[itemIndex] });
    }
    else {
        res.status(404).json({ error: 'Item not found' });
    }
});

app.delete('/items/:name', (req, res) => {
    const name = req.params.name;
    const itemIndex = items.findIndex((i) => i.name === name);
    if(itemIndex !== -1){
        items.splice(itemIndex, 1);
        res.json({ message: 'Delete' });
    }
    else {
        res.status(404).json({ error: 'Item not found' });
    }
});

export default app;