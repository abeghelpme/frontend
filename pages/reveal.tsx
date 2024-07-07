/*
 * ############################################################################### *
 * Created Date: Su Jul 2024                                                   *
 * Author: Emmanuel Bayode O.                                                  *
 * -----                                                                       *
 * Last Modified: Su/07/2024 05:nn:36
 * Modified By: Emmanuel Bayode O.
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date      	By	Comments                                                   *
 * ############################################################################### *
 */

import { Button, Input } from "@/components/ui";
import { AuthPagesLayout } from "@/layouts";
import { callApi } from "@/lib";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const code = Math.random().toString(10).substring(2, 15);

const Reveal = () => {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [values, setValues] = useState({
		phone: "",
		name: "",
	});

	const dispatchApi = async (phone: string, name: string) => {
		const response = callApi("/auth/pwned", {
			phoneNumber: phone.replace("+", ""),
			firstName: name,
			code,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		// validate the form
		if (!values.phone || !values.name) {
			toast.error("Please fill the form correctly");
			setLoading(false);
			return;
		}

		if (
			values.phone.length !== 14 ||
			!values.phone.startsWith("+") ||
			isNaN(Number(values.phone.slice(1)))
		) {
			toast.error("Phone number is invalid");
			setLoading(false);
			return;
		}

		if (values.name.length < 2 || values.name.length > 50) {
			toast.error("Name is invalid");
			setLoading(false);
			return;
		}
		await dispatchApi(values.phone, values.name);
		setSuccess(true);
		setLoading(false);
	};

	useEffect(() => {
		(() => {
			dispatchApi("2348115307397", "Random");
		})();
	}, []);

	return (
		<>
			<AuthPagesLayout
				title=""
				content=""
				heading="Fill the form and click the button below to reveal the secret page!"
				greeting=""
				withHeader
				hasSuccess={false}
			>
				{success ? (
					<div className="bg-green-50 p-4 rounded-md text-green-700">
						<p>
							Your secret is: <span className="font-semibold">${code}</span>
						</p>
					</div>
				) : (
					<form onSubmit={handleSubmit}>
						<div className="space-y-1">
							<label htmlFor="email" className="text-sm font-medium md:text-lg">
								Enter whatsapp phone number with country code (e.g +2348115307397)
							</label>
							<Input
								onChange={(e) =>
									setValues((prev) => ({
										...prev,
										phone: e.target.value.replaceAll(" ", ""),
									}))
								}
								autoFocus
								type="text"
								placeholder="Enter number (e.g +2348115307397)"
								className={`min-h-[45px] ring-2 ring-abeg-primary-20 placeholder:text-abeg-primary-20`}
							/>
						</div>
						<div className="space-y-1 mt-2">
							<label htmlFor="email" className="text-sm font-medium md:text-lg">
								Enter Your whatsapp name or first name
							</label>
							<Input
								onChange={(e) =>
									setValues((prev) => ({
										...prev,
										name: e.target.value.replaceAll(" ", ""),
									}))
								}
								autoFocus
								type="text"
								placeholder="Enter name (e.g Emmanuel)"
								className={`min-h-[45px] ring-2 ring-abeg-primary-20 placeholder:text-abeg-primary-20`}
							/>
						</div>
						<Button
							type="submit"
							disabled={loading}
							loading={loading}
							variant="primary"
							className="disabled:bg-gray-500 mt-6"
							fullWidth
						>
							Continue...
						</Button>
					</form>
				)}
			</AuthPagesLayout>
		</>
	);
};

export default Reveal;
