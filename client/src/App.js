import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navlinks from "./components/Navigation/navlinks";
import Home from "./components/Home/index";
import CustomerSign from "./components/CustomerSign/CustomerSign";
import AdminSign from "./components/AdminSign/AdminSign";
import CustomerLogin from "./components/CustomerLogin/CustomerLogin";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import DashBoard from "./components/Dashboard/dashboard";
import PrivateAdminRoute from "./components/utils/privateAdminRoute";
import CreateProduct from "./components/Products/CreateProduct";
import UpdateProduct from "./components/Products/UpdateProduct";
import CreateCategory from "./components/Category/CreateCategory";
import ShowProducts from "./components/Products/ShowProducts";
import FilterProducts from "./components/Shop-Page/product";

const App = () => {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <button className="main-nav-menu-button">
            <span />
            <span />
            <span />
          </button>
          <nav>
            <Navlinks />
          </nav>
        </div>
        <Switch>
          <>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/customer-register" exact>
              <CustomerSign />
            </Route>
            <PrivateAdminRoute path="/admin-register" exact>
              <AdminSign />
            </PrivateAdminRoute>
            <Route path="/login-customer" exact>
              <CustomerLogin />
            </Route>
            <Route path="/login-admin" exact>
              <AdminLogin />
            </Route>

            <Route path="/products" exact>
              <FilterProducts />
            </Route>

            <PrivateAdminRoute
              path="/dashboard"
              component={DashBoard}
              exact
            ></PrivateAdminRoute>

            <PrivateAdminRoute
              path="/dashboard/create_p"
              component={CreateProduct}
              exact
            ></PrivateAdminRoute>
            <Route path="/dashboard/show_p" exact>
              <ShowProducts />
            </Route>

            <PrivateAdminRoute
              path="/dashboard/update_p/:prod_id"
              component={UpdateProduct}
              exact
            ></PrivateAdminRoute>

            <PrivateAdminRoute
              path="/dashboard/createupdate_c"
              component={CreateCategory}
              exact
            ></PrivateAdminRoute>
          </>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
