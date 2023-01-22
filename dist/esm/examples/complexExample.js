import XMLBuilder from "../index.js";
const xml = new XMLBuilder({ outputFile: "example2.xml", format: true });
xml.add({ tag: "xml", attributes: [{ key: "version", value: "1.0" }, { key: "encoding", value: "UTF-8" }], processing: true })
    .setNamespace("fb")
    .add({ tag: "post", attributes: [{ key: "id", value: "1" }] })
    .setNamespace(null)
    .add({ tag: "user" })
    .txt("John Doe")
    .add({ tag: "conent" })
    .txt("hello")
    .close()
    .setNamespace("ig")
    .add({ tag: "post" })
    .setNamespace(null)
    .add({ tag: "user" })
    .txt("John Smith")
    .add({ tag: "keywords" })
    .add({ tag: "Travel", selfClosing: true })
    .add({ tag: "Photography", selfClosing: true })
    .end();
//# sourceMappingURL=complexExample.js.map