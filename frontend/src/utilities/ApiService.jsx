const apiUrl = import.meta.env.VITE_API_BASE_URL;

/**
 * postData sends a POST request to the API endpoint at the specifed path.
 * The return value is the response from the server in JSON format.
 * @param {string} path - The relative path the request will be made to.
 * @param {JSON} [params] - An optional set of parameters for the request.
 * @param {JSON} [body] - An optional body for the request.
 * @param {string} auth_token - The full JWT for authorization.
 */
async function postData(path = "", params = {}, body = {}, auth_token = null) {
  const URLparams = Object.keys(params).length
    ? new URLSearchParams(Object.entries(params))
    : "";
  URLparams.toString;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  if (auth_token) options.headers["Authorization"] = `Bearer ${auth_token}`;

  const response = await fetch(apiUrl + path + "?" + URLparams, options);
  if (response) {
    const data = await response.json();
    return data;
  }
}

/**
 * getData sends a GET request to the API endpoint at the specifed path.
 * The return value is the response from the server in JSON format.
 * @param {string} path - The relative path the request will be made to.
 * @param {JSON} [params] - An optional set of parameters for the request.
 * @param {string} auth_token - The full JWT for authorization.
 */
async function getData(path = "", params = {}, auth_token = null) {
  const URLparams = Object.keys(params).length
    ? new URLSearchParams(Object.entries(params))
    : "";
  URLparams.toString;
  const options = {
    method: "GET",
  };

  if (auth_token) {
    options["headers"] = {};
    options.headers["Authorization"] = `Bearer ${auth_token}`;
  }

  const response = await fetch(apiUrl + path + "?" + URLparams, options);
  if (response) {
    const data = await response.json();
    return data;
  }
}

/**
 * @param {string} path - The relative path the request will be made to.
 * @param {JSON} [body] - An optional body for the request.
 * @param {string} auth_token - The full JWT for authorization.
 */
async function patchData(path = "", body = {}, auth_token = null) {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  if (auth_token) options.headers["Authorization"] = `Bearer ${auth_token}`;

  const response = await fetch(apiUrl + path, options);
  if (response) {
    const data = await response.json();
    return data;
  }
}

/**
 * deleteData sends a DELETE request to the API endpoint at the specifed path.
 * The return value is the response from the server in JSON format.
 * @param {string} path - The relative path the request will be made to.
 * @param {JSON} [params] - An optional set of parameters for the request.
 * @param {string} auth_token - The full JWT for authorization.
 */
async function deleteData(path = "", params = {}, auth_token = null) {
  const URLparams = Object.keys(params).length
    ? new URLSearchParams(Object.entries(params))
    : "";
  URLparams.toString;
  const options = {
    method: "DELETE",
  };

  if (auth_token) {
    options["headers"] = {};
    options.headers["Authorization"] = `Bearer ${auth_token}`;
  }

  const response = await fetch(apiUrl + path + "?" + URLparams, options);
  if (response) {
    const data = await response.json();
    return data;
  }
}

export { postData, getData, patchData, deleteData };
