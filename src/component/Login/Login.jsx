import React, {useState} from 'react'
import './Login.css'

import user from '../../assets/person.png'
import email from '../../assets/email.png'
import password from '../../assets/password.png'

const Login = () => {
const [action,setAction] = useState("Login")

  return (
    <div className="login-container">
        <div className="login-header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <div className="login-input">
            {action==="Login"?<div></div>:<div className="input">
                <img src={user} alt="" />
                <input type="text" placeholder="Nama"/>
            </div>}
            
            <div className="input">
                <img src={email} alt="" />
                <input type="email" placeholder='Email'/>
            </div>
            <div className="input">
                <img src={password} alt="" />
                <input type="password" placeholder='Password'/>
            </div>
        </div>
        {action==="Register"?<div></div>:<div className="lupa-password">Lupa passworld? <a href=""><span>Klik disini!</span></a></div>}
        <div className="submit-container">
            <div className={action==="Register"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
            <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Register")}}>Register</div>
        </div>
    </div>
  )
}

export default Login;
