# simple-xml-builder
A simple node package for building large xml files.
## Installation
```sh
$ npm install simple-xml-builder
```
## Usage
To import the package we can do the following

```JavaScript
//CJS
const { XMLBuilder } = require("simple-xml-builder");

//ESM
import { XMLBuilder } from "simple-xml-builder";
```

Here we have a simple example

```JavaScript
import { XMLBuilder } from "simple-xml-builder";

const xml = new XMLBuilder({ outputFile: "example1.xml", format: true });

xml.add({ tag: "cars" })
    .add({ tag: "ford" })
    .add({ tag: "seats" })
    .txt("4")
    .add({ tag: "horsepower" })
    .txt("349")
    .end(); // or .close().close()

```
And it's corresponding output file

```XML
<cars>
  <ford>
    <seats>
      4
    </seats>
    <horsepower>
      349
    </horsepower>
  </ford>
</cars>

```
A more complex example
```JavaScript
import { XMLBuilder } from "simple-xml-builder";

const xml = new XMLBuilder({ outputFile: "example2.xml", format: true });
xml.add({ tag: "xml", attributes: [{ key: "version", value: "1.0" }, { key: "encoding", value: "UTF-8" }], processing: true })
    .setNamespace("fb")
    .add({ tag: "post", attributes: [{ key: "id", value: "1" }] })
    .setNamespace(null)
    .add({ tag: "user" })
    .txt("John Doe")
    .add({ tag: "content" })
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
```
Output
```XML
<?xml version="1.0" encoding="UTF-8"?>
<fb:post id="1">
  <user>
    John Doe
  </user>
  <content>
    hello
  </content>
</post>
<ig:post>
  <user>
    John Smith
  </user>
  <keywords>
    <Travel/>
    <Photography/>
  </keywords>
</post>
```
## API
### `XMLBuilder(options)`
The XMLBuilder class takes an `options` parameter with the following format

Field | Type | Required | Default
:---:|:---:|:---:|:---:
`outputFile` | `string` | `true` |
`nameSpace` | `string`\|`undefined`\|`null` | `false` | 
`buffSize` | `number` | `false` | `50000`
`format` | `boolean` | `false` | `false`
`delimiter` | `string` | `false` | `  `

The `outputFile` is used to specify the path of the generated XML file. `nameSpace` is used to specify the initial namespace of the tags, it can be later modified ussing `.setNamespace(nameSpace)`.
The class is writing the file content synchronous using a buffer, for peformance reasons, `buffSize` is used to specify the size of the buffer (in lines). `format` is used to specify if we want our genereated xml to be formatted, keeping this off will give a smaller output file.
### `Attribute`
`Attribute` for XML tags, they have the following format

Field | Type
:---:|:---:
`key` | `string`
`value` | `string`
### `.add(options)`
The `add` function is used to add a new tag to the file, it receives one parameter with the following format. The `value` will be XML encoded.

Field | Type | Required | Default
:---:|:---:|:---:|:---:
`tag` | `string` | `true` | 
`selfClosing` | `boolean` | `false` | `false`
`attributes` | `Attribute[]` | `false` | `[]`
`processing` | `boolean` | `false` | `false`

The `selfClosing` parameters specifies if the tag should be self closing, e.g
```XML
<someTag/>
```
The `attributes` option takes an array of `Attribute`s and adds them to the tag. `processing` is used to specify if the tag is a processing instruction, e.g
```XML
<? ... ?>
```
### `.txt(content: string)`
The `txt` function is used to add text content inside a tag. After a call to this function, the current tag will be closed automatically
### `.close()`
The `close` function is used to close the current opened tag.
### `.end()`
The `end` function is used to close all current opened tags.
### `.log()`
The `log` function can be used for debugging, it will `console.log` the current buffer, opened tags and indentation level
