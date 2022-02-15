import { Link } from 'react-router-dom';

const AboutPage: React.FC<{}> = () => {

    return (
        <>
            <h1>about page</h1>
            <Link to='/dev'>to dev</Link>
        </>
    );
};

export default AboutPage;
