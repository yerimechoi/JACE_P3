import React, { useEffect, useState } from 'react';
import MenuItems from '../MenuItems';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS, UPDATE_CATEGORIES } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS, QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function ProductList() {
  const [state, dispatch] = useStoreContext();
  const [visibleCategories, setVisibleCategories] = useState({});

  const { loading: loadingProducts, data: productData } = useQuery(QUERY_PRODUCTS);
  const { loading: loadingCategories, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (productData) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: productData.products,
      });
      productData.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loadingProducts) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }

    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });

      const newVisibleCategories = {};
      categoryData.categories.forEach((category) => {
        newVisibleCategories[category._id] = true;
      });
      setVisibleCategories(newVisibleCategories);
    }
  }, [productData, loadingProducts, categoryData, dispatch]);

  function renderProductsByCategory(categoryId) {
    if (!visibleCategories[categoryId]) {
      return null;
    }

    return state.products
      .filter((product) => product.category._id === categoryId)
      .map((product) => (
        <MenuItems
          key={product._id}
          _id={product._id}
          image={product.image}
          name={product.name}
          price={product.price}
          quantity={product.quantity}
        />
      ));
  }

  function toggleCategoryVisibility(categoryId) {
    setVisibleCategories((prevVisibleCategories) => ({
      ...prevVisibleCategories,
      [categoryId]: !prevVisibleCategories[categoryId],
    }));
  }

  return (
    <div className="my-2">
      {state.categories.map((category) => (
        <div key={category._id}>
          <h2 className="category-menu" onClick={() => toggleCategoryVisibility(category._id)}>{category.name}</h2>
          <div className="flex-row">{renderProductsByCategory(category._id)}</div>
        </div>
      ))}
      {(loadingProducts || loadingCategories) ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;