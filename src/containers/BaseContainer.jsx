import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import BlogPostContainer from "./BlogPostContainer";

const BaseContainer = () => {
  return (
    <>
      <HeaderComponent />
      <BlogPostContainer />
    </>
  );
};

export default BaseContainer;
