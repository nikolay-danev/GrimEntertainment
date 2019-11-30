export function Logout() {
    if (sessionStorage.getItem('authToken')) {
        sessionStorage.removeItem('authToken');
    }

    window.location.href = '/';
}