import React from 'react';
import Header from 'component/Header';

const Layout =props =>(
    <div className='main'>
        <Header />
    {/* Header下面，這裡的話要動態導入 ，又因為每一頁的header下面不一樣，所以我們要利用react內建函數，*/}
        {props.children}
    </div>
)

export default Layout;
