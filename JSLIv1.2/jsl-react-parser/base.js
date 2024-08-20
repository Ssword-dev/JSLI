const types = require("@babel/types")
/**
 * Holds all of the registered JSX handler and their ids
 */
const registry = {
    
}
class JSXHandler{
    /**
     * 
     * @param {string} handlerName Unique Name
     * @param {number} handlerId A way to tell the difference between 2 Handlers
     */
    constructor(
        handlerName,
        handlerId
    ){  
        if(handlerId in Object.keys(registry)){
            throw Error("A Handler is already on the chosen handler id")
        }
        this.handlerName=handlerName,
        this.handlerId=handlerId,
        registry[handlerId]=this
    }
    /**
     * 
     * @param {types.JSXElement} node 
     * @returns {types.CallExpression|types.Node} Actual Impl should return a function
     * Call AST
     * @abstract
     */
    JSXElementHandler(node){
        throw Error("Abstract Method")
    }
    /**
     * 
     * @param {types.JSXFragment} node 
     * @returns {types.CallExpression|types.Node} Actual Impl should return a function
     * Call AST
     * @abstract
     */
    JSXFragmentHandler(node){
        throw Error("Abstract Method")
    }
}
function handlerEquality(handler,otherhandler){
    return handler.handlerId==otherhandler.handlerId
}
/**
 * 
 * @param {number} id 
 * @returns  {JSXHandler|null}
 */
function getHandlerbyId(id){
    return registry[id]?registry[id]:null
}
module.exports={
    JSXHandler,handlerEquality,getHandlerbyId
}