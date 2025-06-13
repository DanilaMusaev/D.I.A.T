export type CapitalizeLiterals<S extends string> = S extends ''
    ? S
    : S extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${Rest}`
    : S;
