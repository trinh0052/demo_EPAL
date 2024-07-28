import { Container } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import colors from "../../content/colors";
import abouts from "../../content/about";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import partners from "../../content/partner";

function removeTransparentPixels(image, callback) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data, width, height } = imageData;

    let top = height,
      left = width,
      right = 0,
      bottom = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        if (data[idx + 3] > 0) {
          if (x < left) left = x;
          if (x > right) right = x;
          if (y < top) top = y;
          if (y > bottom) bottom = y;
        }
      }
    }

    const croppedWidth = right - left + 1;
    const croppedHeight = bottom - top + 1;

    const croppedCanvas = document.createElement("canvas");
    const croppedCtx = croppedCanvas.getContext("2d");

    croppedCanvas.width = croppedWidth;
    croppedCanvas.height = croppedHeight;

    croppedCtx.drawImage(
      canvas,
      left,
      top,
      croppedWidth,
      croppedHeight,
      0,
      0,
      croppedWidth,
      croppedHeight
    );

    callback(croppedCanvas.toDataURL());
  };
}

export default function About() {
  const [index, setIndex] = useState(0);
  const [index1, setIndex1] = useState(0);
  const [isMouse, setMouse] = useState(-1);
  const carousel1Ref = useRef(null);
  const carousel2Ref = useRef(null);

  const interval1Ref = useRef(null);
  const timeout1Ref = useRef(null);

  const interval2Ref = useRef(null);
  const timeout2Ref = useRef(null);

  const handleScrollLeft = (event) => {
    event.preventDefault();
    if (carousel1Ref.current) {
      if (index > 0) {
        setIndex(index - 1);
        carousel1Ref.current.scrollLeft -= 368;
      } else {
        const count = abouts.length - 1;
        setIndex(count);
        carousel1Ref.current.scrollLeft = count * 368;
      }
    }
  };

  const handleScrollRight = (event) => {
    event.preventDefault();
    clearInterval(interval1Ref.current);
    clearTimeout(timeout1Ref.current);

    if (carousel1Ref.current) {
      if (index < abouts.length - 3) {
        setIndex(index + 1);
        carousel1Ref.current.scrollLeft += 368;
      } else {
        setIndex(0);
        carousel1Ref.current.scrollLeft = 0;
      }
    }
    timeout1Ref.current = setTimeout(() => {
      startAutoScrollAbout(3000);
    }, 5000);
  };

  const handleScrollLeftPartner = (event) => {
    event.preventDefault();
    if (carousel2Ref.current) {
      if (index1 > 0) {
        setIndex1(index1 - 1);
        carousel2Ref.current.scrollLeft -= 268;
      } else {
        const count = abouts.length - 1;
        setIndex1(count);
        carousel2Ref.current.scrollLeft = count * 268;
      }
    }
  };

  const handleScrollRightPartner = (event) => {
    event.preventDefault();
    clearInterval(interval2Ref.current);
    clearTimeout(timeout2Ref.current);

    if (carousel2Ref.current) {
      if (index1 < abouts.length - 4) {
        setIndex1(index1 + 1);
        carousel2Ref.current.scrollLeft += 268;
      } else {
        setIndex1(0);
        carousel2Ref.current.scrollLeft = 0;
      }
    }

    timeout2Ref.current = setTimeout(() => {
      startAutoScrollPartner(3000);
    }, 5000);
  };

  const [croppedImages, setCroppedImages] = useState([]);

  useEffect(() => {
    const processImages = async () => {
      const results = [];

      for (const filePath of partners) {
        const img = new Image();
        img.src = filePath;

        await new Promise((resolve) => {
          removeTransparentPixels(img, (croppedSrc) => {
            results.push(croppedSrc);
            resolve();
          });
        });
      }

      setCroppedImages(results);
    };

    processImages();
  }, []);

  const startAutoScrollAbout = (intervalTime) => {
    interval1Ref.current = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % abouts.length;
        carousel1Ref.current.scrollLeft = newIndex * 1366;
        return newIndex;
      });
    }, intervalTime);
  };

  useEffect(() => {
    startAutoScrollAbout(3000);

    return () => clearInterval(interval1Ref.current);
  }, []);

  const startAutoScrollPartner = (intervalTime) => {
    interval2Ref.current = setInterval(() => {
      setIndex1((prevIndex) => {
        const newIndex = (prevIndex + 1) % croppedImages.length;
        carousel2Ref.current.scrollLeft = newIndex * 1366;
        return newIndex;
      });
    }, intervalTime);
  };

  useEffect(() => {
    startAutoScrollPartner(3000);

    return () => clearInterval(interval2Ref.current);
  }, []);

  return (
    <Container style={{ padding: "60px 100px" }}>
      <div>
        <h2
          style={{
            textAlign: "center",
            color: colors.secondary[0],
            marginBottom: "40px",
          }}
        >
          Khách hàng nói gì về chúng tôi
        </h2>
        <div style={{ position: "relative" }}>
          <div
            className="carousel-container"
            ref={carousel1Ref}
            style={{
              display: "flex",
              overflowX: "scroll",
              scrollBehavior: "smooth",
              whiteSpace: "nowrap",
              scrollSnapType: "x mandatory",
              gap: "32px",
            }}
          >
            {abouts.map((image, idx) => (
              <div
                key={idx}
                className="carousel-item"
                style={{
                  width: "368px",
                  height: "245px",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexShrink: 0,
                  scrollSnapAlign: "start",
                }}
              >
                <img
                  src={image}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "4px",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
            ))}
          </div>
          <div
            style={{
              position: "absolute",
              left: "0%",
              top: "0%",
              width: "calc(100% + 40px)",
              height: "100%",
              marginLeft: "-20px",
              marginRight: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                background: colors.ink[3],
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                boxShadow: "0 2 4 rgba(0, 0, 0, 0.12)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pointerEvents: "auto",
                cursor: "pointer",
              }}
              onClick={handleScrollLeft}
            >
              <IoIosArrowBack className="icon-size" style={{ margin: "6px" }} />
            </div>
            <div
              style={{
                background: colors.ink[3],
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                boxShadow: "0 2 4 rgba(0, 0, 0, 0.12)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pointerEvents: "auto",
                cursor: "pointer",
              }}
              onClick={handleScrollRight}
            >
              <IoIosArrowForward
                className="icon-size"
                style={{ margin: "6px" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2
          style={{
            textAlign: "center",
            color: colors.secondary[0],
            margin: "40px 0px",
          }}
        >
          Đối tác của chúng tôi
        </h2>
        <div style={{ position: "relative" }}>
          <div
            className="carousel-container"
            ref={carousel2Ref}
            style={{
              display: "flex",
              overflowX: "scroll",
              scrollBehavior: "smooth",
              whiteSpace: "nowrap",
              scrollSnapType: "x mandatory",
              gap: "20px",
            }}
          >
            {croppedImages.map((image, idx) => (
              <div
                key={idx}
                style={{
                  width: "268px",
                  height: "134px",
                  overflow: "hidden",
                  flexShrink: 0,
                  scrollSnapAlign: "start",
                  padding: "5px",
                }}
              >
                <div
                  key={idx}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow:
                      isMouse === idx
                        ? "0 2px 10px rgba(0, 0, 0, 0.1)"
                        : "0 0 10px 2px rgba(0, 0, 0, 0)",
                  }}
                  onMouseEnter={() => setMouse(idx)}
                  onMouseLeave={() => setMouse(-1)}
                >
                  <img
                    src={image}
                    alt=""
                    style={{
                      width: "236px",
                      height: "90px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              position: "absolute",
              left: "0%",
              top: "0%",
              width: "calc(100% + 40px)",
              height: "100%",
              marginLeft: "-20px",
              marginRight: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                background: colors.ink[3],
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                boxShadow: "0 2 4 rgba(0, 0, 0, 0.12)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pointerEvents: "auto",
                cursor: "pointer",
              }}
              onClick={handleScrollLeftPartner}
            >
              <IoIosArrowBack className="icon-size" style={{ margin: "6px" }} />
            </div>
            <div
              style={{
                background: colors.ink[3],
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                boxShadow: "0 2 4 rgba(0, 0, 0, 0.12)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pointerEvents: "auto",
                cursor: "pointer",
              }}
              onClick={handleScrollRightPartner}
            >
              <IoIosArrowForward
                className="icon-size"
                style={{ margin: "6px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
