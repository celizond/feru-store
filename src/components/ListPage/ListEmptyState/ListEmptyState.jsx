import Button from "../../Button/Button";
import "./ListEmptyState.css";

const ListEmptyState = ({ message, onExplore }) => {
    return (
        <div className="list-empty-state">
            <p>{message}</p>
            <Button text="Explorar productos" onClick={onExplore} />
        </div>
    );
};

export default ListEmptyState;
