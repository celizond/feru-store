import './InfoCard.css';

const InfoCard = ({ children }) => {
    return (
        <div className="info-card-container">
            {children}
        </div>
    )
}

export default InfoCard;