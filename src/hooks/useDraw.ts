import { KonvaEventObject } from "konva/lib/Node";
import { Stage } from "konva/lib/Stage";
import { useRef, useState } from "react";

export type LineType = {
    points: number[]
}
const useDraw = () => {
    const [lines, setLines] = useState<LineType[]>([]);
    const isDrawing = useRef(false);

    const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
        isDrawing.current = true;
        const stage: Stage | null = e.target.getStage();
        if (!stage) return;
        const pos = stage.getPointerPosition();
        if (!pos) return;
        setLines([...lines, { points: [pos.x, pos.y] }]);
    };

    const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
        if (!isDrawing.current) return;
        const stage: Stage | null = e.target.getStage();
        if (!stage) return;
        const point = stage.getPointerPosition();
        if (!point) return;
        let lastLine = lines[lines.length - 1];
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    };

    return { lines, handleMouseDown, handleMouseMove, handleMouseUp };
};

export default useDraw;