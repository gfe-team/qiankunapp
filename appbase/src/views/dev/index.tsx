
import { HandlePagerMessage, PagerCollect, PagerIssue, PagerMessage } from "@/core/app.pager";
import { Emitter } from 'mitt';
import { defineComponent, inject, onMounted } from 'vue';
import style from './style.module.less';

export default defineComponent({
    name: 'DevPage',
    setup(props,{ slots }) {

        const onIssue = async () => {

            PagerIssue('i am from baseapp');
        }

        const mitter = inject('mitter') as Emitter<any>;
        const onMitt = async () => {

            // fire an event
            mitter.emit('customEvent', { msg: 'abc' });
        }

        onMounted(async () => {

            PagerCollect.subscribe((msg: PagerMessage) => {
                if (msg) {
                    console.log('接收到子应用上报的消息 : ', msg.data);
                    
                    HandlePagerMessage(msg.data);
                }
            });
        });

        return () => (
            <div class={style.container}>
                &nbsp;&nbsp;&nbsp;
                {/* <h1>&nbsp;&nbsp;dev page</h1> */}
                <a-button onClick={onIssue}>下发消息</a-button>
                &nbsp;&nbsp;&nbsp;
                <a-button onClick={onMitt}>mitt通信</a-button>
                &nbsp;&nbsp;&nbsp;
                { slots.buttons?.() }
            </div>
        )
    }
});