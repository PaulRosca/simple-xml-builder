export interface IXMLBuilder {
    outputFile: string;
    nameSpace?: string;
    buffSize?: number;
    format?: boolean;
    delimiter?: string;
}
export interface IAttribute {
    key: string;
    value: string;
}
export interface IAdd {
    tag: string;
    selfClosing?: boolean;
    attributes?: IAttribute[];
    processing?: boolean;
}
export declare class XMLBuilder {
    private __fd;
    private __namespace;
    private __lvl;
    private __tags;
    private __buffer;
    private __buffSize;
    private __lines;
    private __format;
    private __delimiter;
    constructor({ outputFile, nameSpace, buffSize, format, delimiter }: IXMLBuilder);
    private __tabs;
    private __addToBuffer;
    private __flushBuffer;
    setNamespace(nameSpace: string | undefined | null): XMLBuilder;
    add({ tag, selfClosing, attributes, processing }: IAdd): XMLBuilder;
    txt(content: string | number): XMLBuilder;
    close(): XMLBuilder;
    end(): XMLBuilder;
    log(): XMLBuilder;
}
//# sourceMappingURL=xmlBuilder.d.ts.map