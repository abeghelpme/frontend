import {Button, Input, ProgressBar} from '@/components'
import {useToast} from '@/components/ui/use-toast'
import {AuthLayout} from '@/layouts'
import {
	type ResetPasswordType,
	callApi,
	checkPasswordStrength,
	zodValidator,
} from '@/lib'
import {zodResolver} from '@hookform/resolvers/zod'
import {useRouter} from 'next/router'
import {useDeferredValue, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'

const ResetPassword = () => {
	const router = useRouter()
	const {toast} = useToast()

	const [token, setToken] = useState('')
	useEffect(() => {
		setToken(router.query.token as string)
	}, [router])
	const {
		handleSubmit,
		register,
		formState: {errors, isSubmitting},
		watch,
	} = useForm<ResetPasswordType>({
		resolver: zodResolver(zodValidator('resetPassword')!),
		mode: 'onChange',
		reValidateMode: 'onChange',
	})

	const password: string = watch('password', '')
	const [result, setResult] = useState<number>(0)
	const deferredPassword = useDeferredValue(password)

	useEffect(() => {
		const genStrength = async () => {
			const passwordStrength = await checkPasswordStrength(deferredPassword)
			setResult(passwordStrength)
		}
		genStrength().catch(e => {
			console.log(e)
		})
	}, [deferredPassword])

	const onSubmit = async (data: ResetPasswordType) => {
		if (!token)
			return toast({
				title: 'Request Failed',
				description: 'Incomplete data provided',
				duration: 3000,
			})
		const {data: responseData, error} = await callApi('/auth/password/reset', {
			token,
			password: data.password,
			confirmPassword: data.confirmPassword,
		})

		if (error) {
			return toast({
				title: error.status as string,
				description: error.message,
				duration: 3000,
			})
		} else {
			toast({
				title: 'Success',
				description: (responseData as {message: string}).message,
				duration: 3000,
			})
			setTimeout(() => {
				void router.push('/reset-password/success')
			}, 2000)
		}
	}

	return (
		<AuthLayout formType="other" withHeader={false} hasSuccess={false}>
			<form
				onSubmit={event => {
					event.preventDefault()
					void handleSubmit(onSubmit)(event)
				}}
				className="flex flex-col"
			>
				<div className="space-y-6">
					<h1 className="text-center text-2xl font-semibold">Reset Password</h1>
					<div className="space-y-4">
						<div className="space-y-1">
							<label htmlFor="password" className="font-medium">
								Password
							</label>
							<div className="relative">
								<Input
									{...register('password')}
									className={`min-h-[45px] ${
										errors.password &&
										'ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20'
									}`}
									placeholder="Create a new password"
									type="password"
								/>
							</div>
							{password.length > 0 && (
								<div>
									<ProgressBar
										value={result * 25}
										className={`${
											result < 2
												? 'progress-filled:bg-red-500'
												: result >= 2 && result <= 3
												  ? 'progress-filled:bg-yellow-500'
												  : 'progress-filled:bg-green-500'
										}`}
									/>
									<p
										className={`${
											result <= 2
												? 'text-text-red'
												: result >= 2 && result <= 3
												  ? 'text-yellow-500'
												  : 'text-green-500'
										} text-sm`}
									>
										<span className="text-black">Password strength:</span>
										&nbsp;
										{result < 2
											? 'Weak'
											: result >= 2 && result <= 3
											  ? 'Medium'
											  : 'Strong'}
									</p>
								</div>
							)}
							{errors.password && (
								<div className="mt-2 text-sm text-abeg-teal">
									<h1>{errors.password.message}</h1>
								</div>
							)}
						</div>

						<div className="space-y-1">
							<label htmlFor="confirmPassword" className="font-medium">
								Confirm password
							</label>
							<div className="relative">
								<Input
									{...register('confirmPassword')}
									className={`min-h-[45px] ${
										errors.confirmPassword &&
										'ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20'
									}`}
									placeholder="Re-enter password"
									type="password"
								/>
							</div>
							{errors.confirmPassword && (
								<div className="mt-2 text-sm text-abeg-teal">
									<h1>{errors.confirmPassword.message}</h1>
								</div>
							)}
						</div>
					</div>
				</div>

				<Button
					disabled={isSubmitting}
					loading={isSubmitting}
					className="text-md mt-6 bg-abeg-button-10 px-10 py-3 font-medium"
				>
					Submit
				</Button>
			</form>
		</AuthLayout>
	)
}
export default ResetPassword
