import { TextInput } from "system-weavers";

export function Default() {
  return (
    <TextInput
      id="fullName"
      label="Full name (required)"
      placeholder="Jane Rivera"
      autoComplete="name"
    />
  );
}

export function WithValue() {
  return (
    <TextInput
      id="email"
      label="Email address (required)"
      type="email"
      defaultValue="jane@organization.org"
      autoComplete="email"
    />
  );
}

export function ErrorState() {
  return (
    <TextInput
      id="email-error"
      label="Email address (required)"
      type="email"
      defaultValue="not-an-email"
      error="Enter a valid email address."
    />
  );
}

export function Disabled() {
  return (
    <TextInput id="fullName-disabled" label="Full name (required)" defaultValue="Jane Rivera" disabled />
  );
}
