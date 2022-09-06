"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reissueAccessToken = void 0;
const decodedToken_1 = require("./decodedToken");
const index_1 = require("./index");
const reissueAccessToken = (token) => {
    const { decoded } = (0, decodedToken_1.decodedToken)(token);
    if (!decoded) {
        return false;
    }
    const accessToken = (0, index_1.generateToken)({ id: decoded.id, username: decoded.username }, "30m");
    return accessToken;
};
exports.reissueAccessToken = reissueAccessToken;
