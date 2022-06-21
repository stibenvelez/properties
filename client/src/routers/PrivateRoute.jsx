import SidebarAdmin from "components/SidebarAdmin/SidebarAdmin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { authAction } from "store/slice/auth/authActions";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch()
    const { auth, loading } = useSelector(({ auth }) => auth);
    
    useEffect(() => {
        (() => {
          dispatch(authAction());
      })()
    }, [])
    
    if (!auth && loading) return <div>hola</div>;
    
    return (
        <div className="flex">
            <SidebarAdmin />
            <div className="w-full">
                <Route
                    {...rest}
                    render={(props) =>
                        !auth? (
                            <Redirect to="/admin/login" />
                        ) : (
                            <Component {...props} />
                        )
                    }
                />
            </div>
            s
        </div>
    );
};

export default PrivateRoute;
