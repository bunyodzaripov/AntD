import https from "./config";
const subCategory = {
   create: (data) => https.post("/sub-category/create", data),
   get: (parentId) => https.get(`/sub-category/search/${parentId}`),
   update: (id, data) => https.patch(`/sub-category/update/${id}`, data),
   delete: (id) => https.delete(`/sub-category/delete/${id}`),
};

export default subCategory;
