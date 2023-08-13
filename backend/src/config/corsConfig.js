const domainList = ["https://mern-ecommerce-tb5w.onrender.com"];
export const corsOptions = {
  origin: function (origin, callback) {
    if (domainList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
