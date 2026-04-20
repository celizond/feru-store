import "./ListCount.css";

const ListCount = ({ count, singularSuffix, pluralSuffix, className }) => {
    return (
        <p className={`list-count ${className || ""}`.trim()}>
            {count} producto{count !== 1 ? "s" : ""} {count !== 1 ? pluralSuffix : singularSuffix}
        </p>
    );
};

export default ListCount;
