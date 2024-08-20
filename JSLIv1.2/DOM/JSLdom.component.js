((global) => {
  global.html = ([string]) => {
    return string;
  };
  global.$JSL.DOM.JSX = {
    html: ([string]) => {
      return string;
    },
    // Basically JSX but lighter,uhh also you wont need to compile it,
    /// just use lit-html for highlighting
    component: new Proxy(
      ([htmlstring]) => {
        const elem = document.createElement("div");
        elem.innerHTML = htmlstring;
        elem.render = (parent) => {
          parent.appendChild(elem);
        };
        return elem;
      },
      {
        get: (target, p, r) => {
          return target([p]);
        },
      }
    ),
    Component: class extends HTMLElement {
      constructor(innerText, ElementTemplate, ...a) {
        super();
        this.innerText = innerText;
        typeof ElementTemplate.cssText !== undefined
          ? this.CssStyle(ElementTemplate.cssText)
          : null;
      }
      CssStyle(cssText) {
        this.style.cssText = cssText;
      }
      addClass(...classNames) {
        this.classList.add(...classNames);
      }
    },
    CustomElementConstructor: class {
      /**
       *
       * @param {{connectedCallback:(this: HTMLElement) => void,
				disconnectedCallback:(this: HTMLElement) => void,
				attributeChangedCallback:(
					this: HTMLElement,
					name: string,
					oldValue: string | null,
					newValue: string | null
				) => void,
				adoptedCallback:(this: HTMLElement) => void,
				observedAttributes:() => string[],
				inheritance:HTMLElement}} mod
       */
      constructor(mod) {
        return class extends mod.inheritance {
          constructor() {
            super();
             if (mod.connectedCallback) {
            this.connectedCallback = mod.connectedCallback.bind(this);
          }
          if (mod.disconnectedCallback) {
            this.disconnectedCallback = mod.disconnectedCallback.bind(this);
          }
          if (mod.attributeChangedCallback) {
            this.attributeChangedCallback = mod.attributeChangedCallback.bind(this);
          }
          if (mod.adoptedCallback) {
            this.adoptedCallback = mod.adoptedCallback.call(this);
          }}
          connectedCallback() {
            if (mod.connectedCallback) mod.connectedCallback(this);
          }

          disconnectedCallback() {
            if (mod.disconnectedCallback) mod.disconnectedCallback(this);
          }

          attributeChangedCallback(name, oldValue, newValue) {
            if (mod.attributeChangedCallback)
              mod.attributeChangedCallback(this, name, oldValue, newValue);
          }
          adoptedCallback() {
            if (mod.adoptedCallback) mod.adoptedCallback(this);
          }
          static get observedAttributes() {
            // Return an empty array by default. You can customize this based on your needs.
            return mod.observedAttributes ? mod.observedAttributes() : [];
          }
        };
      }
    },
    createShadowRoot:(rootid,parent)=>{
      const shadowRoot=document.createElement("div")
      shadowRoot.id=rootid
      parent.appendChild(shadowRoot)
      return [shadowRoot.attachShadow({mode:"open"}),shadowRoot]
    },
    useState:({start,increment})=>{
      let val=start
      const HookedElements=[]
      const getVal=()=>val
      const setVal=()=>{
        val+=increment
        for(let i = 0; i > HookedElements.length;i++){
          let elem=HookedElements[i]
          elem.innerHTML=elem.templateText.replace(/\(\)/,getVal()) // assuming the elements have templateText
        }
      }
      const hook=(element)=>{
        HookedElements.push(element)

      }
      return {getVal,setVal,hook}
  },
  createElement:(tag,props,...children)=>{
    const element=document.createElement(tag)
    if(element instanceof Element){
        for(let child of children){
            element.appendChild(child)
        }
    }
    return element
}
  };


})(typeof window !== "undefined" ? window : this);
