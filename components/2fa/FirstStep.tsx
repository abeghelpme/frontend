import {Button, CustomDialog, Loader} from '@/components'
import type {ApiResponse} from '@/interfaces'
import {callApi} from '@/lib'
import {ClipboardIcon} from '@radix-ui/react-icons'
import Image from 'next/image'
import React, {useEffect, useState} from 'react'
import OtpInput from 'react-otp-input'
import {useToast} from '../ui/use-toast'

type AuthenticatorFirstStepProps = {
	setStep: React.Dispatch<React.SetStateAction<number>>
	recoveryCode: React.MutableRefObject<string | null>
}

export const FirstStep = ({
	setStep,
	recoveryCode,
}: AuthenticatorFirstStepProps) => {
	const [isQRCodeLoading, setIsQRCodeLoading] = useState(true)
	const [QRCodeError, setQRCodeError] = useState(false)
	const [otpLoading, setOtpLoading] = useState(false)
	const [data, setData] = useState<ApiResponse>()
	const {toast} = useToast()
	const [otp, setOtp] = useState('')

	// get qr code or secret
	useEffect(() => {
		const setup2fa = async () => {
			const {data, error} = await callApi<ApiResponse>('/auth/2fa/setup', {
				twoFactorType: 'APP',
			})
			if (data) {
				setData(data)
				setIsQRCodeLoading(false)
				setQRCodeError(false)
			}
			if (error) {
				toast({
					title: error.status as string,
					description: error.message,
					duration: 3000,
				})
				setQRCodeError(true)
				setIsQRCodeLoading(false)
			}
		}
		void setup2fa()
	}, [toast, isQRCodeLoading])

	const handleCopy = async () => {
		try {
			await navigator.clipboard
				.writeText(data?.data?.secret as string)
				.then(() => {
					toast({
						title: 'Success',
						description: 'Key copied to clipboard',
						duration: 3000,
					})
				})
		} catch (err) {
			toast({
				title: 'Error',
				description: 'Could not copy',
				duration: 3000,
			})
		}
	}

	// handle otp submit
	const handleOtpSubmit = async () => {
		setOtpLoading(true)

		const {data, error} = await callApi<ApiResponse>('/auth/2fa/complete', {
			token: otp,
			twoFactorType: 'APP',
		})

		if (data) {
			localStorage.setItem('show-modal', 'false')
			setStep(2)
			recoveryCode.current = data?.data?.recoveryCode as string
			setOtpLoading(false)
		}
		if (error) {
			toast({
				title: error.status as string,
				description: error.message,
				duration: 2000,
			})
			setOtpLoading(false)
			setOtp('')
		}
	}

	return (
		<>
			<div className="mx-auto mt-[3.5rem] w-full px-[5%] md:w-[80%] md:px-0 lg:max-w-[1000px]">
				<h1 className="text-lg font-semibold md:text-2xl">
					Setting up your two-factor authentication
				</h1>
				<ol className="mt-6 flex list-inside list-none flex-col gap-3">
					<li className="flex flex-col gap-2">
						<h2 className="font-semibold">1. Download an authentication app</h2>
						<p>
							We recommend downloading Google Authenticator app if you
							don&apos;t have one installed yet.
						</p>
					</li>
					<li className="flex flex-col gap-2">
						<h2 className="font-semibold">
							2. Scan this QR code or copy the key.
						</h2>
						<p>
							Scan this QR code in the authentication app or copy key and paste
							it in the authentication app to generate your verification code
						</p>
						<div className="flex min-h-[12rem] items-center">
							{isQRCodeLoading ? (
								<Loader />
							) : QRCodeError ? (
								<Button
									className="mx-auto"
									variant="secondary"
									onClick={() => setIsQRCodeLoading(true)}
								>
									Retry
								</Button>
							) : (
								<div className="flex w-full flex-col items-center justify-around gap-y-2 lg:flex-row">
									<div className="relative">
										<Image
											src={data?.data?.qrCode as string}
											height={250}
											width={250}
											alt=""
										/>
									</div>
									<div className="flex items-center justify-center gap-2">
										<span className="w-10 border-b-2" />
										<p>or</p>
										<span className="w-10 border-b-2" />
									</div>
									<div className="flex flex-col items-center">
										<span className="text-center font-semibold">
											{data?.data?.secret as string}
										</span>
										<button
											type="button"
											className="mt-2 flex items-center justify-center font-semibold text-abeg-teal"
											onClick={() => void handleCopy()}
										>
											<ClipboardIcon />
											<span>Copy Key</span>
										</button>
									</div>
								</div>
							)}
						</div>
					</li>
					<li className="flex flex-col gap-4">
						<h2 className="font-semibold">3. Copy and enter 6-digit code</h2>
						<p>
							After the QR code has been scanned or the key has been entered,
							your authentication app will generate a 6-digit code. Copy the
							code and click on the Next button to enter it.
						</p>
					</li>
				</ol>
			</div>
			<div className="border-t border-t-formBtn">
				<div className="mx-auto flex w-full justify-end px-[5%] py-6 md:w-[80%] md:px-0 md:py-7 lg:max-w-[1000px]">
					<CustomDialog
						trigger={
							<Button
								className="w-fit bg-abeg-button-10 "
								size="sm"
								disabled={data === undefined || QRCodeError}
							>
								NEXT
							</Button>
						}
					>
						<div className=" relative mx-auto flex w-full flex-col gap-2 py-8 md:w-10/12">
							<h2 className="text-center font-[500]">
								Get your code from your authentication app
							</h2>
							<p className="text-center text-xs">
								Enter the 6-digit code generated by your authentication app.
							</p>
							<OtpInput
								value={otp}
								onChange={setOtp}
								numInputs={6}
								renderSeparator={<span></span>}
								containerStyle={'flex relative gap-1  h-[2.5rem] '}
								inputType="number"
								inputStyle={
									'  flex-1 h-full border outline-none shadow-md focus:ring-abeg-teal focus:ring-1'
								}
								renderInput={props => <input {...props} />}
							/>
							<Button
								className="mt-6 bg-formBtn py-4 text-sm font-semibold"
								disabled={otp.length !== 6}
								onClick={() => void handleOtpSubmit()}
								loading={otpLoading}
							>
								Complete
							</Button>
						</div>
					</CustomDialog>
				</div>
			</div>
		</>
	)
}
