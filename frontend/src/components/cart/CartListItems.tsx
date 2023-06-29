import React, { useState } from "react";
import CartListItem from "./CartListItem";
import { VStack } from "@chakra-ui/react";
import useFetchCart, { CartQuery } from "../../hooks/useFetchCart";
import cartActionSerivce from "../../services/cart-action-service";
import CartDTO from "../../type/CartDTO";
import PageableDTO from "../../type/PageableDTO";
interface Props {
  carts: CartDTO[];
  pageable: PageableDTO;
  setCarts: (carts: CartDTO[]) => void;
}
const CartListItems = ({ carts, pageable, setCarts }: Props) => {
  const onDelete = async (id: number) => {
    const originalCarts = carts;
    setCarts(carts.filter((c) => c.id !== id));
    if ((await cartActionSerivce.removeOutCart(id)) == false) {
      setCarts(originalCarts);
      alert("Không thể xóa sản phẩm, vui lòng thử lại.");
    }
  };

  return (
    <VStack width="100%">
      {carts.map((cart) => {
        return <CartListItem key={cart.id} cart={cart} onDelete={onDelete} />;
      })}
    </VStack>
  );
};

export default CartListItems;
