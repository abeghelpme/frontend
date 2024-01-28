import AppFirstStep from '@/components/2fa/AppFirstStep';
import ShowRecoveryCode from '@/components/2fa/RecoveryCode';
import {useRef, useState} from 'react';

const Authenticator = () => {
	const [step, setStep] = useState(2);
	const recoveryCode = useRef<string | null>(null);
	return (
		<div className="relative flex min-h-screen flex-1 flex-col justify-between">
			{step === 1 ? (
				<AppFirstStep setStep={setStep} recoveryCode={recoveryCode} />
			) : (
				<ShowRecoveryCode recoveryCode={recoveryCode.current} />
			)}
		</div>
	);
};

export default Authenticator;
