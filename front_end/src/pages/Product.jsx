import React from 'react';
import ProductHero from '../components/product/ProductHero';
import ProductRange from '../components/product/ProductRange';

const Product = () => {
  return (
    <div className="min-h-dvh bg-[#070707]">
      <ProductHero />
      <ProductRange />
    </div>
  );
};

export default Product;
