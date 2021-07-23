import React from "react";
import axios from "axios";
import "./product.css";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { adminSelector } from "../../store/admin";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { deleteproduct } from "../../store/product";
const ShowProducts = () => {
  const stateadmin = useSelector(adminSelector).token;
  const productdeldispatch = useDispatch();
  const [pro, setpro] = React.useState("");
  const [pageNumber, setpageNumber] = React.useState(0);
  const [error, seterror] = React.useState();
  const [message, setmessage] = React.useState();
  const productperpage = 2;
  const productsdone = pageNumber * productperpage;
  const pageCount = pro ? Math.ceil(pro.length / productperpage) : null;
  const changePage = ({ selected }) => {
    setpageNumber(selected);
  };
  React.useEffect(() => {
    const showall = async () => {
      const response = axios({
        method: "get",
        url: `http://localhost:8080/api/v1/getallp`,
      }).then((data) => {
        setpro(data.data.allp);
      });
    };

    showall();
  }, []);

  const handleDelete = async (id) => {
    // console.log(id);
    try {
      const viewd = await productdeldispatch(deleteproduct({ id, stateadmin }));
      const result = unwrapResult(viewd);
      // console.log(result);
      setmessage(result.data.message);
    } catch (rejectedValueOrSerializedError) {
      // handle error here
      console.log(rejectedValueOrSerializedError);
      seterror(rejectedValueOrSerializedError.data);
    }
  };

  return (
    <>
      <div className="content_prod" style={{ marginTop: "9%", padding: "3%" }}>
        {pro
          ? pro
              .slice(productsdone, productsdone + productperpage)
              .map((product) => {
                return (
                  <div>
                    <h3>ProductName: {product.name}</h3>;{" "}
                    <NavLink
                      className="button_edit"
                      to={`/dashboard/update_p/${product.prod_id}`}
                      exact
                    >
                      Edit Product
                    </NavLink>
                    <button
                      className="button_delete"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                );
              })
          : null}

        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBtns"}
          previousLinkClassName={"previosBtn"}
          nextLinkClassName={"nextbtn"}
          disabledClassName={"paginationdisables"}
          activeClassName={"paginationactibe"}
        />

        {error ? <h1>{error}</h1> : null}
        {message ? <h1>{message}</h1> : null}
      </div>
    </>
  );
};

export default ShowProducts;
