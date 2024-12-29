

export interface PlaceResponse {
  type:        string;
  features:    Feature[];
  query:       string[];
  attribution: string;
}

export interface Feature {
  type:                 string;
  properties:           Properties;
  geometry:             Geometry;
  bbox:                 number[];
  center:               number[];
  place_name:           string;
  place_type:           string[];
  relevance:            number;
  id:                   string;
  text:                 string;
  context:              Context[];
  matching_text?:       string;
  matching_place_name?: string;
}

export interface Context {
  ref:          string;
  country_code: CountryCode;
  id:           string;
  text:         string;
  wikidata?:    string;
  kind?:        Kind;
  categories?:  string[];
  "osm:tags"?:  OsmTags;
}

export enum CountryCode {
  Ar = "ar",
  Empty = "",
  Es = "es",
  EsPtAdGiFr = "es,pt,ad,gi,fr",
  Ph = "ph",
}

export enum Kind {
  AdminArea = "admin_area",
}

export interface OsmTags {
  landuse?:           string;
  population?:        string;
  wikipedia?:         string;
  sqkm?:              string;
  place?:             string;
  type?:              string;
  natural?:           string;
  sinkhole?:          string;
  boundary?:          string;
  "is_in:state"?:     string;
  residential?:       string;
  previously?:        string;
  smoking?:           string;
  "population:date"?: Date;
  "is_in:city"?:      string;
  protect_class?:     string;
  "operator:type"?:   string;
  protection_title?:  string;
  related_law?:       string;
  protected_area?:    string;
  operator?:          string;
  start_date?:        string;
}

export interface Geometry {
  type:        string;
  coordinates: number[];
}

export interface Properties {
  ref:              string;
  country_code:     CountryCode;
  wikidata?:        string;
  kind:             string;
  "osm:place_type": string;
}
