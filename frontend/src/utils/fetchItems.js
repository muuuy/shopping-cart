export const fetchItem = async (item) => {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/${item.itemType}/${item.itemID}`
    );

    if (!res.ok) {
      throw new Error("Error fetching item");
    }

    const apiItem = await res.json();

    item.apiItem = apiItem;

    return item;
  } catch (err) {
    console.log(err);
  }
};
