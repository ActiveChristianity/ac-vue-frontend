const types = {
  image: `{ src srcset dataUri sizes size { width height } colors }`,
  user: `id name`,
  author: `{ id name slug pivot {as } }`,
  topic: `{ id name slug group_id }`,
  topicGroup: `{ id name slug icon }`,
  post: '',
  page: '',
  fullPost: '',
  fullTopic: '',
  locale: `locale { nb sv da en fr de nl }`
}

types.post = `id title sub slug published excerpt image ${types.image} topics ${types.topic} authors ${types.author}`
types.fullPost = `${types.post} readtime content topics ${types.topic}`// prev { ${types.post} } next { ${types.post} }`
types.fullTopic = `{ id name slug excerpt group ${types.topicGroup} }`
types.page = `id title slug is_active content`

/**
 * AUTH SCOPE
 */
const auth = {
  queries: {
    profile: `
query Profile {
  me {
    ${types.user}
    email
    role
    created_at
  }
}`
  },
  mutations: {
    login: `
mutation ($username: String!, $password: String!, $remember: Boolean) {
  login: signIn( input: {
    username: $username
    password: $password
    remember: $remember
  } ) {
    success
    user {
      ${types.user}
    }
  }
}`,
    register: `
mutation ($name: String!, $email: String!, $password: String!, $remember: Boolean) {
  register: signUp( input: {
    name: $name
    email: $email
    password: $password
    remember: $remember
  } ) {
    success
    user {
      ${types.user}
    }
  }
}`,
    logout: `
mutation Logout {
  logout: signOut {
    status
    message
  }
}`,
    resetPassword: `
mutation ($email: String!) {
  forgotPassword(input: { email: $email }) {
    status
    message
  }
}`
  }
}

/**
 * BLOG SCOPE
 */
const blog = {
  queries: {
    posts: `
query ($ids: [ID!], $limit: Int, $page: Int) {
  posts(ids: $ids, first: $limit, page: $page) {
    pager: paginatorInfo {
      pages: lastPage
      total
    }
    data {
      ${types.post}
    }
  }
}`,
    post: `
query ($id: ID, $slug: String) {
  post(id: $id, slug: $slug) {
    ${types.fullPost}
  }
}`,
    popularPosts: `
query ($count: Int!) {
  popularPosts(count: $count) {
    id
    slug
    v
  }
}`,
    popularTopics: `
query ($count: Int!) {
  popularTopics(count: $count) {
    id
    slug
  }
}`,
    recommendedByPost: `
query ($postId: ID!, $count: Int!) {
  recommendedByPost(postId: $postId, count: $count) {
    id
    slug
    v
  }
}`,
    recommended: `
query ($count: Int!) {
  recommended( count: $count) {
    id
    slug
    v
  }
}`,
    history: `
query ($limit: Int!) {
  history(limit: $limit) {
    id
    slug
    ts
  }
}`,
  unfinishedPosts: `
query {
  unfinishedPosts {
    id
    slug
    ts
  }
}`,
  following: `
query {
  following {
    topics {
      id
      slug
      ts
    }
  }
}`,
  liked: `
query {
  liked {
    id
    slug
    ts
  }
}`,
  previewPost: `
query ($id: ID!) {
  previewPost(id: $id) {
  ${types.fullPost}
  status
  }
}`,
  },
  mutations: {
    updatePost: `
  mutation ($input: UpdatePostInput!) {
  post(input: $input) {
    ${types.fullPost}
    status
  }
}`,
    visitsPost: `
mutation ($postId: ID!) {
  visitsPost(postId: $postId) {
    success
    postViews
    userPostViews
  }
}`,
    readingPost: `
mutation ($postId: ID!) {
  readingPost(postId: $postId) {
    success
    timeRead
  }
}`,
    followTopic: `
mutation ($topicId: ID!, $toggle: Boolean!) {
  followTopic(topicId: $topicId, toggle: $toggle) {
    success
  }
}`,
  followTag: `
mutation ($tagId: ID!, $toggle: Boolean!) {
  followTag(tagId: $tagId, toggle: $toggle) {
    success
  }
}`,
  likePost: `
mutation ($postId: ID!, $toggle: Boolean!) {
  likePost(postId: $postId, toggle: $toggle) {
    success
  }
}`
  }
}


const other = {
  queries: {
    bible: `
query {
  bible {
    old {
      id
      no
      name
      total
      chapters
    }
    new {
      id
      no
      name
      total
      chapters
    }
  }
}`,
    biblePosts: `
query ($id: ID!, $ch: Int!) {
  biblePosts(id: $id, ch: $ch) {
    id
    slug
    ts
  }
}
`
  }
}


const cms = {
  queries: {
    page: `
query ($id: ID, $slug: String) {
  page(id: $id, slug: $slug) {
    ${types.page}
  }
}`,
    previewPage: `
query ($id: ID!) {
  previewPage(id: $id) {
    ${types.page}
  }
}`,

  },
  mutations: {
    updatePage: `
mutation ($input: UpdatePageInput!) {
  page(input: $input) {
    ${types.page}
  }
}
`
  }
}

const forms = {
  mutations: {
    submit: `
mutation ($formId: Int!, $fields: [Field!]!) {
  submit(formId: $formId, fields: $fields) {
    success
    msg
    errors
  }
}
`
  }
}

const gql: Igql = {
  types,
  queries: {
    ...auth.queries,
    ...blog.queries,
    ...cms.queries,
    ...other.queries,
  },
  mutations: {
    ...auth.mutations,
    ...blog.mutations,
    ...cms.mutations,
    ...forms.mutations
  }
}

export default gql