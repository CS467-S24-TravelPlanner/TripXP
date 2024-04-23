const apiUrl = "https://travelplannerapi-production.up.railway.app";

/**
 * postData sends a POST request to the API endpoint at the specifed path.
 * The return value is the response from the server in JSON format.
 * @param {string} path - The relative path the request will be made to.
 * @param {JSON} [params] - An optional set of parameters for the request.
 * @param {JSON} [body] - An optional body for the request.
 */
async function postData(path = "", params = {}, body = {}) {
  
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

  const response = await fetch(apiUrl + path + "?" + URLparams, options);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
}

/**
 * getData sends a GET request to the API endpoint at the specifed path.
 * The return value is the response from the server in JSON format.
 * @param {string} path - The relative path the request will be made to.
 * @param {JSON} [params] - An optional set of parameters for the request.
 */
async function getData(path = "", params = {}) {
  const URLparams = Object.keys(params).length
    ? new URLSearchParams(Object.entries(params))
    : "";
  URLparams.toString;
  const options = {
    method: "GET",
  };
  const response = await fetch(apiUrl + path + "?" + URLparams, options);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
}

/**
 * patchData sends a PATCH request to the API endpoint at the specifed path.
 * The return value is the response from the server in JSON format.
 * @param {string} path - The relative path the request will be made to.
 * @param {JSON} [body] - An optional body for the request.
 */
async function patchData(path = "", body = {}) {
  const options = {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify(body),
  };
  const response = await fetch(apiUrl + path, options);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
}

/**
 * deleteData sends a DELeTE request to the API endpoint at the specifed path.
 * The return value is the response from the server in JSON format.
 * @param {string} path - The relative path the request will be made to.
 * @param {JSON} [params] - An optional set of parameters for the request.
 */
async function deleteData(path = "", params = {}) {
  const URLparams = Object.keys(params).length
    ? new URLSearchParams(Object.entries(params))
    : "";
  URLparams.toString;
  const options = {
    method: "DELETE",
  };
  const response = await fetch(apiUrl + path + "?" + URLparams, options);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
}

export { postData, getData, patchData, deleteData };
