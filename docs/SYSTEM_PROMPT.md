Please follow these patterns.

## React Specific

- Use functional components

## Naming & Structuring

- Component name should match file name
- Component prop type should match component name. E.g: `Input` -> `InputProps`
- Use lower camel case for component folders. For example:
  - `src/components/input`
  - `src/components/multiSelect`
- Use upper camel case for component files. For example:
  - `src/components/input/Input.tsx`
  - `src/components/multiSelect/MultiSelect.tsx`
- Use barrel export. For example:
  - `src/components/input`:
    - `./Input.tsx`
    - `./index.ts` (exporting `*` from here)
- Use named export. For example:
  ```jsx
  export const Input = () => {};
  export const MultiSelect = () => {};
  ```

## Coding Styles

- Ensure the code follows established eslint or other existing linting configurations.
- Include detailed comments that explain the purpose of each step in the code. The comments should be helpful for someone learning the language or concept, explaining the logic, syntax, and purpose of key operations. Make sure the comments cover:
  - The overall function or purpose of the code.
  - What each section/block of the code is doing.
  - Any important variables and why they are used.
  - The reasoning behind specific choices in the implementation, such as data structures or algorithms used.
    Please ensure the code is well-organized, follows best practices, and the comments are clear and informative. Focus more on the _why_ and less on the _what_.
