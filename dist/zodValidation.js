"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordSchema = exports.usernameSchema = void 0;
const zod_1 = require("zod");
exports.usernameSchema = zod_1.z.string().min(3);
exports.passwordSchema = zod_1.z.string().min(3);
