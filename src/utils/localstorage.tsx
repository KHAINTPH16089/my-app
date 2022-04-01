export const isAuthenticate = () => {
    let users;
    if(!localStorage.getItem('user')) return;
    return users = JSON.parse(localStorage.getItem('user') || "");
} 