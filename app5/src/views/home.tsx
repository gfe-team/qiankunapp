import { Link } from 'react-router-dom';

const HomePage: React.FC<{}> = () => {

    return (
        <>
            <h1>home page</h1>
            <Link to='dev'>to dev</Link>
        </>
    );
};

export default HomePage;
