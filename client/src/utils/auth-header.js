export default function (){
    return {"x-access-token":localStorage.getItem("token")||""};
}