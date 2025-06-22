import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";

export default function NotAuthorized(){
    const navigate = useNavigate();

    const previousPage = () => {
        navigate(-1);
    }

    const toLogin = () => {
        navigate('/login');
    }

    return (
        <div>
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
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