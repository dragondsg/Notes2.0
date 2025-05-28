import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NotesProvider } from "./provider.jsx";
import './index.css'
import App from './App.jsx'
import Login from './Login.jsx'
import Note from './NoteForm.jsx'
import Category from './Category.jsx'

const router = createBrowserRouter([
{
  path: "/",
  element: <Login />
},
{
  path: "/home",
  element: <App />
},
{
  path: "/notes",
  element: <Note />
},
{
  path: "/categories",
  element: <Category />
},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotesProvider>
      <RouterProvider router={router} />
    </NotesProvider>
  </StrictMode>,
)
