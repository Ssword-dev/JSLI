function createTextNode(text){
    const elem = document.createTextNode(text)
    elem.render=(parent)=>{
        parent.appendChild(elem)
    }
    return elem
}
function createElement(tag, props, ...children) {
    const element = document.createElement(tag);

    // Optionally, set any properties/attributes
    if (props) {
        for (let [key, value] of Object.entries(props)) {
            element.setAttribute(key, value);
        }
    }
    if (element instanceof Element) {
        for (let child of children) {
            if (typeof child === 'string' || typeof child === 'number') {
                // Convert strings or numbers into text nodes
                child = createTextNode(child)
            }
        }}
    element.render=(parent)=>{
        parent.appendChild(element)
        element.onRender(parent,element)
        if (element instanceof Element) {
            for (let child of children) {
                if (child instanceof Node) {
                    // Append the child if it's a valid Node
                    child.render(element)
                    
                }
            }
        }
    }
    return element;
}
// Append to the api
window.$JSL.DOM.JSX.createElement = createElement;
window.$JSL.DOM.JSX.createTextNode = createTextNode;