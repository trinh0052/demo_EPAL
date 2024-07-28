import { Container } from "react-bootstrap";
import colors from "../../content/colors";
import { FaRegCircle } from "react-icons/fa";
import { useState, useReducer, useEffect, useRef } from "react";
import introductions from "../../content/introduction";

export default function Introduction() {
  const [index, setIndex] = useState(0);
  return (
    <div
      style={{
        position: "relative",
        height: "545px",
        overflow: "hidden",
      }}
    >
      <img
        src="/images/anh9.png"
        alt=""
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "0%",
          left: "0%",
          width: "100%",
          height: "100%",
          background: "rgba(237, 237, 239, 0.75)",
        }}
      />
      <div
        style={{
          padding: "0px",
          position: "absolute",
          top: "0%",
          left: "0%",
          width: "100%",
          height: "100%",
        }}
      >
        <div style={{ margin: "40px 99px", display: "block" }}>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ color: colors.secondary[0] }}>
              Lý do bạn nên chọn Mộc Flowers
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",

              width: "100%",
              marginTop: "40px",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "368px",
                height: "246px",
                backgroundColor: colors.ink[3],
                margin: "40px 0px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  margin: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <img
                    src={introductions[1].image}
                    alt=""
                    style={{
                      width: "56px",
                      height: "56px",
                    }}
                  />
                </div>
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <p
                    className="font-title"
                    style={{ marginBottom: "12px", color: colors.ink[1] }}
                  >
                    {introductions[1].name}
                  </p>
                  <p className="font-caption1" style={{ color: colors.ink[2] }}>
                    {introductions[1].text}
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                position: "relative",
                width: "368px",
                height: "246px",
                backgroundColor: colors.ink[3],
                margin: "40px 0px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  margin: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <img
                    src={introductions[2].image}
                    alt=""
                    style={{
                      width: "56px",
                      height: "56px",
                    }}
                  />
                </div>
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <p
                    className="font-title"
                    style={{ marginBottom: "12px", color: colors.ink[1] }}
                  >
                    {introductions[2].name}
                  </p>
                  <p className="font-caption1" style={{ color: colors.ink[2] }}>
                    {introductions[2].text}
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                left: "434px",
                position: "absolute",
                width: "498px",
                height: "332px",
                backgroundColor: colors.ink[3],
                margin: "40px 0px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
                borderRadius: "4px",
              }}
            >
              {" "}
              <div
                style={{
                  margin: " 32px 24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <img
                    src={introductions[0].image}
                    alt=""
                    style={{
                      width: "64px",
                      height: "64px",
                    }}
                  />
                </div>
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <p
                    className="font-title"
                    style={{ marginBottom: "12px", color: colors.ink[1] }}
                  >
                    {introductions[0].name}
                  </p>
                  <p style={{ color: colors.ink[2] }}>
                    {introductions[0].text}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              top: "512px",
              left: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {introductions.map((point, idx) =>
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
                    borderColor: colors.ink[3],
                    margin: "0px 8px",
                    borderRadius: "50%",
                    position: "relative",
                  }}
                ></div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
