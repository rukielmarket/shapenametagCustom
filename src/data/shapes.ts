import type { PartDefinition } from '../types/configurator';

export type ShapeModel = { id: string; label: string; path: string; rotation: [number, number, number] };
export type ShapeDefinition = { id: string; label: string; slug: string; emoji: string; models: ShapeModel[] };

export const shapes: ShapeDefinition[] = [
  { id: 'heart', label: '하트', slug: 'heart', emoji: '♡', models: [{ id: 'heart-2', label: '두 글자', path: '/models/shape-name-tag/하트_두글자.glb', rotation: [Math.PI / 2, 0, 0] }, { id: 'heart-3', label: '세 글자', path: '/models/shape-name-tag/하트_세글자.glb', rotation: [Math.PI / 2, 0, 0] }] },
  { id: 'bear', label: '곰돌이', slug: 'bear', emoji: 'ʕ•ᴥ•ʔ', models: [{ id: 'bear-2', label: '두 글자', path: '/models/shape-name-tag/곰돌이_두글자.glb', rotation: [Math.PI / 2, 0, 0] }, { id: 'bear-3', label: '세 글자', path: '/models/shape-name-tag/곰돌이_세글자.glb', rotation: [Math.PI / 2, 0, 0] }] },
  { id: 'rabbit', label: '토끼', slug: 'rabbit', emoji: '૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა', models: [{ id: 'rabbit-2', label: '두 글자', path: '/models/shape-name-tag/토끼_두글자.glb', rotation: [Math.PI / 2, 0, 0] }, { id: 'rabbit-3', label: '세 글자', path: '/models/shape-name-tag/토끼_세글자.glb', rotation: [Math.PI / 2, 0, 0] }] },
];

export const shapeParts: PartDefinition[] = [
  { id: 'background', label: '배경', meshNames: ['background'], defaultColor: 'white' },
  { id: 'letter', label: '글씨', meshNames: ['letter'], defaultColor: 'pink' },
];
