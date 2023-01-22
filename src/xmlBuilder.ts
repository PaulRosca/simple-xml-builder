const fs = require("fs");

const encodeHTML = (stringData: string): string => {
    return stringData.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
};

export interface IXMLBuilder {
    outputFile: string,
    nameSpace?: string,
    buffSize?: number,
    format?: boolean
};

export interface IAttribute {
    key: string,
    value: string
};

export interface IAdd {
    tag: string,
    selfClosing?: boolean,
    attributes?: IAttribute[],
    processing?: boolean
};

class XMLBuilder {
    private __fd: number;
    private __namespace: string | undefined | null;
    private __lvl: number;
    private __tags: string[];
    private __buffer: string;
    private __buffSize: number;
    private __lines: number;
    private __format: boolean;

    constructor({ outputFile, nameSpace, buffSize = 50000, format = false }: IXMLBuilder) {
        this.__fd = fs.openSync(outputFile, "w");
        this.setNamespace(nameSpace);
        this.__lvl = 0;
        this.__tags = [];
        this.__buffer = '';
        this.__buffSize = buffSize;
        this.__lines = 0;
        this.__format = format;
    };
    private __tabs(lvl: number): void {
        if (this.__format) {
            for (let i = 0; i < lvl; i++) this.__buffer += "\t";
        }
    };
    private __addToBuffer(content: string): void {
        this.__buffer += content + (this.__format ? "\n" : "");
        this.__lines++;
    };
    private __flushBuffer() {
        if (this.__buffer !== '') {
            fs.appendFileSync(this.__fd, this.__buffer);
            this.__buffer = '';
            this.__lines = 0;
        }
    };
    public setNamespace(nameSpace: string | undefined | null): XMLBuilder {
        this.__namespace = nameSpace ? nameSpace + ":" : "";
        return this;
    };
    public add({ tag, selfClosing = false, attributes = [], processing = false }: IAdd): XMLBuilder {
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
                tagContent += `${attributes[i].key}="${encodeHTML(attributes[i].value)}"`
            }
        }
        if(selfClosing) {
            tagContent += "/";
        }
        if(processing) {
            tagContent += "?";
        }
        tagContent += ">";
        this.__addToBuffer(tagContent);
        if (!selfClosing && !processing) {
            this.__tags.push(tag);
            this.__lvl++;
        }
        return this;
    };
    public txt(content: string | number): XMLBuilder {
        this.__tabs(this.__lvl);
        content = encodeHTML(String(content));
        this.__addToBuffer(`${content}`)
        this.close();
        return this;
    };
    public close(): XMLBuilder {
        this.__tabs(this.__lvl - 1);
        const tag = this.__tags.pop();
        this.__addToBuffer(`</${this.__namespace}${tag}>`);
        if (this.__lines === this.__buffSize) {
            this.__flushBuffer();
        }
        this.__lvl--;
        return this;
    };
    public end(): XMLBuilder {
        while (this.__tags.length) this.close();
        this.__flushBuffer();
        return this;
    };
    public log(): XMLBuilder {
        console.log("BUFFER: " + this.__buffer);
        console.log("TAGS: " + this.__tags);
        console.log("INDENTATION LEVEL: " + this.__lvl);
        return this;
    };
};

module.exports = XMLBuilder;
