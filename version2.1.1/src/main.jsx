import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ViewProvider } from "./context/viewContext.jsx"
import { TodosProvider } from './context/todoContext.jsx'

createRoot(document.getElementById('root')).render(
    <ViewProvider>
        <TodosProvider>
            <App />
        </TodosProvider>
    </ViewProvider>
)
