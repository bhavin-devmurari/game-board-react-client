import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Heading, Loader, Table } from "../../components";

const DashboardTable = ({ cardTitle, data, link, isFetching }) => {
  return (
    <Card classes="mt-3 mx-3">
      <div className="card-action">
        <Heading>{cardTitle}</Heading>
        {data.length > 0 && (
          <Link to={link}>
            <Button classes="btn secondary-btn btn-unset-parent">
              View all
            </Button>
          </Link>
        )}
      </div>
      {isFetching && <Loader />}
      <div className="table-container">
        {data && data?.length > 0 ? (
          <Table data={data} isActionMode={false} />
        ) : (
          "No record found"
        )}
      </div>
    </Card>
  );
};

export default DashboardTable;
