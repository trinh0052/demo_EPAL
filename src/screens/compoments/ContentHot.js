import { useState, useReducer, useEffect, useRef } from "react";
import colors from "../../content/colors";
import { FaRegCircle } from "react-icons/fa";
const imageSlide = [
  {
    src: "/images/slide1.jpg",
    title: "Trao gửi yêu thương",
    content:
      "Điện hoa quốc tế & toàn quốc. Mộc Flowers giao hoa miễn phí trong vòng 2h.",
  },
  {
    src: "/images/slide2.jpg",
    title: "",
    content: "",
  },
  {
    src: "/images/slide3.jpg",
    title: "",
    content: "",
  },
];

function ContentHot() {
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const [index, setIndex] = useState(0);
  const handleResize = () => {
    carouselRef.current.scrollLeft = 0;
  };
  useEffect(() => {
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const startAutoScroll = (intervalTime) => {
    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % imageSlide.length;
        carouselRef.current.scrollLeft = newIndex * 1366;
        return newIndex;
      });
    }, intervalTime);
  };

  useEffect(() => {
    startAutoScroll(5000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleScroll = (event, idx = null) => {
    event.preventDefault();
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);

    if (carouselRef.current) {
      if (idx !== null) {
        setIndex(idx);
        carouselRef.current.scrollLeft = idx * 1366;
      } else if (index > 0) {
        setIndex(idx);
        carouselRef.current.scrollLeft = idx * 1366;
      } else {
        const count = imageSlide.length - 1;
        setIndex(count);
        carouselRef.current.scrollLeft = count * 1366;
      }
    }

    timeoutRef.current = setTimeout(() => {
      startAutoScroll(5000);
    }, 7000);
  };

  const handleScrollLeft = (event) => {
    event.preventDefault();
    if (carouselRef.current) {
      if (index > 0) {
        setIndex(index - 1);
        carouselRef.current.scrollLeft -= 1366;
      } else {
        const count = imageSlide.length - 1;
        setIndex(count);
        carouselRef.current.scrollLeft = count * 1366;
      }
    }
  };

  const handleScrollRight = (event) => {
    event.preventDefault();
    if (carouselRef.current) {
      if (index < imageSlide.length - 1) {
        setIndex(index + 1);
        carouselRef.current.scrollLeft += 1366;
      } else {
        setIndex(0);
        carouselRef.current.scrollLeft = 0;
      }
    }
  };

  return (
    <div>
      <div
        style={{
          margin: "0px",
          padding: "0px",
          width: "100%",
          height: "440px",
          position: "relative",
        }}
      >
        <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
          <div className="carousel-container" ref={carouselRef}>
            {imageSlide.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt=""
                style={{
                  margin: "0px",
                  padding: "0px",
                  width: "1366px",
                  height: "100%",
                  flexShrink: 0,
                  scrollSnapAlign: "start",
                }}
              />
            ))}
          </div>
        </div>
        {imageSlide.map((image, idx) => (
          <div
            style={{
              position: "absolute",
              top: "157px",
              left: "98px",
              width: "460px",
              display: index === idx ? "block" : "none",
            }}
          >
            <h1 style={{ color: colors.ink[0] }}>{image.title}</h1>
            <p style={{ marginTop: "17px", color: colors.ink[2] }}>
              {image.content}
            </p>
          </div>
        ))}

        <div
          style={{
            position: "absolute",
            top: "408px",
            left: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {imageSlide.map((point, idx) =>
            idx === index ? (
              <div
                className="icon-size2"
                style={{
                  border: "1px solid",
                  borderColor: colors.secondary[1],
                  borderRadius: "50%",
                  position: "relative",
                }}
              >
                <div
                  className="icon-size3"
                  style={{
                    background: colors.secondary[1],
                    borderRadius: "50%",
                    position: "absolute",
                    top: "25%",
                    left: "25%",
                  }}
                ></div>
              </div>
            ) : (
              <div
                className="icon-size3"
                style={{
                  border: "1px solid",
                  borderColor: colors.grey[0],
                  margin: "0px 8px",
                  borderRadius: "50%",
                  position: "relative",
                }}
                onClick={(event) => handleScroll(event, idx)}
              ></div>
            )
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
}
export default ContentHot;
