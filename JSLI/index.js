//@ts-config:no-typecheck

const JSLI=((window,factory)=>{
    // insert into global scope (:
    var JSLbase = factory()
    window.$JSL /* :$JSLBASE */= JSLbase;
    return JSLbase
    }
)( typeof window !== "undefined" ? window : globalThis,()=>{
    return class {
    constructor(scopes,NSext){
                this.scopes=scopes
                this.NSextension=NSext
                this.mode=1
                this.$JSL=$JSL
            }
    }.prototype={
        Test:()=>{return "Hello"},
        /**
         * 
         * @param {string} str 
         * @returns {string}
         */
        ReverseString:(str/* :string */)=>{
            return str.split("").reverse().join("")
        },
        //@ts-ignore: no-typecheck
        AttatchProperty:(propertyval,propertyname,assertinto,err)=>{
            if (propertyval&&propertyname&&assertinto){ 
                try{
                    assertinto[propertyname]=propertyval
                }
                catch(e){
                    if (!err){
                        throw Error("Default Error, Error Occured and an error handler was missing")
                    }
                    err(e)
                }
            }
            else
            {
                throw Error("Cannot Proceed if the first 3 parameters are not defined")
            }
        },
        //@ts-ignore
        Cache:(fun)=>{
            var cache={}
            //@ts-ignore
            return (...a)=>{
                if (String(a) in cache){
                    //@ts-ignore:the keys are string
                    return cache[String(a)]
                }
                else{
                    var result=fun(...a)
                    //@ts-ignore
                    cache[String(a)]=result
                    return result
                }
            }
            
        },
        /**
         * 
         * @param {number[]} entries 
         * @returns {Promise<number[]>}
         */
        NumericSort:async(entries)=>{
            return entries.sort((a,b)=> a - b)
        },
        //@ts-ignore:no-typecheck
        AttatchasWindowModule:(alias,factory,target="Commonjs")=>{
            var global = target=="Commonjs"?globalThis:target=="ES6"?window:window
            //@ts-ignore:no-typecheck
            global[alias]=factory()
        },
        //@ts-ignore:no-typecheck
        
        Wraps:(decorator,fun,...argv)=>{
            var A=decorator(fun,...argv);
            if (fun.__doc__){
                A.__doc__=fun.__doc__
            }
            return A
        },

        //@ts-ignore:no-typecheck
        Import: (path,alias)=>{
            (async()=>{
            if (typeof path !== "string"&&typeof alias !== "string"){
                throw Error("Path have to be a string")
            }
            // Environment independent importing
            var global = typeof window !== undefined ? window : globalThis;
            if (typeof module === "object" && typeof module.exports === "object"){
                try{
                    //@ts-ignore:type:intended
                    global[alias]=require(path)
                }
                catch(err){
                    throw err
                }
            }
            else{
                var request = await fetch(path)
                var json= await request.text()
                var imp =eval(json)
                //@ts-ignore:no-typecheck
                global[alias]= imp
            }
        })()
        },//@ts-ignore
        Property:(thisObj,fun,...a)=>{
            thisObj[fun.name] = fun(...a)
        },
        JSLattr:(key)=>window.$JSL.KnownJSLattr()[key],
        KnownJSLattr:()=>({
            "Test":window.$JSL.Test,
            "ReverseString":window.$JSL.ReverseString,
            "AttatchProperty":window.$JSL.AttatchProperty,
            "Cache":window.$JSL.Cache,
            "$JSL.DOM.ext":window.$JSL.DOM,
            "Import":window.$JSL.Import,
            "NumericSort":window.$JSL.NumericSort,
            "Wraps":window.$JSL.Wraps,
            "$JSL.browser.ext":window.$JSL.browser,
            "$JSL.debug.ext":window.$JSL.debug,
            "$JSL.operator.ext":window.$JSL.debug,
            "$JSL.headers.ext":window.$JSL.headers,
            "type":window.$JSL.type,
            get default(){return $JSL},
            
        }),
        require:(extid)=>{
            return window.$JSL.JSLattr(`$JSL.${extid}.ext`)
        },
        SpecialForm:(obj,getitem)=>{
            return new Proxy(obj,{get:getitem})
        },
        /**
         * 
         * @typedef {{call<T>:()=>T,get<T>:(a,b,c)=>T,set<T>:(a,b,c)=>T}} operand
         * @param {operand}operandobj
         */
        TypeConstruct:(obj,operandobj)=>{
            const newClass=new Proxy(obj,{
                apply:(target,thisarg,argArray)=>{
                    return obj.call(target,thisarg,...argArray);
                },
                set:(target,p,newValue,receiver)=>{
                    return obj.set(target,p,newValue,receiver);
                },
                get:(target,p,receiver)=>{
                    return obj.get(p)
                },
            })
            return new Proxy(newClass)
        }

    }
});
if (typeof module !== "undefined" && typeof module.exports === "object"){
    module.exports = {
        $JSLIfactory:()=>{return JSLI},
        $JSL:JSLI,
    }
}
else{
    exports.$JSLIfactory=()=>{return JSLI};
    exports.$JSL=JSLI;
}