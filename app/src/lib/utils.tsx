import axios from "axios";

export async function getData(url:string) { return (await axios.get(`${url}`)).data;}

export function Spinner () { return (<p>Carregando...</p>); }