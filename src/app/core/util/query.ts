type ISigns = "=" | ">" | ">=" | "<" | "<=";

type IJoins = ["join" | "leftJoin" | "rightJoin", string, string, "=", string];

type IWhereIn = [string, any[]];

type IOrderBy = [string, "DESC" | "ASC"];

type IWhere = [string, ISigns, any];

interface IHas {
    relation: string,
    queries: IQuery[],
    sign?: ISigns,
    value?: any,
}

interface IWhereHas {
    relation: string,
    queries: IQuery[],
    sign: ISigns,
    value: any,
}

interface IAgregate {
    relation: string,
    column: string
}

export interface IQuery {
    select?: string[];
    joins?: IJoins[];
    has?: IHas[];
    whereHas?: IWhereHas[];
    where?: IWhere[];
    orWhere?: IWhere[];
    whereIn?: IWhereIn[];
    whereNotIn?: IWhereIn[];
    groupBy?: string[];
    with?: string[];
    withCount?: string[];
    withExists?: string[];
    withMins?: IAgregate[];
    withMaxs?: IAgregate[];
    withAvgs?: IAgregate[];
    orderBy?: IOrderBy;
    limit?: number;
    append_?: any;
}

export interface IWrapQuery {
    page?: number;
    per_page?: number;
    query_?: IQuery
}