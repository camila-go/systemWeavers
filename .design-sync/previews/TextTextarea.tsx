import { TextTextarea } from "system-weavers";

export function Default() {
  return (
    <TextTextarea
      id="message"
      label="How can we help? (required)"
      placeholder="Tell us a bit about your project or policy goal…"
      rows={4}
    />
  );
}

export function ErrorState() {
  return (
    <TextTextarea
      id="message-error"
      label="How can we help? (required)"
      rows={4}
      error="Tell us a bit more about your project."
    />
  );
}
