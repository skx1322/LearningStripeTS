import { RouterProvider } from "react-router"
import router from "./router/router"

function App() {
  return (
    <div className="font-main">
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
