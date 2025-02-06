const TestComp2 = ({ props }) => {
  return (
    <>
      <div
        style={{
          width: props.width,
          height: props.height,
          backgroundColor: props.bgColor,
        }}
      >
        <h4>This is TestComp2</h4>
      </div>
    </>
  );
};

export default TestComp2;
