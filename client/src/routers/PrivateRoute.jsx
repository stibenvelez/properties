import SideBarAdmin from "components/SidebarAdmin/SideBarAdmin";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { auth } = useSelector(({ auth }) => auth);
    return (
        <div className="flex">
            <SideBarAdmin />
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
