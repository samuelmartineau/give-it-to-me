/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as SearchRouteImport } from './routes/search'
import { Route as BrowseRouteImport } from './routes/browse'
import { Route as AddRouteImport } from './routes/add'
import { Route as IndexRouteImport } from './routes/index'

const SearchRoute = SearchRouteImport.update({
  id: '/search',
  path: '/search',
  getParentRoute: () => rootRouteImport,
} as any)
const BrowseRoute = BrowseRouteImport.update({
  id: '/browse',
  path: '/browse',
  getParentRoute: () => rootRouteImport,
} as any)
const AddRoute = AddRouteImport.update({
  id: '/add',
  path: '/add',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/add': typeof AddRoute
  '/browse': typeof BrowseRoute
  '/search': typeof SearchRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/add': typeof AddRoute
  '/browse': typeof BrowseRoute
  '/search': typeof SearchRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/add': typeof AddRoute
  '/browse': typeof BrowseRoute
  '/search': typeof SearchRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/add' | '/browse' | '/search'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/add' | '/browse' | '/search'
  id: '__root__' | '/' | '/add' | '/browse' | '/search'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AddRoute: typeof AddRoute
  BrowseRoute: typeof BrowseRoute
  SearchRoute: typeof SearchRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/search': {
      id: '/search'
      path: '/search'
      fullPath: '/search'
      preLoaderRoute: typeof SearchRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/browse': {
      id: '/browse'
      path: '/browse'
      fullPath: '/browse'
      preLoaderRoute: typeof BrowseRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/add': {
      id: '/add'
      path: '/add'
      fullPath: '/add'
      preLoaderRoute: typeof AddRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AddRoute: AddRoute,
  BrowseRoute: BrowseRoute,
  SearchRoute: SearchRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
