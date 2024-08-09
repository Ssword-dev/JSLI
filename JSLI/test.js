//assume the $JSL lib is imported at runtime (using script tags)
$JSL.DOM.fill($JSL.DOM.create("t","","div","Hello"),document.body,15) // 
/**
 * 
 * @param {...} o 
 */
function myFunc(o){
    
}
/**
 * @type {$JSL.DefinitelyTyped<$JSL>}
 */
const e = typeof myFunc("jsli")
class Someclass{
    [[Get]]=(...a)=>{
        return a
    }
}




const JSL=$JSL.TypeConstruct($JSL,{
    call:(...a)=>$JSL,
    get:(attr)=>$JSL[attr]
})
window.$JSL=JSL