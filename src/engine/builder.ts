import util from "node:util";

import type { FactionId, Tag } from "./types.js";
import { Stats, Entity } from "./entity.js";

export class EntityBuilder {
  entity: Entity = new Entity();

  tag(...tags: Tag[]) {
    for (const tag of tags) this.entity.tags.add(tag);
    return this;
  }

  faction(...factions: FactionId[]) {
    for (const faction of factions) this.entity.factions.add(faction);
    return this;
  }

  build(
    hexite: number,
    flux: number,
    time: number,
    supply: number,
    count: number = 1,
  ) {
    return this.cost(hexite, flux, time).supply(supply).count(count);
  }

  cost(hexite: number, flux?: number, time?: number) {
    this.entity.build.hexite = hexite;
    if (typeof flux !== "undefined") this.entity.build.flux = flux;
    if (typeof time !== "undefined") this.entity.build.time = time;
    return this;
  }

  time(time: number) {
    this.entity.build.time = time;
    return this;
  }

  count(count: number) {
    this.entity.build.count = count;
    return this;
  }

  supply(supply: number) {
    this.entity.stats.supply = supply;
    return this;
  }

  vision(vision: number) {
    this.entity.stats.vision = vision;
    return this;
  }

  speed(speed: number) {
    this.entity.stats.speed = speed;
    return this;
  }

  defense(
    hp: number,
    energy: number,
    shields: number,
    damageReduction: number,
  ) {
    return this.hp(hp)
      .energy(energy)
      .shields(shields)
      .damageReduction(damageReduction);
  }

  hp(hp: number) {
    this.entity.stats.hp = hp;
    return this;
  }

  shields(amount: number) {
    this.entity.stats.shields = amount;
    return this;
  }

  energy(amount: number) {
    this.entity.stats.energy = amount;
    return this;
  }

  damageReduction(amount: number) {
    this.entity.stats.damageReduction = amount;
    return this;
  }

  damage(dmg: number, attacks: number = 1) {
    this.tag("attacker");
    this.entity.stats.damage = dmg;
    this.entity.stats.attacks = attacks;
    return this;
  }

  reload(amount: number) {
    this.entity.stats.reload = amount;
    return this;
  }

  range(amount: number) {
    this.entity.stats.range = amount;
    return this;
  }

  splash(amount: number, radius: number) {
    this.entity.stats.splash = [amount, radius];
    return this;
  }

  bonus(amount: number, ...vs: Tag[]) {
    this.entity.stats.bonus.push([amount, vs]);
    return this;
  }

  providesSupply(amount: number = 15) {
    this.entity.supplyProduced = amount;
    return this;
  }

  clearArmor() {
    for (const x of ["armor:light", "armor:medium", "armor:heavy"] as Tag[])
      this.entity.tags.delete(x);

    return this;
  }

  heavy() {
    this.clearArmor();
    this.entity.tags.add("armor:heavy");
    return this;
  }

  medium() {
    this.clearArmor();
    this.entity.tags.add("armor:medium");
    return this;
  }

  light() {
    this.clearArmor();
    this.entity.tags.add("armor:light");
    return this;
  }

  shootsUp() {
    this.entity.tags.add("shoots:up");
    return this;
  }

  shootsDown() {
    this.entity.tags.add("shoots:down");
    return this;
  }

  shootsAll() {
    return this.shootsUp().shootsDown();
  }

  unit() {
    return this.tag("unit").vision(1800);
  }

  worker() {
    return this.unit().tag("worker").t0();
  }

  harvester() {
    return this.unit().tag("harvester").t0();
  }

  ground() {
    return this.unit().tag("domain:ground");
  }

  air() {
    return this.unit().tag("domain:air");
  }

  building() {
    return this.tag("building").vision(1500);
  }

  hq() {
    return this.tag("base", "base:hq").hp(7500);
  }

  t0() {
    return this.tag("tier:0");
  }

  t1() {
    return this.tag("tier:1");
  }

  t1_5() {
    return this.tag("tier:1.5");
  }

  t2() {
    return this.tag("tier:2");
  }

  t2_5() {
    return this.tag("tier:2.5");
  }

  t3() {
    return this.tag("tier:3");
  }

  t3_5() {
    return this.tag("tier:3.5");
  }

  staticDefense(damage?: number, count: number = 1, reload?: number) {
    this.building().tag("attacker");
    if (typeof damage !== "undefined") this.damage(damage, count);
    if (typeof reload !== "undefined") this.reload(reload);
    return this;
  }

  check() {
    let e = this.entity,
      t = e.tags,
      ta = [...t],
      s = e.stats;
    if (!t.has("unit") && !t.has("building"))
      throw new EntityError(e, "must be unit or building");

    if (s.hp === 0) throw new EntityError(e, "all entities must have hp");

    if (t.has("unit")) {
      if (!ta.find((x) => x.startsWith("tier:")))
        throw new EntityError(e, "units must have tier");

      if (!ta.find((x) => x.startsWith("domain:")))
        throw new EntityError(e, "units must be air or ground");
    }

    if (
      (t.has("attacker") || s.damage > 0) &&
      !ta.find((x) => x.startsWith("shoots:"))
    )
      throw new EntityError(e, "attacker must have targeting configuration");

    if (!t.has("attacker") && s.damage > 0)
      throw new EntityError(e, "non-attacker must not have damage");
  }
}

class EntityError extends Error {
  constructor(entity: Entity, msg: string) {
    let deets = util.inspect(entity, { depth: null, colors: true });
    let txt = `${entity.name}: ${msg}.\nDETAILS: ${deets}`;
    super(txt);
  }
}

export function entity(name: string) {
  const builder = new EntityBuilder();
  builder.entity.name = name;
  return builder;
}

export const unit = (name: string) => entity(name).unit();
export const building = (name: string) => entity(name).building();
