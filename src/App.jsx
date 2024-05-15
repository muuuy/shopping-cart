import "./App.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Favicon from "react-favicon";

import Navbar from "./components/Navbar/Navbar";
import SaleBanner from "./components/SaleBanner/SaleBanner";
import Banner from "./components/Banner/Banner";
import ItemCard from "./components/ItemCard/ItemCard";

function App() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>BLACK MARKET</title>
        </Helmet>
      </HelmetProvider>

      <Favicon
        url={
          "https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_640.png"
        }
      />
      <Navbar />
      <div className="container">
        <SaleBanner />
        <Banner />
        <ItemCard />
      </div>
    </>
  );
}

export default App;
