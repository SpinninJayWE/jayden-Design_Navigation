import { request } from "./index";
import qs from 'qs'

type SortParam = string[];
type FieldsParam = string[];
type LocaleParam = string[];
type PublicationState = 'live' | 'preview';

interface PaginationParam {
  page: number;
  pageSize: number;
}

interface FilterConditions {
  $eq?: any;
  $ne?: any;
  $lt?: any;
  $lte?: any;
  $gt?: any;
  $gte?: any;
  $contains?: any;
  $containsi?: any;
  $in?: any[];
  $nin?: any[];
  $null?: boolean;
  $notNull?: boolean;
  $between?: [any, any];
  $startsWith?: any;
  $endsWith?: any;
}

interface PopulateFields {
  fields?: FieldsParam;
}

interface PopulateObject {
  [key: string]: PopulateFields | true;
}

type PopulateParam = '*' | string[] | PopulateObject;

interface FiltersParam {
  [key: string]: FilterConditions | FiltersParam;
}

interface QueryParams {
  sort?: SortParam;
  filters?: FiltersParam;
  populate?: PopulateParam;
  fields?: FieldsParam;
  pagination?: PaginationParam;
  publicationState?: PublicationState;
  locale?: LocaleParam;
}

const toQueryString = (params?: QueryParams) => {
  return qs.stringify(params)
};

export const getPostings = async (query?: QueryParams) => {
  const res = await request.get(`/postings${ query ? `?${toQueryString(query)}` : ''}`);
  return res.data;
}

export const getPostingsById = async (id: number, query?: QueryParams) => {
  const res = await request.get(`/postings/${id}${ query? `?${toQueryString(query)}` : ''}`);
  return res.data;
}


export const postPosting = async (data: any) => {
  const res = await request.post(`/postings`, data);
  return res.data;
}

export const likePosting = async (id: number) => {
  const res = await request.put(`/postinglike/${id}`);
  return res.data;
}