import "./plant.css";

const Diamond = ({ plantType, background }: { plantType: number, background: string }) => 
  <div style = {{ backgroundColor : background }} >
    <div id = { `plant${plantType}` } className = {
      `w-0 h-0 border-[12.5px] border-solid border-transparent relative top-[-12.5px] \
      after:content-[''] after:absolute after:left-[-12.5px] after:top-[12.5px] after:w-0 after:h-0 \
      after:border-[12.5px] after:border-solid after:border-transparent`
    } />
  </div>

export default function Plant(
  { plantType, hasBomb, pause }: 
  { plantType: number, hasBomb: boolean, pause: boolean }
) {
  if (plantType == 0) return <div className = "w-[25px] h-[25px]" 
    id = { (pause) ? "hover_plant" : "" } 
    style = {{ backgroundColor : (hasBomb) ? "var(--bomb-color)" : "" }}
  />;
  return <Diamond plantType = { plantType } 
    background = { (hasBomb) ? "var(--bomb-color)" : "" }
  />
}