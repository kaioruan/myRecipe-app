import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Helpers/renderWithRouter';
// import mock from './Helpers/testData';

describe('Testa o Componente de DropDown.', () => {
  it('Testa se a página de nacionalidades é renderizada', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods/nationalities');

    const dropDown = screen.getByTestId('explore-by-nationality-dropdown');
    expect(dropDown).toBeInTheDocument();

    const options = await screen.findAllByTestId(/option/i);

    options.forEach((o) => expect(o).toBeInTheDocument());
    userEvent.click(options[0]);
  });
});
