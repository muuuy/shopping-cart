import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { resetCart } from "../features/userSlice";

import styles from "../styles/Checkout.module.scss";

const Checkout = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    state: "",
    zip: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/users/upload-order/",
        formData,
        { withCredentials: true }
      );

      if (res.status === 200) {
        console.log(res);
        dispatch(resetCart({ order: res.data.addOrder }));
        setFormData({ name: "", email: "", country: "", state: "", zip: "" });
      }

      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <>
      {show && (
        <div className={styles.checkout__container}>
          <button onClick={onClose} className={styles.checkout__close}>
            X
          </button>
          <form
            method="POST"
            onSubmit={handleSubmit}
            className={styles.checkout__form}
          >
            <div>
              <label htmlFor="checkout-name">FIRST & LAST NAME</label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                id="checkout-name"
                autoComplete="name"
                required
                minLength={1}
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="checkout-email">EMAIL</label>
              <input
                type="text"
                placeholder="Email"
                name="email"
                id="checkout-email"
                autoComplete="email"
                required
                minLength={2}
                maxLength={254}
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="checkout-country">COUNTRY</label>
              <input
                type="text"
                placeholder="Country"
                name="country"
                id="checkout-country"
                autoComplete="country-name"
                required
                minLength={2}
                maxLength={56}
                value={formData.country}
                onChange={handleChange}
              />
            </div>
            <div className={styles.checkout__state_zip}>
              <div className={styles.checkout__state}>
                <label htmlFor="checkout-state">STATE</label>
                <input
                  type="text"
                  name="state"
                  id="checkout-state"
                  autoComplete="address-level1"
                  required
                  minLength={6}
                  maxLength={20}
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.checkout__zip}>
                <label htmlFor="checkout-zip">ZIP</label>
                <input
                  type="number"
                  name="zip"
                  id="checkout-zip"
                  autoComplete="postal-code"
                  required
                  minLength={2}
                  maxLength={2}
                  value={formData.zip}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button type="submit" className={styles.checkout__place_order}>
              PLACE ORDER
            </button>
          </form>
        </div>
      )}
    </>
  );
};

Checkout.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Checkout;
