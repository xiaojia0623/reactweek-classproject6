import { useEffect, useState } from "react";
//import './assets/all.scss'
import axios from "axios";
import ReactLoading from "react-loading";
import {useForm} from "react-hook-form";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const CartPage = () => {
    const [cart, setCart] = useState({});

    //全螢幕的loading
    const [screenLoading, setScreenLoading] = useState(false);

    const getCart = async () => {
        try{
        const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
        setCart(res.data.data);
        }catch(error){
        alert('取得購物車失敗')
        }
    }

    useEffect(() => {
        getCart();
    }, []);

    
    //清空購物車
    const removeCart = async () => {
        setScreenLoading(true)
        try{
          await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/carts`)
          getCart();
        }catch (error){
          alert('清除購物車失敗')
        }finally{
          setScreenLoading(false)
        }
    }
    
    //購物車內的"X"
    const removeCartItem = async (cartItem_id) => {
        setScreenLoading(true)
        try{
          await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/cart/${cartItem_id}`)
          getCart();
        }catch (error){
          alert('清除購物車商品失敗')
        }finally{
          setScreenLoading(false)
        }
    }
    
     //購物車商品數量
     const cartItemProduct = async (cartItem_id, product_id,qty) => {
      setScreenLoading(true)
      try{
        await axios.put(`${BASE_URL}/v2/api/${API_PATH}/cart/${cartItem_id}`, {
          data: {
            product_id,
            qty: Number(qty)
          }
        })
        getCart();
      }catch (error){
        alert('清除購物車商品失敗')
      }finally{
        setScreenLoading(false)
      }
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm()
      
    const onSubmit = handleSubmit((data) => {
        console.log(data);
        const {message, ...user} = data;
      
        const userInfo = {
          data:{
            user,
            message
          }
        }
        checkout(userInfo);
    })
    
      
    //結帳
    const checkout = async(data) => {
        setScreenLoading(true)
        try{
          await axios.post(`${BASE_URL}/v2/api/${API_PATH}/order`, data)
          setCart({})
          reset()
        }catch (error){
          alert('結帳失敗')
        }finally{
          setScreenLoading(false)
        }
    }

  return (
    <div className="container">
        <div>
            {cart.carts?.length > 0 ? (
                <div>
                    <div className="text-end py-3">
                        <button onClick={removeCart} className="btn btn-outline-danger" type="button">
                            清空購物車
                        </button>
                    </div>
    
                    <table className="table align-middle">
                        <thead>
                            <tr>
                                <th></th>
                                <th>品名</th>
                                <th style={{ width: "150px" }}>數量/單位</th>
                                <th className="text-end">單價</th>
                            </tr>
                        </thead>
        
                        <tbody>
                        {cart.carts?.map((cartItem) => (
                            <tr key={cartItem.id}>
                                <td>
                                    <button onClick={()=> removeCartItem(cartItem.id)} type="button" className="btn btn-outline-danger btn-sm">
                                    x
                                    </button>
                                </td>
                                <td>{cartItem.product.title}</td>
                                <td style={{ width: "150px" }}>
                                    <div className="d-flex align-items-center">
                                        <div className="btn-group me-2" role="group">
                                            <button
                                            onClick={() => cartItemProduct(cartItem.id, cartItem.product_id, cartItem.qty - 1)}
                                            type="button"
                                            disabled={cartItem.qty === 1}
                                            className="btn btn-outline-dark btn-sm"
                                            >
                                            -
                                            </button>
                                            <span
                                            className="btn border border-dark"
                                            style={{ width: "50px", cursor: "auto" }}
                                            >{cartItem.qty}</span>
                                            <button
                                            onClick={() => cartItemProduct(cartItem.id, cartItem.product_id, cartItem.qty + 1)}
                                            type="button"
                                            className="btn btn-outline-dark btn-sm"
                                            >
                                            +
                                            </button>
                                        </div>
                                        <span className="input-group-text bg-transparent border-0">
                                            {cartItem.product.unit}
                                        </span>
                                    </div>
                                </td>
                                <td className="text-end">{cartItem.total}</td>
                            </tr>
                        ))}
                        </tbody>
                        <tfoot>
                            <tr>
                            <td colSpan="3" className="text-end">
                                總計：
                            </td>
                            <td className="text-end" style={{ width: "130px" }}>{cart.total}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            ) : "" }
        </div>
            
        <div className="my-5 row justify-content-center">
            <form onSubmit={onSubmit} className="col-md-6">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  {...register('email', {
                    required: '此欄位必填',
                    pattern:{
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: '格式錯誤，請輸入正確Email'
                    }
                  })}
                  id="email"
                  type="email"
                  className= {`form-control ${errors.email && 'is-invalid'}`}
                  placeholder="請輸入 Email"
                />
    
                {errors.email && <p className="text-danger my-2">{errors.email.message}</p> }
              </div>
    
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  收件人姓名
                </label>
                <input
                {...register('name', {
                  required:'姓名欄位必填'
                })}
                  id="name"
                  className={`form-control ${errors.name && 'is-invalid'}`}
                  placeholder="請輸入姓名"
                />
    
                {errors.name && <p className="text-danger my-2">{errors.name.message}</p>}
              </div>
    
              <div className="mb-3">
                <label htmlFor="tel" className="form-label">
                  收件人電話
                </label>
                <input
                {...register('tel', {
                  required: '此欄位必填',
                  pattern:{
                    value: /^(0[2-8]\d{7}|09\d{8})$/,
                    message: '格式錯誤，請輸入正確電話'
                  }
                })}
                  id="tel"
                  type="text"
                  className={`form-control ${errors.tel && 'is-invalid'}`}
                  placeholder="請輸入電話"
                />
                {errors.tel && <p className="text-danger my-2">{errors.tel.message}</p>}
              </div>
    
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  收件人地址
                </label>
                <input
                  {...register('address', {
                    required: '此欄位必填'
                  })}
                  id="address"
                  type="text"
                  className={`form-control ${errors.address && 'is-invalid'}`}
                  placeholder="請輸入地址"
                />
    
                {errors.address && <p className="text-danger my-2">{errors.address.message}</p>}
              </div>
    
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  留言
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  className="form-control"
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <div className="text-end">
                <button type="submit" className="btn btn-danger">
                  送出訂單
                </button>
              </div>
            </form>
        </div>
    
        {screenLoading && (<div
            className="d-flex justify-content-center align-items-center"
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(255,255,255,0.3)",
              zIndex: 999,
            }}
          >
            <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
        </div>)}
    </div>
  )
}

export default CartPage
