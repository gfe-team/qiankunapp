import type { App } from 'vue';
import 'ant-design-vue/dist/antd.less';
import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Empty,
  Form,
  Input,
  Menu,
  Modal,
  PageHeader,
  Radio,
  Select,
  Space,
  Switch,
  Layout,
  ConfigProvider,
  Dropdown,
  Breadcrumb,
  Upload,
  Image,
  Tabs,
  Tag,
  Tooltip,
  Spin,
} from "ant-design-vue";

export function setupAntd(app: App<Element>) {
  app.use(ConfigProvider)
    .use(Button)
    .use(Form)
    .use(Input)
    .use(Modal)
    .use(Layout)
    .use(Menu)
    .use(Checkbox)
    .use(Radio)
    .use(Empty)
    .use(Divider)
    .use(Select)
    .use(Space)
    .use(Switch)
    .use(DatePicker)
    .use(PageHeader)
    .use(Dropdown)
    .use(Breadcrumb)
    .use(Tabs)
    .use(Upload)
    .use(Image)
    .use(Tag)
    .use(Tooltip)
    .use(Spin)

}
