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
import AuthorPage from "containers/AuthorPage/AuthorPage";
import AccountPage from "containers/AccountPage/AccountPage";
import AccountPass from "containers/AccountPage/AccountPass";
import AccountSavelists from "containers/AccountPage/AccountSavelists";
import AccountBilling from "containers/AccountPage/AccountBilling";
import PageContact from "containers/PageContact/PageContact";
import PageAbout from "containers/PageAbout/PageAbout";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSubcription from "containers/PageSubcription/PageSubcription";
import PageAddListing1 from "containers/PageAddListing1/PageAddListing1";
import PageAddListing2 from "containers/PageAddListing1/PageAddListing2";
import PageAddListing3 from "containers/PageAddListing1/PageAddListing3";
import PageAddListing4 from "containers/PageAddListing1/PageAddListing4";
import PageAddListing5 from "containers/PageAddListing1/PageAddListing5";
import PageAddListing6 from "containers/PageAddListing1/PageAddListing6";
import PageAddListing7 from "containers/PageAddListing1/PageAddListing7";
import PageAddListing8 from "containers/PageAddListing1/PageAddListing8";
import PageAddListing9 from "containers/PageAddListing1/PageAddListing9";
import PageAddListing10 from "containers/PageAddListing1/PageAddListing10";
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
    { path: "/author", component: AuthorPage },
    { path: "/account", component: AccountPage },
    { path: "/account-password", component: AccountPass },
    { path: "/account-savelists", component: AccountSavelists },
    { path: "/account-billing", component: AccountBilling },
    { path: "/add-listing-1", component: PageAddListing1 },
    { path: "/add-listing-2", component: PageAddListing2 },
    { path: "/add-listing-3", component: PageAddListing3 },
    { path: "/add-listing-4", component: PageAddListing4 },
    { path: "/add-listing-5", component: PageAddListing5 },
    { path: "/add-listing-6", component: PageAddListing6 },
    { path: "/add-listing-7", component: PageAddListing7 },
    { path: "/add-listing-8", component: PageAddListing8 },
    { path: "/add-listing-9", component: PageAddListing9 },
    { path: "/add-listing-10", component: PageAddListing10 },
    //
    { path: "/contact", component: PageContact },
    { path: "/about", component: PageAbout },
    { path: "/signup", component: PageSignUp },
    { path: "/login", component: PageLogin },
    { path: "/subscription", component: PageSubcription },
    //
    //
    { path: "/venta", component: SalesPropertiesPage },
    { path: "/arriendo", component: SalesPropertiesPage },
    { path: "/property/:id", component: PropertyDetailPage },
    //{ path: "/admin", component: AdminPage },
];

const Routes = () => {
  return (
      <BrowserRouter basename="/">
          <ScrollToTop />
          <SiteHeader />

          <Switch>
              {pages.map(({ component, path, exact }) => {
                  return (
                      <Route
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
              <Route path="/admin/login" exact component={LoginAdminPage} />
              <Route component={Page404} />
          </Switch>
          <Footer />
      </BrowserRouter>
  );
};

export default Routes;
