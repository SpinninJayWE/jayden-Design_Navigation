import { request } from "./index";
import qs from 'qs'
import {AuthStorage} from "main-navigation/src/providers/user";

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

export const login = async (params: { email: string, password: string }) => {
  const { data } = await  request.post('/auth/local',
      { identifier: params.email, password: params.password }, {
        headers: {
          Authorization: null
        }
      })
  AuthStorage.setJwt(data.jwt)
  AuthStorage.setUser(data.user)
  request.defaults.headers.Authorization = 'Bearer ' + data.jwt
  return data
}

export const postingLike = async (id: number) => {
  const res = await request.post(`/posting-likes`, {
    postingId: id
  });
  return res.data;
}

export const postingCreate = async (params: { title: string; description: string; cover: File }) => {
  const postingFormData = new FormData();
  const data: Record<string, any> = {};

  Object.keys(params).forEach((key: keyof typeof params) => {
    if (key === 'cover') {
      postingFormData.append('files.' + key, params[key], params[key].name);
    } else {
      data[key] = params[key];
    }
  });

  postingFormData.append('data', JSON.stringify(data));
  const res = await request.post(`/postings`, postingFormData);
  return res.data;
};



export const getAllSessions = async () => {
  const res = await request.get(`/strapi-chat/get-all-sessions`);
  return res.data;
}

export const getSession = async (id: string) => {
  const res = await request.get('/strapi-chat/get-session-by-id/' + id)
  return res.data
}

export const sendSessionMessage = async (id: string, message: string) => {
  const res = await request.post('/strapi-chat', {
    sessionId: id,
    input: message
  }, {
  })
  return res.data
}