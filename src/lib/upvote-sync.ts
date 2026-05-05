export const syncUpvoteLogin = (user: any) => {
    window.dispatchEvent(new CustomEvent('monkfeed:login', { detail: user }));
};
export const syncUpvoteLogout = () => {
    window.dispatchEvent(new CustomEvent('monkfeed:logout'));
};
