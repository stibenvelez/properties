import SidebarAdmin from "components/SidebarAdmin/SidebarAdmin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Footer from "shared/Footer/Footer";
import { authAction } from "store/slice/auth/authActions";

const PublicRoute = ({ component: Component, ...rest }) => {
    
    return (
        <>
            <Route {...rest} render={(props) => <Component {...props} />} />
            <Footer />
        </>
    );
};

export default PublicRoute;
