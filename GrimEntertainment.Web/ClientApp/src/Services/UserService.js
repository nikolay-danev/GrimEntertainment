export function IsAuthenticated() {
    if (sessionStorage.getItem('authToken')) {
        return true;
    }
    return false;
}