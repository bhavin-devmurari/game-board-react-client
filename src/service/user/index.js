import { httpClient } from "../../config";

export const getResourceList = async (payload, resourceName) => {
  const { page, limit, searchTerm, startDate, endDate } = payload;

  const response = httpClient
    .get(
      `${resourceName}?page=${page}&limit=${limit}&search=${searchTerm}&startDate=${startDate}&endDate=${endDate}`
    )
    .then((res) => res.data)
    .catch((err) => handleErrorResponse(err));
  return response;
};

export const getResourceById = async (id, resourceName) => {
  const response = httpClient
    .post(`${resourceName}/id`, { id: id })
    .then((res) => res.data)
    .catch((err) => handleErrorResponse(err));
  return response;
  // try {
  //   const response = await httpClient.post(`${resourceName}/id`, { id: id });
  //   if (response.status === 200) {
  //     return response.data;
  //   }
  //   handleErrorResponse({ message: "Something went wrong" });
  // } catch (err) {
  //   handleErrorResponse(err);
  // }
};

export const editResource = (payload, resourceName) => {
  const { _id } = payload;
  const data = {
    id: _id,
    ...payload,
  };

  const response = httpClient
    // .patch(`${resourceName}`, payload)
    .patch(`${resourceName}`, data)
    .then((res) => res.data)
    .catch((err) => handleErrorResponse(err));
  return response;
};

export const createResource = (payload, resourceName) => {
  const response = httpClient
    .post(`${resourceName}`, payload)
    .then((res) => res.data)
    .catch((err) => handleErrorResponse(err));
  return response;
};

export const deleteResource = (deleteId, resourceName) => {
  const response = httpClient
    .delete(`${resourceName}`, { data: { id: deleteId } })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return handleErrorResponse(err);
    });
  return response;
};

export const getDashboardData = async () => {
  const response = httpClient
    .get("dashboard")
    .then((res) => res.data)
    .catch((err) => handleErrorResponse(err));
  return response;
};

const handleErrorResponse = (error) => {
  let errorResponse;
  if (error.response && error.response.data) {
    errorResponse = error.response.data;
  } else if (error.request) {
    errorResponse = error.request.message || error.request.statusText;
  } else {
    errorResponse = error.message;
  }
  return errorResponse;
};
