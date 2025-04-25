"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "ahdjfauregfgafrgayg";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        yield db_1.UserModel.create({
            username: username,
            password: password
        });
        res.status(200).json({
            message: "sign in successful"
        });
    }
    catch (error) {
        res.status(403).json({
            message: "duplicate entry or error",
            error: error
        });
    }
}));
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const userExist = yield db_1.UserModel.findOne({
            username: username,
            password: password
        });
        if (userExist) {
            const token = jsonwebtoken_1.default.sign({ username }, JWT_SECRET);
            res.status(200).json({
                token: token
            });
        }
        else {
            res.status(403).json({
                message: "incorrect credentials"
            });
        }
    }
    catch (error) {
        res.status(403).json({
            error
        });
    }
}));
app.listen(3000);
