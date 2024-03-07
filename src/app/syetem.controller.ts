import core from '@nestia/core';
import * as nest from '@nestjs/common';

function* waitSync(now: Date, sec: number) {
    const expired_at = new Date(now.getTime() + sec * 1000);
    while (new Date() < expired_at) yield true;
}

@nest.Controller('health')
export class SystemController {
    /**
     * Just for health checking API Server liveness.
     *
     * @summary Health check API
     * @tag system
     * @return hello world
     */
    @core.TypedRoute.Get()
    async check(): Promise<'hello world'> {
        return 'hello world';
    }

    @core.TypedRoute.Get('sleep')
    sleep() {
        const now = new Date();
        for (const _ of waitSync(now, 60)) _;
        return `${now.toISOString()} -> ${new Date().toISOString()}`;
    }
}
