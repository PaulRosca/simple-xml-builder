"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = __importDefault(require("../index.js"));
const xml = new index_js_1.default({ outputFile: "example1.xml", format: true });
xml.add({ tag: "cars" })
    .add({ tag: "ford" })
    .add({ tag: "seats" })
    .txt("4")
    .add({ tag: "horsepower" })
    .txt("349")
    .end(); // or .close().close()
//# sourceMappingURL=simpleExample.js.map