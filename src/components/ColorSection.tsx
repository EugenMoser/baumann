import { ColorProps } from "src/types/Product";

interface ColorSectionProps {
  colors: ColorProps[];
}

function ColorSection({ colors }: ColorSectionProps): React.JSX.Element {
  function getBackgroundColor(colorCode?: string) {
    return colorCode || "transparent";
  }

  return (
    <>
      <h1>Color Infos</h1>
      <ul>
        {colors.map((color, index) => (
          <li key={index}>
            <div
              style={
                {
                  "--bg-color": getBackgroundColor(color.code),
                } as React.CSSProperties
              }
              className="bg-[var(--bg-color)] p-4"
            ></div>
            <p>{color.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ColorSection;
