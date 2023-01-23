import { XMLBuilder } from "simple-xml-builder";

const xml = new XMLBuilder({ outputFile: "example1.xml", format: true });

xml.add({ tag: "cars" })
    .add({ tag: "ford" })
    .add({ tag: "seats" })
    .txt("4")
    .add({ tag: "horsepower" })
    .txt("349")
    .end(); // or .close().close()
