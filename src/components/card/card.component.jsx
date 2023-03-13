import "./card.styles.css";

const Card = (props) => {
  return (
    <div className={`card-container ${props.classes ? props.classes : ""}`}>
      <div
        className={`card-wrapper ${
          props.childClasses ? props.childClasses : ""
        }`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Card;
