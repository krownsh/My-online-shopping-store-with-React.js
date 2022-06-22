import React from 'react';
// import Header from 'component/Header';  改用LAYOUT公版
import Products from 'component/Products';
import Layout from 'Layout';

// 在App.js這個頭部代碼中最好使用絕對路徑，避免進行修改時，還要去考慮路徑(就不用./或是../的寫法)
//他直接把src資料夾當作一個絕對目錄(還要再跟目錄設置一個jsconfig.json檔案)


class App extends React.Component {
    state = {  } 
    render() { 
        return (
            // <div className='main'>
            //     <Header nickname="admin" age={28} marry={true}/>
            //     <Products />
            // </div>
            <Layout>
                <Products />
            </Layout>
        );
    }
}
 
export default App;
