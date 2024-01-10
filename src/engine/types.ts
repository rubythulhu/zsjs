export type FactionId =
  | "protectorate"
  | "grell"
  | "legion"
  | "xol"
  | "marran"
  | "dread-raiders"
  | "valkaru"
  | "chakru";

export type Tag =
  | "unit"
  | "worker"
  | "harvester"
  | "hero"
  | "merc"
  | "vehicle"
  | "infantry"
  | "attacker"
  | "grounded"
  | "flying"
  | "shoots:up"
  | "shoots:down"
  | "has-splash"
  | "building"
  | "base"
  | "base:hq"
  | "base:outpost"
  | "provides:supply"
  | "provides:production"
  | "provides:tech"
  | "massive"
  | "domain:air"
  | "domain:ground"
  | "tier:0"
  | "tier:1"
  | "tier:1.5"
  | "tier:2"
  | "tier:2.5"
  | "tier:3"
  | "tier:3.5"
  | "armor:light"
  | "armor:medium"
  | "armor:heavy";

export type SplashDamage = [amount: number, radius: number];

export type BonusDamage = [amount: number, tags: Tag[]];
