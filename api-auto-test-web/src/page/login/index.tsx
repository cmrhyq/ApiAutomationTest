import login from "../../api/login.ts";

export default function Login() {
    const test = async () => {
        login("admin", "123456", "1234", "uuid-1234").then((response) => {
            console.log(response);
        })
    }

    return (
        <div>
            <h1>Login</h1>
            <button onClick={test}>Test Login</button>
        </div>
    )
}