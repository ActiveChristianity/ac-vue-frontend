type Alphanumeric<T> = {
  [P in keyof T]: T[P]
};

interface ISDK {
  auth: any
  blog: any
  fetch: FFetch
  forms: any
  other: any
  resource: any
  setLocale: any
}

interface Igql {
  types: {
    image: string
    user: string
  }
  queries: {
    // Auth
    profile: string
    // Blog
    post: string
    posts: string
    popularPosts: string
    popularTopics: string
    recommendedByPost: string
    recommended: string
    history: string
    unfinishedPosts: string
    following: string
    liked: string
    previewPost: string
    // CMS
    page: string
    previewPage: string
    // Other
    bible: string
    biblePosts: string
    randomQuote: string
  }
  mutations: {
    // Auth
    login: string
    register: string
    logout: string
    resetPassword: string
    // Blog
    updatePost: string
    visitsPost: string
    readingPost: string
    followTopic: string
    followTag: string
    likePost: string
    // CMS
    updatePage: string
    // Forms
    submit: string
  }
}

interface IgqlResponse {
  errors: [IgqlError]
  data: any
}

interface IgqlError {
  message: [string] | string
  extensions?: {
    validation: any
  }
}

interface IApp {
  $config: IConfig
  $fetch: FFetch,
  gql: Igql
}

interface IOptions {
  gql_api_url: string
  debug?: boolean
}

interface IConfig extends IOptions {
  authenticated: boolean
  headers: any
  auth_header?: {
    Authorization: string
  }
}

interface FFetch {
  (query: string, variables?: any): Promise<any>
}

interface IUser {
  id: string
  name: string
  email: string
}

interface ResourceRef {
  id: number
  slug: string
  type: string
  ts: string
}

interface IBibleState {
  new: IBible
  old: IBible
}

interface IBible {
  no: number
  name: string
  total: number
  chapters: [number]
}

interface IQuote {
  id: number
  post: any
  author: any
  topics: [any]
  images: [any]
}
