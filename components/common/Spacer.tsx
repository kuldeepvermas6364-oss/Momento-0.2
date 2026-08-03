type SpacerProps = {
  height?: number;
};

export default function Spacer({
  height = 16,
}: SpacerProps) {
  return <div style={{ height }} />;
}
