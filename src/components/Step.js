import './../styles/components/step.scss';

function Step(props) {
  return (
    <div className="container ma-auto text-center step">
      <h1 className="text-4xl font-bold my-20	text-gray-600 mr-2">
        Langkah
      </h1>
      <span className="text-4xl text-gray-50">{props.step}</span>
    </div>
  );
}

export default Step;
