import { unit, building } from "./build.js";

const PrimeRoot = building("Prime Root");

const Seedling = unit("Seedling")
  .worker()
  .time(5)
  .ground()
  .hp(120)
  .speed(575)
  .check();

const Havester = unit("Harvester")
  .harvester()
  .cost(150)
  .time(20)
  .ground()
  .hp(525)
  .speed(400)
  .check();

const Stinger = unit("Stinger")
  .t1()
  .ground()
  .cost(50)
  .time(18)
  .count(2)
  .supply(1)
  .hp(100)
  .light()
  .speed(700)
  .vision(1800)
  .damage(5)
  .reload(0.6)
  .shootsDown()
  .range(100)
  .check();

const Harbinger = unit("Harbinger")
  .t1()
  .cost(100, 100)
  .time(25)
  .supply(3)
  .ground()
  .shootsAll()
  .hp(300)
  .heavy()
  .speed(500)
  .damage(21)
  .reload(1.75)
  .range(800)
  .check();

const Weaver = unit("Weaver")
  .t1_5()
  .cost(25, 75)
  .supply(3)
  .time(25)
  .ground()
  .shootsAll()
  .hp(300)
  .medium()
  .speed(450)
  .damage(18)
  .reload(1)
  .range(1200)
  .check();

const Lasher = unit("Lasher")
  .t2()
  .cost(50, 50)
  .supply(3)
  .time(28)
  .ground()
  .shootsAll()
  .hp(250)
  .light()
  .speed(450)
  .damage(32)
  .reload(1.8)
  .range(1000)
  .check();

const Skrelling = unit("Skrelling")
  .t2()
  .cost(25, 50)
  .supply(1)
  .time(16)
  .air()
  .shootsAll()
  .hp(140)
  .light()
  .speed(700)
  .damage(10)
  .reload(1)
  .range(150)
  .check();

const Reaver = unit("Reaver")
  .t3()
  .cost(150, 150)
  .supply(8)
  .time(60)
  .ground()
  .shootsDown()
  .hp(1200)
  .heavy()
  .speed(500)
  .damage(55, 2)
  .splash(0.5, 60)
  .bonus(0.5, "building")
  .reload(2.15)
  .range(180)
  .check();

const Thresher = unit("Thresher")
  .t3()
  .cost(100, 200)
  .ground()
  .time(60)
  .supply(8)
  .hp(625)
  .heavy()
  .shootsDown()
  .speed(450)
  .vision(1800)
  .damage(110)
  .bonus(0.5, "building")
  .splash(0.85, 250)
  .reload(3.3)
  .range(2700)
  .check();

const Behemoth = unit("Behemoth")
  .t3()
  .air()
  .cost(100, 200)
  .supply(8)
  .time(60)
  .shootsDown()
  .hp(625)
  .heavy()
  .speed(400)
  .damage(30)
  .bonus(0.75, "armor:heavy")
  .reload(2)
  .range(1400)
  .check();
