import "./starFive.css";

export default function Razor({ hasBomb }: { hasBomb: boolean }) {
  return <div 
    style = {{ backgroundColor : (hasBomb) ? "var(--bomb-color)" : "" }} 
  >
    <div className = "StarFive animate-spin"/>
  </div>;
}