import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
// import { Footer } from '../components/Footer';

test('Farewell, front-end', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/TRYBE/i);
  expect(linkElement).toBeInTheDocument();
});

describe('Testa o componente Footer', () => {
  it('Testa se o componente é renderizado na tela', () => {
    render(<App />);
  });

  it('Testa se o componente contém três ícones', () => {
    render(<App />);
  });

  it(`Testa se os ícones levam às rotas:
   /drinks, /explore, /foods respectivamente`, () => {
    renderWithRouter(<App />); // criar arquivo
  });
});
