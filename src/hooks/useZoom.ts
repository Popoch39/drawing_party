import { KonvaEventObject } from 'konva/lib/Node';
import { Stage } from 'konva/lib/Stage';
import { useState, useCallback } from 'react';

const useZoom = (initialZoom = 1) => {
    const [zoom, setZoom] = useState(initialZoom);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleZoom = useCallback((e: KonvaEventObject<WheelEvent>, stage: Stage) => {
        e.evt.preventDefault();
        if (!stage) return;

        const scaleBy = 1.1;
        const oldScale = stage.scaleX();
        if (!stage.getPointerPosition()) return
        const mousePointTo = {
            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
        };

        const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

        setZoom(newScale);
        setPosition({
            x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
            y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
        });
    }, []);

    const handleDrag = useCallback((e: KonvaEventObject<DragEvent>) => {
        setPosition({
            x: e.target.x(),
            y: e.target.y(),
        });
    }, []);

    return { zoom, position, handleZoom, handleDrag };
};

export default useZoom;