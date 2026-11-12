import About from "./About";
import Hero from "./Hero";
import Services from "./Services";
import Contact from "./Contact";
import Footer from "./Footer";
import Viewer from "./Viewer";
import Stats from "./Stats";
import StreamChart from "./StreamChart";

export default async function Home() {
  return (
    <main className="flex flex-col">
      <Viewer />
      <Stats />
      {/* <StreamChart /> */}

      {/* <About /> */}
      {/* <Hero /> */}
      {/* <Services /> */}
      {/* <Contact /> */}
      {/* <Footer /> */}
    </main>
  );
}
