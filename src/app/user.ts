export class User {
    userId: String = null
    hasAccess: Boolean = false
    tokens: Number = 0
    showCookiePolicy: Boolean = false

    constructor(userId, hasAccess, tokens, showCookiePolicy) {
        this.userId = userId;
        this.hasAccess = hasAccess;
        this.tokens = tokens;
        this.showCookiePolicy = showCookiePolicy;
    }
}