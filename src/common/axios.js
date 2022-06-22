// https://github.com/axios/axios 官方說明文件
//這個是預先幫她做一個端口號的配置功能頁



import _axios from 'axios';

const axios = baseURL =>{  //念法 =>axios傳入一個baseURL參數，
    const instance = _axios.create({
        baseURL:baseURL || 'http://localhost:3004',  //念法=> axios如果有帶入baseURL的參數的話，就帶入baseURL，沒有的話就默認帶"網址"
        timeout: 1000,
        // headers: {'X-Custom-Header': 'foobar'}
      });
      //這是官方說明文件拿過來的
    return instance;
};
export {axios};  //如果有傳遞參數才傳這個 
export default axios();  //默認導出是不傳遞參數的


// 原本這樣寫就好了-----------------------------
// const instance = axios.create({
    // baseURL: 'http://localhost:3004',
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
//   });
  //這是官方說明文件拿過來的

// export default instance;
// 原本這樣寫就好了----------------------------------------
