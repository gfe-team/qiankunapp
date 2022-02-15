import {
  Breadcrumb, Button, ConfigProvider, Divider,
  Empty,
  Form, Input, Layout, Menu,
  Modal,
  PageHeader, Space, Spin, Tabs
} from "ant-design-vue";
import 'ant-design-vue/dist/antd.less';
import type { App } from 'vue';

export function setupAntd(app: App<Element>) {
  app.use(ConfigProvider)
    .use(Button)
    .use(Form)
    .use(Input)
    .use(Modal)
    .use(Layout)
    .use(Menu)
    .use(Empty)
    .use(Divider)
    .use(Space)
    .use(PageHeader)
    .use(Breadcrumb)
    .use(Tabs)
    .use(Spin)

}
