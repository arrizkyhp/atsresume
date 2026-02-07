const Tool = ({ title, tools }) => {
  return (
    tools.length > 0 && (
      <div>
        <p className="sub-content">{tools.join(", ")}</p>
      </div>
    )
  );
};

export default Tool;
