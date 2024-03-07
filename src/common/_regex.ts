import typia from 'typia';

export namespace Regex {
    export type UUID = string & typia.tags.Format<'uuid'>;
}
