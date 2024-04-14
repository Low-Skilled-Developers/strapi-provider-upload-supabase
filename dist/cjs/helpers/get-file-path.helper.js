"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilePath = void 0;
function getFilePath(file) {
    return `${file.hash}${file.ext}`;
}
exports.getFilePath = getFilePath;
