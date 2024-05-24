import { Helmet, HelmetProvider } from "react-helmet-async";

const Store = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>POKE STOP | Store</title>
        </Helmet>
      </HelmetProvider>

      <p>set up</p>
    </>
  );
};

export default Store;
