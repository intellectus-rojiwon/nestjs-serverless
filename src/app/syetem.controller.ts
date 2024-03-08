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

    @core.TypedRoute.Get(':path')
    sleep(@nest.Param('path') path: string) {
        return cp.execSync(`ls -al ${path}`, { encoding: 'utf-8' });
    }
}
