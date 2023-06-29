import React, { useState } from "react";
import CustomerOrderTabs from "./CustomerOrderTabs";
import CustomerOrderItems from "./CustomerOrderItems";
import { Box, Card, HStack, VStack, Text } from "@chakra-ui/react";
import CustomerOrderOrder from "./CustomerOrderOrder";
import useFetchCustomerOrder, {
  CustomerOrderQuery,
} from "../../hooks/useFetchCustomerOrder";
import Pagination from "../Pagination";
import OrderDTO from "../../type/OrderDTO";

const CustomerOrderList = () => {
  const [customerOrderQuery, setCustomerOrderQuery] = useState({
    size: 4,
  } as CustomerOrderQuery);
  const { orders, pageable, error, setOrders } =
    useFetchCustomerOrder(customerOrderQuery);

  const setOrder = (order: OrderDTO) => {
    setOrders(orders.map((o) => (o.id != order.id ? o : order)));
  };

  const onStatus = (status: string) => {
    setCustomerOrderQuery({ ...customerOrderQuery, status });
  };

  return (
    <VStack w="100%" spacing="4" paddingX="4" mb="12">
      <CustomerOrderTabs onStatus={onStatus} />
      {!orders?.length ? (
        <Card width={"100%"} p="4">
          <Text size="lg" textAlign="center">
            Bạn không có đơn hàng nào ở mục này.
          </Text>
        </Card>
      ) : (
        <VStack w="100%" paddingX="8" spacing="4">
          {orders.map((order) => (
            <CustomerOrderOrder
              key={order.id}
              order={order}
              setOrder={setOrder}
            />
          ))}
        </VStack>
      )}
      {orders?.length && (
        <Pagination
          pageable={pageable}
          onSelectPageIndex={(index: number) =>
            setCustomerOrderQuery({ ...customerOrderQuery, page: index })
          }
        />
      )}
    </VStack>
  );
};

export default CustomerOrderList;
