import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./right.css";

const Right = ({ iteam }) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    totalAmount();
  }, [iteam]);

  const totalAmount = () => {
    let price = 0;
    iteam.map((item) => {
      price += item.price.cost;
    });
    setPrice(price);
  };

  return (
    <div className="right_buy">
      <img src="./shopaholic-logo1.png" alt="rightimg" />
      <div className="cost_right">
        <p>Your order is eligible for FREE Delivery</p>
        <br />
        <span style={{ color: "#565959" }}>
          Select this option at checkout. Details
        </span>
        <h3>
          Subtotal ({iteam.length} items){" "}
          <span style={{ fontWeight: 700 }}> ₹{price}.00</span>
        </h3>
        <button
          className="rightbuy_btn"
          onClick={() =>
            toast.success("Order Placed", {
              position: "top-center",
            })
          }
        >
          Process to Buy
        </button>
        <div className="emi">
        Only Cash On Delivery
        </div>
      </div>
    </div>
  );
};

export default Right;
