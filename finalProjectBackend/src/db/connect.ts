import mongoose from "mongoose";
import dbConfig from "../config/db.config.js";
import { Role } from "./models/role.model.js";
import { Fruit } from "./models/fruits.model.js";
import { fruitsArray } from "../services/fruits.js";
import { Vegetable } from "./models/vegetables.model.js";
import { vegetablesArray } from "../services/vegetables.js";
import { Nut } from "./models/nuts.model.js";
import { nutsArray } from "../services/nuts.js";

const { HOST, DB, PORT, ROLES } = dbConfig;
const DBConnect = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(`mongodb://${HOST}:${PORT}/${DB}`);
  await initFruitsDB();
  await initVegetablesDB();
  await initNutsDB();
  await initUsersRolesDB();
  console.log(`successfully connected to the ${DB}`);
};

//create the User/Admin/Mod roles
const initUsersRolesDB = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count === 0) {
      const roles = ROLES.map(
        (r) =>
          new Role({
            name: r,
          })
      );

      for (let role of roles) {
        await role.save();
        console.log("added ", role.name, "to Roles collections");
      }
    }
  } catch (e) {
    console.log("failed with error: " + e);
  }
};

//insert the fruits to the DB
const initFruitsDB = async () => {
  try {
    const count = await Fruit.estimatedDocumentCount();
    if (count === 0) {
      const fruits = fruitsArray.map((f) => {
        return new Fruit(f);
      });

      for (let fruit of fruits) {
        await fruit.save();
      }
    }
  } catch (e) {
    console.log("failed with error: " + e);
  }
};

//insert the vegetables to the DB
const initVegetablesDB = async () => {
  try {
    const count = await Vegetable.estimatedDocumentCount();
    if (count === 0) {
      const vegetables = vegetablesArray.map((v) => {
        return new Vegetable(v);
      });

      for (let vegetable of vegetables) {
        await vegetable.save();
      }
    }
  } catch (e) {
    console.log("failed with error: " + e);
  }
};

//insert the nuts to the DB
const initNutsDB = async () => {
  try {
    const count = await Nut.estimatedDocumentCount();
    if (count === 0) {
      const nuts = nutsArray.map((n) => {
        return new Nut(n);
      });

      for (let nut of nuts) {
        await nut.save();
      }
    }
  } catch (e) {
    console.log("failed with error: " + e);
  }
};

export { DBConnect };
