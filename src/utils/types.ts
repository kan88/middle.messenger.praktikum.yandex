// generic types

export type TypeDict<T> = {
  [key: string | number]: T
}

// undefined types
export type typeUndefined = TypeDict<unknown>;

// defined types
export type typeDefined = {
  'setting'?: TypeDict<boolean | string>;
  'attr'?: TypeDict<string>;
  'events'?: TypeDict<EventListenerOrEventListenerObject>;
};

// mixed types
export type typeMixed = typeDefined & typeUndefined;
