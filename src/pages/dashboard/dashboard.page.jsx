import React from "react";
import { getDashboardData } from "../../service/user";
import { Loader, DahsboardHead } from "../../components";
import "./dashboard.styles.css";
import { useQuery } from "react-query";
import DashboardTable from "../../components/dashboard/dashboard.table.component";
import ErrorPage from "../template/error.page";

const Dashboard = () => {
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["dashboard"],
    () => getDashboardData(),
    { keepPreviousData: true }
  );

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <>
        <h3>Error : </h3> <p> {error.message} </p>
      </>
    );

  const content = (
    <div className="main-container mx-auto mb-5">
      <DahsboardHead
        totalUsers={data.totalUsers}
        totalGames={data.totalGames}
      />
      <DashboardTable
        cardTitle={"Recent Users"}
        data={data.user}
        link={"/users"}
        isFetching={isFetching}
      />
      <DashboardTable
        cardTitle={"Recent Games"}
        data={data.game}
        link={"/games"}
        isFetching={isFetching}
      />
    </div>
  );
  return (
    <>
      {data ? (
        content
      ) : (
        <ErrorPage
          message={"Something went wrong no data avaiable, check api url.."}
        />
      )}
    </>
  );
};

export default Dashboard;
