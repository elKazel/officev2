
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Service {
  id: string;
  name: string;
  category: string;
  image: string;
  details: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

/**
 * Added Artist interface to fix error in ArtistCard.tsx
 */
export interface Artist {
  name: string;
  image: string;
  day: string;
  genre: string;
}
