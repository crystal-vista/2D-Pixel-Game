export { MachineHead, MachineBody };

function MachineHead({ direction }: { direction: number }) {
  return <div 
    className = {"w-0 h-0 border-x-[12.5px] border-x-transparent border-b-[25px] \
      border-b-[--machine-color]"}
    style = {{ "transform": "rotate(" + [0, 90, 180, 270][direction] + "deg)"}}
  />;
}

function MachineBody() {
  return (<div className = {"w-[25px] h-[25px] bg-[--machine-color]"} />);
}