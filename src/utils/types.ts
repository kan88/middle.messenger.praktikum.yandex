export type typeDict<T> = {
  [key: string | number]: T
}

export type typeDictUnknown = typeDict<unknown>;

export type typeDefinedProps = {
  "setting"?: typeDict<boolean | string>;
  "attr"?: typeDict<string>;
  "events"?: typeDict<EventListenerOrEventListenerObject>;
};

export type typeMixedUnknownProps = typeDefinedProps & typeDictUnknown;
