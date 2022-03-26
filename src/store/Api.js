export async function fetchRequest() {
  try {
    const res = (await localStorage.getItem("cart")) || "{items:[]}";
    let rest = await JSON.parse(res);
    return rest;
  } catch (e) {}
}

export async function postRequest(data) {
  try {
    await localStorage.setItem("cart", JSON.stringify(data));
  } catch (e) {}
}
export const setPreferences = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
export const getPreferences = (key) => {
  let preferences = localStorage.getItem(key);
  return JSON.parse(preferences);
};
