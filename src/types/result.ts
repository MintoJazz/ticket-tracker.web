export type Result<T, E = unknown> =
    | {
        success: true
        data: T
    }
    | {
        success: false
        error: E
    }

export const success = <T>(data: T): Result<T> => ({
    success: true,
    data,
})

export const failed = <E = unknown>(error: E): Result<never, E> => ({
    success: false,
    error,
})
