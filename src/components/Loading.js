import "./../styles/components/loading.scss";

function Loading() {
  return (
    <div className="loading">
      <div className="logo">
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" />
        <span className="mx-auto text-center block text-gray-50	">Nuun</span>
      </div>
    </div>
  );
}

export default Loading;
