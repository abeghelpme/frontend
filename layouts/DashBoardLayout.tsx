import type {ReactElement} from 'react'

export const DashBoardLayout = function getLayout(page: ReactElement) {
	return <main className="min-h-full">{page}</main>
}
