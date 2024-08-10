//assume the $JSL lib is imported at runtime (using script tags)
$JSL.DOM.fill($JSL.DOM.create("t","","div","Hello"),document.body,15) // 
/**
 * 
 * @param {...} o 
 */
function myFunc(o){
    
}

const e =  $JSL.TypeConstruct({
    call:(a,b,c)=>[a,b,c],
    get:(key)=>key,
    set:(key,val)=>true
})

const c = new e()
const f=c(1,2,3)
console.log(f)
class Someclass{
    [[Get]]=(...a)=>{
        return a
    }
}




window.$S=$JSL.TypeConstruct({
    constructor:(thisObj,...a)=>{
        return thisObj
    },
    call:(...a)=>$JSL,
})
