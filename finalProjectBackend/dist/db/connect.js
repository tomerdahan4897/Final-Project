var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const DBConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    mongoose.set("strictQuery", false);
    yield mongoose.connect(`mongodb://${HOST}:${PORT}/${DB}`);
    yield initFruitsDB();
    yield initVegetablesDB();
    yield initNutsDB();
    yield initUsersRolesDB();
    console.log(`successfully connected to the ${DB}`);
});
//create the User/Admin/Mod roles
const initUsersRolesDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield Role.estimatedDocumentCount();
        if (count === 0) {
            const roles = ROLES.map((r) => new Role({
                name: r,
            }));
            for (let role of roles) {
                yield role.save();
                console.log("added ", role.name, "to Roles collections");
            }
        }
    }
    catch (e) {
        console.log("failed with error: " + e);
    }
});
//insert the fruits to the DB
const initFruitsDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield Fruit.estimatedDocumentCount();
        if (count === 0) {
            const fruits = fruitsArray.map((f) => {
                return new Fruit(f);
            });
            for (let fruit of fruits) {
                yield fruit.save();
            }
        }
    }
    catch (e) {
        console.log("failed with error: " + e);
    }
});
//insert the vegetables to the DB
const initVegetablesDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield Vegetable.estimatedDocumentCount();
        if (count === 0) {
            const vegetables = vegetablesArray.map((v) => {
                return new Vegetable(v);
            });
            for (let vegetable of vegetables) {
                yield vegetable.save();
            }
        }
    }
    catch (e) {
        console.log("failed with error: " + e);
    }
});
//insert the nuts to the DB
const initNutsDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield Nut.estimatedDocumentCount();
        if (count === 0) {
            const nuts = nutsArray.map((n) => {
                return new Nut(n);
            });
            for (let nut of nuts) {
                yield nut.save();
            }
        }
    }
    catch (e) {
        console.log("failed with error: " + e);
    }
});
export { DBConnect };
