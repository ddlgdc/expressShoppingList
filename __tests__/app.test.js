import request from 'supertest';
import app from '../app';

describe('Shopping List API', () => {
    it('GET /items should return a list of shopping items', async() => {
        const response = await request(app).get('/items');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });
    
    it('POST /items should add an item to the shopping list', async () => {
        const newItem = { name: 'popsicle', price: 1.45 };
        const response = await request(app).post('/items').send(newItem);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ added: newItem });
      });
    
      it('GET /items/:name should return a single item', async () => {
        const response = await request(app).get('/items/popsicle');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ name: 'popsicle', price: 1.45 });
      });
    
      it('PATCH /items/:name should update a single item', async () => {
        const updatedItem = { name: 'new popsicle', price: 2.45 };
        const response = await request(app).patch('/items/popsicle').send(updatedItem);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ updated: updatedItem });
      });
    
      it('DELETE /items/:name should delete a specific item', async () => {
        const response = await request(app).delete('/items/popsicle');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Deleted' });
      });
});