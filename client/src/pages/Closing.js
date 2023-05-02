import React from 'react';
import { Link } from 'react-router-dom';
import './Closing.css';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_KITCHEN_ORDERS } from '../utils/queries';
import { DELETE_KITCHEN_ORDERS } from '../utils/mutations';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

function Closing() {
  var dish1 = [];
  var dish2 = [];
  var dish3 = [];
  var dish4 = [];
  var dish5 = [];
  var dish6 = [];
  var dish7 = [];
  var dish8 = [];
  var dish9 = [];
  var dish10 = [];
  var dish11 = [];
  var dish12 = [];
  var dish13 = [];
  var dish14 = [];
  var dish15 = [];
  var dish16 = [];
  var dish17 = [];
  var dish18 = [];
  var dish19 = [];
  var dish20 = [];
  var dish21 = [];
  var dish22 = [];
  var dish23 = [];
  var dish24 = [];
  var dish25 = [];
  var dish26 = [];
  var dish27 = [];
  var dish28 = [];

  const valid = localStorage.getItem('employee');
  if (valid !== 'true') {
    window.location.assign('/login');
  }

  const { data } = useQuery(QUERY_ALL_KITCHEN_ORDERS);
  let kitOrder;
  let totalPrice = 0;
  let combined = [];
  if (data) {
    kitOrder = data;
    // localStorage.setItem("kitOrder", JSON.stringify(kitOrder));
    localStorage.setItem("kitOrder", kitOrder);
    localStorage.setItem("ids", JSON.stringify(kitOrder.kitchenOrder.map((order) => order)));
    let comb = kitOrder.kitchenOrder.concat.apply([], kitOrder.kitchenOrder);
    //console.log("comb");
    //console.log(comb);
    //console.log(kitOrder.kitchenOrder.map((item) => item.products.map((product) => product)));
    const dishes = kitOrder.kitchenOrder.map((item) => item.products.map((product) => product));
    //console.log(dishes);
    combined = dishes.concat.apply([], dishes);
    localStorage.setItem("combined", combined);
    console.log(combined);
    totalPrice = combined.reduce((total, item) => total + item.price, 0);
    //console.log(totalPrice.toFixed(2));

    console.log(combined.length);

    combined.forEach((item) => {
      
      
      console.log(item.name);
      
    });
   
    
    dish1 = combined.filter((item) => item.name === "Steak & Eggs");
    dish2 = combined.filter((item) => item.name === "Sausage & Eggs");
    dish3 = combined.filter((item) => item.name === "Bacon & Eggs");
    dish4 = combined.filter((item) => item.name === "No Carbs");
    dish5 = combined.filter((item) => item.name === "Veggies, Hash & Eggs");
    dish6 = combined.filter((item) => item.name === "Bacon, Pancake & Eggs");
    dish7 = combined.filter((item) => item.name === "Sausage, Pancake & Eggs");
    dish8 = combined.filter((item) => item.name === "Eggs Benedict");
    dish9 = combined.filter((item) => item.name === "Eggs Caprese Benedict");
    dish10 = combined.filter((item) => item.name === "Eggs Bacon Benedict");
    dish11 = combined.filter((item) => item.name === "Eggs Florentine Benedict");
    dish12 = combined.filter((item) => item.name === "Pancakes");
    dish13 = combined.filter((item) => item.name === "Chocolate Chip Pancakes");
    dish14 = combined.filter((item) => item.name === "Strawberry Banana Pancakes");
    dish15 = combined.filter((item) => item.name === "Blueberry Pancakes");
    dish16 = combined.filter((item) => item.name === "Chocolate Filled Pancakes");
    dish17 = combined.filter((item) => item.name === "Wellness Blvd Smoothie");
    dish18 = combined.filter((item) => item.name === "Tropical Kiss Smoothie");
    dish19 = combined.filter((item) => item.name === "Red Very Berry Smoothie");
    dish20 = combined.filter((item) => item.name === "Coffee Smoothie");
    dish21 = combined.filter((item) => item.name === "Coffee");
    dish22 = combined.filter((item) => item.name === "Iced Coffee");
    dish23 = combined.filter((item) => item.name === "Potato Wedges");
    dish24 = combined.filter((item) => item.name === "Hash Browns");
    dish25 = combined.filter((item) => item.name === "French Fries");
    dish26 = combined.filter((item) => item.name === "Sauteed Vegetables");
    dish27 = combined.filter((item) => item.name === "Fruits");
    dish28 = combined.filter((item) => item.name === "Extra toast");

        
    dish1.quantity = dish1.length;
    dish2.quantity = dish2.length;
    dish3.quantity = dish3.length;
    dish4.quantity = dish4.length;
    dish5.quantity = dish5.length;
    dish6.quantity = dish6.length;
    dish7.quantity = dish7.length;
    dish8.quantity = dish8.length;
    dish9.quantity = dish9.length;
    dish10.quantity = dish10.length;
    dish11.quantity = dish11.length;
    dish12.quantity = dish12.length;
    dish13.quantity = dish13.length;
    dish14.quantity = dish14.length;
    dish15.quantity = dish15.length;
    dish16.quantity = dish16.length;
    dish17.quantity = dish17.length;
    dish18.quantity = dish18.length;
    dish19.quantity = dish19.length;
    dish20.quantity = dish20.length;
    dish21.quantity = dish21.length;
    dish22.quantity = dish22.length;
    dish23.quantity = dish23.length;
    dish24.quantity = dish24.length;
    dish25.quantity = dish25.length;
    dish26.quantity = dish26.length;
    dish27.quantity = dish27.length;
    dish28.quantity = dish28.length;

    dish1.name = "Steak & Eggs";
    dish2.name = "Sausage & Eggs";
    dish3.name = "Bacon & Eggs";
    dish4.name = "No Carbs";
    dish5.name = "Veggies, Hash & Eggs";
    dish6.name = "Bacon, Pancake & Eggs";
    dish7.name = "Sausage, Pancake & Eggs";
    dish8.name = "Eggs Benedict";
    dish9.name = "Eggs Caprese Benedict";
    dish10.name = "Eggs Bacon Benedict";
    dish11.name = "Eggs Florentine Benedict";
    dish12.name = "Pancakes";
    dish13.name = "Chocolate Chip Pancakes";
    dish14.name = "Strawberry Banana Pancakes";
    dish15.name = "Blueberry Pancakes";
    dish16.name = "Chocolate Filled Pancakes";
    dish17.name = "Wellness Blvd Smoothie";
    dish18.name = "Tropical Kiss Smoothie";
    dish19.name = "Red Very Berry Smoothie";
    dish20.name = "Coffee Smoothie";
    dish21.name = "Coffee";
    dish22.name = "Iced Coffee";
    dish23.name = "Potato Wedges";
    dish24.name = "Hash Browns";
    dish25.name = "French Fries";
    dish26.name = "Sauteed Vegetables";
    dish27.name = "Fruits";
    dish28.name = "Extra toast";


/*
for (let i = 0; i < 28; i++) {
  console.log( dish1.quantity);
  console.log( dish1.name);
  
}
*/
 /* console.log( dish1.quantity);
  console.log( dish1[0].name);
  dish1 = dish1[0].name + ' ' + dish1.quantity;
  console.log(dish1);
*/



/*
    dish1.forEach((item) =>
      console.log(item.quantity + " " + item.name)
      

    );
*/


    console.log(combined);
    
    const quantities = combined.map((item) => item.length);
    //console.log(names);
    for (let i = 0; i < quantities.length; i++) {
      //console.log(names[i]);

    }   

    const names = combined.map((item) => item.name);
    //console.log(names);
    for (let i = 0; i < names.length; i++) {
      //console.log(names[i]);

    }   
    console.log(names);
    console.log(quantities);
  }

  

  console.log("FINAL ORDERS");

  /*for (let i = 0; i < kitOrder.length; i++) {
    console.log(kitOrder.[i]._id);
  }
  */
  const [deleteKitchenOrders] = useMutation(DELETE_KITCHEN_ORDERS);

  const deleteAllKitchenOrders = async (event) => {
    event.preventDefault();
    let stat = "Delivered";
    let ids = localStorage.getItem("ids");
    const mutationResponse = await deleteKitchenOrders({
      variables: {
        _id: [ids],
      },
      return: window.location.reload(),
    });
    console.log("mutationResponse data");

  };
  //

  //
  return (
    <>
      <div className="container my-1">
        <Link to="/admin" className="links-to-go">← Admin</Link>
        <Link to="/pendingorders" className="links-to-go">← Pending Orders</Link>
        <h1 className="">Closing</h1>
        <a className="update-order order-status " onClick={deleteAllKitchenOrders}>Clear Kitchen Orders</a>
        <div className="orders-total">Today's Sales Total: $ {totalPrice.toFixed(2)}</div>
        <div className="orders-total">Total Orders: {combined.length}</div>
        <div className="dish">{dish1.name} {dish1.quantity}</div>
        <div className="dish">{dish2.name} {dish2.quantity}</div>
        <div className="dish">{dish3.name} {dish3.quantity}</div>
        <div className="dish">{dish4.name} {dish4.quantity}</div>
        <div className="dish">{dish5.name} {dish5.quantity}</div>
        <div className="dish">{dish6.name} {dish6.quantity}</div>
        <div className="dish">{dish7.name} {dish7.quantity}</div>
        <div className="dish">{dish8.name} {dish8.quantity}</div>
        <div className="dish">{dish9.name} {dish9.quantity}</div>
        <div className="dish">{dish10.name} {dish10.quantity}</div>
        <div className="dish">{dish11.name} {dish11.quantity}</div>
        <div className="dish">{dish12.name} {dish12.quantity}</div>
        <div className="dish">{dish13.name} {dish13.quantity}</div>
        <div className="dish">{dish14.name} {dish14.quantity}</div>
        <div className="dish">{dish15.name} {dish15.quantity}</div>
        <div className="dish">{dish16.name} {dish16.quantity}</div>
        <div className="dish">{dish17.name} {dish17.quantity}</div>
        <div className="dish">{dish18.name} {dish18.quantity}</div>
        <div className="dish">{dish19.name} {dish19.quantity}</div>
        <div className="dish">{dish20.name} {dish20.quantity}</div>
        <div className="dish">{dish21.name} {dish21.quantity}</div>
        <div className="dish">{dish22.name} {dish22.quantity}</div>
        <div className="dish">{dish23.name} {dish23.quantity}</div>
        <div className="dish">{dish24.name} {dish24.quantity}</div>
        <div className="dish">{dish25.name} {dish25.quantity}</div>
        <div className="dish">{dish26.name} {dish26.quantity}</div>
        <div className="dish">{dish27.name} {dish27.quantity}</div>
        <div className="dish">{dish28.name} {dish28.quantity}</div>




        
        
      </div>
    </>
  );
}

export default Closing;
