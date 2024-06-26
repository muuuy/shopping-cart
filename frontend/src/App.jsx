import "./App.scss";
import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Favicon from "react-favicon";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

import { useDispatch } from "react-redux";
import { authUser } from "./features/userSlice";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Forget from "./pages/Forget";
import ResetPassword from "./pages/ResetPassword";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Store from "./pages/Store";
import Shop from "./pages/Shop";
import Search from "./pages/Search";
import Orders from "./pages/Orders";

import ExplorePokemon from "./pages/ExplorePokemon";
import ExploreItems from "./pages/ExploreItems";
import ExploreBerries from "./pages/ExploreBerries";
import ExploreTMs from "./pages/ExploreTMs";

import { fetchItems } from "./utils/fetchItems";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/users/auth/",
          null,
          {
            withCredentials: true,
          }
        );

        if (res.data.user) {
          const cart = await fetchItems(res.data.user.items);

          console.log(cart);

          dispatch(
            authUser({
              username: res.data.user.username,
              email: res.data.user.email,
              cart: cart,
              orders: res.data.user.orders,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAuth();
  }, [dispatch]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>POKE STOP</title>
        </Helmet>
      </HelmetProvider>

      <Favicon
        url={
          "https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_640.png"
        }
      />

      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/" element={<Home />} />
          <Route path="/store" Component={Store} />
          <Route path="/shop/:itemName" element={<Shop />} />
          <Route path="/search-items/" element={<Search />} />
          <Route path="/orders/" element={<Orders />} />

          <Route path="/explore-pokemon/" element={<ExplorePokemon />} />
          <Route path="/explore-items/" element={<ExploreItems />} />
          <Route path="/explore-berries/" element={<ExploreBerries />} />
          <Route path="/explore-tms/" element={<ExploreTMs />} />
        </Routes>
        <footer>
          <p>Matthew Yu</p>
          <p>がんばれ！</p>
        </footer>
      </div>
    </>
  );
}

export default App;
