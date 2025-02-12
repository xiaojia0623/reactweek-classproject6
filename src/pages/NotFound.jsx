import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='notfound d-flex flex-column'>
      <h1>OOPS !!!</h1>
      <h2>404 目前無法找到您要的頁面</h2>
      <h3>可以點擊右邊按鈕 <Link to='/' className='text-decoration-none fs-3'>回到首頁</Link></h3>
    </div>
  )
}

export default NotFound
