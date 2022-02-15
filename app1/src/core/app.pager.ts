import { Subject, Observable } from "rxjs";
import { filter, throttleTime } from 'rxjs/operators';

let SubAppPager;

export const setPager = (_pager: Subject<any>) => {

    SubAppPager = _pager;
}

export const getPager = (): Subject<any> => SubAppPager;


// 消息来源
export enum PagerEnum {
    // 主应用
    BASE = 1,
    // 子应用
    SUB = 2
}

// 消息主体类型
export interface PagerMessage {
    from: PagerEnum;
    data: any;
}

// 子应用上报消息
export const SubAppPagerIssue = data => {
    if (!SubAppPager) SubAppPager = getPager();
    const msg: PagerMessage = {
        from: PagerEnum.SUB,
        data: data
    };
    SubAppPager.next({ ...msg });
}

// 订阅主应用下发的消息
export const SubAppPagerCollect = (): Observable<PagerMessage> => {
    if (!SubAppPager) SubAppPager = getPager();
    return SubAppPager.pipe(
        throttleTime(500),
        filter((msg: any) => msg.from == PagerEnum.BASE)
    );
}