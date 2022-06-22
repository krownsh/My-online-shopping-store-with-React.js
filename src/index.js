import React from "react";
import ReactDOM from "react-dom";
// import Login from './component/Login.js'
// import App from 'component/App'
import Router from "Router";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "css/app.scss";
import "css/style.scss";

// 在App.js這個頭部代碼中最好使用絕對路徑，避免進行修改時，還要去考慮路徑(就不用./或是../的寫法)
//他直接把src資料夾當作一個絕對目錄(這是因為我的使用create-react-app 已經設置好的效果)

// class Login extends React.Component {
//     // state = {  }
//     render() {
//         return (
//             <p>Login page</p>
//         );
//     }
// }

ReactDOM.render(
  <div>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <Router />
  </div>,
  document.getElementById("root")
);
// 原本是渲染App，但把路由製作起來後，直接把路由灌入即可

//https://github.com/lirenmi/react-store-start
// 老師的github有備份

//添加路由的方式
//1. npm install react-router-dom@5.2.0(記得是5.2.0的不然6以後寫法是不同的)
// 2.在跟目錄建立一的Router.js負責收納
