import type { App } from 'vue';
import * as echarts from "echarts/core";
import {
    BarChart,
    // 系列类型的定义后缀都为 SeriesOption
    BarSeriesOption,
    LineChart,
    LineSeriesOption,
    PieSeriesOption,
    PieChart
} from "echarts/charts";
import {
    TitleComponent,
    // 组件类型的定义后缀都为 ComponentOption
    TitleComponentOption,
    GridComponent,
    GridComponentOption,
    TooltipComponent,
    LegendComponent,
    ToolboxComponent

} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";


// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
    | BarSeriesOption
    | LineSeriesOption
    | TitleComponentOption
    | GridComponentOption
    | PieSeriesOption

>;
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    BarChart,
    LineChart,
    PieChart,
    CanvasRenderer, ToolboxComponent, LegendComponent
]);


export function setupEcharts(app: App<Element>) {

    echarts.use([
        TitleComponent,
        TooltipComponent,
        GridComponent,
        BarChart,
        LineChart,
        PieChart,
        CanvasRenderer, ToolboxComponent, LegendComponent
    ]);
}
