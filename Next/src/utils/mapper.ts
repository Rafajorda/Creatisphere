/* eslint-disable @typescript-eslint/no-unused-vars */

// Mapper genérico para excluir campos `createdAt` y `updatedAt`
export function excludeTimestamps<T extends { createdAt?: unknown; updatedAt?: unknown }>(
    object: T
): Omit<T, 'createdAt' | 'updatedAt'> {
    const { createdAt, updatedAt, ...rest } = object;
    return rest;
}

// Mapper para arrays de objetos
export function excludeTimestampsFromArray<T extends { createdAt?: unknown; updatedAt?: unknown }>(
    array: T[]
): Omit<T, 'createdAt' | 'updatedAt'>[] {
    return array.map(excludeTimestamps);
}
