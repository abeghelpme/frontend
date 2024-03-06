// import Button from '../primitives/Button/button';
import React from "react";
import OTPInput from "react-otp-input";

type OtpProps = {
	otp: string;
	setOtp: React.Dispatch<React.SetStateAction<string>>;
	topSection?: React.ReactNode;
	bottomSection?: React.ReactNode;
};

const OtpInputDisplay = ({
	otp,
	setOtp,
	topSection,
	bottomSection,
}: OtpProps) => {
	return (
		<div className="flex max-w-[467px] flex-col items-center text-sm md:text-base">
			<div className="text-center space-y-8">
				<h1 className="mb-4 font-medium text-base md:text-2xl">
					Enter your verification code
				</h1>
				{topSection}
				<OTPInput
					value={otp}
					onChange={setOtp}
					numInputs={6}
					containerStyle="flex justify-between gap-1 my-8"
					inputStyle="!w-[15%] aspect-square border-[0.25px] border-otpBorder focus:border-abeg-primary focus:border rounded-[3px] shadow-otpInput"
					inputType="number"
					renderInput={(props) => <input {...props} />}
				/>
			</div>
			{bottomSection}
		</div>
	);
};

export default OtpInputDisplay;
