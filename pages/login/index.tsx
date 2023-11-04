import Link from "next/link";

const Login = () => {
  // test comment
  return (
    <main className="flex items-center justify-center w-full min-h-screen p-4">
      <div className="w-full max-w-sm p-8 space-y-5 rounded-lg bg-blue-950">
        <h1 className="text-xl font-bold">Sign in to our platform</h1>
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Your Email
            </label>
            <input
              type="email"
              className="py-2 rounded-lg bg-[#4B5563] text-white focus:outline-none px-4  border border-gray-400"
              id="email"
              placeholder="name@gmail.com"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium">
              Your Password
            </label>
            <input
              type="password"
              placeholder="......."
              className="py-2 rounded-lg bg-[#4B5563] text-white  focus:outline-none px-4  border border-gray-400"
              id="password"
              required
            />
          </div>
          <div className="flex justify-between gap-2">
            <span className="flex items-center gap-2">
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
          Not registered?{" "}
          <Link href="" className="text-[#2563eb] font-bold">
            Create Account?
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
