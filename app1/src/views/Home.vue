
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <br />
    <br />
    <a-button type="primary" @click="onIssueMsg">上报消息</a-button>
    <br />
    <br />
    <a-button type="primary" @click="onNavigateOtherApp">
      跳转到app4应用页面
    </a-button>
  </div>
</template>

<script lang="ts">
import { Subscription } from "rxjs";
import { defineComponent, onMounted, onUnmounted } from "vue";
import {
  SubAppPagerIssue,
  SubAppPagerCollect,
  PagerMessage,
} from "../core/app.pager";

export default defineComponent({
  name: "Home",
  setup() {
    let pagerSub: Subscription = new Subscription();

    const onIssueMsg = async () => {
      SubAppPagerIssue("i am from app1");
    };

    const onNavigateOtherApp = async () => {
      SubAppPagerIssue({
        type: "navigate",
        url: "/portal/app4/dev",
      });
    };

    onMounted(async () => {
      pagerSub = SubAppPagerCollect().subscribe((msg: PagerMessage) => {
        if (msg) {
          console.log("app1 接收到主应用消息 : ", msg.data);
        }
      });
    });

    onUnmounted(() => {
      pagerSub?.unsubscribe?.();
    });

    return {
      onIssueMsg,
      onNavigateOtherApp,
    };
  },
});
</script>
