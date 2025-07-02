import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { makeStore, getCellar, getWineFamilies } from './store'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Create store and initialize data
const store = makeStore()

// Initialize the app by dispatching getCellar
const initializeApp = async () => {
  try {
    const result = await Promise.all([
    store.dispatch(getCellar()),
    store.dispatch(getWineFamilies()),
  ]);
  } catch (error) {
    console.error('Failed to initialize app:', error)
  }
  
  // Render the app after initialization
  const rootElement = document.getElementById('root')!
  if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    )
  }
}

// Start the app
initializeApp()