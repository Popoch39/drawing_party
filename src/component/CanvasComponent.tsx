"use client"
import { useEffect, useState } from "react";
import { Circle, Layer, Line, Stage } from "react-konva";
import GridCanvasComponent from "./GridCanvasComponent";
import useZoom from "@/hooks/useZoom";
import { KonvaEventObject } from "konva/lib/Node";
import useDraw, { LineType } from "@/hooks/useDraw";
import FloatingBar from "@/component/ui/FloatingBar";

const CanvasComponent = () => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const { zoom, position, handleZoom, handleDrag } = useZoom();
    const { lines, handleMouseDown, handleMouseMove, handleMouseUp } = useDraw();
    useEffect(() => {
        const updateDimensions = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
        handleZoom(e, e.target.getStage()!);
    };

    return (
        <>
            <Stage
                width={dimensions.width}
                height={dimensions.height}
                scaleX={zoom}
                scaleY={zoom}
                x={position.x}
                y={position.y}
                onWheel={handleWheel}
                // draggable
                onDragEnd={handleDrag}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
            >
                <Layer>

                    {/* TODO: MAKE IT WORK BRUH */}
                    {/* <GridCanvasComponent
                    height={dimensions.height}
                    width={dimensions.width}
                    cellSize={100} zoom={zoom}
                    offsetX={-position.x / zoom}
                    offsetY={-position.y / zoom} /> */}
                    <Circle x={200} y={100} radius={50} fill="green" draggable />
                    {lines.map((line: LineType, index: number) => (
                        <Line
                            key={index}
                            points={line.points}
                            stroke="#df4b26"
                            strokeWidth={5}
                            tension={0.5}
                            lineCap="round"
                            lineJoin="round"
                        />
                    ))}
                </Layer>
            </Stage>
        </>
    );

};
export default CanvasComponent;