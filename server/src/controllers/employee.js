const { Op } = require("sequelize");
const db = require("../models/app");

var Employee = db.employee;
const getEmployees = async (req, res) => {
  try {
   
    const skip = req.query.page;
    const [sort, dir] = req.query.sortBy.split(":") || ["firstName", "ASC"];
    
    const employees = await Employee.findAll({
      attributes: [
        "id",
        [
          db.Sequelize.fn(
            "CONCAT",
            db.Sequelize.col("firstName"),
            " ",
            db.Sequelize.col("lastName")
          ),
          "fullName",
        ],
        "email",
        "empId",
        "department",
        "designation",
        "projectCount",
        "joiningDate",
      ],
      limit: 10,
      offset: skip ? (skip - 1) * 10 : 0,
      order: [[sort, dir]],
    });
    const amount = await Employee.count();
   
    res.send({ employees, amount });
  } catch (e) {
    console.log(e);
    res.send("Error");
  }
};

const filterEmployees = async (req, res) => {
  try {
    const search = req.query.search;
    const skip = req.query.page;
    const sort = req.query.sort || "firstName";
    const dir = req.query.sort ? "DESC" : "ASC";
    const employees = await Employee.findAndCountAll({
      attributes: [
        "id",
        [
          db.Sequelize.fn(
            "CONCAT",
            db.Sequelize.col("firstName"),
            " ",
            db.Sequelize.col("lastName")
          ),
          "fullName",
        ],
        "email",
        "empId",
        "department",
        "designation",
        "projectCount",
        "joiningDate",
        
      ],
      where: {
        [Op.or]: [
          {
            firstname: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            lastname: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            empId: {
              [Op.like]: `%${search}%`,
            },
          },

          {
            designation: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            projectCount: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            joiningDate: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
      limit: 10,
      offset: skip ? (skip - 1) * 10 : 0,
      order: [[sort, dir]],
    });
   
    res.send(employees);
  } catch (e) {
    console.log(e);
    res.send("Not found");
  }
};


module.exports = { getEmployees, filterEmployees };
