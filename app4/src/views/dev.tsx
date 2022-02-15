import { useNavigate } from "react-router-dom";


function Dev() {

    const navigate = useNavigate();

    const handleClick = () => {

        // naviaget(to)默认就是 history.push
        navigate('/default/about');
    }

    return (
        <div className="Dev">
            <h1>Dev Component</h1>
            <a onClick={handleClick}>to about</a>
        </div>
    );
}

export default Dev;