import Emitter from './Emitter';
interface BlogEvents {
}
export default class Blog extends Emitter {
    _fetch: FFetch;
    constructor(app: IApp);
    on<K extends keyof BlogEvents, T extends BlogEvents[K]>(event: K, cb: T): void;
    /**
     * Fetch a post by id
     *
     * @returns Object<status, message>
     */
    post(id: number, slug: string): Promise<any>;
    /**
     * Fetch a list of pages paginated
     *
     * @returns Object<status, message>
     */
    posts(limit: number, page: number, ids?: [number]): Promise<any>;
    /**
     * Returns popular posts
     *
     * @param count
     */
    popularPosts(count?: number): Promise<any>;
    /**
     * Returns popular topics
     *
     * @param count
     */
    popularTopics(count?: number): Promise<any>;
    /**
     * Returns recommended posts for the given post id
     *
     * @param postId
     * @param count
     */
    recommendedByPost(postId: number, count?: number): Promise<any>;
    /**
     * Returns recommended posts for the current user, mostly based on read history
     *
     * @param count
     */
    recommended(count?: number): Promise<any>;
    /**
     * Track that a user has opened a post
     *
     * @returns Object<status, message>
     */
    visitsPost(postId: number): Promise<any>;
    /**
     * Track how much time the user has read the current post
     *
     * @returns Object<status, message>
     */
    readingPost(postId: number): Promise<any>;
    /**
     * Get a list of PostRefs for posts the user has read
     *
     * @returns Object<status, message>
     */
    history(limit: number): Promise<[ResourceRef]>;
    /**
     * Get a list of PostRefs for posts the user started reading, but haven't finished
     *
     * @returns Object<status, message>
     */
    unfinishedPosts(): Promise<[ResourceRef]>;
    /**
     * Follow a topic
     *
     * @returns Object<status, message>
     */
    followTopic(topicId: number, toggle: boolean): Promise<any>;
    /**
     * Follow a tag
     *
     * @returns Object<status, message>
     */
    followTag(tagId: number, toggle: boolean): Promise<any>;
    /**
     * Get resources that the user chose to follow
     *
     * @returns Object<status, message>
     */
    following(): Promise<{
        topics: [ResourceRef];
    }>;
    /**
     * Toggle likeing a post
     *
     * @returns Object<status, message>
     */
    likePost(postId: number, toggle: boolean): Promise<any>;
    /**
     * Get posts that the user has liked
     *
     * @returns Object<status, message>
     */
    liked(): Promise<[ResourceRef]>;
}
export {};
