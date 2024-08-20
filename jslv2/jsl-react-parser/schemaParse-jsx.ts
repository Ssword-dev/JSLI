import * as babeltypes from "./types/babel-ast-types";

declare var Typings : typeof import("./../typings/babel-parser")
declare type typings = typeof import("./../typings/babel-parser");
declare type ASTnode= typeof import("./../typings/babel-parser").tokTypes
// Base interface for all AST nodes
interface Node {
  type: string;
  start?: number;
  end?: number;
  loc?: {
    start: {
      line: number;
      column: number;
    };
    end: {
      line: number;
      column: number;
    };
  };
}

// Variable Declaration Node
interface VariableDeclaration extends Node {
  type: "VariableDeclaration";
  declarations: [VariableDeclarator];
  kind: "var" | "let" | "const";
}

// Variable Declarator Node
interface VariableDeclarator extends Node {
  type: "VariableDeclarator";
  id: Identifier ; // 'Pattern' could be more specific
  init: Expression | null;
}

// Identifier Node
interface Identifier extends Node {
  type: "Identifier";
  name: string;
}

// Expression Node (Base interface for all expressions)
interface Expression extends Node {}

// Binary Expression Node
interface BinaryExpression extends Expression {
  type: "BinaryExpression";
  left: Expression;
  operator: string; // e.g., "+", "-", "*", etc.
  right: Expression;
}

// Numeric Literal Node
interface NumericLiteral extends Expression {
  type: "NumericLiteral";
  value: number;
}

// String Literal Node
interface StringLiteral extends Expression {
  type: "StringLiteral";
  value: string;
}

// Array Expression Node
interface ArrayExpression extends Expression {
  type: "ArrayExpression";
  elements: [Expression|null];
}

// JSX Element Node
interface JSXElement extends Node {
  type: "JSXElement";
  openingElement: JSXOpeningElement;
  children: [JSXChild];
  closingElement: JSXClosingElement | null;
}

// JSX Opening Element Node
interface JSXOpeningElement extends Node {
  type: "JSXOpeningElement";
  name: JSXIdentifier | JSXNamespacedName;
  attributes: [JSXAttribute | JSXSpreadAttribute];
  selfClosing: boolean;
}

// JSX Identifier Node
interface JSXIdentifier extends Node {
  type: "JSXIdentifier";
  name: string;
}

// JSX Namespaced Name Node (could be more specific)
interface JSXNamespacedName extends Node {
  type: "JSXNamespacedName";
  namespace: JSXIdentifier;
  name: JSXIdentifier;
}

// JSX Attribute Node
interface JSXAttribute extends Node {
  type: "JSXAttribute";
  name: JSXIdentifier;
  value: object|string;
}

// JSX Spread Attribute Node
interface JSXSpreadAttribute extends Node {
  type: "JSXSpreadAttribute";
  argument: Expression;
}

// JSX Text Node
interface JSXText extends Node {
  type: "JSXText";
  value: string;
}

// Base interface for JSX Children
interface JSXChild extends Node {}

// JSX Closing Element Node
interface JSXClosingElement extends Node {
  type: "JSXClosingElement";
  name: JSXIdentifier;
}
type astNodeTypes = {
	VariableDeclaration: VariableDeclaration,
	VariableDeclarator: VariableDeclarator,
	Identifier: Identifier,
	BinaryExpression: BinaryExpression,
	NumericLiteral: NumericLiteral,
	StringLiteral: StringLiteral,
	ArrayExpression: ArrayExpression,
	JSXElement: JSXElement,
	JSXOpeningElement: JSXOpeningElement,
	JSXIdentifier: JSXIdentifier,
	JSXNamespacedName: "JSXNamespacedName",
	JSXAttribute: JSXAttribute,
	JSXSpreadAttribute: JSXSpreadAttribute,
	JSXText: JSXText,
	JSXClosingElement: JSXClosingElement,
};
type types=typeof import("./types/babel-ast-types")
declare const types:typeof import("./types/babel-ast-types")
type JSLXCompilerSchema={
	
	HandleCommentLines:
	(node:babeltypes.CommentLine)=>string,
	HandleCommentBlock:
	(node:babeltypes.CommentBlock)=>string,
	HandleJSXComponents:
	(node:babeltypes.JSXElement)=>string,
	moduleResolutionType:"ES6"|"Node"
}
