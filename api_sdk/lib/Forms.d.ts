export default class Forms {
    _fetch: FFetch;
    constructor(app: IApp);
    /**
     * Fetch a post by id
     *
     * @returns Object<status, message>
     */
    submit(formId: number, fields: Array<Object>): Promise<any>;
}
