const { Op } = require("sequelize");
const db = require("../models/app");

var Employee = db.employee;
const getEmployees = async (req, res) => {
  try {
    const skip = req.query.page;
    const search = req.query.search;
    const sort = JSON.parse(req.query.sortBy);
    const sortArray = Object.keys(sort).map((key) => [key, sort[key]]);

    console.log(sortArray);

    const employees = await Employee.findAndCountAll({
      attributes: [
        "id",
        [
          db.Sequelize.fn(
            "CONCAT",
            db.Sequelize.col("firstname"),
            " ",
            db.Sequelize.col("lastname")
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
              [Op.eq]: search,
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
      order: sortArray,
    });

    const amount = await Employee.count();

    res.send({ employees, amount });
  } catch (e) {
    console.log(e);
    res.send("Error");
  }
};

module.exports = { getEmployees };
