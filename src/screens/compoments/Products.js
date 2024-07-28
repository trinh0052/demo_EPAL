import colors from "../../content/colors";
import products from "../../content/products";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { IoIosArrowForward } from "react-icons/io";

const ImageWithRatio = ({ src }) => {
  const [isSquare, setIsSquare] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      const ratio = width - height;

      setIsSquare(ratio !== 0 ? false : true);
    };
  }, [src]);

  return (
    <div
      style={{
        width: "268px",
        height: "357px",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff",
      }}
    >
      <div
        style={{
          width: "268px",
          height: isSquare ? "268px" : "357px",
          overflow: "hidden",
          display: "flex",
          justifyContent: isSquare ? "center" : "flex-end",
          alignItems: isSquare ? "center" : "start",
        }}
      >
        <img
          src={src}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "4px",
            objectFit: "cover",
            objectPosition: isSquare ? "center" : "right",
          }}
        />
      </div>
    </div>
  );
};

export default function Products() {
  const [isMouse, setMouse] = useState(-1);

  return (
    <Container style={{ padding: "36px 99px" }}>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ color: colors.secondary[0] }}>Sản phẩm của chúng tôi</h2>
        <p style={{ margin: "24px 0px 8px", color: colors.ink[2] }}>
          Với nhiều năm kinh nghiệm phục vụ trong ngành điện hoa, Mộc Flowers
          chúng tôi luôn cố gắng để tạo ra những sản phẩm tốt nhất, đa dạng nhất
          phục vụ cho mọi nhu cầu của khách hàng.
        </p>
      </div>
      <div className="grid-container" style={{ borderRadius: "4px" }}>
        {products.map((product, idx) => (
          <div
            key={idx}
            style={{
              margin: "0px",
              padding: "0px",
              width: "268px",
              height: "357px",
              position: "relative",
            }}
          >
            <ImageWithRatio key={idx} src={product.image} />

            <div
              style={{
                position: "absolute",
                top: "0%",
                left: "0%",
                width: "100%",
                height: "100%",
                background:
                  isMouse === idx
                    ? "rgba(14, 14, 14, 0.15)"
                    : "rgba(14, 14, 14, 0.35)",
                color: colors.ink[3],
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <h3
                    style={{
                      textDecoration: isMouse === idx ? "underline" : "none",
                    }}
                  >
                    {product.name}
                  </h3>
                  <Button
                    className="font-subtitile2"
                    style={{
                      backgroundColor:
                        isMouse === idx
                          ? "rgba(255, 255, 255, 0.5)"
                          : "#FFFFFF00",
                      color: colors.ink[3],
                      padding: "8px 16px",
                      border: "1px solid",
                      borderColor: colors.ink[3],
                      borderRadius: "30px",
                      marginTop: "16px",
                    }}
                    onMouseEnter={() => setMouse(idx)}
                    onMouseLeave={() => setMouse(-1)}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginRight: "8px" }}>Xem ngay</span>
                      <IoIosArrowForward className="icon-size" />
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
