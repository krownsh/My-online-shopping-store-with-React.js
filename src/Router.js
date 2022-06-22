import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from 'pages/App';
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';
import Cart from 'pages/Cart';



const Router =() =>(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={App} />  
            {/* 針對根路徑需要提供 exact 是精確匹配的意思 */}
            {/* 這個path是根路徑的意思，但實際網址不用在最後加/ */}
            {/* 前面是路徑。後念是你這個路徑要渲染甚麼組件 */}
            <Route path="/login" component={Login} />  
            <Route path="/cart" component={Cart} />  
            <Route component={NotFound} />  
            {/* NotFound沒有給他路徑，是指只要沒有定義的路徑都走向NotFound */}
        </Switch>
    </BrowserRouter>
)

export default Router;

// 因為使用者會有可能走道錯誤路徑，所以要再為他設定一個404NotFound.js