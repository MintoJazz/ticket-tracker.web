import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"

import "./index.css"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { routes } from "./config/routes"

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return
  }

  const { worker } = await import("./mocks/browser")
  return worker.start()
}

function createRouter() {
  return createBrowserRouter(routes)
}

function renderRoot() {
  const router = createRouter()

  return createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>
  )
}

enableMocking().then(renderRoot)