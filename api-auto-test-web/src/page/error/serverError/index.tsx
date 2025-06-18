import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";

export default function ServerError(){
    const navigate = useNavigate();

    const previousPage = () => {
        navigate(-1);
    }

    return (
        <div>
            <Result
                status="500"
                title="500c"
                subTitle="Sorry, something went wrong."
                extra={<Button type="primary" onClick={previousPage}>Back Home</Button>}
            />
        </div>
    )
}