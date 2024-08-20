//#region: --help flag

//#endregion: --help flag
const parser = require("@babel/parser");
const generator = require("@babel/generator")
const core= require("@babel/core")

const fs = require("fs");
const traverse = require("@babel/traverse");


const [_,__,schemaLocation,target,...flags] = process.argv;
// For future use
const JSX = [
  "JSXFragment",         // Represents a "JSX Fragment (<>...</>)
  "JSXElement",          // Represents a JSX element (<div>...</div>)
  "JSXAttribute",        // Represents a JSX attribute (e.g., className="foo")
  "JSXSpreadAttribute", // Represents a spread attribute (e.g., {...props})
  "JSXIdentifier",       // Represents a JSX identifier (e.g., <MyComponent />)
  "JSXNamespacedName",   // Represents a namespaced name (e.g., <ns:element />)
  "JSXExpressionContainer", // Represents a container for JSX expressions (e.g., {expression})
  "JSXText",             // Represents text within a JSX element (e.g., "text content")
  "JSXEmptyExpression",  // Represents an empty expression (e.g., {...})
  "JSXMemberExpression", // Represents a member expression (e.g., someObject.property)
  "JSXSpreadChild",      // Represents a spread child (e.g., <Component>{...children}</Component>)
];
if (!schemaLocation || !target) {
  throw new Error(`2 arguments must not be Empty`);
}

/**
 * // @type {any}
 */
const schemaFile = require(schemaLocation);

if (schemaFile=={}){
  throw Error("Module doesnt have exports")
  
}
let config={
  minified:false,
  debug:false
}
function log(...a){
  if (config.debug){
    console.log(...a)
  }
}
const enaledflags=[]

flags.forEach(val=>{
  console.log("parsing Flags")
  if (val.startsWith("--")){
    let flag=val.slice(2)
    switch (flag){
      case "m":
        config["minified"]=true
        enaledflags.push(val)
      case "d":
        config["debug"]=true
        enaledflags.push(val)
      default:break;
    }
  }
})
// LOG: Schema logging,for verification
console.log("Loaded schema:",JSON.stringify(schemaFile),"flags:",...enaledflags)

const code = fs.readFileSync(target, { encoding: "utf-8", flag: "r" });

// Parsing the code
const ast = parser.parse(code, {
  sourceType: "module",
  plugins: ["jsx"],
});

/**
 *
 * @param {import("./types/@babel-types").Node} node
 * @returns {import("@babel/traverse").Node}
 */

function AstNodeTransform(node){
  console.log(`Transforming: ${node.type}`)
    switch(node.type){
      case "JSXElement":
      return schemaFile.JSXElementHandler(node)
      case "JSXFragment":
        return schemaFile.JSXFragmentHandler(node)
      case "JSXAttribute":
        return schemaFile.JSXAttributeHandler(node)
      case "JSXOpeningElement":
        return schemaFile.JSXOpeningElementHandler(node)
      case "JSXEmptyExpression":
        return schemaFile.JSXEmptyExpressionHandler(node)
      case "JSXIdentifier":
        return schemaFile.JSXIdentifierHandler(node)
      case "JSXExpressionContainer":
        return schemaFile.JSXExpressionContainerHandler(node)
      case "JSXClosingElement":
        return schemaFile.JSXClosingElementHandler(node);
      case "JSXClosingFragment":
        return schemaFile.JSXClosingFragmentHandler(node)
      case "JSXMemberExpression":
        return schemaFile.JSXMemberExpressionHandler(node)
      case "JSXNamespacedName":
        return schemaFile.JSXNamespacedNameHandler(node)
      case "JSXOpeningFragment":
        return schemaFile.JSXOpeningFragmentHandler(node)
      case "JSXSpreadAttribute":
        return schemaFile.JSXSpreadAttributeHandler(node)
      case "JSXSpreadChild": 
      return schemaFile.JSXSpreadChildHandler(node)
      case "JSXText":
        return schemaFile.JSXTextHandler(node)
      
      default:
        return node
    }
  }

function ASTCodeTransform() {
  traverse.default(ast, {
    enter(path) {
      let newNode = AstNodeTransform(path.node);
      
      // Check if the node was transformed or not
      if (newNode !== path.node) {
        // Replace the old node with the new node if they arent the same
        path.replaceWith(newNode);
        log(`Replacing ${path.node.type} => ${newNode.type}                                                                `);
      } else {
        log(`Keeping Node: ${path.node.type}                                                          `);
      }
    }
  });
}

function Main(){
  const buildTarget=target+".jsl-transformed.js";
  const ErrorPile=[]

  let finishInfo=null
  try{
    
  ASTCodeTransform()
  const { code,...a}= generator.default(ast,{comments:false,minified:config.minified?true:false})
  finishInfo=a
  log(`writing code: \n${code}\n to ${buildTarget}\n // File schema:${schemaLocation}`)
  fs.writeFileSync(buildTarget,code,{encoding:"utf-8",})}
  /**
   * @type {Error}err
   */
  catch(err){
    ErrorPile.push(err.stack)
  }
  finally{
    // Truthy-check, 0 is falsy
    if (ErrorPile.length){
      fs.writeFileSync(buildTarget+".log", ErrorPile.toString(),{encoding:"utf-8"})
    }
    console.log(!finishInfo?`Didnt finish code generation, Error Pile:${ErrorPile}`:finishInfo)
    
  }
}
  
Main()