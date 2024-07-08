import { useState, useCallback } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { Vector2d } from 'konva/lib/types';
import { Stage } from 'konva/lib/Stage';

const useZoom = (initialZoom = 1) => {
    const [zoom, setZoom] = useState(initialZoom);
    const [position, setPosition] = useState<Vector2d>({ x: 0, y: 0 });

    const handleZoom = useCallback((e: KonvaEventObject<WheelEvent>, pointerPosition: Vector2d, stage: Stage) => {
        const scaleBy = 1.1;
        const oldScale = stage.scaleX();
        if (!pointerPosition) return;

        const mousePointTo = {
            x: pointerPosition.x / oldScale - stage.x() / oldScale,
            y: pointerPosition.y / oldScale - stage.y() / oldScale,
        };

        const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

        setZoom(newScale);
        setPosition({
            x: -(mousePointTo.x - pointerPosition.x / newScale) * newScale,
            y: -(mousePointTo.y - pointerPosition.y / newScale) * newScale,
        });
    }, []);

    const handleDrag = useCallback((newPos: Vector2d) => {
        setPosition(newPos);
    }, []);

    return { zoom, position, handleZoom, handleDrag };
};

export default useZoom;