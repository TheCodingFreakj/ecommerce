import React from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  singleproduct,
  singleproductSelector,
  relatedproduct,
} from "../../store/shopping";
import DashBoardFooter from "../Dashboard/DashBoardFooter";
import { unwrapResult } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
const SingleProduct = () => {
  const { id } = useParams();

  const stateproduct = useSelector(singleproductSelector).product;
  //   const stateproductrelated = useSelector(singleproductSelector);
  //   console.log(stateproductrelated);
  const sproductdispatch = useDispatch();
//   const relateddispatch = useDispatch();
  React.useEffect(() => {
    const fetchsingle = async (id) => {
      try {
        const awlpe = await sproductdispatch(singleproduct(id));
        const originalPromiseResultp = unwrapResult(awlpe);

        // setmessage(originalPromiseResultp.data.message);
      } catch (rejectedValueOrSerializedError) {
        // handle error here
        console.log(rejectedValueOrSerializedError);
        // seterror(rejectedValueOrSerializedError.message);
      }
    };

    fetchsingle(id);
  }, []);

  //   React.useEffect(() => {
  //     const fetchrelated = async (id) => {
  //       try {
  //         const awlpe2 = await relateddispatch(
  //           relatedproduct(stateproductrelated.product.sold)
  //         );
  //         const originalPromiseResultp = unwrapResult(awlpe2);

  //         // setmessage(originalPromiseResultp.data.message);
  //       } catch (rejectedValueOrSerializedError) {
  //         // handle error here
  //         console.log(rejectedValueOrSerializedError);
  //         // seterror(rejectedValueOrSerializedError.message);
  //       }
  //     };

  //     fetchrelated(id);
  //   }, []);
  return (
    <React.Fragment>
      <div className="main_single_product">
        <div className="single_product">
          <img src={stateproduct.photo} />
          <h3>{stateproduct.name}</h3>
          <p>{stateproduct.price}$</p>
          <p>{stateproduct.desc}</p>
          <button className="btn_cart"><span>Add To Cart </span></button>
        </div>
        {/* 
        <div className="related_product">
          <h2>Also Viewed This</h2>
        </div> */}
      </div>

      <DashBoardFooter />
    </React.Fragment>
  );
};

export default SingleProduct;
