import { describe, it, expect, vi } from 'vitest';
import { screen, within } from '@testing-library/react';

import { renderCartPage } from './test-utils';
import userEvent from "@testing-library/user-event";


describe('cart', () => {
  const dummyGame = {
    id: 1,
    name: "Tomb Raider",
    slug: "tomb-raider",
    background_image: "whatever",
    price: 69,
    platforms: [{id: 1, name: "linux"}, {id: 2, name: "pc"}]
  }
  const dummyGame2 = {
    id: 2,
    name: "Tekken",
    slug: "tekken",
    background_image: "whatever",
    price: 6,
    platforms: [{id: 1, name: "linux"}, {id: 2, name: "windows"}]
  }
  it('renders a nav', () => {
    const { getByRole } = renderCartPage({
      cart: [dummyGame, dummyGame2]
    });

    expect(getByRole("navigation")).toBeInTheDocument();
  });

  it('renders a page heading', () => {
    const { getByText } = renderCartPage({
      cart: [dummyGame, dummyGame2]
    });

    expect(getByText("Your cart")).toBeInTheDocument();

  });

  it('renders a two item list', () => {
    const { container } = renderCartPage({
      cart: [dummyGame, dummyGame2]
    });

    const items = container.querySelectorAll(".cart-list-item");

    expect(items).toHaveLength(2)
  });

  it('renders a cart item containing a header that\'s also a link, another link, a price, the right amount of platform icons and a button', async () => {
    const removeFromCart = vi.fn();
    const { container } = renderCartPage({
      cart: [dummyGame, dummyGame2],
      removeFromCart
    });

    const item1 = container.querySelector(".cart-list-item:nth-child(1)");
    const links = within(item1).getAllByRole("link");
    const button = within(item1).getByRole("button")
    
    expect(within(item1).getByText(dummyGame.name)).toBeInTheDocument();
    expect(within(item1).getByText(dummyGame.name)).toHaveRole("heading");
    expect(within(item1).getAllByRole("link")).toHaveLength(2);
    expect(within(item1).getAllByRole("presentation")).toHaveLength(2);
    expect(links[0]).toBeInTheDocument();
    expect(links[0]).toHaveAttribute("href", `/store/${dummyGame.slug}`);
    expect(links[1]).toBeInTheDocument();
    expect(links[1]).toHaveAttribute("href", `/store/${dummyGame.slug}`);
    expect(within(item1).getByText(`${dummyGame.price}€`)).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Remove");

    await userEvent.click(button);
    expect(removeFromCart).toHaveBeenCalledWith(dummyGame.id);
  });

  it('renders button that clears the cart', async () => {
    const clearCart = vi.fn();
    const { container } = renderCartPage({
      cart: [dummyGame, dummyGame2],
      clearCart
    });

    const button = screen.getByText("Remove all items");

    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(clearCart).toHaveBeenCalled();
  });

  it('renders estimated total', async () => {
    const { container } = renderCartPage({
      cart: [dummyGame, dummyGame2],
    });

    const estimatedTotal = dummyGame.price + dummyGame2.price
    const p = screen.getByText(`Estimated total:`);
    const span = screen.getByText(`${estimatedTotal}€`)

    expect(span).toBeInTheDocument();
    expect(p).toBeInTheDocument();
  });

  it('renders a "continue to payment" button', async () => {
    const { container } = renderCartPage({
      cart: [dummyGame, dummyGame2]
    });

    const button = screen.getByText("Continue to payment");

    expect(button).toBeInTheDocument();
  });
  it('renders a message if the cart is empty', async () => {
    const { container } = renderCartPage({
      cart: []
    });

    const msg = screen.getByText("Hmm...you got an empty cart...");

    expect(msg).toBeInTheDocument();
  });
});
