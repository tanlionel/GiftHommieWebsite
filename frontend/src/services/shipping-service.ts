import axios from "axios";
import GHN from "../data/GHN";
import CheckoutDTO from "../type/CheckoutDTO";
import ShippingDTO from "../type/ShippingDTO";

let previewOrder = async (
  checkoutData: CheckoutDTO,
  setCheckoutData: (checkoutData: CheckoutDTO) => void
) => {
  const data = {
    payment_type_id: 2,
    note: "",
    from_name: "Hommie Store",
    from_phone: "0934968393",
    from_address: " Lô E2a-7, Đường D1, Đ.01",
    from_ward_name: "Phường Long Thạnh Mỹ",
    from_district_name: "Quận 9",
    from_province_name: "TP Hồ Chí Minh",
    required_note: "CHOXEMHANGKHONGTHU",

    client_order_code: "",
    to_name: checkoutData.name || "Độ Mixi",
    to_phone: checkoutData.phone || "0909998877",
    to_address: checkoutData.address || "Streaming house",
    to_ward_code: checkoutData.wardCode.toString(),
    to_district_id: checkoutData.districtID.toString(),
    to_province_id: checkoutData.provinceID.toString(),
    // client_order_code: "",
    // to_name: "Độ Mixi",
    // to_phone: "0909998877",
    // to_address: "Streaming house",
    // to_ward_name: "Phường 14",
    // to_district_name: "Quận 10",
    // to_province_name: "TP Hồ Chí Minh",

    cod_amount:
      checkoutData.paymentMethod == 1
        ? checkoutData.carts.reduce((total, cart) => total + cart.total, 0)
        : 0,
    content: "HommieStore | Quà tặng đến bạn.",
    weight: 200,
    length: 10,
    width: 20,
    height: 10,
    pick_station_id: 1444,
    deliver_station_id: null,
    insurance_value: checkoutData.carts.reduce(
      (total, cart) => total + cart.total,
      0
    ),
    service_id: 0,
    service_type_id: checkoutData.shippingMethod || 2,
    coupon: null,
    pick_shift: null,
    pickup_time: 1665272576,
    items: checkoutData.carts.map((cart) => ({
      name: cart.product.name,
      code: cart.product.id.toString(),
      quantity: cart.quantity,
      price: cart.product.price,
      length: 20,
      width: 200,
      height: 10,
      category: {
        level1: cart.product.categoryName,
      },
    })),
  };
  const url = GHN.orderUrls.preview;

  let result = {} as ShippingDTO;
  (async () => {
    await axios
      .post(url, data, {
        headers: { "Content-Type": "application/json", token: GHN.token },
      })
      .then((response) => {
        result = response.data.data as ShippingDTO;
        setCheckoutData({
          ...checkoutData,
          shippingFee: result.total_fee,
          expectedDeliveryTime: result.expected_delivery_time,
        });
      });
  })();
};

export default {
  getPreviewOrder: previewOrder,
};
