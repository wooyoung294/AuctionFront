
export function IsSessionExist(){
    const session = sessionStorage.getItem('profile');
    if(session === 'undefined' || session ===null){
        sessionStorage.clear();
        window.location.href='/';
    }
}