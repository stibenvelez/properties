import SidebarAdmin from "components/SidebarAdmin/SidebarAdmin";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { } = useSelector(({ auth }) => auth);
    let auth = true;
    return (
        <div className="flex">
            <SidebarAdmin />
            <div className="w-full">
                <Route
                    {...rest}
                    render={(props) =>
                        auth ? (
                            <Component {...props} />
                        ) : (
                            <Redirect to="/admin/login" />
                        )
                    }
                />
            </div>
        </div>
    );
};

export default PrivateRoute;
