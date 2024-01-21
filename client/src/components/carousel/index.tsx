import { Carousel } from "react-responsive-carousel";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../carousel/carousel.css'
interface CarouselcompProps {
    images: string[];
}
const Carouselcomp: React.FC<CarouselcompProps> = ({ images }) => {
    return (
      <div className="box">
        <Carousel useKeyboardArrows={true} 
        autoPlay interval={3000} 
        showThumbs={false} showArrows={false} 
        infiniteLoop={true}
        showIndicators={false}
        >
          {images.map((image, index) => (
            <div className="slide" key={index}>
              <img alt={`slide ${index + 1}`} src={image}/>
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
  export default Carouselcomp;
  