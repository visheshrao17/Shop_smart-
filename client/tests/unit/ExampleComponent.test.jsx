import { render, screen } from '@testing-library/react';
import ExampleComponent from '../../src/components/ExampleComponent';

test('renders ExampleComponent with props', () => {
  render(<ExampleComponent title="Test Title" />);
  expect(screen.getByText('Test Title')).toBeInTheDocument();
});