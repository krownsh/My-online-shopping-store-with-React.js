// 用來渲染到panel上

import React from "react";
import axios from "common/axios";
import { toast } from "react-toastify";
// 導入跳出視窗的那個插件

class Addinventory extends React.Component {
  state = {
    name: "",
    price: "",
    tags: "",
    image: "",
    status: "available",
  };
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
    axios.post("products", product).then((res) => {
      console.log(res.data);
      this.props.close(res.data);
    //   alert("新增成功");
      // 添加內容回json檔裡，但只有這裡還不會把內容再渲染回畫面
      toast.success('添加成功')
      //把我們的彈出組件帶進來
    });
  };


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
                        this.props.close('Addinventory'); */}
        {/* // 調用panel裡的colse參數
                    } }>Cancel</button>
                </div> */}
      </div>
    );
  }
}

export default Addinventory;
