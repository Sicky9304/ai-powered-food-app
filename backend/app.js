const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const aiRoutes = require("./routes/ai.routes");

const errorMiddleware = require("./middlewares/errors");

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);

      // List of explicitly allowed origins
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://ai-powered-food-3y4b8jc6y-sicky-kumars-projects.vercel.app"
      ];

      const cleanOrigin = origin.replace(/\/$/, "");

      // Check if it's a Vercel deployment URL
      const isVercelDomain = cleanOrigin.endsWith(".vercel.app");

      // Check FRONTEND_URL from environment variables (stripping quotes if present)
      const envOrigin = process.env.FRONTEND_URL
        ? process.env.FRONTEND_URL.replace(/['"]/g, "").replace(/\/$/, "")
        : null;

      const isAllowed =
        allowedOrigins.some((o) => o.replace(/\/$/, "") === cleanOrigin) ||
        isVercelDomain ||
        (envOrigin && envOrigin === cleanOrigin);

      if (isAllowed) {
        return callback(null, true);
      }

      // Fallback: allow the origin but log a warning to help with debugging production deployment issues
      console.log(`CORS dynamic origin fallback allowed: ${origin}`);
      return callback(null, true);
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

//Setting Up Cloudinary Configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
app.use("/proxy", (req, res) => {
  var url = "https://checkout.stripe.com" + req.url;
  req.pipe(request(url)).pipe(res);
});

//Import all routes
const foodRouter = require("./routes/foodItem");
const restaurant = require("./routes/restaurant");
const menuRouter = require("./routes/menu");
const coupon = require("./routes/couponRoutes");

const order = require("./routes/order");
const auth = require("./routes/auth");
const payment = require("./routes/payment");
const cart = require("./routes/cart");
app.use(express.json({ limit: "30kb" }));
app.use(express.urlencoded({ extended: true, limit: "30kb" }));

app.use("/api/v1/eats", foodRouter);
app.use("/api/v1/eats/menus", menuRouter);
app.use("/api/v1/eats/stores", restaurant);
app.use("/api/v1/eats/orders", order);
// app.use("/api/v1/reviews", review);
app.use("/api/v1/users", auth);
app.use("/api/v1", payment);
app.use("/api/v1/coupon", coupon);
app.use("/api/v1/eats/cart", cart);

app.use("/api/v1/ai", aiRoutes);

//----------------------------------------------------

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Root route to check API status
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is working successfully.",
  });
});
//--------------------------------------------------
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server !`,
  });
});

app.use(errorMiddleware);

module.exports = app;
