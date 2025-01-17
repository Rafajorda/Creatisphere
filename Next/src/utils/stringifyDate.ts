/* eslint-disable @typescript-eslint/no-unused-vars */

// Mapper genérico para excluir campos `createdAt` y `updatedAt`
export function stringifyTimestamps<T extends { createdAt?: unknown; updatedAt?: unknown }>(
    object: T
): Omit<T, 'createdAt' | 'updatedAt'> & { createdAt?: string; updatedAt?: string } {
    const { createdAt, updatedAt, ...rest } = object;
    return {
        ...rest,
        createdAt: createdAt ? String(createdAt) : undefined,
        updatedAt: updatedAt ? String(updatedAt) : undefined,
    };
}

// Mapper para arrays de objetos
export function stringifyTimestampsFromArray<T extends { createdAt?: unknown; updatedAt?: unknown }>(
    array: T[]
): Omit<T, 'createdAt' | 'updatedAt'>[] {
    return array.map(stringifyTimestamps);
}
