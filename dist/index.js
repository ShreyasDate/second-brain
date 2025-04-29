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
const zodValidation_1 = require("./zodValidation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usernameResult = zodValidation_1.usernameSchema.safeParse(req.body.username);
    const passwordResult = zodValidation_1.passwordSchema.safeParse(req.body.password);
    if (usernameResult.success && passwordResult.success) {
        const hashedPassword = yield bcrypt_1.default.hash(passwordResult.data, 10);
        try {
            yield db_1.UserModel.create({
                username: usernameResult.data,
                password: hashedPassword
            });
            res.status(200).json({
                message: "sign up successful"
            });
        }
        catch (error) {
            res.status(403).json({
                message: "duplicate entry or error",
                error: error
            });
        }
    }
    else {
        res.status(403).json({
            usernameError: usernameResult.error,
            passwordError: passwordResult.error
        });
    }
}));
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usernameResult = zodValidation_1.usernameSchema.safeParse(req.body.username);
    const passwordResult = zodValidation_1.passwordSchema.safeParse(req.body.password);
    if (usernameResult.success && passwordResult.success) {
        try {
            const userExist = yield db_1.UserModel.findOne({
                username: usernameResult.data,
            });
            if (userExist === null || userExist === void 0 ? void 0 : userExist.password) {
                let hashedPassword = userExist.password;
                const comparePassword = yield bcrypt_1.default.compare(passwordResult.data, hashedPassword);
                if (comparePassword) {
                    const token = jsonwebtoken_1.default.sign({ id: userExist._id }, config_1.JWT_SECRET);
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
            else {
                res.status(403).json({
                    message: "User Not found credentials"
                });
            }
        }
        catch (error) {
            res.status(403).json({
                error
            });
        }
    }
    else {
        res.status(403).json({
            usernameError: usernameResult.error,
            passwordError: passwordResult.error
        });
    }
}));
app.post("/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const link = req.body.link;
    yield db_1.ContentModel.create({
        title: title,
        link: link,
        // @ts-ignore
        userId: req.userId,
        tags: []
    });
    res.json({
        message: "added Content"
    });
}));
app.get("/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
}));
app.listen(3000);
