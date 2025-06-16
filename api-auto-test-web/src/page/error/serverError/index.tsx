import {Button, Result} from "antd";

export default function ServerError(){
    return (
        <div>
            <Result
                status="500"
                title="500c"
                subTitle="Sorry, something went wrong."
                extra={<Button type="primary">Back Home</Button>}
            />
        </div>
    )
}