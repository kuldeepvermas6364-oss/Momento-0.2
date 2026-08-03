import Button from "./Button";

type LoadingButtonProps = {
  text: string;
  loading?: boolean;
};

export default function LoadingButton({
  text,
  loading = false
}: LoadingButtonProps) {
  return <Button text={text} disabled={loading} />;
}
