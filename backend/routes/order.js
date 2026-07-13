const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
} = require("../controllers/orderController");

const authController = require("../controllers/authController");
const { authorizeRoles } = require("../middlewares/authorizeRoles");

router.route("/new").post(authController.protect, newOrder);
router
  .route("/admin/orders")
  .get(authController.protect, authorizeRoles("admin"), allOrders);
router
  .route("/admin/orders/:id")
  .put(authController.protect, authorizeRoles("admin"), updateOrder);

router.route("/:id").get(authController.protect, getSingleOrder);
router.route("/me/myOrders").get(authController.protect, myOrders);

module.exports = router;
