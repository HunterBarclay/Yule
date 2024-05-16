import { DispatchWithoutAction, MutableRefObject, useReducer } from "react";
import './Grid.css'

/* eslint-disable @typescript-eslint/no-unused-vars */
interface GridProps {
    width: number;
    height: number;
    data: MutableRefObject<CellData[][] | null>;
}

interface GridCellProps {
    x: number;
    y: number;
}

export class CellData {
    private _v: number;
    private _update: DispatchWithoutAction | undefined;

    public get v() {
        return this._v;
    }

    public set update(u: DispatchWithoutAction) {
        this._update = u;
    }

    constructor() {
        this._v = 0;
        this._update = undefined;
    }

    public toggle() {
        this._v = 1 - this._v;
        if (this._update)
            this._update();
    }
}

const cellStates: CellData[][] = [];

function GridCell({x, y}: GridCellProps) {

    const [, forceUpdate] = useReducer(x => x + 1, 0)
    cellStates[y][x].update = forceUpdate;

    const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        if ((e.buttons == 1 && e.type == 'mouseover') || (e.buttons < 2 && e.type == 'mousedown')) {
            console.log("CLICK")
            cellStates[y][x].toggle()
        }
    }

    return (
        <div className="cell"
            id="cell"
            style={{backgroundColor: cellStates[y][x].v == 0 ? `#111111` : `#ffffff`}}
            key={`${y},${x}`}
            onMouseOver={handleToggle}
            onMouseDownCapture={handleToggle}
            // onClickCapture={handleToggle}
            onContextMenu={e => e.preventDefault()}
        />
    )
}

function Grid({width, height, data}: GridProps) {

    for (let y = 0; y < height; y++) {
        const row: CellData[] = [];
        for (let x = 0; x < width; x++) {
            row.push(new CellData())
        }
        cellStates.push(row)
    }
    data.current = cellStates;

    console.log('Grid render')

    return (
        <div className="cells">{
            cellStates.map((row, y) => (
                <div className="cell-row" key={y}>
                {row.map((_, x) => ( <GridCell key={`${y},${x}`} x={x} y={y} /> ))}
                </div>
            ))
        }</div>
    )
}

export default Grid;