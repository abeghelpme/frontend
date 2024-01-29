import type {ReactNode} from 'react'

export interface BaseLayoutProps {
	children: ReactNode
}

export interface AuthLayoutProps extends BaseLayoutProps {
	formType?: 'signup' | 'other'
	greeting?: string
	heading?: string
	contentClass?: string
	withHeader: boolean
	hasSuccess: boolean
}
