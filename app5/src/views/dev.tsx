import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { SubAppPagerIssue } from "../core/app.pager";


function Dev() {

    const navigate = useNavigate();

    const onIssue = () => {

        SubAppPagerIssue('i am from app5');
    }

    const handleClick = () => {

        // naviaget(to)默认就是 history.push
        navigate('/default/about');
    }

    return (
        <div className="Dev">
            <h1>Dev Component</h1>
            <br />
            <Button type="primary" onClick={onIssue}>上报信息</Button>
            <br />
            <a onClick={handleClick}>to about</a>
        </div>
    );
}

export default Dev;