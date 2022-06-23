import { formatPrice } from "common/helper";
import React from "react";




const CartItem =props=> {
    const{name, image ,price ,mount} =props.cart ||{};
    const sumPrice = formatPrice(mount* parseInt(price))
  return (
    <div className="columns is-vcentered">
      <div className="column is-narrow">
        <span className="close">X</span>
      </div>
      <div className="column is-narrow">
        <img src={image} alt={name} width="100"></img>
      </div>
      <div className="column cart-name is-narrow">{name}</div>
      <div className="column">
        <span className="price">{formatPrice(price)}</span>
      </div>
      <div className="column">
        <input type="number" className="input num-input" defaultValue={mount}/>
        {/*                                           這不能直接寫value，因為value通常是直接搭配onclick等等用的 */}
      </div>
      <div className="column">
        <span className="sum-price">{sumPrice}</span>
      </div>
    </div>
  );
};

export default CartItem;
