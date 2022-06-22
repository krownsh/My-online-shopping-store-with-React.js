import React from 'react';
import {withRouter} from 'react-router-dom';
// 製作購物車的跳轉

class ToolBox extends React.Component {
      //進行搜尋欄位的控制  可控組建的設置
      state = { 
        searchText : ""
       }
       //輸入內容抓值
       handleChange =e =>{
        const value = e.target.value;
        this.setState({
            searchText:value
        });
        //透過參數傳參，將邏輯綁在這邊
        this.props.search(value);
       };
       //清除內容
       clearSearchText =() =>{
        this.setState({
            searchText:''
        });
        this.props.search("");  //輸入有  取消也要有

       };
       // 搜尋邏輯 雖然搜尋在toolbox這邊，但是他是在商品列表那邊重新篩選來控制渲染商品的排列，所以不要寫錯地方了，他要寫在products那邊
       // ,但toolbox這邊也會需要使用，因此可以透過在products那參數的傳遞來去進行。

    goCart =() =>{
        this.props.history.push('/cart');
    }       


    render() { 
        return (
            <div className='tool-box'>
                <div className='logo-text'>store</div>
                <div className='search-box'>
                    <div className='field has-addons'>
                        <div className='control'>
                            <input type='text' className='input search-input' placeholder='搜尋產品'
                             value={this.state.searchText} onChange={this.handleChange} > 
                             {/* 可控組建的書寫法，和上面state handleChange是一套，可以回到檢查component state那邊輸入，他會在文字框中顯示 */}
                            </input>
                        </div>
                        <div className='control'>
                            <button className='button'
                            onClick={this.clearSearchText} >X</button>
                        </div>
                    </div>
                </div>
                {/* <div className='cart-box'> */}
                <div to="/cart" className='cart-box' onClick={this.goCart}>
                    <i className='fas fa-shopping-cart'></i>
                    <span className='cart-num'>({this.props.cartNum})</span>
                </div>
            </div>
        );
    }
}
 
export default withRouter(ToolBox);