import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"
import { expect } from "vitest"

describe("<Blog />", () => {
  let blog = {
    title: "Testing Blogs",
    author: "Blog Author",
    likes: 999,
    url: "https://blogs.com/tests",
    user: "user",
  }

  test("title and author are visible by default but likes and url is not", () => {
    render(<Blog blog={blog} />)

    expect(screen.getByText("Testing Blogs")).not.toHaveStyle("display: none")
    expect(screen.getByText("by Blog Author")).not.toHaveStyle("display: none")

    expect(screen.getByText("Likes: 999").closest("div")).toHaveStyle(
      "display: none"
    )
    expect(
      screen.getByText("Url: https://blogs.com/tests").closest("div")
    ).toHaveStyle("display: none")
  })

  test("likes and url are visible after 'View' button is clicked", async () => {
    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText("View")
    await user.click(button)

    expect(screen.getByText("Likes: 999").closest("div")).not.toHaveStyle(
      "display: none"
    )

    expect(
      screen.getByText("Url: https://blogs.com/tests").closest("div")
    ).not.toHaveStyle("display: none")
  })

  test("clicking 'Like' button twich likes the blog twice", async () => {
    const mockHandler = vi.fn()
    render(<Blog blog={blog} likeBlog={mockHandler}/>)
    const user = userEvent.setup()
    const button = screen.getByText("Like")

    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
