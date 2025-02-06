"use client";  // Esto indica que este componente es cliente

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ProductPrice } from "@prisma/client";

interface ClientPriceDisplayProps {
  defaultPrice: ProductPrice
}

const PriceDisplay = ({ defaultPrice }: ClientPriceDisplayProps) => {
  // Obtén el precio seleccionado desde Redux
  
  const selectedPrice = useSelector((state: RootState) => state.price.selectedprice);
  console.log("Selected Price from Redux: ", selectedPrice);

  return (
    <p className="text-xl font-semibold mb-2">Precio: ${selectedPrice ? selectedPrice.price.toFixed(2) : defaultPrice.price.toFixed(2)}</p>
  );
};

export default PriceDisplay;
