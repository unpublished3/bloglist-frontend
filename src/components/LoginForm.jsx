import { useState } from "react"
import Notification from "./Notification"

const LoginForm = ({ loginUser, notification }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    loginUser({ username, password })
    setUsername("")
    setPassword("")
  }

  return (
    <div>
      <h2>Login</h2>
      <Notification notification={notification} />
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
