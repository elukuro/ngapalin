import "./../styles/components/card.scss";


function Card(props) {
  const active = props.content === props.active;
  return (
    <div className={`card container mx-auto rounded-sm ${(active) ? 'active' : ''}`} onClick={props.onClick}>
      <p className="font-thin ml-3 dark:text-gray-200">{props.content} {active} </p>
    </div>
  );
}

export default Card;
