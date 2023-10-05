const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("employees", "root", "Dr@shi77", {
  host: "localhost",
  dialect: "mysql",
  logging:false
});
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
