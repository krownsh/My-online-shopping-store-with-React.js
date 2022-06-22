// 用來渲染到panel上

import React from "react";
import axios from "common/axios";
import { toast } from "react-toastify";
// 導入跳出視窗的那個插件

class Editinventory extends React.Component {
  state = {
    name: '',
    // name: this.props.product.name,  這個方式給傳回編輯那邊也可以，但我們採用下面的生命週期方式]
    price: "",
    tags: "",
    image: "",
    status: "available",
  };

  componentDidMount(){
    const { id, name, tags, image, price, status } = this.props.product; 
    // 從product那邊再拉過來，但需要再多提供一個id欄位
    this.setState({
      id:id,
      name:name,
      image:image,
      tags:tags,
      price:price,
      status:status,
    })
    
  }

  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value,
    });
  };

  submit = (e) => {
    e.preventDefault();
    const product = { ...this.state };
    console.log(product);
    // axios.post("products", product).then((res) => {   這是新增所以用post方法
      axios.put(`products/${this.state.id}`, product).then((res) => {

      console.log(res.data);
      this.props.close(res.data);
    //   alert("新增成功");
      // 添加內容回json檔裡，但只有這裡還不會把內容再渲染回畫面
      toast.success('修改成功')
      //把我們的彈出組件帶進來
    });
  };


  onDelete =() =>{
    axios.delete(`products/${this.state.id}`).then((res) => {
      this.props.deleteProduct(this.state.id);
      this.props.close();
      toast.success('刪除成功')
    });

  }




//   showToast =() =>{
    // 把它裡面有的效果都給帶進來
//     toast('default');
//     toast.info('info');
//     toast.success('success');
//     toast.warning('warning');
//     toast.error('error');

//   };測試用


  render() {
    return (
      <div className="inventory">
        <p className="title has-text-centered">Inventory</p>
        <form onSubmit={this.submit}>
          <div className="field">
            <label className="label">Message</label>
            <div className="control">
              <textarea
                className="textarea"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              {/* react裡對於textarea有不一樣的設定，去看官方文件 */}
            </div>
          </div>
          <div className="field">
            <label className="label">Price</label>
            <div className="control">
              <input
                type="number"
                className="input"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Tags</label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="tags"
                value={this.state.tags}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Image</label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="image"
                value={this.state.image}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <br />
          <div className="field">
            <label className="label">Status</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  name="status"
                  value={this.state.status}
                  onChange={this.handleChange}
                >
                  <option>available</option>
                  <option>unavailable</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
            <div className="control">
              <button className="button is-danger" type="button" onClick={this.onDelete}>Delete</button>
            </div>
            <div className="control">
              <button
                className="button"
                type="button"
                onClick={() => {
                  this.props.close();
                }}
              >
                Cancel
              </button>
            </div>
            {/* <div className="control">
                <button className="button is-primary"
                type="button"
                onClick={this.showToast}>  */}
                {/* 另外定義這個函數 */}
                    {/* Show
                </button>
            </div>       測試用*/}
          </div>
        </form>

        {/* <div className='control'>
                    <input type='text' className='input'></input>
                </div>
                <div className='control'>
                    <button className='button' onClick={() =>{
                        this.props.close('Editinventory'); */}
        {/* // 調用panel裡的colse參數
                    } }>Cancel</button>
                </div> */}
      </div>
    );
  }
}

export default Editinventory;
