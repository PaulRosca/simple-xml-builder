import fs from "fs";
const encodeHTML = (stringData) => {
    return stringData.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
};
;
;
;
export class XMLBuilder {
    __fd;
    __namespace;
    __lvl;
    __tags;
    __buffer;
    __buffSize;
    __lines;
    __format;
    __delimiter;
    constructor({ outputFile, nameSpace, buffSize = 50000, format = false, delimiter = "  " }) {
        this.__fd = fs.openSync(outputFile, "w");
        this.setNamespace(nameSpace);
        this.__lvl = 0;
        this.__tags = [];
        this.__buffer = '';
        this.__buffSize = buffSize;
        this.__lines = 0;
        this.__format = format;
        this.__delimiter = delimiter;
    }
    ;
    __tabs(lvl) {
        if (this.__format) {
            for (let i = 0; i < lvl; i++)
                this.__buffer += this.__delimiter;
        }
    }
    ;
    __addToBuffer(content) {
        this.__buffer += content + (this.__format ? "\n" : "");
        this.__lines++;
    }
    ;
    __flushBuffer() {
        if (this.__buffer !== '') {
            fs.appendFileSync(this.__fd, this.__buffer);
            this.__buffer = '';
            this.__lines = 0;
        }
    }
    ;
    setNamespace(nameSpace) {
        this.__namespace = nameSpace ? nameSpace + ":" : "";
        return this;
    }
    ;
    add({ tag, selfClosing = false, attributes = [], processing = false }) {
        this.__tabs(this.__lvl);
        let tagContent = "<";
        if (processing) {
            tagContent += "?";
        }
        tagContent += this.__namespace;
        tagContent += tag;
        if (attributes.length) {
            for (let i = 0; i < attributes.length; i++) {
                tagContent += " ";
                tagContent += `${attributes[i].key}="${encodeHTML(attributes[i].value)}"`;
            }
        }
        if (selfClosing) {
            tagContent += "/";
        }
        if (processing) {
            tagContent += "?";
        }
        tagContent += ">";
        this.__addToBuffer(tagContent);
        if (!selfClosing && !processing) {
            this.__tags.push(tag);
            this.__lvl++;
        }
        return this;
    }
    ;
    txt(content) {
        this.__tabs(this.__lvl);
        content = encodeHTML(String(content));
        this.__addToBuffer(`${content}`);
        this.close();
        return this;
    }
    ;
    close() {
        this.__tabs(this.__lvl - 1);
        const tag = this.__tags.pop();
        this.__addToBuffer(`</${this.__namespace}${tag}>`);
        if (this.__lines === this.__buffSize) {
            this.__flushBuffer();
        }
        this.__lvl--;
        return this;
    }
    ;
    end() {
        while (this.__tags.length)
            this.close();
        this.__flushBuffer();
        return this;
    }
    ;
    log() {
        console.log("BUFFER: " + this.__buffer);
        console.log("TAGS: " + this.__tags);
        console.log("INDENTATION LEVEL: " + this.__lvl);
        return this;
    }
    ;
}
;
//# sourceMappingURL=xmlBuilder.js.map