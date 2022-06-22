import React from "react";
// import Header from "component/Header";
import Layout from "Layout";

const Cart = () => (
  //   <div className="main">
  //     <Header />
  //     <div className="cart-page">
  //       <p className="title has-text-centered">Cart Page</p>
  //     </div>
  //   </div>
  // 改成套用layout模板的方式

  <Layout>
    <div className="cart-page">
      <p className="title has-text-centered">Cart Page</p>
    </div>
  </Layout>
  //透過layout標籤，把既有的東西不帶，需要客製化的東西再丟進來，當作props.children
);

export default Cart;
