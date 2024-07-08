import { KonvaEventObject } from "konva/lib/Node";
import { Vector2d } from "konva/lib/types";
import { useCallback, useRef, useState } from "react";

interface DragMouseResult {
    stageRef: React.RefObject<any>;
    position: Vector2d;
    handleDragStart: (e: KonvaEventObject<MouseEvent>) => void;
    handleDragMove: (e: KonvaEventObject<MouseEvent>) => void;
    handleDragEnd: () => void;
    handleWheel: (e: KonvaEventObject<WheelEvent>) => void;
}

typescriptCopyimport { useState, useCallback, useRef } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { Vector2d } from 'konva/lib/types';

interface DragMouseResult {
    stageRef: React.RefObject<any>;
    position: Vector2d;
    handleDragStart: (e: KonvaEventObject<MouseEvent>) => void;
    handleDragMove: (e: KonvaEventObject<MouseEvent>) => void;
    handleDragEnd: () => void;
    handleWheel: (e: KonvaEventObject<WheelEvent>) => void;
}

const useDragMouse = (initialPosition: Vector2d = { x: 0, y: 0 }): DragMouseResult => {
    const [position, setPosition] = useState<Vector2d>(initialPosition);
    const stageRef = useRef<any>(null);
    const isDragging = useRef(false);
    const lastPosition = useRef<Vector2d | null>(null);

    const handleDragStart = useCallback((e: KonvaEventObject<MouseEvent>) => {
        isDragging.current = true;
        const stage = e.target.getStage();
        if (stage) {
            const pointerPosition = stage.getPointerPosition();
            if (pointerPosition) {
                lastPosition.current = pointerPosition;
            }
        }
    }, []);

    const handleDragMove = useCallback((e: KonvaEventObject<MouseEvent>) => {
        if (!isDragging.current) return;

        const stage = e.target.getStage();
        if (stage) {
            const pointerPosition = stage.getPointerPosition();
            if (pointerPosition && lastPosition.current) {
                const dx = pointerPosition.x - lastPosition.current.x;
                const dy = pointerPosition.y - lastPosition.current.y;

                setPosition(prevPos => ({
                    x: prevPos.x + dx,
                    y: prevPos.y + dy
                }));

                lastPosition.current = pointerPosition;
            }
        }
    }, []);

    const handleDragEnd = useCallback(() => {
        isDragging.current = false;
        lastPosition.current = null;
    }, []);

    const handleWheel = useCallback((e: KonvaEventObject<WheelEvent>) => {
        e.evt.preventDefault();
        const scaleBy = 1.1;
        const stage = e.target.getStage();
        if (stage) {
            const oldScale = stage.scaleX();
            const pointerPosition = stage.getPointerPosition();
            if (pointerPosition) {
                const mousePointTo = {
                    x: (pointerPosition.x - stage.x()) / oldScale,
                    y: (pointerPosition.y - stage.y()) / oldScale,
                };
                const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
                stage.scale({ x: newScale, y: newScale });
                const newPos = {
                    x: pointerPosition.x - mousePointTo.x * newScale,
                    y: pointerPosition.y - mousePointTo.y * newScale,
                };
                stage.position(newPos);
                stage.batchDraw();
            }
        }
    }, []);

    return {
        stageRef,
        position,
        handleDragStart,
        handleDragMove,
        handleDragEnd,
        handleWheel
    };
};

export default useDragMouse;