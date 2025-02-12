import { useEffect, useState } from "react";
//import './assets/all.scss'
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const ProductDetailPage = () => {
  const [product, setProduct] = useState({});
  const [qtySelect, setQtySelect] = useState(1);

  const [isLoading, setIsLoading] = useState(false)
  const [screenLoading, setScreenLoading] = useState(false);

  const {id: product_id} = useParams();

  useEffect(() => {
    const getProduct = async () => {
      setScreenLoading(true)
      try {
        const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/product/${product_id}`);
        setProduct(res.data.product);
      } catch (error) {
        alert("取得產品失敗");
      } finally{
        setScreenLoading(false)
      }
    };
    getProduct();
  }, []);

  const addCartItem = async (product_id, qty) => {
    setIsLoading(true)
    try{
      await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`,{
        data:{
          product_id,
          qty:Number(qty)
        }
      })
    }catch (error){
      alert('加入購物車失敗')
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-6">
            <img className="img-fluid rounded-3" src={product.imageUrl} alt={product.title} />
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center gap-2">
              <h2>{product.title}</h2>
              <span className="badge text-bg-success">{product.category}</span>
            </div>
            <p className="mb-3 fs-5">{product.description}</p>
            <p className="mb-3 fs-5">{product.content}</p>
            <h5 className="mb-3 fs-5">NT$ {product.price}</h5>
            <div className="input-group align-items-center w-75">
              <select
                value={qtySelect}
                onChange={(e) => setQtySelect(e.target.value)}
                id="qtySelect"
                className="form-select"
              >
                {Array.from({ length: 10 }).map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
              <button onClick={() => addCartItem(product_id, qtySelect)} type="button" className="btn btn-primary d-flex align-items-center gap-2" disabled={isLoading}>
                加入購物車
                {isLoading && (<div
                className="d-flex justify-content-center align-items-center"
                style={{
                  position: "fixed",
                  inset: 0,
                  backgroundColor: "rgba(255,255,255,0.3)",
                  zIndex: 999,
                }}>
                  <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
                </div>)}
              </button>
            </div>
          </div>
        </div>
      </div>

      {screenLoading && (<div
        className="d-flex justify-content-center align-items-center"
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(255,255,255,0.3)",
          zIndex: 999,
        }}>
        <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
      </div>)}
    </>
  )
}

export default ProductDetailPage
