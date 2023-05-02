import React from 'react';
import { Link } from 'react-router-dom';
import './OrderHistory.css';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
    console.log(user);
  }

  return (
    <>
      <div className="container my-1">
        <Link to="/tableOrder" className="links-to-go">← Back to Products</Link>

        {user ? (
          <div className="space-between my-2 order-history">
            <h2>
              Order History for {user.firstName} {user.lastName}
            </h2>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h5>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h5>
                <div className="history">
                  {order.products.map(({ _id, image, name, price }, index) => (
                    <div key={index} className="card px-1 py-1">
                      <Link to={`/products/${_id}`}>
                        <div className='img-container'>
                          <img alt={name} src={`/images/${image}`} />
                        </div>
                        <div className="product-info">
                        <p className='product-name'>{name}</p>
                        <p className='product-price'>${price}</p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default OrderHistory;
