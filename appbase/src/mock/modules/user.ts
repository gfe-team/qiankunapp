import Mock from "mockjs"
const Random = Mock.Random;

export default [
    // getToken
    {
        url: '/auth/oauth/token',
        type: 'post',
        response: () => {
            return {
                code: 200,
                message: '成功',
                data: {
                    name: Random.name(),
                    cname: Random.cname(),
                    address: Random.region(),
                    token: 'token-value'
                },
            };
        },
    },
    // GetUserInfo
    {
        url: '/upms/user/info',
        type: 'get',
        response: () => {
            return {
                code: 200,
                message: '成功',
                data: {
                    name: 'testName',
                },
            };
        },
    },
    // 返回租户列表
    {
        url: "/tenant/list",
        type: "post",
        response: () => {
            return {
                code: 200,
                message: '成功',
                data: {
                    name: Random.name(),
                    cname: Random.cname(),
                    address: Random.region(),
                    list: [{ id: 1, name: '租户1' }, { id: 2, name: '租户2' }]
                },
            };
        }
    }
];

