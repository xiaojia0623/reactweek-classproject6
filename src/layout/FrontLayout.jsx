
import { NavLink, Outlet } from 'react-router-dom'

const routes = [
    { path: "/", name: "首頁" },
    { path: "/products", name: "產品列表" },
    { path: "/cart", name: "購物車" },
    { path: "/login", name: "登入頁面" },
];

const FrontLayout = () => {
  return (
    <>
        <nav className="navbar bg-success p-2 text-white bg-opacity-75 border-bottom border-body" data-bs-theme="light">
            <div className="container">
                <ul className="navbar-nav flex-row gap-5 fs-5">
                    {routes.map((route) => (
                        <li key={route.path} className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to={route.path}>{route.name}</NavLink>
                    </li>
                    ))}
                </ul>
            </div>
        </nav>

        <Outlet />
    </>
  )
}

export default FrontLayout
