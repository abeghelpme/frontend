import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = (props: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group"
			position="bottom-right"
			duration={3000}
			closeButton={true}
			pauseWhenPageIsHidden={true}
			toastOptions={{
				classNames: {
					toast:
						"group toast max-lg:mx-auto max-lg:group-[.toaster]:max-w-[356px] group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
					success:
						"group success data-[type=success]:group-[.toaster]:bg-success-bg data-[type=success]:group-[.toaster]:text-success-text data-[type=success]:border-success-border",
					error:
						"group error data-[type=error]:group-[.toaster]:bg-error-bg data-[type=error]:group-[.toaster]:text-error-text data-[type=error]:group-[.toaster]:border-error-border",

					title: "group-[.toaster]:text-base group-[.toaster]:font-bold",
					description:
						"group-[.toaster]:text-sm group-[.toast]:text-muted-foreground  group-[.toast.error]:text-inherit group-[.toast.success]:text-inherit",
					closeButton:
						"group-[.toaster]:bg-inherit group-[.toaster]:text-inherit group-[.toaster]:border-inherit data-[close-button]:group-[.toaster]:hover:border-inherit data-[close-button]:group-[.toaster]:hover:bg-inherit",
					actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
					cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
