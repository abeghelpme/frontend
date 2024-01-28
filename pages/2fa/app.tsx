import {FirstStep, RecoveryCode} from '@/components'
import {useRef, useState} from 'react'

export const Authenticator = () => {
	const [step, setStep] = useState(2)
	const recoveryCode = useRef<string | null>(null)
	return (
		<div className="relative flex min-h-screen flex-1 flex-col justify-between">
			{step === 1 ? (
				<FirstStep setStep={setStep} recoveryCode={recoveryCode} />
			) : (
				<RecoveryCode recoveryCode={recoveryCode.current} />
			)}
		</div>
	)
}
