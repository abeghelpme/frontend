import {Loader} from '@/components/index'
import {Toaster} from '@/components/ui/toaster'
import {useSession} from '@/store'
import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {Manrope} from 'next/font/google'
import {useRouter} from 'next/router'
import NextNProgress from 'nextjs-progressbar'
import type {ReactElement, ReactNode} from 'react'
import {useEffect} from 'react'

const manrope = Manrope({subsets: ['latin']})
interface ComponentWithPageLayout extends AppProps {
	Component: AppProps['Component'] & {
		protect?: boolean
		getLayout?: (page: ReactElement) => ReactNode
	}
}

export default function App({Component, pageProps}: ComponentWithPageLayout) {
	const {getSession} = useSession(state => state)
	// const router = useRouter();

	// useEffect(() => storePathValues(), [router.asPath]);

	// function storePathValues() {
	//   const storage = globalThis?.sessionStorage;
	//   if (storage === null) {
	//     return;
	//   }
	//   // Set the previous path as the value of the current path.
	//   const prevPath = storage.getItem("currentPath");
	//   storage.setItem("prevPath", prevPath!);
	//   // Set the current path value by looking at the browser's location object.
	//   storage.setItem("currentPath", globalThis.location.pathname);
	// }

	const getLayout = Component.getLayout || (page => page)
	useEffect(() => {
		void (async () => {
			await getSession(true)
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<style jsx global>{`
        html {
          font-family: ${manrope.style.fontFamily};
          color: #484848;
        }
      `}</style>
			<NextNProgress color="#324823" />
			{Component.protect === true ? (
				<Auth>{getLayout(<Component {...pageProps} />)}</Auth>
			) : (
				getLayout(<Component {...pageProps} />)
			)}
			<Toaster />
		</>
	)
}

const Auth = ({children}: {children: ReactNode}) => {
	const {user, loading} = useSession(state => state)
	const router = useRouter()
	if (loading) return <Loader message="Validating authorization status..." />
	const protectedPath = [
		'/signin',
		'/signup',
		'/signin/authenticate',
		'/signup/verification',
		'/verify-email',
		'/verify-email/success',
	]
	if (user === null && !protectedPath.includes(router.pathname)) {
		void router.push('/signin')
		return <Loader message="You are not signed in. Redirecting to Login" />
	} else if (user !== null && protectedPath.includes(router.pathname)) {
		setTimeout(() => {
			void router.back()
		}, 1000)
		return <Loader message={`You are already signed in. Redirecting back`} />
	}
	return children
}
