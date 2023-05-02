import React, { useRef, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { ADD_KITCHEN_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';




function Success() {
  const [addOrder] = useMutation(ADD_ORDER);
  //
  const [addKitchenOrder] = useMutation(ADD_KITCHEN_ORDER);
  //

  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
    localStorage.setItem('userName', JSON.stringify(user));
  }

  //
  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const products = [];
      const productsList = [];
      console.log("cart");
      console.log(cart);

      localStorage.setItem("cart", JSON.stringify(cart));

      const kitchenOrder = cart.map((item) => item._id);
      console.log("kitchenOrder");
      console.log(kitchenOrder);
      localStorage.setItem("kitchenOrder", JSON.stringify(kitchenOrder));
      ///

      cart.forEach((item) => {

        for (let i = 0; i < item.purchaseQuantity; i++) {
          console.log(item.name);
          console.log(item.purchaseQuantity);
          products.push(item._id);
          productsList.push(item._id, item.name);

          localStorage.setItem("productsProper", products);
        }
        console.log("state.cart item");
        localStorage.setItem("products", JSON.stringify(products));
        localStorage.setItem("productsList", JSON.stringify(productsList));
        console.log("products");
        console.log(products);
      });

      //test code below addKitchenOrder

      console.log("products");
      console.log(products);
      console.log("tableNumber");
      console.log(localStorage.getItem("tableId"));

      const userName = (localStorage.getItem("userName"));
      console.log("userName");
      const userCurrent = JSON.parse(userName);
      console.log(userCurrent.firstName);
      console.log(userCurrent.lastName);
      const nombre = (userCurrent.firstName);
      console.log("nombre");
      console.log(nombre);
      console.log(productsList);
      const tableNumber = localStorage.getItem("tableId");

      //
      const mutationResponse = await addKitchenOrder({
        variables: {
          products: products,
          tableNumber: tableNumber,
          userName: nombre,
        },

      });
      const kitorder = mutationResponse.data.addKitchenOrder;
      //console.log("data");
      //onsole.log(mutationResponse.data);
      console.log("kitorder");
      console.log(kitorder);
      localStorage.setItem("addKitchecnMutationResponse", JSON.stringify(mutationResponse.data));
   
      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        console.log("data");
        const productData = data.addOrder.products;
        localStorage.setItem('order', JSON.stringify(productData));
        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }


      setTimeout(() => {
        console.log('Order placed! You will now be redirected to the home page.');
        
        window.location.assign('/receipt');
      }, 3000);
    }

    saveOrder();

  }, [addOrder, addKitchenOrder]);

  return (
    <div className="success-children">
      <Jumbotron>
        <h1>💸👍</h1>
        <h2>Your server will bring your order when ready!</h2>
        <h4>You will now be redirected to your receipt</h4>
      </Jumbotron>
    </div>

  );
}

export default Success;
