class Customize {
  private constructor() {}

  static delete(theme: string, key: string): void {
    localStorage.removeItem(`customize:${theme}:${key}`);
  }

  static set(theme: string, key: string, value: string | number | boolean): void {
    localStorage.setItem(`customize:${theme}:${key}`, value.toString());
  }

  static get<T extends typeof Number | typeof Boolean | typeof String>(theme: string, key: string, returnType: T): ReturnType<T> | null {
    const value = localStorage.getItem(`customize:${theme}:${key}`);
    if (value === null) return null;
    if (returnType === Number) return Number(value) as ReturnType<T>;
    if (returnType === Boolean) return (value === 'true') as ReturnType<T>;
    return value as ReturnType<T>;
  }
}

export default Customize;
