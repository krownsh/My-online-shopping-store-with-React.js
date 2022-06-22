import React from "react";

const Header = props =>(
  <div className="header">
  <div className="grid">
    <div className="start">
      <a href="/">HOME</a>
      {/* 這裡的空跳轉要用/而不是# */}
    </div>
    <div className="end">
        { props.nickname?(
        <span className="nickname">
            <i className="far fa-user"></i>
          {props.nickname}
          </span>
          ):(
            <React.Fragment>
            <a href="/">Login</a>
            <a href="/">Register</a>
            {/* react規定return只能回傳一個值，所以要把它包起來 */}
          </React.Fragment>
  
          )
        }
    </div>
  </div>
</div>

)



export default Header;
