import { describe, it, expect, vi } from 'vitest';
import { screen, within } from '@testing-library/react';

import { renderStorePage } from './test-utils';
import userEvent from "@testing-library/user-event";


describe('store', () => {
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
    platforms: [{id: 1, name: "linux"}, {id: 2, name: "pc"}]
  }
  it('renders a nav', () => {
    const { getByRole } = renderStorePage({
      cart: [dummyGame, dummyGame2],
      data: [dummyGame, dummyGame2],
    });

    expect(getByRole("navigation")).toBeInTheDocument();
  });

  it('renders two products', () => {
    const { container } = renderStorePage({
      addToCart: () => {},
      cart: [dummyGame, dummyGame2],
      data: [dummyGame, dummyGame2],
    });
    const productCards = document.querySelectorAll(".product-card");

    expect(productCards).toHaveLength(2);
  });

  it('renders ', async () => {
    const addToCart = vi.fn();
    const { container } = renderStorePage({
      cart: [dummyGame, dummyGame2],
      data: [dummyGame, dummyGame2],
      addToCart
    });
    const item1 = document.querySelector(".product-card:nth-child(1)");
    const links = within(item1).getAllByRole("link");
    const button = within(item1).getByRole("button")

    expect(within(item1).getByText(dummyGame.name)).toBeInTheDocument();
    expect(within(item1).getAllByRole("link")).toHaveLength(2);
    // expect(within(item1).getAllByRole("presentation")).toHaveLength(2);
    expect(links[0]).toBeInTheDocument();
    expect(links[0]).toHaveAttribute("href", `/store/${dummyGame.slug}`);
    expect(links[1]).toBeInTheDocument();
    expect(links[1]).toHaveAttribute("href", `/store/${dummyGame.slug}`);
    expect(within(item1).getByText(`${dummyGame.price}€`)).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Add to cart");

    await userEvent.click(button);
    expect(addToCart).toHaveBeenCalledWith(dummyGame);
  });
});