import type { ReactElement } from "react";

export const DashBoardPageLayout = function getLayout(page: ReactElement) {
	return <main className="min-h-full">{page}</main>;
};
