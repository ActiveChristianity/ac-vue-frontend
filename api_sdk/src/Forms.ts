import gql from './gql'

export default class Forms {

  _fetch: FFetch

  constructor(app: IApp) {
    this._fetch = app.$fetch
  }

  /**
   * Fetch a post by id
   *
   * @returns Object<status, message>
   */
  async submit(formId: number, fields: Array<Object>) {
    const { submit } = await this._fetch(gql.mutations.submit, { formId, fields })
    return submit
  }

}