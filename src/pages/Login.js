import React from "react";


class Login extends React.Component {
  // state 跟 ref是類似概念=>參考07.08集
state = {
  email:'',
  password:''
}; 
handleChange = e =>{
  console.log(e.target.value);
   this.setState({
    // email:e.target.value.toUpperCase() 原本這樣寫就好，下一句的寫法是一種動態賦值的方法
    [e.target.name]:e.target.value.toUpperCase()
  
   })
}



// ref 用來獲取輸入的值( 這是非受控組建的寫法，我們沒辦法控制使用者所填入的值)
// emailRef = React.createRef();
// passwordRef = React.createRef();

handleSubmit = event =>{
  event.preventDefault();
  // 需要進行的步驟: 1.先阻止默認行為 

  //2.獲取表單數據 
  // console.log(this.emailRef) 先這樣去找到他的值，會發現一個current值
  // console.log(this.emailRef.current.value) 框框本身是一個current ，所以我要她的value
  // 被handleChange的state寫法取代
  // const formData = {
  //   email: this.emailRef.current.value,
  //   password:this.passwordRef.current.value
  // };
  console.log(this.state)



  //3.處理登入邏輯 
  //4.跳轉到首頁(到login頁面中檢查的component裡面有history它裡面寫的就是有關操作路由的方法，我們要用的是push方法)
  // this.props.history.push('/');



}

  render() {
    return (
      <React.Fragment>
        <div className="login-wrapper">
        <form className="box login-box" onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">帳號</label>
            <div className="control"> 
              <input className="input" type="text" placeholder="電子信箱" 
              value={this.state.email}
              onChange={this.handleChange}
              name="email"
              /> 
              {/* ref={this.emailRef}  ref是獲取資料的方法 */}
            </div>
          </div>
          <div className="field">
            <label className="label">密碼</label>
            <div className="control">
              <input className="input" type="text" placeholder="請輸入密碼" 
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
              />
              {/* 進行行為設定時要確保name和state設定的要一樣 */}
              {/* onChange當他值發生改變時要進行干預 */}
              {/*  ref={this.passwordRef}  ref這種獲取表格資料的方式應該避免過度使用 */}
            </div>
          </div>
          <div className="control">
            <button className="button is-danger bulma-control-mixin is-fullwidth">Submit</button>
          </div>

        </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
