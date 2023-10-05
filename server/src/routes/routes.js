const express = require("express");
const { getEmployees, filterEmployees } = require("../controllers/employee");
const router = express.Router();
router.get("", getEmployees);
router.get("/filter", filterEmployees);
module.exports = router;
