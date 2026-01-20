/**
 * Color palettes for pixel art conversion
 *
 * This file re-exports all palettes from the modular palette system.
 * Palettes are organized by category in lib/palettes/:
 * - basic.ts: Classic grayscale and Game Boy
 * - generated.ts: Programmatically generated uniform RGB palettes
 * - custom.ts: Curated custom palettes
 * - community.ts: Community and artist-created palettes
 */
export { PALETTES, findClosestColor } from './palettes/index';
