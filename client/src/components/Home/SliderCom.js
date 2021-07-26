import React from "react";
import "./styles.css";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
const ImageSlider = ({ slides }) => {
  const [current, setcurrent] = React.useState(0);

  const prev = () => {
    setcurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const next = () => {
    setcurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <>
      <section className="slider">
        <FaArrowAltCircleLeft className="left-arrow" onClick={prev} />
        <FaArrowAltCircleRight className="right-arrow" onClick={next} />
        {slides.map((slide, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {/* <div className="dialogue_box">iio</div> */}
              {index === current && (
                <div className="image_container">
                  <img src={slide.image} alt="" className="slider_image" />
                  {/* <img src={slide.image} alt="" className="image" /> */}
                </div>
              )}
            </div>
          );
        })}
      </section>
    </>
  );
};

export default ImageSlider;
