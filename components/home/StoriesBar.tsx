export default function StoriesBar() {
  const stories = [
    "You",
    "Alex",
    "Emma",
    "John",
    "Sophia"
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        overflowX: "auto",
        padding: "16px 0",
      }}
    >
      {stories.map((story) => (
        <div
          key={story}
          style={{
            minWidth: "70px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "#6366F1",
              margin: "0 auto 8px",
            }}
          />
          <small>{story}</small>
        </div>
      ))}
    </div>
  );
}
