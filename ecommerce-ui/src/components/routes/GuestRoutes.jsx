
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"

const guestRoutes = [
    {
        path: "/register",
        element:<Register/>
    },
    {
        path: "/login",
        element:<Login/>
    }
]

export default guestRoutes