import { rest } from 'msw';

export const handlers = [
  rest.get('/api/products', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: 'Mock Product 1', price: 10 },
        { id: 2, name: 'Mock Product 2', price: 20 },
      ])
    );
  }),
];