import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import Auth from "../utils/auth";

const Tables = () => {
    const tableId = localStorage.getItem('tableId');
    if ((tableId === undefined || tableId === null || tableId === "")) {
      
        window.location.assign('/');
      
    }

    if (!Auth.loggedIn()) {
        window.location.assign('/');
    }
    
  return (
    <div className="container">
      {/*<CategoryMenu />*/}
      <ProductList />
      <Cart />
    </div>
  );
};

export default Tables;
