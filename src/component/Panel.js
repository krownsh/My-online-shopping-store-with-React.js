import React from "react";
import { render } from "react-dom";

class Panel extends React.Component {
  state = {
    active: false,
    component: null,
    callback: () => {},
  };
  open = (
    options = {
      props: {},
      component: null,
      callback: () => {},
    }
  ) => {
    const { props, component, callback } = options;
    //     props讓他可以在editinventory修口內容可以再傳回
    const _key = new Date().getTime();
    // 每次打開都重新渲染，產生不同的值
    const _component = React.createElement(component, {
      ...props,
      close: this.close,
      key: _key,
    });
    this.setState({
      active: true,
      component: _component,
      callback: callback,
    });
  };
  close = (data) => {
    this.setState({
      active: false, //按叉叉關閉的部分，所以下面也要給他一個onclick功能
    });
    this.state.callback(data);
  };

  render() {
    const _class = {
      true: "panel-wrapper active",
      false: "panel-wrapper",
    };
    return (
      // <div className='panel-wrapper active'>
      <div className={_class[this.state.active]}>
        <div
          className="over-layer"
          onClick={() => {
            this.close();
          }}
        ></div>
        {/* 寫這裡是點擊外面就可以讓它消失的方式 */}
        <div className="panel">
          <div className="head">
            <span
              className="close"
              onClick={() => {
                this.close();
              }}
            >
              X
            </span>
            {/* <p className='has-text-centered'>Children Component</p> */}
            {this.state.component}
          </div>
        </div>
      </div>
    );
  }
}

const _div = document.createElement("div");
document.body.appendChild(_div);
// root根是用來乘載router的，這個panel板是可以到處隨呼叫的

const _Panel = render(<Panel />, _div);

export default _Panel;
// 導出的不只是一個模板，是一個實際加載完成的對象，在哪個位置引用他，就可以在哪個位置叫出他
