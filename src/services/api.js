export async function getCategories() {
  const promiseReq = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const jsonReq = promiseReq.json();
  return jsonReq;
}

export async function getProductsFromCategoryAndQuery(QUERY, CATEGORY_ID) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const promiseReq = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}&category=${CATEGORY_ID}`);
  const jsonReq = promiseReq.json();
  return jsonReq;
}
