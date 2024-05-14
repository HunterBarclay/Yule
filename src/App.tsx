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

    const evalCell = (x: number, y: number, data: CellData[][]) => {
        if (x >= 0 && x < data[0].length && y >= 0 && y < data.length) {
            return data[y][x].v;
        } else {
            return 0
        }
    }

    useEffect(() => {
        let cancel: number | undefined = undefined;
        let lastTime: number = Date.now();
        const frame = async () => {
            const currentFrameId = cancel;
            cancel = requestAnimationFrame(frame);

            const deltaT = Date.now() - lastTime;

            if (isPlaying.current && deltaT > 500) {
                lastTime = Date.now()

                if (cellData.current) {

                    const flips: [number, number][] = []
                    const data = cellData.current
                    for (let y = 0; y < data.length; y++) {
                        for (let x = 0; x < data[y].length; x++) {
                            const neighbors = evalCell(x - 1, y - 1, data)
                                + evalCell(x, y - 1, data)
                                + evalCell(x + 1, y - 1, data)
                                + evalCell(x - 1, y, data)
                                + evalCell(x + 1, y, data)
                                + evalCell(x - 1, y + 1, data)
                                + evalCell(x, y + 1, data)
                                + evalCell(x + 1, y + 1, data);

                            if (data[y][x].v == 1) {
                                if (neighbors < 2 || neighbors > 3) {
                                    flips.push([y, x])
                                }
                            } else {
                                if (neighbors == 3) {
                                    flips.push([y, x])
                                }
                            }
                        }
                    }
                    flips.forEach(([y, x]) => data[y][x].toggle())
                }
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

    console.log('Render app')

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
