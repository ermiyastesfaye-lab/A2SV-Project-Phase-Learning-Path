// __tests__/BookmarkButton.unauth.test.tsx
// This file tests the unauthenticated case for BookmarkButton in isolation to avoid React instance issues.

// Mocks must be set up before any imports
jest.mock("next-auth/react", () => ({
  useSession: () => ({ data: {}, status: "unauthenticated" }),
}));
jest.mock("../app/services/api/bookmarkApi", () => ({
  useAddBookmarkMutation: () => [
    jest.fn(() => ({ unwrap: () => Promise.resolve({}) })),
  ],
  useRemoveBookmarkMutation: () => [
    jest.fn(() => ({ unwrap: () => Promise.resolve({}) })),
  ],
}));

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
const BookmarkButton = require("../app/_components/BookmarkButton").default;

describe("BookmarkButton (unauthenticated, isolated)", () => {
  beforeAll(() => {
    window.alert = jest.fn();
  });
  beforeEach(() => {
    (window.alert as jest.Mock).mockClear();
  });

  it("shows alert if not authenticated", async () => {
    render(<BookmarkButton eventId="1" initialBookmarked={false} />);
    const button = screen.getByTestId("bookmark-button");
    await fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith(
      "You must be logged in to bookmark"
    );
  });
});
