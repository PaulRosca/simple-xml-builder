export interface IXMLBuilder {
    outputFile: string;
    nameSpace?: string;
    buffSize?: number;
    format?: boolean;
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
//# sourceMappingURL=xmlBuilder.d.ts.map