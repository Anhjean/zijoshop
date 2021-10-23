export interface PrestaQuery {
  resource?: string;
  display?: string;
  filter?: FilterQuery[];
  sort?: string;
  offset?:string;
  limit?: string;
  search?: string;
  language?:string;
}

export interface FilterQuery {field:string, condition:string}
