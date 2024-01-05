interface CompletedUrls {
  type: string;
  link: string;
}

export interface ConfigEngine {
  id: string;
  name: string;
  key: string;
  keyColor: string;
  typeEngine: string;
  urlToSite: string; // useless
  urls: CompletedUrls[];
  located: string;
  svgName: string;
  logoSize: number[];
}

export interface Region {
  originalValue: string;
  lowerCaseValue: string;
}
