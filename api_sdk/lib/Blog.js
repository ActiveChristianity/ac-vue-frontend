var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import gql from './gql';
import Emitter from './Emitter';
export default class Blog extends Emitter {
    constructor(app) {
        super();
        this._fetch = app.$fetch;
    }
    on(event, cb) {
        super.on(event, cb);
    }
    /**
     * Fetch a post by id
     *
     * @returns Object<status, message>
     */
    post(id, slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const { post } = yield this._fetch(gql.queries.post, { id, slug });
            return post;
        });
    }
    /**
     * Fetch a list of pages paginated
     *
     * @returns Object<status, message>
     */
    posts(limit, page, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const { posts } = yield this._fetch(gql.queries.posts, { limit, page, ids });
            return posts;
        });
    }
    /**
     * Returns popular posts
     *
     * @param count
     */
    popularPosts(count = 24) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._fetch(gql.queries.popularPosts, { count });
        });
    }
    /**
     * Returns popular topics
     *
     * @param count
     */
    popularTopics(count = 8) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._fetch(gql.queries.popularTopics, { count });
        });
    }
    /**
     * Returns recommended posts for the given post id
     *
     * @param postId
     * @param count
     */
    recommendedByPost(postId, count = 5) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._fetch(gql.queries.recommendedByPost, { postId, count });
        });
    }
    /**
     * Returns recommended posts for the current user, mostly based on read history
     *
     * @param count
     */
    recommended(count = 5) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._fetch(gql.queries.recommended, { count });
        });
    }
    /**
     * Track that a user has opened a post
     *
     * @returns Object<status, message>
     */
    visitsPost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._fetch(gql.mutations.visitsPost, { postId });
        });
    }
    /**
     * Track how much time the user has read the current post
     *
     * @returns Object<status, message>
     */
    readingPost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._fetch(gql.mutations.readingPost, { postId });
        });
    }
    /**
     * Get a list of PostRefs for posts the user has read
     *
     * @returns Object<status, message>
     */
    history(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._fetch(gql.queries.history, { limit });
        });
    }
    /**
     * Get a list of PostRefs for posts the user started reading, but haven't finished
     *
     * @returns Object<status, message>
     */
    unfinishedPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._fetch(gql.queries.unfinishedPosts);
        });
    }
    /**
     * Follow a topic
     *
     * @returns Object<status, message>
     */
    followTopic(topicId, toggle) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._fetch(gql.mutations.followTopic, { topicId, toggle });
        });
    }
    /**
     * Follow a tag
     *
     * @returns Object<status, message>
     */
    followTag(tagId, toggle) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._fetch(gql.mutations.followTag, { tagId, toggle });
        });
    }
    /**
     * Get resources that the user chose to follow
     *
     * @returns Object<status, message>
     */
    following() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._fetch(gql.queries.following);
        });
    }
    /**
     * Toggle likeing a post
     *
     * @returns Object<status, message>
     */
    likePost(postId, toggle) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._fetch(gql.mutations.likePost, { postId, toggle });
        });
    }
    /**
     * Get posts that the user has liked
     *
     * @returns Object<status, message>
     */
    liked() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._fetch(gql.queries.liked);
        });
    }
}
