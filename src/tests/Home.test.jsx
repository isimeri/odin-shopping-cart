import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Home from '../components/Home';
import { CartContext } from '../CartContext';
import { MemoryRouter } from 'react-router';

describe('home', () => {
  it('renders a nav', () => {
    const home = render(
      <MemoryRouter>
        <CartContext.Provider value={{cart: ["item1", "item2"]}}>
          <Home />
        </CartContext.Provider>
      </MemoryRouter>);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it('renders a link that goes to store', () => {
    const home = render(
      <MemoryRouter>
        <CartContext.Provider value={{cart: ["item1", "item2"]}}>
          <Home />
        </CartContext.Provider>
      </MemoryRouter>);
    expect(screen.getByRole("link", { name: "Go to store" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Go to store" })).toHaveAttribute("href", "/store");
  });

  it('renders six links in total on the page', () => {
    const home = render(
      <MemoryRouter>
        <CartContext.Provider value={{cart: ["item1", "item2"]}}>
          <Home />
        </CartContext.Provider>
      </MemoryRouter>);
    
    expect(screen.getAllByRole("link")).toHaveLength(6);
  });

  it('renders a title', () => {
    const home = render(
      <MemoryRouter>
        <CartContext.Provider value={{cart: ["item1", "item2"]}}>
          <Home />
        </CartContext.Provider>
      </MemoryRouter>);
    expect(screen.getByTestId("title")).toBeInTheDocument();
  });

  it('renders a disclaimer', () => {
    const home = render(
      <MemoryRouter>
        <CartContext.Provider value={{cart: ["item1", "item2"]}}>
          <Home />
        </CartContext.Provider>
      </MemoryRouter>);
    expect(screen.getByTestId("disclaimer")).toBeInTheDocument();
  });

  it('renders a credit paragraph', () => {
    const home = render(
      <MemoryRouter>
        <CartContext.Provider value={{cart: ["item1", "item2"]}}>
          <Home />
        </CartContext.Provider>
      </MemoryRouter>);
    expect(screen.getByTestId("credit")).toBeInTheDocument();
  });

  it('renders a developer paragraph', () => {
    const home = render(
      <MemoryRouter>
        <CartContext.Provider value={{cart: ["item1", "item2"]}}>
          <Home />
        </CartContext.Provider>
      </MemoryRouter>);

    expect(screen.getByTestId("developer")).toBeInTheDocument();
  });

  it('renders a video wallpaper', () => {
    const home = render(
      <MemoryRouter>
        <CartContext.Provider value={{cart: ["item1", "item2"]}}>
          <Home />
        </CartContext.Provider>
      </MemoryRouter>);

    expect(screen.getByTestId("video-wallpaper")).toBeInTheDocument();
  });
});