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

  beforeEach(() => {
    render(<Blog blog={blog} />)
  })

  test("title and author are visible by default but likes and url is not", () => {
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
})
