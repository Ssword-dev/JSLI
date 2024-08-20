//@ts-nocheck
((global) => {
  /**
   * @type {CSSStyleRule[]}
   */
  let ElementCssDataRegistry = []
  global.jslIntrinsicElements = {
    JSLOminousTag: new $JSL.DOM.JSX.CustomElementConstructor({
      connectedCallback: (thisArg) => {
        const bg = $JSL.DOM.getAttr({ attrname: "bg", element: thisArg })
        thisArg.style = `color:#ff0000;background-color:${bg};`
        console.log(bg)
      },
      inheritance: HTMLElement
    }),
    // JSX-mimic of the DOM the $JSL
    JSLGlowtag: new $JSL.DOM.JSX.CustomElementConstructor({
      connectedCallback: (element) => {
        element.style.filter = `drop-shadow(${$JSL.DOM.getAttr({ element: element, attrname: "glow" }).value})`
        console.log($JSL.DOM.getAttr({ element: element, attrname: "glow" }));
      }, inheritance: HTMLElement
    }),
    JSXFragment: new $JSL.DOM.JSX.CustomElementConstructor({
      inheritance: HTMLElement,
      connectedCallback: (thisArg) => {

        for (let child of thisArg.childNodes) {
          console.log(child instanceof Element)
          if (child instanceof Element) {
            child.setAttribute("fragmented", "true")
          }
        }
      }
    }),
    JSLElementDefinitionTag: new $JSL.DOM.JSX.CustomElementConstructor({
      inheritance: HTMLElement,
      connectedCallback: (thisArg) => {
        const newTagName = $JSL.DOM.getAttr({ element: thisArg, attrname: "tagname" }).value
        const newTagStyle = $JSL.DOM.getAttr({ element: thisArg, attrname: "tagstyle" }).value
        const newTagStyleMarker = $JSL.DOM.getAttr({ element: thisArg, attrname: "markerstyle" })
        let evl = () => undefined
        if (thisArg.hasAttribute("oncreate")) {
          const oncreate = thisArg.attributes.getNamedItem("oncreate").value;
          evl = () => eval(oncreate)




        }
        document.adoptedStyleSheets[0].insertRule(`${newTagName}{${newTagStyle}}`)
        if (typeof newTagStyleMarker == "string") {
          document.adoptedStyleSheets[0].insertRule(`${newTagName}::marker{${typeof newTagStyleMarker == "string" ? newTagStyleMarker : "inherit"}}`)
        }
        const newTag = new $JSL.DOM.JSX.CustomElementConstructor({
          inheritance: HTMLElement,
          connectedCallback: thisArg => {

            if (typeof evl === "function") {
              evl.bind(thisArg)
              evl()
            }
          }
        })
        window.customElements.define(newTagName, newTag)

      }
    }),
    JSLGroupDefinitionTag: new $JSL.DOM.JSX.CustomElementConstructor({
      inheritance: HTMLElement,
      connectedCallback: thisArg => {
        thisArg.setAttribute("role", "element-definition")

      }
    }),
    JSLShadowRootTag: new $JSL.DOM.JSX.CustomElementConstructor(
      {
        inheritance: HTMLElement,
        connectedCallback: thisArg => {
          thisArg.attachShadow({ mode: "open" })
          thisArg.setAttribute("isShadow", "true")
        }
      }
    ),
    JSLValidationInputElement: new $JSL.DOM.JSX.CustomElementConstructor(
      {
        inheritance: HTMLElement,
        connectedCallback: (thisArg) => {
          //thisArg.setAttribute("contenteditable", "true");
          thisArg.setAttribute("inputmode", "text");

          const regexPattern = thisArg.getAttribute("regvalidator");
          if (regexPattern) {

            thisArg.validatorRegex = new RegExp(`^${regexPattern}$`, "");
          }
          thisArg.addEventListener("input", (ev) => {
            const inputText = thisArg.innerText;
            thisArg.value = thisArg.innerText;
            if (thisArg.validatorRegex.test(inputText)) {
              console.log("valid");
              thisArg.classList.add("valid");
              thisArg.classList.remove("invalid");
            } else {
              console.log("invalid");
              thisArg.classList.add("invalid");
              thisArg.classList.remove("valid");
            }
          });
        }
      }
    )

  },

    global.customElements.define("ominous-tag", global.jslIntrinsicElements.JSLOminousTag)
  global.customElements.define("glow-tag", global.jslIntrinsicElements.JSLGlowtag)
  global.customElements.define("jsx-fragment", global.jslIntrinsicElements.JSXFragment)
  // Hey! JSLdom now has built-in define-element!
  // use it like this:
  // <define-element tagname="foo-tag" tagstyle="border-radius:50%"></define-element>
  // note:this element gets appied the "display:block" style automatically if used with group-def
  global.customElements.define("define-element", global.jslIntrinsicElements.JSLElementDefinitionTag)
  global.customElements.define("group-def", global.jslIntrinsicElements.JSLGroupDefinitionTag)
  global.customElements.define("shadow-root", global.jslIntrinsicElements.JSLShadowRootTag)
  global.customElements.define("validated-input", global.jslIntrinsicElements.JSLValidationInputElement)
  const css = new CSSStyleSheet()
  css.replaceSync(
    `
    group-def>define-element{display:none}
    validated-input{
    background:#fff;
    border:1px black solid;
    width:50px;
    height:20px;content:"";
    display:block;
    -webkit-user-modify:read-write;
    overflow-wrap:no-wrap;
    -webkit-line-break:after-white-space;
    overflow-x:hidden}
    validated-input.invalid{background:#fff;border:1px red solid}
    validated-input.valid{background:#fff;border:1px green solid}
    validated-input.invalid::after {
    position:absolute;
    height:30px;
    left:50px;
    color: #fff;
    background: #000;
    border:1px red solid;
    border-radius:10%;
    content: "Invalid Input";
    display: block; /* Ensures the content is rendered as a block */
    margin-top: 5px; /* Adds some spacing above the text */
  }
    validated-input.::after{content:"";pointer-events:none;}
    `)
  window.document.adoptedStyleSheets.push(css)

})(typeof window !== "undefined" ? window : this)
