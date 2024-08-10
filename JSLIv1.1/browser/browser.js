((global)=>{
    let browsername="Unknown";
    browsername=
    /firefox|iceweasel|fxios/i.test(navigator.userAgent)?"firefox":
    /safari/i.test(navigator.userAgent) && !/chrome|crmo|crios/i.test(navigator.userAgent)?"safari":
    /opr\//i.test(navigator.userAgent)?"opera":
    /edg/i.test(navigator.userAgent)?"edge":/msie|trident/i.test(navigator.userAgent)?"ie":
    /chrome|crmo|crios/i.test(navigator.userAgent) && !/edge/i.test(navigator.userAgent)?"chrome":
    undefined
    if (typeof global.$JSL == "undefined" || typeof global.$JSL.browser != "undefined"){
        /**
         * $JSL-no-conflict-check
         */
        throw Error("No-Conflict-Check-Error")
        
    }
    global.$JSL.browser={};
    global.$JSL.browser={
        toString:()=>{
            return "window.browser object";
        },
        type:Object, // type of the object
        base:false, // class=semi, means no inheriting
        /**
         * Browser name
         * NOTE|XXX:DO NOT MOVE CHROME HIGHER THAN THE OTHERS OR IT WILL OVERRIDE ALL OTHER CHECKS
         * ---!important notice!---
         */
        name:"${browser.name}",
        toNumber:()=>{
            return window.browser.id;//return an id-like number, 566564 represents this object's id
        },
        id:566564,
        constructor:()=>{
            return window.browser.browser // equivalent of `this`
        },
        browser:undefined, // equivalent of `this`, refers to this object itself
        call:(base,...thisarg)=>{
            return (base(window.browser,...thisarg))
        },
        requestUrl:document.URL,
        requestParams:(()=>{
            const params={}
            document.URL.split("?").slice(1).forEach((v,i,arr)=>{
                const [key,value]=v.split("=");
                params[key]=JSON.stringify(value)
            })
            return params
        }
    )()
    }
    global.$JSL.browser.name=browsername
    global.$JSL.browser.browser=window.browser
    
    /**
     * equivalent of `typeof o` if o.type is not specified
     */
    window.$JSL.type=(o)=>{
        return o.type?o.type:typeof o
    }})(typeof window != "undefined"?window:this)