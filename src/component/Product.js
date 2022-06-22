import React from "react";
// 這兩個是為了購物車新增功能所用
import axios from "common/axios";
import { toast } from "react-toastify";

import { formatPrice } from "common/helper"; //從helper那邊解構出來
import Panel from "component/Panel";
import Editinventory from "component/Editinventory";

class Product extends React.Component {
  // state = {  }
  // 金額的轉換方式，利用js內建的函式
  // 其他地方可能也用的到，所以在另外把他抽離出來，
  // 把它移到其他資料夾，這邊再把它解構出來
  // formatPrice = cents =>{
  //     return (cents/100).toLocaleString('zh',{
  //         style:'currency',
  //         currency:'TWD',
  //     })
  // }

  toEdit = () => {
    Panel.open({
      component: Editinventory,
      props: {
        product: this.props.product,
        deleteProduct: this.props.delete,
      },
      callback: (data) => {
        console.log(data);
        if (data) {
          this.props.update(data);
        }
      },
    });
  };

  addCart = async () => {
    // addcart這是需要和資料庫溝通的功能
    // 把我們需要在購物車裡面需要的鮮解構出來
    try {
      const { id, name, image, price } = this.props.product;

      const res = await axios.get(`/carts?productId=${id}`); //json-server有官方說明寫法
      // 這邊採用異步方式
      const carts = res.data;
      if (carts && carts.length > 0) {
        const cart = carts[0];
        cart.mount += 1;
        await axios.put(`/carts/${cart.id}`, cart);
        // put是修改方法
      } else {
        // 這一部分是針對將相同商品富入購物車，不要重複寫入，去更新他的數量就好

        const cart = {
          productId: id,
          name,
          image,
          price,
          mount: 1 //需要預設值
        }; // 可以去看一下 起始值式空的
        // await axios.post("/carts", cart).then((res) => {
        await axios.post("/carts", cart);
      }
      // 位置是http://localhost:3004/carts  不要搞錯了
      toast.success("成功添加購物車");
      this.props.updateCartNum();
    } catch (error){
      toast.error('添加購物車失敗')
    } // try跟catch異步的報錯處理
  };

  render() {
    const { name, tags, image, price, status } = this.props.product;
    // 判斷 out-stock來控制class屬性
    const pclass = {
      available: "product",
      unavailable: "product out-stock",
    };
    // 這段比較特別多看幾次，他先用物件的方式給你兩種狀態，他再去吃status解構出來的屬性，去判斷class要放入啥

    return (
      <div className={pclass[status]}>
        <div className="p-content">
          {/* edit部分新增 */}
          <div className="p-head has-text-right" onClick={this.toEdit}>
            <span className="icon edit-btn">
              <i className="fas fa-sliders-h"></i>
            </span>
          </div>

          <div className="img-wrapper">
            <div className="out-stock-text">沒有庫存</div>
            {/* 這段不用另外去設他的available顯示，他直接用上一層的css去綁 */}
            <figure className="image is-4by3">
              {/* <img src={this.props.product.image} alt={this.props.product.name}/> */}
              {/* 這種prop寫法比較長，所以我們可以透過解構的方法來寫，在上面解構 */}
              <img src={image} alt={name}></img>
            </figure>
          </div>
          <p className="p-tags">{tags}</p>
          <p className="p-name">{name}</p>
        </div>
        <div className="p-footer">
          <p className="price">{formatPrice(price)}</p>
          <button
            className="add-cart"
            disabled={status === "unavailable"}
            onClick={this.addCart}
          >
            {/* 有關於到css樣式的寫法，重要，在看一 下 */}
            <i className="fas fa-shopping-cart"></i>
            <i className="fas fa-exclamation"></i>
            {/* 有設置這邊最後一個i元素display none */}
          </button>
        </div>
      </div>
    );
  }
}

export default Product;
