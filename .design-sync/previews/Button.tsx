import { Button } from "system-weavers";

export function Accent() {
  return <Button variant="accent">Contact Us</Button>;
}

export function Brand() {
  return <Button variant="brand">Start a conversation</Button>;
}

export function Outline() {
  return <Button variant="outline">Explore our capabilities</Button>;
}

export function Disabled() {
  return (
    <Button variant="accent" disabled>
      Sending…
    </Button>
  );
}
