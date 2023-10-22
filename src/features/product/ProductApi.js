// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

//fetch products by desired filters
export function fetchProductsByFilters(filter) {
  //here filter is an object like filter = {"category":"smartphone"}
  let queryString = '';
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}
