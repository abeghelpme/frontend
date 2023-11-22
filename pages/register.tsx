import Link from "next/link";
import React from "react";

export default function Register() {
	const inputStyle = "border border-gray-300 bg-gray-50 rounded-md p-2 w-full mt-2";

	return (
		<main className="flex h-[100vh] w-[100vw] justify-center items-center bg-gray-200 p-4">
			<div className=" bg-white shadow-md border border-gray-200 rounded-lg  md:max-w-[470px] p-6 md:p-6 lg:p-8">
				<form className="flex flex-col gap-y-6  w-full">
					<h2 className="text-xl font-medium text-gray-900 ">Create an Account</h2>
					<div className="flex gap-x-2">
						<div>
							<label className="font-medium text-gray-900" htmlFor="firstName">
								First Name
							</label>
							<input type="text" id="firstName" placeholder="Mark" className={inputStyle} />
						</div>
						<div>
							<label className="font-medium text-gray-900" htmlFor="lastName">
								Last Name
							</label>
							<input type="text" id="lastName" placeholder="Dan" className={inputStyle} />
						</div>
					</div>
					<div>
						<label htmlFor="email" className="font-medium text-gray-900">
							Email
						</label>
						<input type="email" id="email" placeholder="name@email.com" className={inputStyle} />
					</div>
					<div>
						<label htmlFor="password" className="font-medium text-gray-900">
							Password
						</label>
						<input type="password" id="password" placeholder="••••••••" className={inputStyle} />
					</div>
					<div className="flex justify-between">
						<div className="flex gap-x-2 items-center">
							<input type="checkbox" id="remember" className="w-4 h-4" />
							<label htmlFor="remember" className="font-medium text-gray-900">
								Remember Me
							</label>
						</div>
						<Link href={"#"} className="hover:underline text-blue-700 ">
							forgot password?
						</Link>
					</div>
					<button type="submit" className="bg-blue-700 px-5 py-2 text-white font-medium rounded-md">
						Register
					</button>
					<p className="text-center w-fit text-sm font-medium text-gray-500 ">
						Already registered?{" "}
						<Link href={"#"} className="hover:underline text-blue-700">
							Login
						</Link>
					</p>
				</form>
			</div>
		</main>
	);
}
