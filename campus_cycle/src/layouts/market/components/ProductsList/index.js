import React from 'react';
import ProductCard from 'layouts/market/components/card';
import productsData from  'layouts/market/data/cardData';// Import your JSON data

import Grid from "@mui/material/Grid";

function ProductsList() {
  return (
    <Grid item>
      {productsData.map((index) => (
        <ProductCard
          key={productsData[index].id}
          id={productsData[index].id}
          image={productsData[index].images[0]} // Assuming first image is required
          description={productsData[index].description}
          date={productsData[index].date}
          price={productsData[index].price}
        />
      ))}
    </Grid>
  );
}

export default ProductsList;
