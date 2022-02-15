import { defineComponent } from "@vue/runtime-core";
import { Emitter } from 'mitt';
import { inject } from "vue";

export default defineComponent({
    setup() {

        const mitter = inject('mitter') as Emitter<any>;
        mitter.on('customEvent', e => console.log('i got customEvent', e));

        return () =>

            <router-view />;
    }
});