interface LoadingProductsByCategoryProps {}

function LoadingProductsByCategory({}: LoadingProductsByCategoryProps): React.JSX.Element {
  return (
    <li className="loading-item">
      <div
        className="image-placeholder"
        style={{
          width: 48,
          height: 48,
          backgroundColor: "#e0e0e0",
          borderRadius: "50%",
        }}
      />
      <h2
        className="text-placeholder"
        style={{ backgroundColor: "#e0e0e0", width: "150px", height: "20px" }}
      />
      <p
        className="text-placeholder"
        style={{ backgroundColor: "#e0e0e0", width: "200px", height: "16px" }}
      />
    </li>
  );
}

export default LoadingProductsByCategory;
