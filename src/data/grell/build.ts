import * as b from "../../engine/builder.js";

export const entity = (name: string) => b.entity(name).faction("grell");
export const unit = (name: string) => b.unit(name).faction("grell");
export const building = (name: string) => b.building(name).faction("grell");
