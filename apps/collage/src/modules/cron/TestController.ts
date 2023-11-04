import { Controller, Get } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";


@Controller("cron")
export class TestController {
  constructor(
    @InjectQueue("worker") private readonly workerQueue: Queue,
  ) {}

  @Get("test")
  async testController() {
    await this.workerQueue.add({
      foo: "bar"
    })
  }
}