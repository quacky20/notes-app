import Navbar from "./components/navbar"
import { NotesProvider } from "./components/NotesContext"
import NotesPage from "./components/NotesPage"

function App() {
  return (
    <NotesProvider>
      <div>
        <Navbar />
      </div>
      <div>
        <NotesPage />
      </div>
    </NotesProvider>
  )
}

export default App
