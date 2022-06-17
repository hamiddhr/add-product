import React, { useEffect, useState } from "react";

import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://products-b701a-default-rtdb.firebaseio.com/products.json")
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        const loadedProducts = [];

        for (const item in responseData) {
          loadedProducts.push({
            id: item,
            title: responseData[item].title,
            amount: responseData[item].amount,
          });
        }
        setProducts(loadedProducts);
      });
  }, []);

  const addProductHandler = (item) => {
    fetch("https://products-b701a-default-rtdb.firebaseio.com/products.json", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      response.json().then((responseData) => {
        setProducts((prevState) => {
          return [
            ...prevState,
            {
              id: responseData.name,
              ...item,
            },
          ];
        });
      });
    });
  };
  return (
    <div className="App">
      <ProductForm onAddProduct={addProductHandler} />
      <ProductList products={products} />
    </div>
  );
}

export default Products;
