import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { defineComponent } from 'vue';
import { transformCellText } from './utils';

export default defineComponent({
  name: 'App',
  setup() {

    return () => (
      <a-config-provider transformCellText={({ text }) => transformCellText(text)} locale={zhCN}>
        <router-view ></router-view>
      </a-config-provider>
    );
  }
});
