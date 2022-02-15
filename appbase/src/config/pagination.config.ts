import { TableState } from "ant-design-vue/lib/table/interface";

export const paginationOptions = {
    total: 0,
    current: 1,
    pageSize: 10,
    defaultCurrent: 1,
    defaultPageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `共${total}条记录`,
    pageSizeOptions: ['10', '20', '30', '40']
};

export type Pagination = TableState['pagination'];
