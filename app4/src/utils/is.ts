const toString = Object.prototype.toString;

export function is(val, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export const isDef = <T>(val?: T): val is T => {
  return typeof val !== 'undefined';
};

export const isUnDef = <T>(val?: T): val is T => {
  return !isDef(val);
};

export const isObject = (val): val is Record<any, any> => {
  return val !== null && is(val, 'Object');
};

export function isDate(val): val is Date {
  return is(val, 'Date');
}

export function isNull(val): val is null {
  return val === null;
}

export function isNumber(val): val is number {
  return is(val, 'Number');
}

export function isPromise<T>(val): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function isString(val): val is string {
  return is(val, 'String');
}

export const isFunction = (val): val is (typeof Function) => typeof val === 'function';

export function isBoolean(val): val is boolean {
  return is(val, 'Boolean');
}

export function isRegExp(val): val is RegExp {
  return is(val, 'RegExp');
}

export function isArray(val): val is Array<any> {
  return val && Array.isArray(val);
}

export const isClient = () => {
  return typeof window !== 'undefined';
};

export const isWindow = (val): val is Window => {
  return typeof window !== 'undefined' && is(val, 'Window');
};

export const isElement = (val): val is Element => {
  return isObject(val) && !!val.tagName;
};

export const isServer = typeof window === 'undefined';

export function isImageDom(o: Element) {
  return o && ['IMAGE', 'IMG'].includes(o.tagName);
}

export const isTextarea = (element: Element | null): element is HTMLTextAreaElement => {
  return element !== null && element.tagName.toLowerCase() === 'textarea';
};
