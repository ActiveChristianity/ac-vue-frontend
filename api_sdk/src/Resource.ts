import gql from './gql'

export default class Resource {

  _fetch: FFetch

  constructor(app: IApp) {
    this._fetch = app.$fetch
  }

  /**
    * Update an existing resource
    */
  async update(type: string, id: number, input: {
    meta?: any,
    content?: string
  }) {
    if (type === 'post') {
      const { post } = await this._fetch(gql.mutations.updatePost, { input: { id, ...input } })
      return post
    } else if (type === 'page') {
      const { page } = await this._fetch(gql.mutations.updatePage, { input: { id, ...input } })
      return page
    }
  }

  /**
   * Fetch the latest version of the resource from backend (admin only)
   *
   * @returns Object<status, message>
   */
  async preview(type: string, id: number) {
    if (type === 'post') {
      const { previewPost } = await this._fetch(gql.queries.previewPost, { id })
      return previewPost
    } else if (type === 'page') {
      const { previewPage } = await this._fetch(gql.queries.previewPage, { id })
      return previewPage
    }
  }
}