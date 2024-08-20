/**
 * @typedef {{
 * element:Element,
 * attrname:string
 * }}getAttrParams
 * @typedef {RegExp}Regex
 */
((global)=>{
    if(typeof global.$JSL == "undefined"|| typeof global.$JSL.DOM != "undefined"){
        throw Error("No-conflict-error:DOM")
    }
    global.$JSL.DOM={
        forEach:(selector,fun)=>{
            const elements=document.querySelectorAll(selector)
            for(let i = 0;i<elements.length;i++){
                let elem=elements[i]
                fun(elem,i)
            }
        },
        /**
         *
         * @param {getAttrParams} params
         * @returns {{[k:str]:any}}
         */
        getAttr:(params)=>{
            return params.element.attributes[params.attrname]
        },
        /**
         *
         * @param {Element} element
         * @returns {ClassListArray}
         */
        getClassList:(element)=>{
            return [element].concat(...element.classList.toString().split(" "))
        },
        fill:(element,parent,cnt)=>{
            for(let i = 0;i <= cnt;i++){
                let newElem=element.cloneNode(true)
                parent.appendChild(newElem)
            }
        },
        create:(className,idName,tagName,innerText)=>{
            /**
             * @type {Element}
             */
            const thisElem =document.createElement(tagName);
            thisElem.className=className;
            thisElem.id=idName;
            thisElem.innerText=innerText
            return thisElem;
        },
        /**
         *
         * @param {*} innerHtml
         * @returns
         * @deprecated -- unfinished
         */
        template:(innerHtml)=>{
            const temp=[]
            const ptr=/%\d%/i
            const params=ptr.exec(innerHtml).forEach(
                (v,i,arr)=>{
                    temp[i]=arr[i]=`%${i}%`
                }
            )
            return params
        },
        simpleNode:()=>{
          return
        }
    }
})(typeof window !== "undefined"?window:this)
