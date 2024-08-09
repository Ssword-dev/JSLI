

(()=>{
    $JSL.DOM.forEach("*",(elem,ind)=>{
        elem.style.backgroundColor=`${ind*20}`
    })
    window.Special =$JSL.SpecialForm({
        Test:"Hello world!"
    },(...a)=>a)
    const JSLattrkeys=$JSL.headers.keyof($JSL)
    if("DOM" in JSLattrkeys){
        console.log("this JSL setup have DOM lib enabled!")
    }
})()
