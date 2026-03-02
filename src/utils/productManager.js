
export function productManager(db) {
    return db.map(item => ({
        id: item._id,
        name: item.name,
        price: item.price,
        status: item.status,
        quantity: item.quantity,
    }));
}