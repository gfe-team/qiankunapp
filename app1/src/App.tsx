import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { defineComponent } from 'vue';
import { transformCellText } from './utils';

export default defineComponent({
  name: 'App',
  setup() {

    const title = 'App1 Component';

    return () => (
      <a-config-provider transformCellText={({ text }) => transformCellText(text)} locale={zhCN}>
        <h1>{title}</h1>
        <router-view ></router-view>
      </a-config-provider>
    );
  }
});
