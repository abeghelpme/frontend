import type { ReactElement } from "react";

export const AuthPagesLayout = function getLayout(page: ReactElement) {
	return <main className="h-full bg-authBg bg-cover bg-no-repeat">{page}</main>;
};
