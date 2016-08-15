interface IAttributes {
  id?: string;
  width?: number;
  height?: number;
  [property: string]: string | number;
}
interface ICleanOptions {
  stripComment?: boolean;
  stripEmptyDefinition?: boolean;
  stripEmptyGroup?: boolean;
  stripTitle?: boolean;
  stripDescription?: boolean;
  stripExtraAttributes?: boolean;
  stripViewBox?: boolean;
  stripStyles?: boolean;
  stripFill?: boolean;
}
interface IOptions {
  transform?: (content: string) => string;
  rootAttributes?: IAttributes;
  inline?: boolean;
  iconAttributes?: IAttributes;
  iconPrefix?: string;
  iconSuffix?: string;
  clean?: ICleanOptions;
}

declare module "svg2sprite" {
  namespace sprite {
    function collection(options?: IOptions): {
      add: (name: string, content: string, iconOptions?: IOptions) => void;
      get: (name: string) => string;
      remove: (name: string) => void;
      clean: () => void;
      compile: () => string;
    };
  }

  export = sprite;
}
