

export default function Login() {
  return (
    <div className=' w-96 shadow px-8 py-4' >
          
          <h1 className='text-3xl text-center my-2'>Login</h1>
            <form className='flex my-4 flex-col gap-4'>
                <div>
                    <label className='text-gray-700' htmlFor='username'>Username</label>
                    <input className='border mt-1 border-gray-300 rounded-md py-2 px-3 w-full' type='text' id='username' />
                </div>
                <div>
                    <label className='my-2 text-gray-700' htmlFor='password'>Password</label>
                    <input className='border mt-1 border-gray-300 rounded-md py-2 px-3 w-full' type='password' id='password' />
                </div>
              <button className='bg-indigo-600 text-white py-2 rounded'>Login</button>
            </form>
    </div>
  )
}



