"use client"
import style from "../../styles/FlotingBar.module.css"
import Icon from '@mdi/react';
import { mdiHandBackLeftOutline } from '@mdi/js';
import { mdiDraw } from '@mdi/js';
import { mdiCursorDefaultOutline } from '@mdi/js';
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { ActionsType, changeActionState } from "@/redux/features/canvas-slice";

const FloatingBar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const actions = useAppSelector((state) => state.canvasSlice.actions);
    const changeActionStateFn = (key: keyof ActionsType, value: boolean) => {
        dispatch(changeActionState({ key, value }));
    }

    return (
        <div className={style.container}>
            <div className={style.button_container} onMouseDown={() => changeActionStateFn('moving', true)} style={{ backgroundColor: actions.moving ? 'blue' : '' }}>
                <Icon path={mdiHandBackLeftOutline} color="black" size={1} />
            </div>
            <div className={style.button_container}>
                <Icon path={mdiCursorDefaultOutline} color="black" size={1} />
            </div>
            <div onMouseDown={() => changeActionStateFn('drawing', true)} className={style.button_container} style={{ backgroundColor: actions.drawing ? 'blue' : '' }}>
                <Icon path={mdiDraw} color="black" size={1} />

            </div>
        </div>
    );
}

export default FloatingBar;