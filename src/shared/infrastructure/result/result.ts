export class Result<T> {
    constructor(public isSuccess: boolean, public statusCode: number, public readonly value?: T ,public error?: string) {}

    static success<U>(value: U, status: number): Result<U> {
        return new Result<U>(true, status,value, undefined);
    }

    static failure<U>(error: string, status: number): Result<U> {
        return new Result<U>(false, status, undefined, error);
    }

}