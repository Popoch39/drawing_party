import React from 'react';
import { Line } from 'react-konva';

interface GridCanvasComponentProps {
    width: number;
    height: number;
    cellSize: number;
    zoom: number;
    offsetX: number;
    offsetY: number;
}

const GridCanvasComponent = (props: GridCanvasComponentProps) => {
    const gridComponents = [];
    const adjustedCellSize = props.cellSize * props.zoom;

    const startX = Math.floor(props.offsetX / adjustedCellSize) * adjustedCellSize - props.offsetX;
    const startY = Math.floor(props.offsetY / adjustedCellSize) * adjustedCellSize - props.offsetY;

    const endX = props.width + props.offsetX;
    const endY = props.height + props.offsetY;

    for (let x = startX; x < endX; x += adjustedCellSize) {
        gridComponents.push(
            <Line
                key={`v${x}`}
                points={[x, 0, x, props.height]}
                stroke="lightgrey"
                strokeWidth={1 / props.zoom}
            />
        );
    }

    for (let y = startY; y < endY; y += adjustedCellSize) {
        gridComponents.push(
            <Line
                key={`h${y}`}
                points={[0, y, props.width, y]}
                stroke="lightgrey"
                strokeWidth={1 / props.zoom}
            />
        );
    }

    return gridComponents;
};

export default GridCanvasComponent;