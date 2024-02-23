import LogoBanner from "./LogoBanner";

type CompProp = {
	message?: string | JSX.Element;
};

const Loader = ({ message }: CompProp) => {
	return (
		<div className="flex h-svh w-full flex-col items-center justify-center gap-3 overflow-hidden font-medium text-abeg-primary-10">
			<LogoBanner />
			<p className="text-sm">{message}</p>
		</div>
	);
};

export default Loader;
