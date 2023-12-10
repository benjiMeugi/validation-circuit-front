import { formatNumber } from "@angular/common";

export const _number = {
    parseFloat: (value: string|number) => {
        if (value == null || value == undefined || value == "") {
            return 0;
        }
        if (typeof value == 'number') {
            return value;
        }
        return parseFloat(value.toString().replace(",", ".").replace(/\s/g, ''));
    },
    formatNumber: (value: number) => {
        return formatNumber(value, 'fr', '1.2-2');
    }
}