import https from "./config";
const settings = {
   getOne: (id) => https.get(`/admin/${id}`),
   update: (id, data) => https.patch(`/admin/${id}`, data),
   delete: (id) => https.delete(`/admin/${id}`),
};

export default settings;
