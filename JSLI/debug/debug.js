
((global)=>{
    if (typeof global.$JSL ==  "undefined" || typeof global.$JSL.debug != "undefined"){
        throw Error("No-conflict-error:debugjs")
    }
    global.$JSL.debug={
        enableEventTracking:(fun)=>{
            let events=[]
            for(let key in document){
                if (key.startsWith("on")){
                    events.push(key)
                }
            }
            events.forEach(ev=>{
                document[ev]=fun
            })
            return 
        }
    }
    
})(typeof window !== "undefined"?window:this)
