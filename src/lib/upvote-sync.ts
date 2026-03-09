export const syncUpvoteLogin = (user: any) => {
    window.dispatchEvent(new CustomEvent('upvote:login', { detail: user }));
};
export const syncUpvoteLogout = () => {
    window.dispatchEvent(new CustomEvent('upvote:logout'));
};
