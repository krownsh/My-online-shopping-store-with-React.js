import React,{useState , useEffect} from "react";
// import Header from "component/Header";
import Layout from "Layout";
import CartItem from "component/CartItem";
import axios from "common/axios";
import { formatPrice } from "common/helper";



// 不用class方法，我們用hook方法
// class Cart extends React.Component{
//   state={
//       carts:[],

//   }
//   componentDidMount(){
//       //第一次渲染之後執行
//       axios.get('/carts').then(res => this.setState({
//         cart :res.data
//       }))
//   }
//   render(){
//       return{

//       }

//   }
// }
const Cart = () => {
  //   <div className="main">
  //     <Header />
  //     <div className="cart-page">
  //       <p className="title has-text-centered">Cart Page</p>
  //     </div>
  //   </div>
  // 改成套用layout模板的方式

//利用hook方法，使用state特性(hook沒有生命週期函數)
    const [carts,setCarts] = useState([])

    useEffect(() =>{
      //類似於生命週期方法
      axios.get('/carts').then(res => setCarts( res.data));
  });


  const totalPrice =() =>{
    const totalPrice = carts.map(cart =>cart.mount*parseInt(cart.price))
    .reduce((a,value)=>a+ value,0)
    //   累加器，當前值         初始值0
    return formatPrice(totalPrice);
  }
return(
  <Layout>
    <div className="cart-page">
      <span className="cart-title">Shopping Cart</span>
      <div className="cart-list">
          {carts.map(cart =>(
            <CartItem key={cart.id} cart={cart}/>
            // 再透過props回傳遞給 cartitem
          ))}
      </div>
      <div className="cart-total">
        Total:
        <span className="total-price">{totalPrice()}</span>
      </div>
    </div>
  </Layout>
  //透過layout標籤，把既有的東西不帶，需要客製化的東西再丟進來，當作props.children
  )};

export default Cart;
