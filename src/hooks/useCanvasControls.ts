import { useState, useCallback, useRef } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { Vector2d } from 'konva/lib/types';
import useZoom from './useZoom';
import { useAppSelector } from '@/redux/store';

interface CanvasControlsResult {
    stageRef: React.RefObject<any>;
    position: Vector2d;
    zoom: number;
    handleDragStart: (e: KonvaEventObject<MouseEvent>) => void;
    handleDragMove: (e: KonvaEventObject<MouseEvent>) => void;
    handleDragEnd: (e: KonvaEventObject<MouseEvent>) => void;
    handleWheel: (e: KonvaEventObject<WheelEvent>) => void;
}

const useCanvasControls = (initialPosition: Vector2d = { x: 0, y: 0 }): CanvasControlsResult => {
    const storeMoving = useAppSelector((state) => state.canvasSlice.actions.moving);
    const stageRef = useRef<any>(null);
    const isDragging = useRef(false);
    const lastPosition = useRef<Vector2d | null>(null);

    // Utiliser votre hook useZoom existant
    const { zoom, position, handleZoom, handleDrag } = useZoom();

    const handleDragStart = useCallback((e: KonvaEventObject<MouseEvent>) => {
        if (!storeMoving) return;
        isDragging.current = true;
        const stage = e.target.getStage();
        if (stage) {
            const pointerPosition = stage.getPointerPosition();
            if (pointerPosition) {
                lastPosition.current = pointerPosition;
            }
        }
    }, [storeMoving]);

    const handleDragMove = useCallback((e: KonvaEventObject<MouseEvent>) => {

        if (!isDragging.current || !storeMoving) return;

        const stage = e.target.getStage();
        if (stage) {
            const pointerPosition = stage.getPointerPosition();
            if (pointerPosition && lastPosition.current) {
                const dx = pointerPosition.x - lastPosition.current.x;
                const dy = pointerPosition.y - lastPosition.current.y;

                // Utiliser handleDrag de useZoom pour mettre à jour la position
                handleDrag({ x: dx, y: dy });

                lastPosition.current = pointerPosition;
            }
        }
    }, [storeMoving]);

    const handleDragEnd = useCallback((e: KonvaEventObject<MouseEvent>) => {
        isDragging.current = false;
        lastPosition.current = null;
    }, []);

    const handleWheel = useCallback((e: KonvaEventObject<WheelEvent>) => {
        e.evt.preventDefault();
        const stage = e.target.getStage();
        if (stage) {
            const pointerPosition = stage.getRelativePointerPosition();
            if (pointerPosition) {
                // Utiliser handleZoom de useZoom pour gérer le zoom
                handleZoom(e, pointerPosition, stage);
            }
        }
    }, [handleZoom]);

    return {
        stageRef,
        position,
        zoom,
        handleDragStart,
        handleDragMove,
        handleDragEnd,
        handleWheel
    };
};

export default useCanvasControls;