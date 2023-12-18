import "@/styles/globals.css";
import Providers from "@/lib/Providers";

// export default function App({ Component, pageProps }) {
//   return (
//       <Component {...pageProps} />
//   );
// }

export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return <Providers>{getLayout(<Component {...pageProps} />)}</Providers>;
}
