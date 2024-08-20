
((global)=>{
    if(typeof global.$JSL ==  "undefined" || typeof global.$JSL.headers != "undefined"){
        throw Error("No-Conflict-Error:headers")
    }
    global.$JSL.headers={
        ifdef:(o,cb)=>typeof o !== "undefined"?cb():false,
        ifndef:(o,cb)=>typeof o == "undefined"?cb():false,
        keyof:(o)=>{
            const keys=[]
            for (key in o){
                keys.push(key)
            }
            return keys
        },

       }
})(typeof window!=="undefined"?window:this)

