import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';


import { renderProductPage } from './test-utils';
import userEvent from "@testing-library/user-event";



describe('product', () => {
  const dummyGame = {
    name: "Tomb Raider",
    slug: "tomb-raider",
    released: "24-10-1996",
    price: 69,
    genres: [{id: 1, name: "shooter"}, {id: 2, name: "adventure"}, {id: 3, name: "Puzzle"}],
    platforms: [{id: 1, name: "linux"}, {id: 2, name: "windows"}],
    screenshots: [{id: 1, image_url: "url1"}, {id: 2, image_url: "url2"}]
  }
  it('renders a nav', () => {
    const { getByRole } = renderProductPage({
      products: [dummyGame],
      cart: ["item1", "item2"],
      error: "evry ting oke",
    });

    expect(getByRole("navigation")).toBeInTheDocument();
  });
  it('renders heading containing the right text', () => {
    
    const { getByRole } = renderProductPage({
      products: [dummyGame],
      cart: ["item1", "item2"],
      error: "evry ting oke",
    });

    expect(getByRole("heading")).toBeInTheDocument();
    expect(getByRole("heading").textContent).toEqual("Tomb Raider");
  });

  it("renders a description", () => {
    const { container } = renderProductPage({
      products: [dummyGame],
      cart: ["item1", "item2"],
      error: "evry ting oke",
    });

    const description = container.querySelector(".game-description");
    expect(description).toBeInTheDocument();
  });

  it('renders a title, released date, genres list and platforms list', () => {
    
    const { container } = renderProductPage({
      products: [dummyGame],
      cart: ["item1", "item2"],
      error: "evry ting oke",
    });

    const title = container.querySelector(".gamecard-title");
    const released = container.querySelector(".gamecard-released");
    const genres = container.querySelector(".gamecard-genres");
    const platforms = container.querySelector(".gamecard-platforms");


    expect(title).toBeInTheDocument();
    expect(released).toBeInTheDocument();
    expect(genres).toBeInTheDocument();
    expect(platforms).toBeInTheDocument();
  });

  it('renders a genres list and a platforms list of the right length', () => {
    
    const { container } = renderProductPage({
      products: [dummyGame],
      cart: ["item1", "item2"],
      error: "evry ting oke",
    });

    const genresArr = container.querySelectorAll(".gamecard-genre");
    const platformsArr = container.querySelectorAll(".gamecard-platform");

    expect(genresArr).toHaveLength(3);
    expect(platformsArr).toHaveLength(2);
  });

  it('renders the right price', () => {
    
    const { getByText } = renderProductPage({
      products: [dummyGame],
      cart: ["item1", "item2"],
      error: "evry ting oke",
    });

    expect(getByText(`${dummyGame.price}€`)).toBeInTheDocument();
  });
  it('renders an "Add to cart" button', () => {
    
    const { container } = renderProductPage({
      products: [dummyGame],
      cart: ["item1", "item2"],
      error: "evry ting oke",
    });

    const addToCartBtn = container.querySelector(".add-to-cart-btn");

    expect(addToCartBtn).toBeInTheDocument();
    expect(addToCartBtn.textContent).toEqual("Add to cart");
  });

  it('renders a link that goes to the store', () => {
    
    const { getByText } = renderProductPage({
      products: [dummyGame],
      cart: ["item1", "item2"],
      error: "evry ting oke",
    });

    expect(getByText("← Back to store")).toBeInTheDocument();
    expect(getByText("← Back to store")).toHaveAttribute("href", "/store");

  });

  it("calls addToCart when button is clicked", async () => {
    const addToCart = vi.fn();

    renderProductPage({
      products: [dummyGame],
      cart: [],
      addToCart,
    });

    const button = screen.getByRole("button", { name: /add to cart/i });
    await userEvent.click(button);

    expect(addToCart).toHaveBeenCalledWith(dummyGame);
  });
});