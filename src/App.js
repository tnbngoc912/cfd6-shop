import "./assets/css/custom.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import store from "./redux";
import Home from "./page/home";
import TranslateProvider from "./core/Translate";
import vi from "./translate/vi.json";
import china from "./translate/china.json";
import auth from "./page/auth";
import Account from "./page/Account";
import ShippingAndReturns from "./page/Account";
import About from "./page/About";
import StoreLocator from "./page/StoreLocator";
import ShoppingCart from "./page/ShoppingCart";
import FAQ from "./page/FAQ";
import Catalog from "./page/Catalog";
import ProductDetail from "./page/ProductDetail";
import ContactUs from "./page/ContactUs";
import Checkout from "./page/Checkout";
import ComingSoon from "./page/ComingSoon";
import OrderCompleted from "./page/OrderCompleted";
import Page404 from "./page/Page404";
import { PrivateRoute } from "./core/PrivateRoute";

let translate = {
  vn: vi,
  china
};

function App() {
  return (
    <TranslateProvider translate={translate}>
      <Provider store={store}>
        <BrowserRouter>
          <MainLayout>
            <Switch>
              <PrivateRoute path="/account" component={Account} />
              <Route
                path="/shipping-and-returns"
                component={ShippingAndReturns}
              />
              <Route path="/about" component={About} />
              <Route path="/store-locator" component={StoreLocator} />
              <Route path="/shopping-cart" component={ShoppingCart} />
              <Route path="/faq" component={FAQ} />
              <Route path="/catalog/:slug?" component={Catalog} />
              <Route path="/product/:slug" component={ProductDetail} />
              <Route path="/contact-us" exact component={ContactUs} />
              <Route path="/checkout" exact component={Checkout} />
              <Route path="/auth" exact component={auth} />
              <Route path="/coming-soon" exact exact component={ComingSoon} />
              <Route path="/order-completed/:_id" component={OrderCompleted} />
              <Route path="/" exact component={Home} />
              <Route path="/" component={Page404} />
            </Switch>
          </MainLayout>
        </BrowserRouter>
      </Provider>
    </TranslateProvider>
  );
}

export default App;
