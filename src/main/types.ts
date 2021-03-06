import * as ts from 'typescript'

import {
  ConstDefinition,
  EnumDefinition,
  ExceptionDefinition,
  ServiceDefinition,
  StructDefinition,
  TextLocation,
  ThriftDocument,
  ThriftStatement,
  TypedefDefinition,
  UnionDefinition,
} from '@creditkarma/thrift-parser'

/**
 * The compiler options for our codegen. These can be provided to the generator
 * directly through the JS API, or via the command line.
 *
 * EXAMPLE
 *
 * $ thrift-parser --rootDir . --sourceDir thrift --outDir codegen example.thrift
 */
export interface IMakeOptions {
  rootDir: string

  // resolved relative to the root directory
  outDir: string

  // resolved relative to the root directory
  sourceDir: string

  // list of files to generate code from
  files: Array<string>
}

export interface IRenderer {
  renderIncludes(
    outPath: string,
    includes: IRenderedFileMap,
    resolvedIncludes: IResolvedIncludeMap): Array<ts.Statement>
  renderConst(
    statement: ConstDefinition,
    identifiers?: IIdentifierMap): Array<ts.Statement>
  renderTypeDef(
    statement: TypedefDefinition,
    identifiers?: IIdentifierMap): Array<ts.Statement>
  renderEnum(
    statement: EnumDefinition,
    identifiers?: IIdentifierMap): Array<ts.Statement>
  renderStruct(
    statement: StructDefinition,
    identifiers?: IIdentifierMap): Array<ts.Statement>
  renderException(
    statement: ExceptionDefinition,
    identifiers?: IIdentifierMap): Array<ts.Statement>
  renderUnion(
    statement: UnionDefinition,
    identifiers?: IIdentifierMap): Array<ts.Statement>
  renderService(
    statement: ServiceDefinition,
    identifiers?: IIdentifierMap): Array<ts.Statement>
}

export interface IThriftFile {
  name: string
  path: string
  source: string
}

export interface IParsedFile {
  name: string
  path: string
  source: string
  includes: Array<IParsedFile>
  ast: ThriftDocument
}

export interface IResolvedFile {
  name: string
  path: string
  source: string
  namespace: IResolvedNamespace
  includes: IResolvedIncludeMap
  identifiers: IIdentifierMap
  body: Array<ThriftStatement>
  errors: Array<IThriftError>
}

export interface IRenderedFile {
  name: string
  path: string
  outPath: string
  namespace: IResolvedNamespace
  includes: IRenderedFileMap
  identifiers: IIdentifierMap
  statements: Array<ts.Statement>
}

export interface IResolvedFileMap {
  [name: string]: IResolvedFile
}

export interface IRenderedFileMap {
  [name: string]: IRenderedFile
}

export interface IResolvedNamespace {
  scope: string
  name: string
  path: string
}

export interface IResolvedNamespaceMap {
  [name: string]: IResolvedNamespace
}

export interface IResolvedInclude {
  file: IResolvedFile

  // Identifiers used from this include
  identifiers: Array<IResolvedIdentifier>
}

export interface IResolvedIncludeMap {
  [name: string]: IResolvedInclude
}

export interface IIncludeData {
  path: string
  base: string
}

export type DefinitionType =
  ConstDefinition | StructDefinition | UnionDefinition |
  ExceptionDefinition | EnumDefinition | TypedefDefinition |
  ServiceDefinition

export interface IResolvedIdentifier {
  name: string
  resolvedName: string
  definition: DefinitionType
}

export interface IIdentifierMap {
  [name: string]: IResolvedIdentifier
}

export const enum ErrorType {
  ValidationError = 'ValidationError',
  ResolutionError = 'ResolutionError',
  GenerationError = 'GenerationError',
}

export interface IThriftError {
  type: ErrorType
  message: string
  loc: TextLocation
}
