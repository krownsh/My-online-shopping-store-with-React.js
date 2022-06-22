import React from "react";  //, { useReducer } 不知道從哪崩出來  先放著
import axios from "common/axios"; //原本是直接就好，因為有幫他另外在一個common設置，才需要多一層
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ToolBox from "component/ToolBox";
import Product from "component/Product";
import Panel from "component/Panel";
// 0617 panel
import Addinventory from "component/Addinventory";

class Products extends React.Component {
  // 利用prop方法，進行組件傳遞，product產品的動態變化

  //改用api載入方式
  state = {
    products: [],
    sourceProduct: [], //把它定義為完整的宿主(針對搜尋刪除回復的功能)
    cartNum : 0,

  };

  componentDidMount() {
    //這兩的方法是一樣的，擇一個
    // fetch('http://localhost:3004/products').then(response => response.json()).then(data =>{
    //   this.setState({
    //     products: data
    //   });
    // });
    axios.get("/products").then((response) => {
      //我為我們有需預設好路由位置在common頁面，所以把它省略了，原本  axios.get('http://localhost:3004/products').then(response=>{

      this.setState({
        products: response.data, //他會這樣寫是因為可以console.log檢查一下
        sourceProduct: response.data, // api的值也要新增
      });
    });
    this.updateCartNum();
  }

  //搜尋的邏輯
  search = (text) => {
    console.log(text);

    //1.先得到一個新的陣列
    let _products = [...this.state.sourceProduct]; //解構賦值方法 (原本是這個 [...this.state.product]，為了讓每次複製都能完整而修改)
    //不要寫成 const _products = this.state.products，這會指向原本裡面state的product，我修改了product，
    // 他只向的還是原本state裡面的product，改變的話兩個都會同時改變。

    // 2.篩選新陣列
    // filter裡面要去傳遞一個回調函數
    _products = _products.filter((p) => {
      const matchArray = p.name.match(new RegExp(text, "gi")); //搭配match方法使用
      //透過正則表達式創造符合，符合的陣列，RegExp(文字，g=整串全部，i=不區分大小寫)
      // 假如 name:Abcd  text:ab   得到的matchArray:['Ab'] 因為不區分大小寫
      // 假如 name:Abcd  text:''空字串   得到的matchArray:['','','',''] 4個空值
      return matchArray !== null; //=>如果matchArray不為空的話，就回傳matchArray的值(另外這邊可以寫成  return  !!atchArray)
    });

    //3. 設置新狀態
    this.setState({
      products: _products,
    });

    //-------------以上是篩選邏輯，但他對於沒搜尋到的空值已經傳回去但還沒動態修改，刪除搜尋也還不會便回來
    //             因為，let _products = [...this.state.products] =>每一次複製都應該要是完整的結果
  };

  toAdd = () => {
    Panel.open({
      component: Addinventory,
      callback: (data) => {
        // 添加資料後再讓他渲染回畫面
        if (data) {
          this.add(data);
          // 如果沒有傳入資料就不做更新
        }
      },
    });
  };
  // 新增一個點擊按鈕開啟庫存修改的區塊，搭配panel.js裡面的寫法
  add = (product) => {
    const _products = [...this.state.products];
    _products.push(product);
    const _sProducts = [...this.state.sourceProduct];
    _sProducts.push(product);

    this.setState({
      products: _products,
      sourceProduct: _sProducts,
    });
  };
  update = (product) => {
    const _products = [...this.state.products];

    const _index = _products.findIndex((p) => p.id === product.id);
    _products.splice(_index, 1, product);
    const _sProducts = [...this.state.sourceProduct];
    const _sIndex = _products.findIndex((p) => p.id === product.id);
    _sProducts.splice(_sIndex, 1, product);
    // 這一部分是用來更新一部分當中某一個視圖

    this.setState({
      products: _products,
      sourceProduct: _sProducts,
    });
  };

  // 刪除的重新渲染
  delete = (id) => {
    const _products = this.state.products.filter((p) => p.id !== id);
    const _sProducts = this.state.sourceProduct.filter((p) => p.id !== id);
    this.setState({
      products: _products,
      sourceProduct: _sProducts,
    });
  };

  // 修改商品，讓他拿到更新後再去渲染刷新視圖

  // {
  //   id: 1,
  //   name: "Air Jordan 4",
  //   image: "/images/1.jpg",
  //   tags: "92 ",
  //   price: 59440,
  //   status: "available",
  // },
  // {
  //   id: 2,
  //   name: "Nike Paul George PG 3",
  //   image: "/images/2.jpg",
  //   tags: "25 Colors",
  //   price: 53800,
  //   status: "available",
  // },
  // {
  //   id: 3,
  //   name: "Jordan Why Not Zer0.2",
  //   image: "/images/3.jpg",
  //   tags: "16 Color, y",
  //   price: 48900,
  //   status: "available",
  // },
  // {
  //   id: 4,
  //   name: "Nike Air Foamposite One",
  //   image: "/images/4.jpg",
  //   tags: "84 Colors",
  //   price: 73148,
  //   status: "available",
  // },
  // {
  //   id: 5,
  //   name: "adidas Harden Vol.3",
  //   image: "/images/5.jpg",
  //   tags: "34 Colors",
  //   price: 46900,
  //   status: "unavailable",
  // 用來展示無庫存狀態
  // },
  // ];

  // 把它傳遞到下面的product

  // state = {};

  updateCartNum = async () =>{
    //更新購物車數量
    const cartNum = await this.initCartNum ()
    this.setState({
        // cartNum : 0,
        cartNum : cartNum,  //把定義好的cartNum代入
    })
   }
   initCartNum =async () =>{
    const res = await axios.get('/carts')
    const carts = res.data || [] //如果沒有值的話就給他空集合
    const cartNum = carts
    .map(cart =>cart.mount)  //將mount裡數量相加
    .reduce((a , value) => a +value ,0)
    //       累加器   當前值            初始值
    return cartNum
   }


  render() {
    return (
      <div>
        <ToolBox search={this.search} cartNum={this.state.cartNum}/>
        <div className="products">
          <div className="columns is-multiline is-desktop">
            {/* 把所有產品都渲染出來成一個表列 */}
            {/* 利用map方式，透過回掉函數，把他一個一個進去product裡 */}

            <TransitionGroup component={null}>
              {this.state.products.map((p) => {
                return (
                  <CSSTransition
                    classNames="product-fade"
                    timeout={{ enter: 300, exit: 300 }}
                    key={p.id}
                  >
                    {/* 因為它是多個product去做動畫效果，因此比需給予key={p.id}的值，他才會順利進行 */}
                    <div className="column is-3" key={p.id}>
                      {/* 要給他一個標記的值，才有辦法在之後調整時去抓值 */}
                      <Product
                        product={p}
                        update={this.update}
                        delete={this.delete}
                        updateCartNum={this.updateCartNum}  //更新數量再傳遞給product
                      />
                      {/* 然後子組件那邊匯用this.props.product */}
                      {/* 因為使用回調函示方法，所以就不用{this.product}這樣，直接帶{p} */}
                    </div>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
            {/* <div className="column is-3">
              <Product />
            </div>
            <div className="column is-3">
              <Product />
            </div>
            <div className="column is-3">
              <Product />
            </div>
            <div className="column is-3">
              <Product />
            </div>
            <div className="column is-3">
              <Product />
            </div> */}
          </div>
          <button className="button is-primary add-btn" onClick={this.toAdd}>
            修改庫存
          </button>
        </div>
      </div>
    );
  }
}

export default Products;
