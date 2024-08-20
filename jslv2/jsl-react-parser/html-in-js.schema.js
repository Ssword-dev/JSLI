
const types = require("@babel/types")
const base = require("./base");

class HTMLInJS extends base.JSXHandler{
    constructor(){
        super("Html in JS",12245)
        
    }
    /**
     * 
     * @param {import("@babel/types").JSXElement | import("@babel/types").JSXFragment} node 
     */
    JSXElementHandler(node) {
        if (!node) {
            console.error("JSXElementHandler received an undefined node.");
            return;
        }
        // Fragment
        if(types.isJSXFragment(node)){
            console.log("Found Fragment!")
            return this.JSXFragmentHandler(node)
        }
        // Elements
        const openingElementName = this.TransformElementName(node.openingElement.name);
        
        const children = node.children.map(child => this.TransformElementNode(child));

        // Text Nodes
        const processedChildren = children.map(child => {
            if (types.isStringLiteral(child)) {
                return types.callExpression(
                    types.memberExpression(
                        types.identifier("$JSL"),
                        types.identifier("DOM.JSX.createTextNode")
                    ),
                    [child]
                )
            }
            return child;
        });
        return types.callExpression(
            types.memberExpression(
                types.identifier("$JSL"),
                types.identifier("DOM.JSX.createElement")
            ),
            [openingElementName,this.TransformAttributes(node.openingElement.attributes), ...processedChildren]
        );
    }
    /**
     * 
     * @param {import("@babel/types").JSXFragment} node 
     * @returns 
     */
    JSXFragmentHandler(node){
        return types.callExpression(
            types.memberExpression(
                types.identifier("$JSL"),types.identifier("DOM.JSX.createFragment"),
            ),
            node.children.map(child=>{
                return this.JSXElementHandler(child)
            })
        )
    }
    /**
     * 
     *@param {import("@babel/types").JSXIdentifier | import("@babel/types").JSXMemberExpression} name 
     */
    TransformElementName(name){
        if(types.isJSXIdentifier(name)){
            return types.stringLiteral(name.name)
        }
        else if(types.isMemberExpression(name)){
            return types.memberExpression(
                this.TransformElementName(name.object),
                this.TransformElementName(name.property)
            )
        }
        else if (types.isJSXNamespacedName(name)) {
            return types.stringLiteral(`${name.namespace.name}:${name.name.name}`)}
        else{
            throw Error("Cannot handle node,type:"+`${name.type}`)
        }
    }
    /**
     * 
     * @param {import("@babel/types").JSXAttribute|import("@babel/types").JSXSpreadAttribute} attributes 
     * @returns 
     */
    TransformAttributes(attributes) {
        const props = [];
    
        attributes.forEach(attr => {
            if (types.isJSXAttribute(attr)) {
                const key = types.identifier(attr.name.name); // Attribute name
                const value = attr.value === null ? types.booleanLiteral(true) : this.TransformElementNode(attr.value); // Attribute value (handle boolean attributes)
                props.push(types.objectProperty(key, value));
            } else if (types.isJSXSpreadAttribute(attr)) {
                props.push(types.spreadElement(this.TransformElementNode(attr.argument)));
            }
        });
    
        return types.objectExpression(props); // Return as an object expression
    }
    /**
     * 
     * @param {import("@babel/types").JSX | types.SpreadElement | types.StringLiteral} node 
     */
    TransformElementNode(node){
        
        if(types.isJSXElement(node)){
            return this.JSXElementHandler(node)
        } 
        else if (types.isSpreadElement(node)) {
            return types.spreadElement(node.argument); }
        else if(types.isJSXText(node)){
            return types.stringLiteral(node.value)
        }
        else if(types.isJSXExpressionContainer(node)){
            return node.expression
        }
        else if (types.isStringLiteral(node)) {
            return types.stringLiteral(node.value); // Handle string literals
        } 
        else if(types.isJSXFragment(node)){
            return this.JSXFragmentHandler(node)
        }
        else{
            throw Error("No node match,type:"+`${node.type}`)
        }
}}
const HTMLInJSExp=new HTMLInJS()
module.exports=HTMLInJSExp