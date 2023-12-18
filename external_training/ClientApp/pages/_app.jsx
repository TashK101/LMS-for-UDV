import {} from "../styles/global.css";
import { Golos_Text } from "next/font/google";

const golos = Golos_Text({ subsets: ["cyrillic", "latin"] });

export default function App({ Component, pageProps }) {
  return (
    <div className={golos.className}>
      <Component {...pageProps} />
    </div>
  );
}
