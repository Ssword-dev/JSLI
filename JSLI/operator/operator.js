/**
 * An extension of $JSL,tries to attatch itself to window.$JSL as an attribute
 */

((global) => {
    if (typeof global.$JSL == "undefined" || typeof global.$JSL.operator != "undefined"){
        throw new global.$JSL.operator.CustomError("NoConflictError",299,"Operator is already imported")
    }
    const window = global;// (Alias)

    global.$JSL.operator = {
        
        add: (a, b) => {
            return a.add ? a.add(b) : a + b;
        },
        sub: (a, b) => {
            return a.sub ? a.sub(b) : a - b;
        },

        mul: (a, b) => {
            return a.mul ? a.mul(b) : a * b;
        },

        div: (a, b) => {
            return a.div ? a.div(b) : a / b;
        },

        floordiv: (a, b) => {
            return a.floordiv ? a.floordiv(b) : Math.floor(a / b);
        },

        radd: (a, b) => {
            return a.radd ? a.radd(b) : a += b;
        },

        rsub: (a, b) => {
            return a.rsub ? a.rsub(b) : a -= b;
        },

        rmul: (a, b) => {
            return a.rmul ? a.rmul(b) : a *= b;
        },

        rdiv: (a, b) => {
            return a.rdiv ? a.rdiv(b) : a /= b;
        },

        rfdiv: (a, b) => {
            return a.rfdiv ? a.rfdiv(b) : a = Math.floor(a / b);
        },

        assign: (a, newval) => {
            return a.assign ? a.assign(newval) : a = newval;
        },

        mod: (a, b) => {
            return a.mod ? a.mod(b) : a % b;
        },

        rmod: (a, b) => {
            return a.rmod ? a.rmod(b) : a %= b;
        },

        and: (a, b) => {
            return a.and ? a.and(b) : a && b;
        },

        not: (a) => {
            return a.not ? a.not() : !a;
        },

        bitwise: (a, b) => {
            return a.bitwise ? a.bitwise(b) : a ^ b;
        },
        or: (a, b) => {
            return a.or ? a.or(b) : a || b
        },
        nnot: (a) => {
            return a.rnot ? a.rnot() : !!a // not not
        },
        nor: (a, b) => {
            return a.ror ? a.ror(b) : !(a || b)
        },
        ut:(fun,expected,...args)=>{
            const result = fun(...args)
            if (expected == result && result == expected && typeof expected == typeof result){
                console.log("Test Passed!")
                return result
            }
            else{
                const AssertionError=new global.operator.CustomError("AssertionError",30,"Got wrong result")
                throw AssertionError
            }
        },
        CustomError:class extends Error{
            constructor(ErrorName,ErrorNumberRepr,Message){
                
                super(Message);this.ErrorName=ErrorName,this.toNumber=()=>{return ErrorNumberRepr;}
                this.name=ErrorName
            }
        }
    };
    
    if (global.main && global.main === main) {
        console.log("Running as main")
    }else{
        return 0;
    }
}
)(typeof window != "undefined" ? window : globalThis)

