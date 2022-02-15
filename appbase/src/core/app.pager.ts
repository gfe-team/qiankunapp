import { filter, throttleTime } from 'rxjs/operators';
import { Observable, Subject } from "rxjs";
import router from '@/router';

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

export const AppPager: Subject<PagerMessage> = new Subject();

// 主应用下发消息
export const PagerIssue = data => {
    const msg: PagerMessage = {
        from: PagerEnum.BASE,
        data: data
    };
    AppPager.next(msg);
}

// 主应用收集子应用的消息
export const PagerCollect: Observable<PagerMessage> = AppPager.pipe(
    throttleTime(500),
    filter((msg: any) => msg.from == PagerEnum.SUB)
);


// pager数据处理
export const HandlePagerMessage = ({ type, url }) => {
    switch (type) {
        case 'navigate':
            {
                router.replace(url);
            }
            break;

        default:
            console.log('未识别的操作');
            break;
    }
}