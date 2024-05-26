import { DispatchWithoutAction, RefObject, useReducer } from "react";
import './Grid.css'

/* eslint-disable @typescript-eslint/no-unused-vars */
interface GridProps {
    data: RefObject<CellData[][]>;
}

interface GridCellProps {
    x: number;
    y: number;
    data: RefObject<CellData[][]>;
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

function GridCell({x, y, data}: GridCellProps) {

    const [, forceUpdate] = useReducer(x => x + 1, 0)
    data.current![y][x].update = forceUpdate;

    const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        if ((e.buttons == 1 && e.type == 'mouseover') || (e.buttons < 2 && e.type == 'mousedown')) {
            data.current![y][x].toggle()
        }
    }

    return (
        <div className="cell"
            id="cell"
            style={{backgroundColor: data.current![y][x].v == 0 ? `#111111` : `#ffffff`}}
            key={`${y},${x}`}
            onMouseOver={handleToggle}
            onMouseDownCapture={handleToggle}
            // onClickCapture={handleToggle}
            onContextMenu={e => e.preventDefault()}
        />
    )
}

function Grid({data}: GridProps) {

    console.log('Grid render')

    if (!data.current) {
        return (<></>)
    } else {
        return (
            <div className="cells">{
                data.current!.map((row, y) => (
                    <div className="cell-row" key={y}>
                    {row.map((_, x) => ( <GridCell key={`${y},${x}`} data={data} x={x} y={y} /> ))}
                    </div>
                ))
            }</div>
        )
    }
    
}

export default Grid;