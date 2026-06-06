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

export function parseSafeDate(dateStr: string): Date {
  // Safe date parsing to support all browsers including mobile Safari.
  // Expects ISO-like format: "YYYY-MM-DDTHH:mm:ss" or Date representation
  const parts = dateStr.split(/[-T:]/);
  if (parts.length >= 6) {
    return new Date(
      parseInt(parts[0], 10),
      parseInt(parts[1], 10) - 1, // 0-indexed month
      parseInt(parts[2], 10),
      parseInt(parts[3], 10),
      parseInt(parts[4], 10),
      parseInt(parts[5], 10)
    );
  }
  return new Date(dateStr);
}

