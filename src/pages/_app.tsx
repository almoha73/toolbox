import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";

const roboto = Roboto({
	subsets: ["latin"],
	variable: "--font-roboto",
	weight: "400",
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<main className={`${roboto.variable} font-roboto`}>
			<Component {...pageProps} />
		</main>
	);
}
