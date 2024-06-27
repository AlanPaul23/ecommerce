const getHeader = ()=>{
   return{
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${sessionStorage.getItem('authToken')}`
    }
}

export { getHeader }