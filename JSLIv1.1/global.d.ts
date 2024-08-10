interface ClassListArray extends Array {
  0: Element;
  [key: number]: string;
}

// Type definitions for JSL 1.0x
// Project: JSL
/**
 * -----
 * Window attatched Namespace: JSL
 * ```javascript
 * // !node
 * const disposable = require("JSLI")
 * console.log($JSL.Test()) // Hello
 * ```
 * -----
 * JSL or JSLI stands for Javascript Lib-For-Runtime or Javascript Lib-For-Runtime improved
 * -----
 * JSLI aim to improve Javascript's runtime dynamic Process
 *
 */

declare namespace JSLI {
  declare type $JSL = Global.$JSL;
  declare const $JSLIfactory: () => $JSL;
}
/**
 * @warning SEE [`Main impl`](./operator.js) for import reference
 */
declare namespace operator {
  /**
   * simulates a + operator but can be overloaded
   */
  declare function add<T>(a: T, b): AnyReturnType;
  /**
   * simulates a - operator but can be overloaded
   *
   */
  declare function sub<T>(a: T, b): AnyReturnType;
  /**
   * simulates a * operator but can be overloaded
   */
  declare function mul<T>(a: T, b): AnyReturnType;
  /**
   * simulates a / operator but can be overloaded
   */
  declare function div<T>(a: T, b): AnyReturnType;
  /**
   * simulates a // operator but can be overloaded
   */
  declare function floordiv<T>(a: T, b): AnyReturnType;
  /**
   * simulates a += operator but can be overloaded
   */
  declare function radd<T>(a: T, b): AnyReturnType;
  /**
   * simulates a -= operator but can be overloaded
   */
  declare function rsub<T>(a: T, b): AnyReturnType;
  /**
   * simulates a *= operator but can be overloaded
   */
  declare function rmul<T>(a: T, b): AnyReturnType;
  /**
   * simulates a /= operator but can be overloaded
   */
  declare function rdiv<T>(a: T, b): AnyReturnType;
  /**
   * simulates a //= operator but can be overloaded
   */
  declare function rfdiv<T>(a: T, b): AnyReturnType;
  /**
   * simulates a = operator but can be overloaded
   */
  declare function assign<T>(a: T, newval): AnyReturnType;
  /**
   * simulates a % operator but can be overloaded
   */
  declare function mod<T>(a: T, b): AnyReturnType;
  /**
   * simulates a % operator but can be overloaded
   */
  declare function rmod<T>(a: T, b): AnyReturnType;
  /**
   * simulates a && operator but can be overloaded
   */
  declare function and<T>(a: T, b): AnyReturnType;
  /**
   * simulates a ! operator but can be overloaded
   */
  declare function not<T>(a: T, b): AnyReturnType;
  /**
   * simulates a ^ operator but can be overloaded
   */
  declare function bitwise<T>(a: T, b): AnyReturnType;
  /**
   * simulates a || operator but can be overloaded
   */
  declare function or<T>(a: T, b): AnyReturnType;
  /**
   * simulates a ^ operator but can be overloaded
   */
  declare function nor<T>(a: T, b): AnyReturnType;
  /**
   * simulates a `!(!a)` operator but can be overloaded
   */
  declare function nnot<T>(a: T): AnyReturnType;
  /**
   * Represents A unit test
   */
  declare function ut(
    fun: Function,
    expected: AnyReturnType,
    ...args: any[]
  ): AnyReturnType;
  /**
   * Represents A Custom Error where error.name is not generic `Error`
   */
  declare const CustomError = class extends Error {
    constructor(ErrorName: string, ErrorNumberRepr: number, Message: string);
  };
}
/**
 * Warning! this is also a $JSL extension,import [this module](./JSLdom.js) first before using this
 */
declare namespace DOMJSL {
  /**
   * Allows the accessing of each element and applies @param style; to the element
   */
  declare function forEach(
    selector: string,
    fun: (elem: HTMLElement, index: number) => void
  ): void;
  /**
   * Gets the classes of the given Element, returns an array of strings in which the Element is
   * Also appended to the index:0
   */
  declare function getClassList(element: Element): ClassListArray;
  /**
   * Creates an Element with the complete context from the parameters
   */
  declare function create<K extends keyof HTMLElementTagNameMap>(
    className: str,
    idName: str,
    tagName: K,
    innerText
  ): HTMLElement | Node;
  /**
   * Fills the parent with cloned children
   */
  declare function fill(
    element: Node | HTMLElement,
    parent: Node | HTMLElement,
    cnt: number
  ): void;
}
/**
 * @warning SEE [`debugJSL main impl file`](./debug.js) for import reference
 */
declare namespace DebugJSL {
  /**
   * Attatches the function to all events,the function is triggered every time the event fires at the document
   */
  declare function enableEventTracking(fun: Function): void;
}
declare namespace WindowBrowser {
  /**
   * Returns a string representation of the window.browser object.
   */
  declare function toString(): string;

  /**
   * Type of the object.
   */
  declare const type: Object;

  /**
   * Class inheritance status.
   */
  declare const base: boolean;

  /**
   * Browser name.
   * NOTE|XXX: DO NOT MOVE CHROME HIGHER THAN THE OTHERS OR IT WILL OVERRIDE ALL OTHER CHECKS
   * ---!important notice!---
   */
  declare var name: string;

  /**
   * Returns a number representing the browser id.
   */
  declare const toNumber: () => number;

  /**
   * Unique identifier for the browser.
   */
  declare const id: number;

  /**
   * Returns the equivalent of `this` object.
   */
  declare const constructor = () => WindowBrowser;

  /**
   * Equivalent of `this`, refers to this object itself.
   */
  declare const browser: WindowBrowser | undefined;

  /**
   * Calls a base function with the browser object and additional arguments.
   * @param base - The base function to call.
   * @param thisarg - Additional arguments to pass to the base function.
   */
  declare const call: (
    base: (browser: WindowBrowser, ...args: any[]) => any,
    ...thisarg: any[]
  ) => any;
}
declare namespace JSLHeaders {
  declare function ifdef<T, RT>(o: T, cb: () => RT): T | false;
  declare function ifndef<T, RT>(o: T, cb: () => RT): T | false;
  declare function keyof<T>(o: T): keyof T;
}
declare interface $JSLMapping {
  headers: typeof JSLHeaders;
  browser: typeof WindowBrowser;
  debug: typeof DebugJSL;
  dom: typeof DOMJSL;
  operator: typeof operator;
  jsli: typeof $JSL;
}
type $JSLMappingKeys = keyof $JSLMapping;
//#region Main Lib type context
declare namespace $JSL {
  
  /**
   * A test function,returns Hello
   */
  declare function Test(): string;
  /**
   * Reverses the given string
   */
  declare function ReverseString(str: string): string;
  /**
   * Attatches A property to any object
   */
  declare function AttatchProperty(
    propertyval: any,
    propertyname: string,
    assertinto: object,
    err?: (err: Error) => void
  ): void;
  /**
   * Memoize a function
   */
  declare function Cache<T>(fun: () => T): () => T;
  /**
   * Sorts items numerically ascending order
   */
  declare function NumericSort(entry: number[]): Promise<number[]>;
  /**
   * Attatches a class/object into the global scope, this allows for importing like jquery
   */
  declare function AttatchasWindowModule(
    alias: string,
    factory: () => type,
    target: "Commonjs" | "ES6" = "Commonjs"
  ): void;
  /**
   * Wraps an anonymous function with another function
   *
   * ```javascript
   * const _Disposable = require("./index") //@ts-ignore
   * function myWrapper(fun){
   *   function Inner(...a){
   *    console.log('doing some action...');
   *    return fun(...a)
   *   }
   *   return Inner
   * }
   * const e =$JSL.Wraps(
   * myWrapper,(a,b)=>{
   *    console.log("inside, args:",a,b)
   *   }
   * );
   * e("apple","blurple")
   * // stdout:
   * // doing some action...
   * // inside, args:apple blurple
   * ```
   * -----
   *
   */
  type SuperDecorator = (
    fun: ScopedLibCallables,
    ...params: any[]
  ) => ScopedLibCallables | ScopedLibCallables;
  declare function Wraps<ReturnType>(
    decorator: SuperDecorator,
    fun: ScopedLibCallables,
    ...argv: any[]
  ): (...params: any) => ReturnType;
  /**
   * Import a module, this is automatically changed based on what environment this is invoked in
   */
  declare function Import(path: string, alias: string);
  declare const operator = window.operator;
  declare const browser = WindowBrowser;
  declare const DOM = DOMJSL;
  declare const debug = DebugJSL;
  declare const headers = JSLHeaders;
  declare const type = (o: object): typeof o =>
    typeof o.type != "undefined" ? o.type : typeof o;
  /**
   * @typeonly
   * @readonly
   * @requires v1.0.0 ($JSL | JSLI) with all of the JSL extensions on 1.0.0
   */
  declare type $JSLLibKeys = $JSLMappingKeys;
  /**
   * A way to type appended runtime functions to $JSL
   */
  declare type $NSJSL<T> = typeof $JSL & {
    [keys in keyof T]: T[keys];
  };
  declare type AsNamespaceType<T> = { [key in keyof T]: T[key] };
  declare type MergedHybrid<T extends any[]> = DynamicType<keyof T>;
  declare type DynamicType<T> = { [keys in keyof T]: T[keys] };
  declare function JSLattr<key extends keyof KnownJSLattr>(
    key: key
  ): KnownJSLattr[key];

  declare interface KnownJSLattr {
    Test: window.$JSL.Test;
    ReverseString: typeof $JSL.ReverseString;
    AttatchProperty: typeof window.$JSL.AttatchProperty;
    Cache: typeof window.$JSL.Cache;
    "$JSL.DOM.ext": typeof window.$JSL.DOM;
    Import: typeof window.$JSL.Import;
    NumericSort: typeof window.$JSL.NumericSort;
    Wraps: typeof window.$JSL.Wraps;
    "$JSL.browser.ext": typeof window.$JSL.browser;
    "$JSL.debug.ext": typeof window.$JSL.debug;
    "$JSL.operator.ext": typeof window.$JSL.debug;
    "$JSL.headers.ext": typeof window.$JSL.headers;
    type: typeof window.$JSL.type;
  }
  interface JSLRequire {
    DOM: typeof window.$JSL.DOM;
    browser: typeof window.$JSL.browser;
    debug: typeof window.$JSL.debug;
    operator: typeof window.$JSL.operator;
    headers: typeof window.$JSL.headers;
  }
  declare function require<K extends keyof JSLRequire>(extid: K): JSLRequire[K];
  /**
   *
   * @param T obj
   * @typeonly T
   */

  declare type DefinitelyTyped<T extends object> = T;
  declare function Type<T>(obj: T): DefinitelyTyped<T>;
  declare function SpecialForm<T, O>(
    obj: O,
    getitem: (target: T, p: string | symbol, receiver: object) => T
  ): typeof Proxy<O>;
  declare type ParsedFunction<O extends Function> = (
    ...args: Parameters<O>
  ) => ReturnType<O>;
  declare function TypeConstruct<
    O extends {
      new (...args: any[]): any;
      /**
       * Acts like a base object,if not present, uses {   } instead
       */
      call: <AT, R>(...args: AT) => R;
      /**
       * Represents obj [ "key" ]
       */
      get: (key: string | symbol) => any;
      set: (key: string | symbol, value: any) => boolean;
    }
  >(
    obj: O
  ): {
    new (...args: ConstructorParameters<O>): {
      [key: string]: ReturnType<O["get"]>;
      [key: unique symbol | symbol]: ReturnType<O["get"]>;
      (...params: Parameters<typeof obj.call>): ReturnType<typeof obj.call>;
    };
  };
  
}
//#endregion Main Lib type context
interface AnyReturnType {
  [keys: string]: any;
}
/**
 * Ssword|NOTE: this type is available anywhere in the ide once imported (JSLI),
 * however, you need to use
 *
 * ```javascript
 * import *as operator from "path/to/operatorjs/install/JSLI/operator.js"
 * ```
 */

interface Global {
  [key: string]: any;
  $JSL: typeof $JSL;
  Proxy: NewProxy;
}
interface float extends number {}
interface int extends number {}
interface LibCallable extends Function {
  __doc__: string;
  __ref__: string;
  __priv__?: any[];
}
interface ScopedLibCallables extends LibCallable {
  __scope__: object;
  __persisted_scope__: object;
}
type OldProxy<T> = typeof Proxy<T>;
interface NewProxy extends OldProxy {
  new <T>(target: T, handlers: ProxyHandler): OldProxy<T>;
}
declare var global: Global;
declare var window: Global;
export as namespace $JSL;
