// import { appStore } from '@/store/modules/app';
// import { userStore } from '@/store/modules/user';
// import { MENU_OPERATIONS, ROOT_MENU, SUB_MENU } from '@/permissions';
// import store from '@/store';
import { isDevMode } from '@/utils/env';
import { Base64Decryption, Base64Encryption } from './encryption';

interface PermissionItem {
    // 权限码 用于前端权限计算
    value: string;
    // 标签
    label: string;
    // 资源码 与后台对应
    source: number;

    // extend
    level?: number;
    url?: string;
    icon?: string;
    show?: boolean;
    hidden?: boolean;
}

class AuthenticationService {

    // 权限 code 
    // 形式："1,0" 1-index 0-pos
    // pos 表示 32 位二进制数中 1 的位置
    // index 表示权限空间，用于突破 JavaScript 数字位数的限制
    // 目前采用原生js技术,每个空间下最多32位
    // 幂乘优化 Math.pow(2,3) 等同于 2**3 结果 8
    public static userCode: string;

    // // 微服务中使用
    // // 对外开放校验方法  传递给子应用使用
    // public _resetUserCode(){
    //     const _cache = sessionStorage.getItem(CACHE_KEY);
    //     if (_cache) {

    //         AuthenticationService.userCode = Base64Decryption(_cache);
    //     }
    // }
    // public _getUserCode(){

    //     return AuthenticationService.userCode;
    // }
    // public _authPermission(permission: PermissionItem): boolean {
    //     const userPermission: Array<any> = AuthenticationService.userCode ? AuthenticationService.userCode.split(',') : [];
    //     const [index, pos] = permission.value.split(',');
    //     const _index: number = parseInt(index);
    //     const _pos: number = parseInt(pos);
    //     const permissionValue = 2 ** _pos;
    //     return (userPermission[_index] & permissionValue) === permissionValue;
    // }

    constructor() {
        if (isDevMode()) {
            setTimeout(() => {
                console.group('安全码检测中.....');
                // (window as any)['Permissions'] = this.Permissions;
                const values = this.Permissions.map((t: any) => t.value);
                const sources = this.Permissions.map((t: any) => t.source);
                const warningStyle = `color:red;font-size:18px;font-weight:800;`;
                const repearValues = values.filter(i => values.indexOf(i) !== values.lastIndexOf(i));
                if (repearValues && repearValues.length) {
                    console.log(`%c%s`, warningStyle, `权限码重复`);
                    console.log(repearValues);
                }

                const repearSources = sources.filter(i => sources.indexOf(i) !== sources.lastIndexOf(i));
                if (repearSources && repearSources.length) {
                    console.log(`%c%s`, warningStyle, `资源码重复`);
                    console.log(repearSources);
                }

                if (repearValues?.length == 0 && repearSources?.length == 0) {
                    console.log(`%c%s`, `color:green;`, `安全码校验通过`);
                }

                console.log('校验结束')
                console.groupEnd();
            }, 200);
        }
    }

    // get http() {

    //     return defHttp;
    // }

    // 全系统内所有权限信息
    get Permissions() {
        return [
            // ...Object.values(ROOT_MENU),
            // ...Object.values(SUB_MENU),
            // ...Object.values(MENU_OPERATIONS)
        ]
    }

    // 初始化用户权限码
    public initUserCode(sourceCode: Array<number>) {
        AuthenticationService.userCode = '';
        Object.values(this.Permissions).forEach((item: PermissionItem) => {
            if (sourceCode.includes(item.source)) this.addPermission(item);
        });
    }

    // 权限校验
    public AuthPermission(permission: PermissionItem): boolean {

        AuthenticationService.userCode = AuthenticationService.userCode || Base64Decryption(/*store.state.user.proof*/ '');
        return this.hasPermission(permission);
    }


    // 返回加密后权限信息
    public async getUserPermissionCode(list: Array<number>) {

        // const _memory = AuthenticationService.userCode;
        // if (_memory && _memory.length) {

        //     return new Promise((resolve) => resolve(Base64Encryption(_memory)))
        // }

        // const _cache = store.state.user.proof;
        // if (_cache && _cache.length) {

        //     AuthenticationService.userCode = Base64Decryption(_cache);
        //     return new Promise((resolve) => resolve(_cache))
        // }

        // console.log(employeeId)
        // console.log(userStore.getEmployeeId || sessionStorage.getItem('employee_id'))
        // console.log(sessionStorage.getItem('employee_id'))
        // const employee_id = employeeId || store.state.user.userId || sessionStorage.getItem('uid');
        // const param: any = { employee_id };
        // if (!userStore.getTokenState || !userStore.getEmployeeId) {

        //     return new Promise((resolve) => {

        //         resolve([]);
        //     })
        // }

        // return this.http.request({
        //     url: '/RoleManager/queryroleinfobyuserid',
        //     method: 'GET',
        //     params: param
        // }, {
        //     apiUrl: AUTH_PATH
        // }).then(resp => {

        // })

        return new Promise((resolve) => {
            // const permissons: any = [];
            // list.forEach((item: any) => permissons.push(...item.childs));
            // const sourceCodes = permissons.map((t: any) => t.source_code);
            this.initUserCode(list);
            // store userCode
            // appStore.commitProofState(Base64Encryption(AuthenticationService.userCode));
            // cache userCode
            // sessionStorage.setItem(CACHE_KEY, Base64Encryption(AuthenticationService.userCode));
            // resolve(this.sourcePermission());
            // console.log(this.Permissions.map(t=>t.source).join(','))
            // console.log(AuthenticationService.userCode)
            resolve(Base64Encryption(AuthenticationService.userCode));
        })
    }

    public addPermission(permission: PermissionItem): void {
        const userPermission: Array<any> = AuthenticationService.userCode ? AuthenticationService.userCode.split(',') : [];
        const [index, pos] = permission.value.split(',');
        const _index: number = parseInt(index);
        const _pos: number = parseInt(pos);

        userPermission[_index] = (userPermission[_index] || 0) | 2 ** _pos;

        AuthenticationService.userCode = userPermission.join(',');
    }

    public delPermission(permission: PermissionItem): void {

        const userPermission: Array<any> = AuthenticationService.userCode ? AuthenticationService.userCode.split(',') : [];
        const [index, pos] = permission.value.split(',');
        const _index: number = parseInt(index);
        const _pos: number = parseInt(pos);

        userPermission[_index] = (userPermission[_index] || 0) & (~(2 ** _pos));

        AuthenticationService.userCode = userPermission.join(',');
    }

    public hasPermission(permission: PermissionItem): boolean {
        // this._resetUserCode();
        const userPermission: Array<any> = AuthenticationService.userCode ? AuthenticationService.userCode.split(',') : [];
        const [index, pos] = permission.value.split(',');
        const _index: number = parseInt(index);
        const _pos: number = parseInt(pos);
        const permissionValue = 2 ** _pos;

        return (userPermission[_index] & permissionValue) === permissionValue;
    }

    public allPermission(): Array<string> {

        const results: Array<string> = [];

        if (!AuthenticationService.userCode) return results;

        Object.values(this.Permissions).forEach((permission: any) => {
            this.hasPermission(permission) && results.push(permission);
        });

        return results;
    }

    public allSourceCode(): Array<number> {

        const results: Array<number> = [];

        Object.values(this.Permissions).forEach((permission: any) => {
            results.push(permission);
        });

        return results;
    }

    public listPermission(): Array<string> {

        const results: Array<string> = [];

        if (!AuthenticationService.userCode) return results;

        Object.values(this.Permissions).forEach((permission: any) => {
            this.hasPermission(permission) && results.push(permission.label);
        });

        return results;
    }

    public valuePermission(): Array<string> {

        const results: Array<string> = [];

        if (!AuthenticationService.userCode) return results;

        Object.values(this.Permissions).forEach((permission: any) => {
            this.hasPermission(permission) && results.push(permission.value);
        });

        return results;
    }

    public sourcePermission(): Array<number> {

        const results: Array<number> = [];

        if (!AuthenticationService.userCode) return results;

        Object.values(this.Permissions).forEach((permission: any) => {
            this.hasPermission(permission) && results.push(permission.source);
        });

        return results;
    }

    public clearPermission() {
        
        AuthenticationService.userCode = null;
    }
}

export default new AuthenticationService();