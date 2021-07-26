import React from "react";
import "./styles.css";
import SliderCom from "./SliderCom";
import axios from "axios";
import Images from "./slidedata";

const Home = () => {
  const [newarrivals, setnewarrivals] = React.useState();
  const [bestsellers, setbestsellers] = React.useState();
  React.useEffect(() => {
    axios
      .all([
        axios.get("http://localhost:8080/api/v1/getproducts?limit=4"),
        axios.get("http://localhost:8080/api/v1/newarrivals?limit=6"),
      ])
      .then((responseArr) => {
        setnewarrivals(responseArr[1].data.newarrivals);
        setbestsellers(responseArr[0].data.bestsellers);
      });
  }, []);
  return (
    <div className="main_content-home">
      <SliderCom slides={Images} />

      <div className="main_content-products">
        <h1>Our Best Sellers</h1>
        <div className="best-selers">
          {bestsellers
            ? bestsellers.map((best) => {
                return (
                  <div className="smallcard">
                    <img src={best.photo} className="image_card" />

                    <div className="smallcard-inner">
                      <h2>{best.name}</h2>
                      <p>{best.desc}</p>
                      <button>shop</button>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
        <h1>New Arrivals</h1>
        <div className="new-arrivals">
          {newarrivals
            ? newarrivals.map((best) => {
                return (
                  <div className="smallcard">
                    <img src={best.photo} className="image_card" />

                    <div className="smallcard-inner">
                      <h2>{best.name}</h2>
                      <p>{best.desc}</p>
                      <button>shop</button>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

//https://react-slick.neostack.com/

export default Home;
