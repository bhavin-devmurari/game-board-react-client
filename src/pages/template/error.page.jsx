import React from "react";
import { Card, Heading } from "../../components";

const ErrorPage = ({ message }) => {
  return (
    <div className="m-after-nav">
      <Card classes="mt-3 mx-3">
        <div className="card-action">
          <Heading>{message}</Heading>
        </div>
      </Card>
    </div>
  );
};
export default ErrorPage;
