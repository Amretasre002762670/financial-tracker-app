import React from "react";

const PageNotFound = ({errorType="serverError"}) => {
  

  return (
    <div className="container mx-auto p-4">
      <h1>{errorType === "serverError" ? "500 - Internal Server Error": "404 - Page not found"}</h1>
      <p>{errorType === "serverError" ? "Try again later!": "The page you're looking for does not exist."}</p>
    </div>
  );
};

export default PageNotFound;
