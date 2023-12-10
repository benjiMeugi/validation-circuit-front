type keyType = "array" | "object" | "number" | "string" | boolean;

export interface IStorageKey {
    key: string,
    type: keyType,
}

const taxes: IStorageKey = { key: 'taxes', type: "array" };
export const STORE_DATA_KEYS = {
    TAXES: taxes,
}
