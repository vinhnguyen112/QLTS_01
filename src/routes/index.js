const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middlewares/authMiddleware");

router.use("/auth", require("./authRoutes"));
router.use(requireAuth);
router.get("/", (req, res) => res.send("Hệ thống QLTS_01 - Đang tải..."));

module.exports = router;
