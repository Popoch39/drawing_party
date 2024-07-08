"use client"
import { act, useCallback, useEffect, useState } from "react";
import { Circle, Layer, Line, Stage } from "react-konva";
import GridCanvasComponent from "./GridCanvasComponent";
import useZoom from "@/hooks/useZoom";
import { KonvaEventObject } from "konva/lib/Node";
import useDraw, { LineType } from "@/hooks/useDraw";
import FloatingBar from "@/component/ui/FloatingBar";
import useCanvasControls from "@/hooks/useCanvasControls";
import { useAppSelector } from "@/redux/store";
import { ActionsType } from "@/redux/features/canvas-slice";

const CanvasComponent = () => {
    const actionStates: ActionsType = useAppSelector((state) => state.canvasSlice.actions);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const handleMouseDownCanvas = (e: KonvaEventObject<MouseEvent>) => {
        if (actionStates.drawing) {
            handleMouseDown(e);
        } else if (actionStates.moving) {
            handleDragStart(e);
        }
    };

    const handleMouseMoveCanvas = (e: KonvaEventObject<MouseEvent>) => {
        if (actionStates.drawing) {
            handleMouseMove(e);
        } else if (actionStates.moving) {
            handleDragMove(e);
        }
    };

    const handleMouseUpCanvas = (e: KonvaEventObject<MouseEvent>) => {
        if (actionStates.drawing) {
            handleMouseUp();
        } else if (actionStates.moving) {
            handleDragEnd(e);
        }
    };

    const {
        stageRef,
        position,
        zoom,
        handleDragStart,
        handleDragMove,
        handleDragEnd,
        handleWheel
    } = useCanvasControls();


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

    return (
        <>
            <Stage
                width={dimensions.width}
                height={dimensions.height}
                onMouseDown={handleMouseDownCanvas}
                onMouseMove={handleMouseMoveCanvas}
                onMouseUp={handleMouseUpCanvas}
                onMouseLeave={handleDragEnd}
                onWheel={handleWheel}
                ref={stageRef}
                x={position.x}
                y={position.y}
                scaleX={zoom}
                scaleY={zoom}
                draggable={actionStates.moving}
            >
                <Layer>

                    {/* TODO: MAKE IT WORK BRUH */}
                    {/* <GridCanvasComponent
                    height={dimensions.height}
                    width={dimensions.width}
                    cellSize={100} zoom={zoom}
                    offsetX={-position.x / zoom}
                    offsetY={-position.y / zoom} /> */}
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