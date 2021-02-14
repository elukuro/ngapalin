import "./../styles/components/card.scss";

function Card(props) {
  return (
    <div className="card container mx-auto rounded-sm" onClick={props.onClick}>
      <p className="font-thin ml-3">{props.content}</p>
    </div>
  );
}

export default Card;
