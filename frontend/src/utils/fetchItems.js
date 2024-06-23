const fetchItem = async (item) => {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/${item.itemType}/${item.itemID}`
    );

    if (!res.ok) {
      throw new Error("Error fetching item.");
    }

    const apiItem = await res.json();

    item.apiItem = apiItem;

    return item;
  } catch (err) {
    console.log(err);
  }
};

export const fetchItems = async (items) => { 
  if (Array.isArray(items)) {
    return Promise.all(items.map((item) => fetchItem(item)));
  } else {
    return fetchItem(items);
  }
};

export const fetchOrderItem = async (item) => { 
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/${item.itemType}/${item.itemID}`
    );

    if (!res.ok) {
      throw new Error("Error fetching item.");
    }

    const apiItem = await res.json();

    const orderItem = {
      itemType: item.itemType,
      quantity: item.quantity,
      cost: item.cost,
      apiItem: apiItem,
    };

    return orderItem;
  } catch (error) {
    console.log(error);
  }
};
