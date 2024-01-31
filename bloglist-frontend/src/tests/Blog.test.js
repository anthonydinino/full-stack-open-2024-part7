import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "../components/Blog";
import userEvent from "@testing-library/user-event";

describe("<Blog/>", () => {
  test("renders and shows title and author but not URL or likes", () => {
    const blog = {
      user: { name: "Test User" },
      title: "Component testing",
      author: "Anthony",
      likes: 2,
      url: "https://test.com/blogs/1",
    };
    const container = render(<Blog blog={blog} />).container;
    expect(container).toHaveTextContent("Component testing Anthony");
    const title = screen.queryByText("2", { exact: false });
    const url = screen.queryByText("https://test.com/blogs/1", {
      exact: false,
    });
    expect(title).toBeNull();
    expect(url).toBeNull();
  });

  test("url and likes are shown when button is clicked", async () => {
    const blog = {
      user: { name: "Test User" },
      title: "Component testing",
      author: "Anthony",
      likes: 2,
      url: "https://test.com/blogs/1",
    };
    render(<Blog blog={blog} />);
    const user = userEvent.setup();
    const button = screen.queryByText("view");
    await user.click(button);
    const title = screen.queryByText("2", { exact: false });
    const url = screen.queryByText("https://test.com/blogs/1", {
      exact: false,
    });
    expect(title).not.toBeNull();
    expect(url).not.toBeNull();
  });

  test("when like button is clicked, prop function is recevied twice", async () => {
    const blog = {
      user: { name: "Test User" },
      title: "Component testing",
      author: "Anthony",
      likes: 2,
      url: "https://test.com/blogs/1",
    };
    const mockHandler = jest.fn();
    render(<Blog blog={blog} addLike={mockHandler} />);
    const user = userEvent.setup();
    const button = screen.queryByText("view");
    await user.click(button);
    const likeBtn = screen.queryByText("like");
    await user.click(likeBtn);
    await user.click(likeBtn);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
