# Aither web frontend

> The main website for Aither services, acting as a hub for account management, product promotion & purchases, as well as service management.

For the documentation frontend, open [this repository](https://github.com/Aither-NO/aither-docs).

## Running dev server

### Prerequisites

Ensure you have [node](https://nodejs.org/en) and [pnpm](https://pnpm.io/) installed and up to date.

### Environment variables

...

### Install dependencies

Make sure you do this whenever you pull new changes.

```shell
pnpm install
```

### Start dev server

After ensuring you have all the dependencies installed, run this command to start the server:

```
pnpm dev
```

You can go to [`localhost:3000`](http://localhost:3000) to see the website. Any changes made to the code will hot-refresh the website.

## Stack

- **NextJS** as a React framework (app router)
- **Radix** as a design system and component library
- **Typescript**
- **Gsap** for animations
- **react-hook-form** & **zod** for forms and validation
- **Nominatim** for geocoding (for now)
- **Leaflet** for maps (for now)
- **Recharts** for charts

## Styling

By utilizing the layout components for Radix, you should be able to get by with minimal extra styling. When needed you should use either inline-styles for small snippets - or CSS modules for bigger things.

```tsx
import {
  Container,
  Card,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";

function Example() {
  return (
    <Container>
      <Card>
        <Flex direction="row" gap="3">
          <Heading size="3">Hello</Heading>
          <Text size="2" color="gray">
            What's up
          </Text>
        </Flex>
      </Card>
    </Container>
  );
}
```

### Overrides

When overriding the styles of radix components, you might want to actually set the CSS variables (you determine this by inspecting the element in the browser and seeing how the styles you want to overwrite are applied).

An annoying thing when specifying CSS variables on `React.CSSProperties` is that the types lie and give you an error. You can bypass this by using the `style` utility:

```tsx
<Card
  style={style({
    "--card-background-color": "var(--indigo-a1)",
  })}
>
  ...
</Card>
```

The utility doesn't actually do anything on runtime except return the object passed in, but it will give you a better type experience while developing, bypassing the need to do `{...} as React.CSSProperties` when applying the style.
