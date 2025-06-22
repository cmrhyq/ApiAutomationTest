import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";

export default function NotFound(){const navigate = useNavigate();

    const previousPage = () => {
        navigate(-1);
    }

    const toLogin = () => {
        navigate('/login');
    }

    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <div>
                        <Button type="dashed" onClick={toLogin} style={{marginRight: "10px"}}>Back Login</Button>
                        <Button type="primary" onClick={previousPage}>Previous page</Button>
                    </div>
                }
            />
        </div>
    )
}