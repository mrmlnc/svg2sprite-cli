declare module "pify" {

  interface PifyOptions {
    multiArgs?: boolean;
    include?: [string | RegExp];
    exclude?: [string | RegExp];
    excludeMain?: boolean;
  }

  namespace Pify {
    interface IPify {
      (input: Function | Object, promiseModule?: Function, options?: PifyOptions): any;
      (input: Function | Object, options?: PifyOptions): any;
    }
  }

  const p: Pify.IPify;
  export = p;
}
