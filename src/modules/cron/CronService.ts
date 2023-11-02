import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";


@Injectable()
export class CronService implements OnModuleInit {
  constructor(
    @InjectQueue("cron")
    private readonly cronQueue: Queue
  ) {}

  async onModuleInit() {
    console.log("init")
    await this.cronQueue.add({}, { repeat: { cron: "* * * *" }})
  }
}