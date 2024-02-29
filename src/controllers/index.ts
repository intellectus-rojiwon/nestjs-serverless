import core from '@nestia/core';
import { ModuleMetadata } from '@nestjs/common';

export namespace Router {
    const dirname = __dirname;

    export const mount = async (
        metadata?: Omit<ModuleMetadata, 'controllers'>,
    ) => core.DynamicModule.mount(dirname, metadata);
}
