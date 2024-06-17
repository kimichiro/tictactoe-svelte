import { getAlphanumHash, getNumberHash } from './hash'

export function getItemIds(count: number = 10) {
    return [...Array(count)].map(() => (Math.random() < 0.5 ? getAlphanumHash() : getNumberHash()))
}
