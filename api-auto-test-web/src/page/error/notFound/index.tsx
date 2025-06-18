import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";

export default function NotFound(){const navigate = useNavigate();

    const toLogin = () => {
        navigate('/login');
    }

    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={toLogin}>Back Login</Button>}
            />
        </div>
    )
}