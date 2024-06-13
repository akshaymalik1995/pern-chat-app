

export default function SignUp() {
  return (
    <div className="p-8 py-4 rounded w-96 shadow">
      <h1 className="text-center my-2 text-3xl">Signup</h1>

      <form className="flex flex-col gap-2">
        <div>
          <label className=" text-gray-700" htmlFor="fullname">
            Full Name
          </label>
          <input
            className="border mt-1 border-gray-300 rounded-md py-2 px-3 w-full"
            type="text"
            id="fullname"
          />
        </div>
        <div>
          <label className="my-2 text-gray-700" htmlFor="username">
            Username
          </label>
          <input
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
            className="border mt-1 border-gray-300 rounded-md py-2 px-3 w-full"
            type="password"
            id="password"
          />
        </div>
        <div>
          <label className="my-2 text-gray-700" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            className="border mt-1 border-gray-300 rounded-md py-2 px-3 w-full"
            type="password"
            id="confirm-password"
          />
        </div>
        <div>
          <label className="my-2 text-gray-700">Gender</label>
          <div className="flex mt-1 gap-2">
            <div>
              <label className="flex items-center justify-center ">
                <input
                  className=" text-indigo-600"
                  type="radio"
                  name="gender"
                  value="male"
                />
                <span className="ml-2">Male</span>
              </label>
            </div>
            <div  >
              <label className="flex items-center">
                <input
                  className=" text-indigo-600"
                  type="radio"
                  name="gender"
                  value="female"
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
          </div>
        </div>
        <button
          className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full my-2"
          type="submit"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
