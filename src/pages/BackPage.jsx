import { useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
//import './assets/all.scss'
import Pagination from '../components/Pagination';
import ProductModal from '../components/ProductModal';
import DeleteProductModal from '../components/DeleteProductModal';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const defaultModalMode = { //modal狀態的預設值
    imageUrl: "",
    title: "",
    category: "",
    unit: "",
    origin_price: "",
    price: "",
    description: "",
    content: "",
    is_enabled: 0,
    imagesUrl: [""]
};


const BackPage = () => {
    //產品資料(為陣列)
    const [products, setProducts] = useState([]);

    const [modalMode, setModalMode] = useState(null); //判斷是新增或是 編輯 的狀態

    //設為modal狀態預設值
    const [tempProduct, setTempProduct] = useState(defaultModalMode);

    //判斷確認Modal是開還是關，預設為關閉狀態
    const [isProductModalOpen, setIsProductModalOpen] = useState(false)

    //判斷確認刪除Modal是開還是關，預設為關閉狀態
    const [isDelProductModalOpen, setIsDelProductModalOpen] = useState(false)

    //取得後台產品資料
    const getProducts = async (page=1) => {
        try{ //串接產品api
        const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`);
        setProducts(res.data.products);
        setPageData(res.data.pagination)
        }catch(error) {
        alert('產品取得失敗!!')
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    //打開產品Modal
    const handleOpenProductModal = (mode, product) => {
        setModalMode(mode);
        
        switch(mode) {
        case 'create':
            setTempProduct(defaultModalMode);
            break;

        case 'edit':
            setTempProduct(product);
            break;

        default:
            break;
        }
        
        //modal的開關
        setIsProductModalOpen(true);
    }

    //打開刪除modal
    const handleOpenDelProductModal = (product) => {
        setTempProduct(product);
        setIsDelProductModalOpen(true);
    }

    //page 分頁區域
    const [pageData, setPageData] = useState({})

    //換頁功能 判斷當前是第幾頁並取得資料
    const handlePageChange = (page) => {
        getProducts(page)
    }

    //登入驗證確認
    const loginCheck = () => {
      axios.post(`${BASE_URL}/v2/api/user/check`)
        .then((res) => alert('使用者已登入'))
        .catch((error) => console.error(error))
    }

  return (
    <>
    <div className="container mt-5">
        <div className="row">
            <div className="col">
                <div className="d-flex justify-content-between">
                  <div className="d-flex justify-content-between">
                    <h2 className='fw-bold'>產品列表(後台) <span className='fs-3'>/ <Link to='/' className='text-decoration-none'>回到首頁</Link></span></h2>
                    <button onClick={loginCheck} type='button'className='btn btn-danger mb-3 ms-3'>確認是否已登入</button>
                  </div>
                    
                    <button onClick={() => handleOpenProductModal('create')} type="button" className="btn btn-primary mb-3">建立新的產品</button>
                </div>
                <table className="table" >
                    <thead>
                    <tr>
                        <th scope="col">產品名稱</th>
                        <th scope="col">原價</th>
                        <th scope="col">售價</th>
                        <th scope="col">是否啟用</th>
                        <th scope="col">編輯或刪除</th>
                    </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                        <tr key={product.id}>
                        <th scope="row">{product.title}</th>
                        <td>$ {product.origin_price}</td>
                        <td>$ {product.price}</td>
                        <td>{product.is_enabled ? (<span className="text-success">啟用</span>) : <span>未啟用</span>}</td>
                        <td>
                            <div className="btn-group">
                            <button onClick={() => handleOpenProductModal('edit', product)} type="button" className="btn btn-outline-primary btn-sm">編輯</button>
                            <button  onClick={() => handleOpenDelProductModal(product)} type="button" className="btn btn-outline-danger btn-sm">刪除</button>
                            </div>
                        </td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        <Pagination pageData={pageData} handlePageChange={handlePageChange}/>
    </div>
    <ProductModal getProducts={getProducts} tempProduct={tempProduct} modalMode={modalMode} isOpen={isProductModalOpen} setIsOpen={setIsProductModalOpen}/>
      

    <DeleteProductModal tempProduct={tempProduct} getProducts={getProducts} isOpen={isDelProductModalOpen} setIsOpen={setIsDelProductModalOpen}/>
    </>
  )
}

export default BackPage
