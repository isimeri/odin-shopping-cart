import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Nav from '../components/Nav';
import { CartContext } from '../CartContext';
import { MemoryRouter } from 'react-router';

describe('Nav', () => {
  it('renders headline', () => {
    const nav = render(
      <MemoryRouter>
        <CartContext.Provider value={{cart: ["item1", "item2"]}}>
          <Nav />
        </CartContext.Provider>
      </MemoryRouter>);

    // screen.debug();

    // check if App components renders headline
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /gamebruh/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cart-link/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /gamebruh/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /cart-link/i })).toHaveAttribute("href", "/cart");
    expect(screen.getByTestId("added-success-msg")).toBeInTheDocument();
    expect(screen.getByTestId("added-success-msg")).toHaveClass("hidden");
    expect(screen.getByTestId("cart-count")).toBeInTheDocument();
    expect(screen.getByTestId("cart-count").textContent).toEqual("2");
  });
});