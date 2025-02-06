const TestComp1 = ({ props }) => {
  return (
    <>
      <div
        style={{
          width: props.width,
          height: props.height,
          backgroundColor: props.bgColor,
        }}
      >
        <h4>{props.desc}</h4>
      </div>
    </>
  );
};

export default TestComp1;
