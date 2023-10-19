import React from 'react';
import Link from 'next/link';

const Login = () => {
  return (
    <main className="min-h-screen w-full flex justify-center items-center p-4">
      <div className="p-8 bg-blue-950 rounded-lg w-full max-w-sm space-y-5">
        <h1 className="text-xl font-bold">Sign in to our platform</h1>
        <form className="flex flex-col gap-7">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium text-sm">
              Your Email
            </label>
            <input
              type="email"
              className="py-2 rounded-lg bg-[#4B5563] text-gray-400 focus:outline-none px-4  border border-gray-400"
              id="email"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-medium text-sm">
              Your Password
            </label>
            <input
              type="password"
              className="py-2 rounded-lg bg-[#4B5563] text-gray-400 focus:outline-none px-4  border border-gray-400"
              id="password"
              required
            />
          </div>
          <div className="flex justify-between   gap-2">
            <span className="flex gap-2 items-center">
              <input type="checkbox" id="remember-me" />
              <label className="" htmlFor="remember-me">
                Remember me
              </label>
            </span>
            <p>Forgot Password?</p>
          </div>
          <button
            className="bg-[#2563EB] py-2 font-medium w-full rounded-md  "
            onClick={(e) => e.preventDefault()}
          >
            Login to your account
          </button>
        </form>
        <p>
          Not registered?{' '}
          <Link href="" className="text-[#2563eb] font-bold">
            Create Account?
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
