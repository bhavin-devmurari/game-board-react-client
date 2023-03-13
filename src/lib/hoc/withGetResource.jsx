import React, { useState } from "react";
import { useQuery } from "react-query";
import { format } from "date-fns";
import { debounce as _debounce } from "lodash";
import { getResourceList } from "../../service/user";
import {
  Loader,
  Pagination,
  Card,
  Searchbar,
  DateRangeSelector,
  Table,
  Toast,
} from "../../components";
import UseEdit from "../hook/uesEdit";
import { alertType, initialQueryParm, toastPosition } from "../../config";
import UseDelete from "../hook/useDelete";
import ErrorPage from "../../pages/template/error.page";

const INIT_STATE = {
  page: initialQueryParm.PAGE,
  limit: initialQueryParm.LIMIT,
  searchTerm: initialQueryParm.SEARCH_TERM,
  startDate: initialQueryParm.START_DATE,
  endDate: initialQueryParm.END_DATE,
};

const WithGetResource = (Component, resourceName, pageTitle) => {
  return function GetResourceByName() {
    const [payload, setPayload] = useState(INIT_STATE);
    const [clickedEditId, setClickedEditId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [operationType, setOperationType] = useState("");
    const [showToast, setShowToast] = useState(false);

    const closeModal = () => {
      setShowModal(false);
      setOperationType("edit");
    };
    const closeDeleteModal = () => {
      setShowDeleteModal(false);
      setOperationType("delete");
    };

    const { isLoading, isError, error, data, isFetching, refetch } = useQuery(
      [
        resourceName,
        payload.page,
        payload.limit,
        payload.searchTerm,
        payload.startDate,
        payload.endDate,
      ],
      () => getResourceList(payload, resourceName),
      { keepPreviousData: true }
    );

    const fetchData = () => {
      setClickedEditId(null);
      setShowToast(true);
      refetch();
    };

    if (isLoading) return <Loader />;
    if (isError)
      return (
        <>
          <h3>Error : </h3> <p> {error.message} </p>
        </>
      );

    const setPage = (pageNumber) => {
      setPayload((prev) => ({
        ...prev,
        page: pageNumber,
      }));
    };

    const setSearchTerm = _debounce((searchItem) => {
      setPayload((prev) => ({
        ...prev,
        searchTerm: searchItem,
      }));
    }, 750);

    const setDateRange = (range) => {
      setPayload((prev) => ({
        ...prev,
        startDate: format(new Date(range[0].startDate), "yyyy-MM-d"),
        endDate: format(new Date(range[0].endDate), "yyyy-MM-d"),
      }));
    };

    const pageRequired =
      data.page === 1 && payload?.limit !== data?.data?.length
        ? 1
        : Math.ceil(data?.total / payload?.limit);

    const pagesList =
      pageRequired &&
      Array(pageRequired)
        .fill()
        .map((_, index) => index + 1);

    const handleEditClick = (dataId) => {
      console.log("edit clicked !", dataId);
      // setClickedEditId(dataId);
      handleClickedId(dataId);
      setShowModal(true);
    };

    const handleDeleteClick = (dataId) => {
      handleClickedId(dataId);
      setShowDeleteModal(true);
    };

    const handleClickedId = (dataId) => {
      setClickedEditId(dataId);
    };
    let toastType;
    let toastTitle;
    let toastMessage;
    if (operationType === "edit") {
      toastType = alertType.WARNING;
      toastTitle = "Edited";
      toastMessage = "Edit operation success.";
    } else {
      toastType = alertType.ERROR;
      toastTitle = "Deleted";
      toastMessage = "Delete operation success.";
    }

    if (!data) {
      return (
        <ErrorPage
          message={"Something went wrong no data avaiable, check api url.."}
        />
      );
    }

    return (
      <>
        <Component refetch={refetch} />
        {showModal && (
          <UseEdit
            resourceName={resourceName}
            editId={clickedEditId}
            closeModal={closeModal}
            fetchData={fetchData}
          />
        )}
        {showDeleteModal && (
          <UseDelete
            resourceName={resourceName}
            deleteId={clickedEditId}
            closeModal={closeDeleteModal}
            fetchData={fetchData}
          />
        )}
        <div className="main-container mx-auto">
          <Card classes="m-after-pageTitle mx-3">
            <div className="mt-3">
              <div className="filter-container">
                <Searchbar returnToParent={(value) => setSearchTerm(value)} />
                <DateRangeSelector
                  returnToParent={(value) => setDateRange(value)}
                />
              </div>
              <div className="m-pagination">
                <Pagination
                  pagesList={pagesList}
                  payloadPage={payload.page}
                  setPage={setPage}
                />
              </div>
              {data && data?.error && <p>{data.message}</p>}
              {isFetching && <Loader />}
              <div className="table-container">
                {data && data?.data && (
                  <Table
                    data={data.data}
                    returnToParent={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </div>

              <Pagination
                pagesList={pagesList}
                payloadPage={payload.page}
                setPage={setPage}
              />
            </div>
          </Card>
          {showToast && (
            <Toast
              type={toastType}
              position={toastPosition.BOTTOM_RIGHT}
              title={toastTitle}
              message={toastMessage}
              setShowToast={() => setShowToast(false)}
            />
          )}
        </div>
      </>
    );
  };
};

export default WithGetResource;
