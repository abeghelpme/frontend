import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group"
			position="bottom-right"
			richColors={true}
			closeButton={true}
			duration={3000}
			toastOptions={{
				classNames: {
					toast:
						"group toast group-[.toaster]:bg-white group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-abeg-primary dark:group-[.toaster]:text-white group-[.toaster]:text-lg",
					description:
						"group-[.toast]:text-white dark:group-[.toast]:text-white group-[.toaster]:text-sm",
					actionButton:
						"group-[.toast]:bg-zinc-900 group-[.toast]:text-zinc-50 dark:group-[.toast]:bg-zinc-50 dark:group-[.toast]:text-zinc-900",
					cancelButton:
						"group-[.toast]:bg-zinc-100 group-[.toast]:text-zinc-500 dark:group-[.toast]:bg-zinc-800 dark:group-[.toast]:text-zinc-400",
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
