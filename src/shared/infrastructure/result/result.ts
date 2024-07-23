export class Result<T> {
    constructor(public isSuccess: boolean, public readonly value?: T ,public error?: string) {}

    static success<U>(value: U): Result<U> {
        return new Result<U>(true, value, undefined);
    }

    static failure<U>(error: string): Result<U> {
        return new Result<U>(false, undefined, error);
    }

}