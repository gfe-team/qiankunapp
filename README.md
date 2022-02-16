# 项目介绍
> 基于qiankun框架的前端微服务项目框架

### 说明
项目子应用包含了Vue3, Angualr12/13, React17三种框架,可以给擅长不同框架的开发者提供更多参考.
微服务的运用可以实现多个团队通过独立发布功能的方式来共同构建现代化web应用的技术手段及方法策略 

## 源码结构
qiankunapp 
├─ app1 
├─ app2 
├─ app3 
├─ app4 
├─ app5 
└─ appbase 
appbase:项目主应用,Vue3 + Typescript + antv + pinia + qiankun + rxjs
app1:子应用,Vue3 + Typescript + antv + pinia + qiankun
app2:子应用,Angular12 + Typescript + NgZorro
app3:子应用,Angular13 + Typescript + NgZorro
app4:子应用,React17 + Typescript + antd + craco
app5:子应用,React17 + Typescript + antd + react-scripts

## 如何运行
微服务理论上各个应用都是可以独立运行的. 在实际开发中为了方便, 我们也通常在独立运行的子应用上进行调试.
为了能看到整体效果,需要将全部项目运行起来,并在主应用中进行访问.
项目整体运行:
1.进入主应用appbase,执行:npm run dev
2.分别进去各子应用app1-app5, 执行:npm run serve:single-spa
3.全部启动成功后, 访问主应用地址:http://localhost:8080

## 如何部署
各工程按类别整体划分为主应用(一个)与子应用(多个)两种,均按照原有静态部署方式进行独立部署.

### 问题反馈
如果你有任何问题和建议，请在issues里面指出，我们将根据bug情况不定期的发布迭代版本。
如果你也有兴趣加入,可以邮件说明:gfe@goldente.com

## 注意
该项目旨在帮助大家关于前端微服务的学习,请不要私自用于商业用途.
