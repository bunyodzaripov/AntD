import https from "./config";
const category = {
   create: (data) => https.post("/category/create", data),
   get: (params) => https.get("/category/search", { params }),
   update: (id, data) => https.patch(`/category/update/${id}`, data),
   delete: (id) => https.delete(`/category/delete/${id}`),
};

export default category;
