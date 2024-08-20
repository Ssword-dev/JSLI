


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
	type $JSL = Global["$JSL"];
	const $JSLIfactory: () => $JSL;
}
/**
 * @warning SEE [`Main impl`](./operator.js) for import reference
 */
declare namespace operator {
	/**
	 * simulates a + operator but can be overloaded
	 */
	function add<T>(a: T, b): AnyReturnType;
	/**
	 * simulates a - operator but can be overloaded
	 *
	 */
	function sub<T>(a: T, b): AnyReturnType;
	/**
	 * simulates a * operator but can be overloaded
	 */
	function mul<T>(a: T, b): AnyReturnType;
	/**
	 * simulates a / operator but can be overloaded
	 */
	function div<T>(a: T, b): AnyReturnType;
	/**
	 * simulates a // operator but can be overloaded
	 */
	function floordiv<T>(a: T, b): AnyReturnType;
	/**
	 * simulates a += operator but can be overloaded
	 */
	function radd<T>(a: T, b): AnyReturnType;
	/**
	 * simulates a -= operator but can be overloaded
	 */
	function rsub<T>(a: T, b): AnyReturnType;
	/**
	 * simulates a *= operator but can be overloaded
	 */
	function rmul<T>(a: T, b): AnyReturnType;
	/**
	 * simulates a /= operator but can be overloaded
	 */
	function rdiv<T>(a: T, b): AnyReturnType;
	/**
	 * simulates a //= operator but can be overloaded
	 */
	function rfdiv<T>(a: T, b): AnyReturnType;
	/**
	 * simulates a = operator but can be overloaded
	 */
	function assign<T>(a: T, newval): AnyReturnType;
	/**
	 * simulates a % operator but can be overloaded
	 */
	function mod<T>(a: T, b): AnyReturnType;
	/**
	 * simulates a % operator but can be overloaded
	 */
	function rmod<T>(a: T, b): AnyReturnType;
	/**
	 * simulates a && operator but can be overloaded
	 */
	function and<T>(a: T, b): AnyReturnType;
	/**
	 * simulates a ! operator but can be overloaded
	 */
	function not<T>(a: T, b): AnyReturnType;
	/**
	 * simulates a ^ operator but can be overloaded
	 */
	function bitwise<T>(a: T, b): AnyReturnType;
	/**
	 * simulates a || operator but can be overloaded
	 */
	function or<T>(a: T, b): AnyReturnType;
	/**
	 * simulates a ^ operator but can be overloaded
	 */
	function nor<T>(a: T, b): AnyReturnType;
	/**
	 * simulates a `!(!a)` operator but can be overloaded
	 */
	function nnot<T>(a: T): AnyReturnType;
	/**
	 * Represents A unit test
	 */
	function ut(
		fun: Function,
		expected: AnyReturnType,
		...args: any[]
	): AnyReturnType;
	/**
	 * Represents A Custom Error where error.name is not generic `Error`
	 */
	class CustomError extends Error {
		constructor(ErrorName: string, ErrorNumberRepr: number, Message: string);
	}
}
/**
 * Warning! this is also a $JSL extension,import [this module](./JSLdom.js) first before using this
 */
declare namespace DOMJSL {
	/**
	 * Allows the accessing of each element and applies @param style; to the element
	 */
	function forEach(
		selector: string,
		fun: (elem: HTMLElement, index: number) => void
	): void;
	/**
	 * Gets the classes of the given Element, returns an array of strings in which the Element is
	 * Also appended to the index:0
	 */
	function getClassList(element: Element): Array<string|Element>;
	/**
	 * Creates an Element with the complete context from the parameters
	 */
	function create<K extends keyof HTMLElementTagNameMap>(
		className: string,
		idName: string,
		tagName: K,
		innerText
	): HTMLElement | Node;
	/**
	 * Fills the parent with cloned children
	 */
	function fill(
		element: Node | HTMLElement,
		parent: Node | HTMLElement,
		cnt: number
	): void;
	namespace JSX {
		function createShadowRoot(rootid:string,parent):{
			0:ShadowRoot,
			1:Element
		}&Array<any>
		const component: (<T>([htmlString]: [T]) => JSLComponent) & {
			[key: string]: JSLComponent;
		};
		type JSLComponent = Element & {
			render(parent: Element | JSLComponent): void;
			toString([...a]: [object]): string;
		};
		class Component extends HTMLElement {
			constructor(
				innerText: string,
				ElementTemplate: {
					cssText?: string;
					id?: string;
					classNames?: string;
				},
				...a: object[]
			);
			render(parent: HTMLElement | Component): void;
			CssStyle(cssText): void;
			addClass(...classNames): void;
		}
		interface CustomElementConstructorInterface {
			new<Inheritance extends new(...a)=>any> (mod:{
				connectedCallback:(thisArg: InstanceType<Inheritance>) => void,
				disconnectedCallback:(thisArg: InstanceType<Inheritance>) => void,
				attributeChangedCallback:(
					thisArg: InstanceType<Inheritance>,
					name: string,
					oldValue: string | null,
					newValue: string | null
				) => void,
				adoptedCallback:(thisArg: InstanceType<Inheritance>) => void,
				observedAttributes:(thisArg:InstanceType<Inheritance>) => string[],
				inheritance:Inheritance
			}):{
				new (mod):{
					connectedCallback:(thisArg:InstanceType<Inheritance>)=>null,
					disconnectedCallback:(thisArg:InstanceType<Inheritance>)=>null,
					attributeChangedCallback:(thisArg:InstanceType<Inheritance>,name,oldValue,newValue)=>object,
					adoptedCallback:(thisArg:InstanceType<Inheritance>)=>void,
					observedAttributes:string[]
				}
			};
		}
		const CustomElementConstructor:CustomElementConstructorInterface;
		class ElementConstructor<A
		extends (this)=>void
		,B extends (this)=>void
		,C extends <F>(this,name,oldValue,newValue)=>F
		,D extends (this)=>void
		,E extends (this)=>string[]
		>{
			
					constructor(mod:{connectedCallback,})

					connectedCallback:A

					disconnectedCallback:B

					attributeChangedCallback:C

					adoptedCallback:D

					observedAttributes:E
				}
		}
		function createElement<T extends keyof HTMLElementTagNameMap,K>(tagName:T,prop:K,...children:Element[]):HTMLElementTagNameMap[T]
	}
	

/**
 * @warning SEE [`debugJSL main impl file`](./debug.js) for import reference
 */
declare namespace DebugJSL {
	/**
	 * Attatches the function to all events,the function is triggered every time the event fires at the document
	 */
	function enableEventTracking(fun: Function): void;
}
declare namespace WindowBrowser {
	/**
	 * Returns a string representation of the window.browser object.
	 */
	function toString(): string;

	/**
	 * Type of the object.
	 */
	const type: Object;

	/**
	 * Class inheritance status.
	 */
	const base: boolean;

	/**
	 * Browser name.
	 * NOTE|XXX: DO NOT MOVE CHROME HIGHER THAN THE OTHERS OR IT WILL OVERRIDE ALL OTHER CHECKS
	 * ---!important notice!---
	 */
	var name: string;

	/**
	 * Returns a number representing the browser id.
	 */
	const toNumber: () => number;

	/**
	 * Unique identifier for the browser.
	 */
	const id: number;

	/**
	 * Returns the equivalent of `this` object.
	 */
	function constructor() : typeof WindowBrowser;

	/**
	 * Equivalent of `this`, refers to this object itself.
	 */
	const browser: typeof WindowBrowser | undefined;

	/**
	 * Calls a base function with the browser object and additional arguments.
	 * @param base - The base function to call.
	 * @param thisarg - Additional arguments to pass to the base function.
	 */
	const call: (
		base: (browser: typeof WindowBrowser, ...args: any[]) => any,
		...thisarg: any[]
	) => any;
}
declare namespace JSLHeaders {
	function ifdef<T, RT>(o: T, cb: () => RT): T | false;
	function ifndef<T, RT>(o: T, cb: () => RT): T | false;
	function keyof<T>(o: T): keyof T;
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
declare module "$JSL" {
	/**
	 * A test function,returns Hello
	 */
	export function Test(): string;
	/**
	 * Reverses the given string
	 */
	export function ReverseString(str: string): string;
	/**
	 * Attatches A property to any object
	 */
	export function AttatchProperty(
		propertyval: any,
		propertyname: string,
		assertinto: object,
		err?: (err: Error) => void
	): void;
	/**
	 * Memoize a function
	 */
	export function Cache<T>(fun: () => T): () => T;
	/**
	 * Sorts items numerically ascending order
	 */
	export function NumericSort(entry: number[]): Promise<number[]>;
	/**
	 * Attatches a class/object into the global scope, this allows for importing like jquery
	 */
	export function AttatchasWindowModule<T>(
		alias: string,
		factory: () => T,
		target: "Commonjs" | "ES6"
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
	export type SuperDecorator = (
		fun: ScopedLibCallables,
		...params: any[]
	) => ScopedLibCallables | ScopedLibCallables;
	export function Wraps<ReturnType>(
		decorator: SuperDecorator,
		fun: ScopedLibCallables,
		...argv: any[]
	): (...params: any) => ReturnType;
	/**
	 * Import a module, this is automatically changed based on what environment this is invoked in
	 */
	export function Import(path: string, alias: string);
	export const operator :typeof window.operator;
	export const browser:typeof WindowBrowser;
	export const DOM :typeof DOMJSL;
	export const debug :typeof DebugJSL;
	export const headers :typeof JSLHeaders;
	export const type : (o: object)=>typeof o 
	/**
	 * @typeonly
	 * @readonly
	 * @requires v1.0.0 ($JSL | JSLI) with all of the JSL extensions on 1.0.0
	 */
	export type $JSLLibKeys = $JSLMappingKeys;
	/**
	 * A way to type appended runtime functions to $JSL
	 */
	export type $NSJSL<T> = typeof $JSL & {
		[keys in keyof T]: T[keys];
	};
	export type AsNamespaceType<T> = { [key in keyof T]: T[key] };
	export type MergedHybrid<T extends any[]> = DynamicType<keyof T>;
	export type DynamicType<T> = { [keys in keyof T]: T[keys] };
	export function JSLattr<key extends keyof KnownJSLattr>(
		key: key
	): KnownJSLattr[key];

	export interface KnownJSLattr {
		Test: typeof window.$JSL.Test;
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
	export interface JSLRequire {
		DOM: typeof window.$JSL.DOM;
		browser: typeof window.$JSL.browser;
		debug: typeof window.$JSL.debug;
		operator: typeof window.$JSL.operator;
		headers: typeof window.$JSL.headers;
	}
	export function require<K extends keyof JSLRequire>(extid: K): JSLRequire[K];
	/**
	 *
	 * @param T obj
	 * @typeonly T
	 */

	export type DefinitelyTyped<T extends object> = T;
	export function Type<T extends object>(obj: T): DefinitelyTyped<T>;
	export function SpecialForm<T, O>(
		obj: O,
		getitem: (target: T, p: string | symbol, receiver: object) => T
	): O;
	export type ParsedFunction<O extends (...z)=>object> = (
		...args: Parameters<O>
	) => ReturnType<O>;
	export function TypeConstruct<
		O extends {
			new (...args: any[]): any;
			/**
			 * Acts like a base object,if not present, uses {   } instead
			 */
			call: <AT, R>(...args: AT[]) => R;
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
			[key:  symbol]: ReturnType<O["get"]>;
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

interface Global{
	/**
	 * just in case you wanna use this instead of react, React is set to null to supress erros
	 */
	React:null
	[key: string]: any;
	$JSL: typeof $JSL;
	
}
interface JSLStylesheet extends CSSStyleSheet{
	owner:typeof $JSL.DOM.JSX
}
interface JSLDocument extends Document{
	adoptedStyleSheets:CSSStyleSheet[] & {
		0:JSLStylesheet
	}
}


interface LibCallable extends Function {
	__doc__: string;
	__ref__: string;
	__priv__?: any[];
}
interface ScopedLibCallables extends LibCallable {
	__scope__: object;
	__persisted_scope__: object;
}

declare var global: Global;
declare var window:Global;
declare var $JSL: typeof import("$JSL")


