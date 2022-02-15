import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { SubAppPagerIssue } from '@/core/app.pager';

const HomePage: React.FC<{}> = () => {

    const onIssueMsg = async () => {

        SubAppPagerIssue("i am from app4");
    };
    
    return (
        <>
            <h1>home page</h1>
            <Link to='dev'>to dev</Link>
            <br />
            <Button type="primary" onClick={onIssueMsg}>上报消息</Button>
        </>
    );
};

export default HomePage;
