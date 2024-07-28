import colors from "../content/colors";
import { useState, useReducer, useEffect, useRef } from "react";
import ContentHot from "./compoments/ContentHot";
import Products from "./compoments/Products";
import Introduction from "./compoments/introduction";
import About from "./compoments/About";

function HomeScreen() {
  return (
    <div>
      <ContentHot />
      <Products />
      <Introduction />
      <About />
    </div>
  );
}
export default HomeScreen;
