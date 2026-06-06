/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Milestone {
  id: number;
  date: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  accent?: string;
}

export interface LoveReason {
  id: number;
  reason: string;
  icon: string;
  details: string;
}

export interface PromiseItem {
  id: number;
  text: string;
  category: string;
  icon: string;
}

export interface Memory {
  id: number;
  title: string;
  caption: string;
  imageUrl: string;
  date: string;
}

export interface JournalEntry {
  id: string;
  content: string;
  timestamp: string;
  sender: "رغد" | "آشور";
}

export type ThemeColor = "ruby" | "gold" | "rose" | "sapphire";
