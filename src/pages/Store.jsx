import { Helmet, HelmetProvider } from "react-helmet-async";

const Store = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>POKE STOP | Home</title>
        </Helmet>
      </HelmetProvider>
    </>
  );
};

export default Store;
