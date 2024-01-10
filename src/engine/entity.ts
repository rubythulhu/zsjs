import type { FactionId, Tag, SplashDamage, BonusDamage } from "./types.js";

export class Stats {
  supply: number = 0;
  hp: number = 0;
  vision: number = 0;
  speed: number = 0;
  shields: number = 0;
  energy: number = 0;
  damageReduction: number = 0;
  damage: number = 0;
  attacks: number = 0;
  range: number = 0;
  reload: number = 0;
  splash: SplashDamage = [0, 0];
  bonus: BonusDamage[] = [];

  get dps() {
    return (this.attacks * this.damage) / this.reload;
  }
}

export interface BuildStats {
  hexite: number;
  flux: number;
  time: number;
  count: number;
}

export class Entity {
  name: string;
  factions: Set<FactionId> = new Set();
  tags: Set<Tag> = new Set();
  build: BuildStats = { hexite: 0, flux: 0, time: 0, count: 0 };
  stats: Stats = new Stats();
  supplyProduced: number = 0;
}
