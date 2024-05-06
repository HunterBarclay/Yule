import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    // const [count, setCount] = useState(0)

    const ref = useRef<HTMLDivElement>(null);
    let [x, y] = [useRef(0.0), useRef(0.0)];

    useEffect(() => {
        let cancel: number | undefined = undefined;
        const frame = () => {
            cancel = requestAnimationFrame(frame);

            if (ref.current) {

                x.current += 0.1;
                y.current += 0.1;

                console.log(ref.current.style.left);
                ref.current.style.left = `${x.current}pt`;
                ref.current.style.top = `${y.current}pt`;
            }
        }

        frame();

        return () => {
            if (cancel)
                cancelAnimationFrame(cancel)
        }
    }, [])

    return (
        <div id="container">
            <div id="box" ref={ref}></div>
        </div>
    )

    // return (
    //   <>
    //     <div>
    //       <a href="https://vitejs.dev" target="_blank">
    //         <img src={viteLogo} className="logo" alt="Vite logo" />
    //       </a>
    //       <a href="https://react.dev" target="_blank">
    //         <img src={reactLogo} className="logo react" alt="React logo" />
    //       </a>
    //     </div>
    //     <h1>Vite + React</h1>
    //     <div className="card">
    //       <button onClick={() => setCount((count) => count + 1)}>
    //         count is {count}
    //       </button>
    //       <p>
    //         Edit <code>src/App.tsx</code> and save to test HMR
    //       </p>
    //     </div>
    //     <p className="read-the-docs">
    //       Click on the Vite and React logos to learn more
    //     </p>
    //   </>
    // )
}

export default App
