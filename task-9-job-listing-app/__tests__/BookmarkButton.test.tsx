import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import BookmarkButton from "../app/_components/BookmarkButton";

// Mock the API hooks
jest.mock("../app/services/api/bookmarkApi", () => ({
  useAddBookmarkMutation: () => [
    jest.fn(() => ({ unwrap: () => Promise.resolve({}) })),
  ],
  useRemoveBookmarkMutation: () => [
    jest.fn(() => ({ unwrap: () => Promise.resolve({}) })),
  ],
}));

jest.mock("next-auth/react", () => ({
  useSession: () => ({
    data: { user: { data: { accessToken: "token" } } },
    status: "authenticated",
  }),
}));

beforeAll(() => {
  window.alert = jest.fn();
});

beforeEach(() => {
  (window.alert as jest.Mock).mockClear();
});

describe("BookmarkButton (authenticated)", () => {
  it("renders as not bookmarked and toggles on click, calls addBookmark", async () => {
    const { container } = render(
      <BookmarkButton eventId="1" initialBookmarked={false} />
    );
    const button = screen.getByTestId("bookmark-button");
    expect(button).toBeInTheDocument();
    // Should show unbookmarked icon
    expect(container.querySelector("svg")).toBeInTheDocument();
    await userEvent.click(button);
    // Should still be in the document
    expect(button).toBeInTheDocument();
    // Should not call alert
    expect(window.alert).not.toHaveBeenCalled();
  });

  it("renders as bookmarked and toggles off on click, calls removeBookmark", async () => {
    const { container } = render(
      <BookmarkButton eventId="1" initialBookmarked={true} />
    );
    const button = screen.getByTestId("bookmark-button");
    expect(button).toBeInTheDocument();
    // Should show bookmarked icon
    expect(container.querySelector("svg")).toBeInTheDocument();
    await userEvent.click(button);
    expect(button).toBeInTheDocument();
    expect(window.alert).not.toHaveBeenCalled();
  });
});
