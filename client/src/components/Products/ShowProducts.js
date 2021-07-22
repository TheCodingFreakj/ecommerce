import React from "react";
import axios from "axios";
import "./product.css";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
const ShowProducts = () => {
  const [pro, setpro] = React.useState("");
  const [pageNumber, setpageNumber] = React.useState(0);

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

  const handleDelete = async (prod_id) => {};

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
                      onClick={() => handleDelete(product.prod_id)}
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
      </div>
    </>
  );
};

export default ShowProducts;
