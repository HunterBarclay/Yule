export interface TileProps {
    x: number;
    y: number;
}

function Tile({x, y}: TileProps) {
    return (
        <>
            <div id="box" style={{'left': `${x}pt`, 'top': `${y}pt`}}></div>
        </>
    )
}

export default Tile;