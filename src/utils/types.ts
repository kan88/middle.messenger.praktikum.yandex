// generic types

export type typeDict<T> = {
  [key: string | number]: T
}

// undefined types
export type typeUndefined = typeDict<unknown>;


// defined types
export type typeDefined = {
  "setting"?: typeDict<boolean | string>;
  "attr"?: typeDict<string>;
  "events"?: typeDict<EventListenerOrEventListenerObject>;
};

// mixed types
export type typeMixed = typeDefined & typeUndefined;
