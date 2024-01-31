import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BlogForm from "../components/BlogForm";
import userEvent from "@testing-library/user-event";

describe("<BlogForm/>", () => {
  test("When new blog is created, details and event handler called is correct", async () => {
    const blog = {
      user: { name: "Test User" },
      title: "Component testing",
      author: "Anthony",
      url: "https://test.com/blogs/1",
    };
    const user = userEvent.setup();
    const mockHandler = jest.fn();
    const container = render(
      <BlogForm blog={blog} createBlog={mockHandler} />
    ).container;
    const createBtn = screen.queryByText("create new blog", {
      exact: false,
    });
    await user.click(createBtn);
    const input = {
      title: container.querySelector("#blog-title"),
      author: container.querySelector("#blog-author"),
      url: container.querySelector("#blog-url"),
      likes: container.querySelector("#blog-likes"),
    };
    await user.type(input.title, blog.title);
    await user.type(input.author, blog.author);
    await user.type(input.url, blog.url);
    const submitBtn = screen.getByText("create");
    await user.click(submitBtn);
    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0]).toEqual({
      title: blog.title,
      author: blog.author,
      url: blog.url,
    });
  });
});
