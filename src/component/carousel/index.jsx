import React from "react";
import { Carousel } from "react-bootstrap";
import "./style.css";

function CompCarousel() {
  return (
    <Carousel variant="dark" className="parent">
      <Carousel.Item className="w-100">
        <img
          className="d-block sizingPic"
          src="https://www.teahub.io/photos/full/49-494021_wallpaper-for-kids-furniture.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block sizingPic"
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZnVybml0dXJlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block sizingPic"
          src="https://image.winudf.com/v2/image/Y29tLk1vZGVybldhcmRyb2JlRGVzaWduLk1hcmdvZF9zY3JlZW5fMF8xNTM5ODAxODE3XzAzOA/screen-0.jpg?fakeurl=1&type=.webp"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CompCarousel;
