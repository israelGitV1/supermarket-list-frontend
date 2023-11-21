import "./index.css";

export const ListCard = (props) => {
  return (
    <div className="list-card-container">
      <samp>{props.item.name} </samp>
    </div>
  );
};
