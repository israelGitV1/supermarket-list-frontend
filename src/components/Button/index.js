import "./index.css";

export const Button = ({ children, onClick, variante, icon, width }) => {
  return (
    <button
      onClick={onClick}
      className={`button-container ${width} ${
        variante === "outline" ? "outline" : "main"
      }`}
    >
      {icon && (
        <img
          src={`/images/${icon}.svg`}
          className="button-icon"
          alt={`supermarket_icon_${icon}`}
        />
      )}
      {children}
    </button>
  );
};
