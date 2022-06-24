import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "shared/Footer/Footer";
import PageHome from "containers/PageHome/PageHome";
import Page404 from "containers/Page404/Page404";
import ListingStayPage from "containers/ListingStayPage/ListingStayPage";
import ListingStayMapPage from "containers/ListingStayPage/ListingStayMapPage";
import ListingStayDetailPage from "containers/ListingDetailPage/ListingStayDetailPage";
import ListingExperiencesDetailPage from "containers/ListingDetailPage/ListingExperiencesDetailPage";
import ListingCarDetailPage from "containers/ListingDetailPage/ListingCarDetailPage";
import CheckOutPage from "containers/CheckOutPage/CheckOutPage";
import PayPage from "containers/PayPage/PayPage";
import AccountPass from "containers/AccountPage/AccountPass";
import AccountSavelists from "containers/AccountPage/AccountSavelists";
import AccountBilling from "containers/AccountPage/AccountBilling";
import PageContact from "containers/PageContact/PageContact";
import PageAbout from "containers/PageAbout/PageAbout";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageLogin from "containers/PageLogin/PageLogin";
import PageHome2 from "containers/PageHome/PageHome2";
import ListingRealEstateMapPage from "containers/ListingRealEstatePage/ListingRealEstateMapPage";
import ListingRealEstatePage from "containers/ListingRealEstatePage/ListingRealEstatePage";
import SiteHeader from "containers/SiteHeader";

import SalesPropertiesPage from "containers/SalesPropertiesPage/SalesPropertiesPage";
import PropertyDetailPage from "containers/PropertyDetailPage/PropertyDetailPage";
import AdminPage from "containers/AdminPage/AdminPage";
import PrivateRoute from "./PrivateRoute";
import LoginAdminPage from "containers/LoginAdminPage/LoginAdminPage";
import PropertiesPage from "containers/PropertiesPage/PropertiesPage";
import UsersPage from "containers/UsersPage/UsersPage";
import AddUserPage from "containers/AddUserPage/AddUserPage";
import FormForgetPassword from "components/FormForgetPassword/FormForgetPassword";
import ForgetPasswordPage from "containers/ForgetPasswordPage/ForgetPasswordPage";
import NewPasswordPage from "containers/NewPasswordPage/NewPasswordPage";
import ConfirmUserPage from "containers/ConfirmUserPage/ConfirmUserPage";
import NewPropertyPage from "containers/NewPropertyPage/NewPropertyPage";
import ProfilePage from "containers/ProfilePage/ProfilePage";
import PublicRoute from "./PublicRoute";
import UserPage from "containers/UserPage/UserPage";
import PropertyDetailAdmin from "containers/PropertyDetailAdminPage/PropertyDetailAdminPage";
import EditPropertyPage from "containers/EditPropertyPage/EditPropertyPage";

export const pages: Page[] = [
    { path: "/", exact: true, component: PageHome },
    { path: "/#", exact: true, component: PageHome },
    { path: "/home-1-header-2", exact: true, component: PageHome },
    { path: "/home-2", component: PageHome2 },
    { path: "/listing-stay", component: ListingStayPage },
    { path: "/listing-stay-map", component: ListingStayMapPage },
    { path: "/listing-stay-detail", component: ListingStayDetailPage },

    //
    {
        path: "/listing-experiences-detail",
        component: ListingExperiencesDetailPage,
    },
    //
    { path: "/listing-car-detail", component: ListingCarDetailPage },
    //
    { path: "/listing-real-estate-map", component: ListingRealEstateMapPage },
    { path: "/listing-real-estate", component: ListingRealEstatePage },
    //
    { path: "/checkout", component: CheckOutPage },
    { path: "/pay-done", component: PayPage },
    //
    { path: "/account-password", component: AccountPass },
    { path: "/account-savelists", component: AccountSavelists },
    { path: "/account-billing", component: AccountBilling },
    //
    { path: "/contact", component: PageContact },
    { path: "/about", component: PageAbout },
    { path: "/signup", component: PageSignUp },
    { path: "/login", component: PageLogin },
    //
    //
    { path: "/venta", component: SalesPropertiesPage },
    { path: "/arriendo", component: SalesPropertiesPage },
    { path: "/property/:id", component: PropertyDetailPage },
];

const Routes = () => {
    return (
        <BrowserRouter basename="/">
            <ScrollToTop />
            <SiteHeader />

            <Switch>
                {pages.map(({ component, path, exact }) => {
                    return (
                        <PublicRoute
                            key={path}
                            component={component}
                            exact={!!exact}
                            path={path}
                        />
                    );
                })}
                <PrivateRoute path="/admin" exact component={AdminPage} />
                <PrivateRoute
                    path="/admin/inmuebles"
                    exact
                    component={PropertiesPage}
                />
                <PrivateRoute
                    path="/admin/property/:id"
                    exact
                    component={PropertyDetailAdmin}
                />
                <PrivateRoute
                    path="/admin/nuevo-inmueble"
                    exact
                    component={NewPropertyPage}
                />
                <PrivateRoute
                    path="/admin/editar-inmueble/:id"
                    exact
                    component={EditPropertyPage}
                />
                <PrivateRoute path="/admin/users" exact component={UsersPage} />
                <PrivateRoute
                    path="/admin/users/get-user/:id"
                    exact
                    component={UserPage}
                />
                <PrivateRoute
                    path="/admin/users/add-user"
                    exact
                    component={AddUserPage}
                />
                <PrivateRoute
                    path="/admin/users/forget-password"
                    exact
                    component={ForgetPasswordPage}
                />
                <PrivateRoute
                    path="/admin/users/forget-password/:token"
                    exact
                    component={NewPasswordPage}
                />
                <PublicRoute
                    path="/confirm/:token"
                    exact
                    component={ConfirmUserPage}
                />
                <PublicRoute
                    path="/admin/login"
                    exact
                    component={LoginAdminPage}
                />
                <PrivateRoute
                    path="/admin/profile/:id"
                    exact
                    component={ProfilePage}
                />
                <Route component={Page404} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
