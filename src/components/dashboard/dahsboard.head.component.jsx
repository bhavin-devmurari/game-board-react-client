import React from "react";
import Card from "../card/card.component";
import Heading from "../heading/heading.component";

const DahsboardHead = ({ totalUsers, totalGames }) => {
  return (
    <div className="m-after-nav d-total">
      <DashboardSubHead title="Total Users" count={totalUsers} />
      <DashboardSubHead title="Total Games" count={totalGames} />
    </div>
  );
};

const DashboardSubHead = ({ title, count }) => {
  return (
    <>
      <Card classes="mx-3 sm-card-width" childClasses="ml-rm">
        <Heading>{title}</Heading>
        <Heading>{count}</Heading>
      </Card>
    </>
  );
};

export default DahsboardHead;
