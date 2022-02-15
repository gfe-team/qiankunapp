import Mock from 'mockjs';
import user from './modules/user';
const mocks = [...user];
//设置延时时间
Mock.setup({
    timeout: '300-600',
});

export function mockXHR() {
    for (const i of mocks) {
        Mock.mock(new RegExp(i.url), i.type || 'get', i.response);
    }
}

