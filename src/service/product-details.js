import https from "./config";
const productDetails = {
   create: (data) => https.post("/product-detail/create", data),
   get: () => https.get("/product-detail"),
   update: (id, data) => https.patch(`/product-detail/update/${id}`, data),
   delete: (id) => https.delete(`/product-detail/delete/${id}`),
};

export default productDetails;
