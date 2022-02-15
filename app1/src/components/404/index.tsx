import { defineComponent } from "vue";
import Style from './style.module.less';

export default defineComponent({
    name: 'NotFount',
    components: {
    },
    setup() {

        const back = async () => {

            history.go(-1);
        }

        const renderer = (
            <div id={Style.page}>
                <h1>抱歉，找不到此页面~</h1>
                <h2>Sorry, the page now can not be accessed. </h2>
                <font color="#666666">您请求访问的页面，暂时找不到，我们建议您返回首页，谢谢！</font>
                <br /><br />
                <div class="button">
                    <a href="javascript:void(0);" onClick={back}>返回</a>
                </div>
            </div>
        );

        return { renderer }
    },
    render() {
        return (<div class={Style.container}>{this.renderer}</div>);
    }
});


