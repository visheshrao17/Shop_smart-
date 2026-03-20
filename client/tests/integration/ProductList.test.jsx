import { render, screen, waitFor } from '@testing-library/react';
import { ShopProvider } from '../../src/context/ShopContext';
import ProductList from '../../src/components/ProductList';
import { server } from '../mocks/server';
import { rest } from 'msw';

test('renders products from API', async () => {
  render(
    <ShopProvider>
      <ProductList />
    </ShopProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Mock Product 1')).toBeInTheDocument();
    expect(screen.getByText('Mock Product 2')).toBeInTheDocument();
  });
});

test('handles API error', async () => {
  server.use(
    rest.get('/api/products', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(
    <ShopProvider>
      <ProductList />
    </ShopProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Failed to load products')).toBeInTheDocument();
  });
});