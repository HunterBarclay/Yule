/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import Tile from './components/Tile';
import Grid, { CellData } from './components/Grid';
import PlayButton from './components/PlayButton';

function App() {
    // const [count, setCount] = useState(0)

    const cellData = useRef<CellData[][]>(null);
    const isPlaying = useRef<boolean>(false);
    // const [x, setX] = useState<number>(0.0);
    // const [y, setY] = useState<number>(0.0);

    useEffect(() => {
        let cancel: number | undefined = undefined;
        let lastTime: number = Date.now();
        const frame = async () => {
            const currentFrameId = cancel;
            cancel = requestAnimationFrame(frame);

            const deltaT = (Date.now() - lastTime) / 1000.0;

            if (isPlaying.current && deltaT > 3000) {
                lastTime = Date.now()

                console.log('PLAY')
            }

            if (currentFrameId)
                cancelAnimationFrame(currentFrameId);
        }

        frame();

        return () => {
            if (cancel)
                cancelAnimationFrame(cancel)
        }
    }, [])

    return (
        <div id="container">
            <Grid width={50} height={50} data={cellData} />
            <PlayButton isPlaying={isPlaying} />
            {/* <Tile x={x} y={y} /> */}
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
