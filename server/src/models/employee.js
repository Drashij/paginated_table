module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "employee",
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          notEmpty: true,
        },
      },
      lastname: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      empId: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      department: {
        type: DataTypes.STRING,
      },
      designation: {
        type: DataTypes.STRING,
      },
      projectCount: {
        type: DataTypes.STRING,
      },
      joiningDate: {
        type: DataTypes.STRING,
      },
    },
    { tablename: "employees" }
  );
  return Employee;
};
