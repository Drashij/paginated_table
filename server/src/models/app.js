const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://afnkoxvm:suyRj4trsXigN1mWlYoSi9EovU1_XIT9@rain.db.elephantsql.com/afnkoxvm",
  { logging: false }
);
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employee = require("./employee")(sequelize, DataTypes);
db.sequelize.sync({ force: false });

module.exports = db;
