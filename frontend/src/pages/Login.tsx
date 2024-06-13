import { useState } from 'react'
import useLogin from '../hooks/useLogin'
import { Link } from 'react-router-dom'

export default function Login() {

  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  })

  const { loading, login } = useLogin()
  
  async function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await login(inputs)
  }

  return (
    <div className=" w-96 shadow px-8 py-4">
      <h1 className="text-3xl text-center my-2">Login</h1>
      <form onSubmit={handleSubmitForm} className="flex my-4 flex-col gap-4">
        <div>
          <label className="text-gray-700" htmlFor="username">
            Username
          </label>
          <input
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            value={inputs.username}
            className="border mt-1 border-gray-300 rounded-md py-2 px-3 w-full"
            type="text"
            id="username"
          />
        </div>
        <div>
          <label className="my-2 text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            value={inputs.password}
            className="border mt-1 border-gray-300 rounded-md py-2 px-3 w-full"
            type="password"
            id="password"
          />
        </div>

        <button
          disabled={loading}
          className="bg-indigo-600 text-white py-2 rounded"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <div>
          <Link to="/signup" className="text-blue-500">
            Don't have an account? Signup
          </Link>
        </div>
      </form>
    </div>
  );
}



