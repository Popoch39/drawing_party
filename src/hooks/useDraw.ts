import { useState, useRef, useCallback } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { Stage } from 'konva/lib/Stage';
import Konva from 'konva';
import { useAppSelector } from '@/redux/store';

interface LineType {
    points: number[];
}

const useDraw = () => {
    const storeDrawing = useAppSelector((state) => state.canvasSlice.actions.drawing);
    const [lines, setLines] = useState<LineType[]>([]);
    const isDrawing = useRef(false);

    const handleMouseDown = useCallback((e: KonvaEventObject<MouseEvent>) => {
        if (!storeDrawing) return;
        isDrawing.current = true;
        const stage = e.target.getStage();
        if (!stage) return;

        const pos = stage.getRelativePointerPosition();
        if (!pos) return;

        setLines((prevLines) => [...prevLines, { points: [pos.x, pos.y] }]);
    }, [storeDrawing]);

    const handleMouseMove = useCallback((e: KonvaEventObject<MouseEvent>) => {
        if (!storeDrawing || !isDrawing.current) return;
        const stage = e.target.getStage();
        if (!stage) return;

        const point = stage.getRelativePointerPosition();
        if (!point) return;

        setLines((prevLines) => {
            const lastLine = prevLines[prevLines.length - 1];
            const newLastLine = {
                ...lastLine,
                points: [...lastLine.points, point.x, point.y]
            };
            return [...prevLines.slice(0, -1), newLastLine];
        });
    }, [storeDrawing]);

    const handleMouseUp = useCallback(() => {
        isDrawing.current = false;
    }, []);

    return { lines, handleMouseDown, handleMouseMove, handleMouseUp };
};

export default useDraw;