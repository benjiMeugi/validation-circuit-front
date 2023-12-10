import { ClrDatagridStateInterface, ClrDatagridFilterInterface } from "@clr/angular";
import { _isDefined } from "./type-utils";

export const _datagrid = {
    pagination: (state: ClrDatagridStateInterface|null) => {
        return {
            page: state && state.page ? state.page.current : undefined,
            per_page: state && state.page ? state.page.size : undefined,
        };
    },
    queries: (state: ClrDatagridStateInterface|null): object => {
        if (state == null) {
            return {};
        }
        let sorting = {};
        if (_isDefined(state?.sort?.by) && state?.sort?.by !== '') {
            sorting = {
                orderBy_: [
                    state?.sort?.by,
                    state?.sort?.reverse ? 'desc' : 'asc'
                ]
            }
        }

        let filters: { [key: string]: any[] } = {};
        if (state && state.filters && state?.filters?.length > 0) {
            state.filters.forEach((e:{ [key: string]: any[] }) => {

                if (typeof e != 'string') {
                    return;
                }
                const property = (e['property'] as string).split('|');

                let value: any = e['value'];
                // like filters added
                if (property.length === 4) {
                    const likes = property[3].split('');
                    value = "%" + e['value'];
                    if (likes[0] === "%" && likes[2] === "%") {
                        value = "%" + e['value'] + "%";
                    } else if (likes[2] === "%") {
                        value = e['value'] + "%";
                    }
                }
                const tempFilter = {
                    [property[0]]: [[property[1], property[2], value]]
                }

                Object.assign(filters, tempFilter);
            })
        }
        return Object.assign(sorting, filters);
    },
    wrapQuery: (state: ClrDatagridStateInterface|null = null, paginate = false, otherData: any = {}) => {

        let response = {
            query_: JSON.stringify(Object.assign(_datagrid.queries(state), otherData))
        };

        if (true === paginate) {
            return Object.assign(response, _datagrid.pagination(state));
        }
        return response;
    }
};
