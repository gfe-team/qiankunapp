import { RegistrableApp } from "qiankun";
const container = '#subapp';
const props = {};

export const apps: Partial<RegistrableApp<any>>[] = [
    {
        name: 'app1',
        entry: 'http://localhost:8081',
        activeRule: `/portal/app1`,
        container,
        props
    },
    {
        name: 'app2',
        entry: 'http://localhost:8082',
        activeRule: `/portal/app2`,
        container,
        props
    },
    {
        name: 'app3',
        entry: 'http://localhost:8083',
        activeRule: `/portal/app3`,
        container,
        props
    },
    {
        name: 'app4',
        entry: 'http://localhost:8084',
        activeRule: `/portal/app4`,
        container,
        props
    },
    {
        name: 'app5',
        entry: 'http://localhost:8085',
        activeRule: `/portal/app5`,
        container,
        props
    }
];