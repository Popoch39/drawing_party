"use client"
import style from "../../styles/FlotingBar.module.css"
import Icon from '@mdi/react';
import { mdiHandBackLeftOutline } from '@mdi/js';
import { mdiDraw } from '@mdi/js';
import { mdiCursorDefaultOutline } from '@mdi/js';
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setIsWorking } from "@/redux/features/app-slice";

const FloatingBar = () => {
    const dispatch = useDispatch<AppDispatch>();

    const isWorking = useAppSelector((state) => state.appSlice.isWorking);
    const handleTest = () => {
        dispatch(setIsWorking(!isWorking))
    }

    
    return (
        <div className={style.container}>
            <div className="b-black">
                <Icon path={mdiHandBackLeftOutline} color="black" size={1} />
            </div>
            <div onMouseDown={handleTest}>
                {isWorking ? <div className="b-black">redux works</div> : <div className="b-black">See, state changed</div>}
                <Icon path={mdiCursorDefaultOutline} color="black" size={1} />
            </div>
            <div>
                <Icon path={mdiDraw} color="black" size={1} />

            </div>
        </div>
    );
}

export default FloatingBar;