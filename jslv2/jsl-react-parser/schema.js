const base = require("./base")
const types=require("@babel/types")
class MyJSXHandler extends base.JSXHandler{
    constructor(){
        super("MyJSXHandler",11203)
        
    }
    /**
     * 
     * @param {import("@babel/types").JSXElement|import("@babel/types").JSXFragment} node 
     * @returns 
     */
    JSXElementHandler(node) {
        const transformedChildren = node.children.map(child => {
            if (child.type === 'JSXText') {
                // Trim whitespace and convert to a string literal
                return types.stringLiteral(child.value.trim());
            } else if (child.type === 'JSXElement') {
                // Recursively transform child JSX elements
                return this.JSXElementHandler(child);
            }
            else if (child.type == "JSXFragment"){
                return this.JSXFragmentHandler(child)
            }
            // Handle other child types if needed
            return child;
        });

        // Replace the JSXElement with a custom call expression
        return types.callExpression(
            types.memberExpression(
                types.memberExpression(types.identifier("$JSL"), types.identifier("DOM")),
                types.identifier("JSX.createFragment")
            ),
            transformedChildren
        );
    }
            /**
             * @param {import("@babel/types").JSXFragment} node 
             */
            JSXFragmentHandler(node) {
                // Transform each child of the JSXFragment
                const transformedChildren = node.children.map(child => {
                    if (child.type === 'JSXText') {
                        // Trim whitespace and convert to a string literal
                        return types.stringLiteral(child.value.trim());
                    } else if (child.type === 'JSXElement') {
                        // Recursively transform child JSX elements
                        return this.JSXElementHandler(child);
                    } else if (child.type === 'JSXFragment') {
                        // Recursively transform nested fragments
                        return this.JSXFragmentHandler(child);
                    }
                    // Handle other child types if needed
                    return child;
                });
        
                // Replace the JSXFragment with a custom call expression
                return types.callExpression(
                    types.memberExpression(
                        types.memberExpression(types.identifier("$JSL"), types.identifier("DOM")),
                        types.identifier("JSX.Fragment")
                    ),
                    transformedChildren
                );
            }
        }
    
const myHandlers=new MyJSXHandler
module.exports=myHandlers