import style from "../../styles/FlotingBar.module.css"
import Icon from '@mdi/react';
import { mdiHandBackLeftOutline } from '@mdi/js';
import { mdiDraw } from '@mdi/js';
import { mdiCursorDefaultOutline } from '@mdi/js';

const FloatingBar = () => {
    return (
        <div className={style.container}>
            <div className="b-black">
                <Icon path={mdiHandBackLeftOutline} color="black" size={1} />
            </div>
            <div>
                <Icon path={mdiCursorDefaultOutline} color="black" size={1} />
            </div>
            <div>
                <Icon path={mdiDraw} color="black" size={1} />

            </div>
        </div>
    );
}

export default FloatingBar;