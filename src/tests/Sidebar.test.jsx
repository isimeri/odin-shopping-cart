import { describe, it, expect, vi } from 'vitest';
import { screen, within, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from "@testing-library/user-event";
import { ProductsProvider } from '../ProductsContext';

import { renderSidebar } from './test-utils';
import Sidebar from '../components/Sidebar';


describe('sidebar', () => {
  it('renders a heading', () => {
    const { getByText } = renderSidebar();

    expect(getByText("Platform")).toBeInTheDocument();
    expect(getByText("Platform")).toHaveRole("heading");
  });

  it('renders a list with six buttons containing certain text', () => {
    const { container } = renderSidebar();
    const platformFilterList = container.querySelector(".platform-filter-list");

    expect(within(platformFilterList).getAllByRole("button")).toHaveLength(6);
    expect(within(platformFilterList).getByText("Windows")).toBeInTheDocument();
    expect(within(platformFilterList).getByText("Windows")).toHaveRole("button");
    expect(within(platformFilterList).getByText("Linux")).toBeInTheDocument();
    expect(within(platformFilterList).getByText("Linux")).toHaveRole("button");
    expect(within(platformFilterList).getByText("macOS")).toBeInTheDocument();
    expect(within(platformFilterList).getByText("macOS")).toHaveRole("button");
    expect(within(platformFilterList).getByText("PlayStation")).toBeInTheDocument();
    expect(within(platformFilterList).getByText("PlayStation")).toHaveRole("button");
    expect(within(platformFilterList).getByText("Xbox")).toBeInTheDocument();
    expect(within(platformFilterList).getByText("Xbox")).toHaveRole("button");
    expect(within(platformFilterList).getByText("Nintendo")).toBeInTheDocument();
    expect(within(platformFilterList).getByText("Nintendo")).toHaveRole("button");
  });

  it('does not render a "remove filters" button initially', async () => {
    render(
      <MemoryRouter>
        <ProductsProvider>
            <Sidebar activeFilter={null} setActiveFilter={() => {}} />
        </ProductsProvider>
      </MemoryRouter>
    );

    expect(screen.queryByText("Remove filters")).not.toBeInTheDocument();
  });

  it('renders a "remove filters" button if a filter is active', async () => {
    render(
      <MemoryRouter>
        <ProductsProvider>
            <Sidebar activeFilter={"linux"} setActiveFilter={() => {}} />
        </ProductsProvider>
      </MemoryRouter>
    );

    expect(screen.queryByText("Remove filters")).toBeInTheDocument();
  });
});