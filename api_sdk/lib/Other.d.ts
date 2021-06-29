export default class Other {
    _fetch: FFetch;
    constructor(app: IApp);
    /**
     * Returns a list of bible chapters that are referenced in posts.
     *
     * @returns Promise with the bible state
     */
    bibleState(): Promise<IBibleState>;
    /**
     * Returns a list of postRefs belonging to a specific bible chapter.
     *
     * @returns Promise with the array or postRef results
     */
    biblePosts(id: string, ch: number): Promise<IBibleState>;
    /**
     * Fetch a random quote (refreshed every 5 minutes)
     *
     * @returns Promise with single quote
     */
    randomQuote(): Promise<IQuote>;
}
