import cartApi from "../../../../service/cartApi";
import Pagination from "../../../../component/Pagination";
import React, { useEffect, useState } from "react";
import OrderItem from "./OrderItem";

export default function OrderList() {
  let [state, setState] = useState({
    list: [],
    paginate: null
  });
  useEffect(() => {
    cartApi.getAllOrder().then(res => {
      setState({
        list: res.data,
        paginate: res.paginate
      });
    });
  }, []);

  return (
    <div className="col-12 col-md-9 col-lg-8 offset-lg-1">
      {/* Order */}
      {state.list.map(e => (
        <OrderItem key={e.id} {...e} />
      ))}

      {/* Order */}
      {/* Pagination */}
      <Pagination {...state.paginate} />
    </div>
  );
}
