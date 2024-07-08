import { useAppSelector } from "@/redux/store";
import { KonvaEventObject } from "konva/lib/Node";
import { Stage } from "konva/lib/Stage";
import { Vector2d } from "konva/lib/types";
import { useCallback, useRef, useState } from "react";

export type LineType = {
    points: number[]
}

interface UseDraw {
    (canvasPosition: Vector2d, zoom: number): {
        lines: LineType[];
        handleMouseDown: (e: KonvaEventObject<MouseEvent>) => void;
        handleMouseMove: (e: KonvaEventObject<MouseEvent>) => void;
        handleMouseUp: () => void;
    };
}

const useDraw: UseDraw = (canvasPosition, zoom) => {
    const storeDrawing = useAppSelector((state) => state.canvasSlice.actions.drawing);
    const [lines, setLines] = useState<LineType[]>([]);
    const isDrawing = useRef(false);

    const adjustCoordinates = useCallback((x: number, y: number): Vector2d => {
        return {
            x: (x - canvasPosition.x) / zoom,
            y: (y - canvasPosition.y) / zoom
        };
    }, [canvasPosition, zoom]);


    const handleMouseDown = useCallback((e: KonvaEventObject<MouseEvent>) => {
        if (!storeDrawing) return;
        isDrawing.current = true;
        const stage: Stage | null = e.target.getStage();
        if (!stage) return;
        const pos = stage.getPointerPosition();
        if (!pos) return;
        const adjustedPos = adjustCoordinates(pos.x, pos.y);
        setLines((prevLines) => [...prevLines, { points: [adjustedPos.x, adjustedPos.y] }]);
    }, [storeDrawing, adjustCoordinates]);

    const handleMouseMove = useCallback((e: KonvaEventObject<MouseEvent>) => {
        if (!storeDrawing || !isDrawing.current) return;
        const stage: Stage | null = e.target.getStage();
        if (!stage) return;
        const point = stage.getPointerPosition();
        if (!point) return;
        const adjustedPos = adjustCoordinates(point.x, point.y);
        console.log(adjustedPos);
        setLines((prevLines) => {
            const lastLine = prevLines[prevLines.length - 1];
            const newLastLine = {
                ...lastLine,
                points: [...lastLine.points, adjustedPos.x, adjustedPos.y]
            };
            return [...prevLines.slice(0, -1), newLastLine];
        });
    }, [storeDrawing, adjustCoordinates]);

    const handleMouseUp = useCallback(() => {
        isDrawing.current = false;
    }, []);
    return { lines, handleMouseDown, handleMouseMove, handleMouseUp };
};

export default useDraw;