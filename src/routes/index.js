const express = require("express");
const router = express.Router();
const { requireAuth, hasPermission } = require("../middlewares/authMiddleware");

// 1. Phân hệ Xác thực (Công khai - không cần đăng nhập)
router.use("/auth", require("./authRoutes"));

// Áp dụng middleware kiểm tra đăng nhập cho tất cả các chức năng bên dưới
router.use(requireAuth);

// 2. Phân hệ Trang chủ & Dashboard (Ai đã đăng nhập cũng xem được)
router.use("/", require("./homeRoutes"));

// 3. Phân hệ Quản lý Tài sản & Vòng đời
router.use("/assets", require("./assetRoutes"));
router.use("/requests", require("./requestRoutes"));

// 4. Phân hệ Danh mục & Cơ cấu tổ chức
router.use("/employees", hasPermission("MANAGE_SYSTEM"), require("./employeeRoutes"));
router.use("/departments", hasPermission("MANAGE_MASTER_DATA"), require("./departmentRoutes"));
router.use("/categories", hasPermission("MANAGE_MASTER_DATA"), require("./categoryRoutes"));
router.use("/locations", hasPermission("MANAGE_MASTER_DATA"), require("./locationRoutes"));
router.use("/suppliers", hasPermission("MANAGE_MASTER_DATA"), require("./supplierRoutes"));

module.exports = router;
