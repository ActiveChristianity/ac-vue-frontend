export default class Resource {
    _fetch: FFetch;
    constructor(app: IApp);
    /**
      * Update an existing resource
      */
    update(type: string, id: number, input: {
        meta?: any;
        content?: string;
    }): Promise<any>;
    /**
     * Fetch the latest version of the resource from backend (admin only)
     *
     * @returns Object<status, message>
     */
    preview(type: string, id: number): Promise<any>;
}
