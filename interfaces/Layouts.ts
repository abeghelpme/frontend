import type { ReactNode } from "react";

export interface BaseLayoutProps {
	children: ReactNode;
}

export interface AuthLayoutProps extends BaseLayoutProps {
	greeting?: string;
	heading?: string;
	contentClass?: string;
	withHeader: boolean;
	title: string;
	content: string;
	hasSuccess: boolean;
}
