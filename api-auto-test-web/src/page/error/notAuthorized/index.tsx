import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";

export default function NotAuthorized(){
    const navigate = useNavigate();

    const toLogin = () => {
        navigate('/login');
    }

    return (
        <div>
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Button type="primary" onClick={toLogin}>Back Login</Button>}
            />
        </div>
    )
}