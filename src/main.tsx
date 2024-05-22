import ReactDOM from 'react-dom/client'
// import App from './game-of-life/App.tsx'
import './index.css'
import App from './game-of-life/App'
import Menu from './menu/Menu'
// import './output.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <Menu />
        <App />
    </>
)
