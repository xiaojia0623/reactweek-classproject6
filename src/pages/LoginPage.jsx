import {  useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/all.scss';

const BASE_URL = import.meta.env.VITE_BASE_URL

const LoginPage = () => {

  //登入狀態，目前預設為false，若登入後就會是true狀態
  const [isLogin, setIsLogin] = useState(false);

  const [hasAttemptedLogin, setHasAttemptedLogin] = useState(false); // 是否已嘗試登入
  const [errorMessage, setErrorMessage] = useState("");

  //綁定帳號以及預設值
  const [myAccount, setMyAccount] = useState({
    username:'',
    password:''
  })

  //監聽輸入input事件，將myAccount綁定到事件內
  const handleInputChange = (e) => {
    const {value, name} = e.target;
    setMyAccount({
    ...myAccount,
    [name]: value
    });
  }

  //點擊登入按鈕去求api
  const handleLogin = async (e) => {
    e.preventDefault(); //移除原生預設事件(form表單)
    setHasAttemptedLogin(true);
    setErrorMessage("");

    try{ //串接登入api
        const res = await axios.post(`${BASE_URL}/v2/admin/signin`,myAccount);
        const {token, expired} = res.data;

        //將token存進cookie裡面
        document.cookie = `jiafei123456=${token}; expires=${new Date(expired)}`;

        //發動請求時headers都會帶上token
        axios.defaults.headers.common['Authorization'] = token;

        //getProducts();
        setIsLogin(true); //若已登入的狀態則顯示true
    }catch(error) {
        alert('登入有誤，請檢查帳號或密碼')
        setErrorMessage(error.response?.data?.message || '登入有誤，請檢查帳號或密碼')
    }
  }

  return (
    <div className='login-page d-flex'>
        <div >
            <h1>請先登入<span className='fs-3'>/ <Link to='/' className='text-decoration-none'>回到首頁</Link></span></h1>
            <form onSubmit={(e) => handleLogin(e)}>
                <div className="form-floating mb-3">
                    <input name='username' value={myAccount.username} onChange={handleInputChange} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input name='password' value={myAccount.password} onChange={handleInputChange} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="btn btn-primary w-100 mb-3">登入</button>
                {/* 透過三元運算值看看是否登入 */}
                {hasAttemptedLogin && (
                  <p className={ isLogin ? "fs-3 text-center bg-white text-success": "fs-3 text-center bg-white text-danger"}>
                    {isLogin ? '恭喜已登入!!' : errorMessage}
                  </p>
                )}
            </form>
        </div>

        
    </div>
  )
}

export default LoginPage
