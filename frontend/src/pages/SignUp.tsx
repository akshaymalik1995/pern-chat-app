import { useState } from "react";
import useSignup from "../hooks/useSignup";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="p-8 py-4 rounded w-96 shadow">
      <h1 className="text-center my-2 text-3xl">Signup</h1>

      <form onSubmit={handleSubmitForm} className="flex flex-col gap-2">
        <div>
          {/* Full Name */}
          <label className=" text-gray-700" htmlFor="fullname">
            Full Name
          </label>
          <input
            value={inputs.fullname}
            onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
            className="border mt-1 border-gray-300 rounded-md py-2 px-3 w-full"
            type="text"
            id="fullname"
          />
        </div>
        <div>
          {/* Username */}
          <label className="my-2 text-gray-700" htmlFor="username">
            Username
          </label>
          <input
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            className="border mt-1 border-gray-300 rounded-md py-2 px-3 w-full"
            type="text"
            id="username"
          />
        </div>
        <div>
          {/* Password */}
          <label className="my-2 text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            className="border mt-1 border-gray-300 rounded-md py-2 px-3 w-full"
            type="password"
            id="password"
          />
        </div>
        <div>
          {/* Confirm Password */}
          <label className="my-2 text-gray-700" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            value={inputs.confirmPassword}
            onChange={(e) =>
              setInputs({ ...inputs, confirmPassword: e.target.value })
            }
            className="border mt-1 border-gray-300 rounded-md py-2 px-3 w-full"
            type="password"
            id="confirm-password"
          />
        </div>
        <div>
          {/* Gender */}
          <label className="my-2 text-gray-700">Gender</label>
          <div className="flex mt-1 gap-2">
            <div>
              <label className="flex items-center justify-center ">
                <input
                  checked={inputs.gender === "male"}
                  className=" text-indigo-600"
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={(e) =>
                    setInputs({ ...inputs, gender: e.target.value })
                  }
                />
                <span className="ml-2">Male</span>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  checked={inputs.gender === "female"}
                  className=" text-indigo-600"
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={(e) =>
                    setInputs({ ...inputs, gender: e.target.value })
                  }
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
          </div>
        </div>

        <button
          disabled={loading}
          className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full my-2"
          type="submit"
        >
          {/* Signup Button */}
          {loading ? "Loading..." : "Signup"}
        </button>

        <div>
          <Link to="/login" className="text-blue-500">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
}
