/* @flow */
/**
 * This file is part of the TREZOR project.
 *
 * Copyright (C) 2015 SatoshiLabs <info@satoshilabs.com>
 *
 * This library is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this library.  If not, see <http://www.gnu.org/licenses/>.
 */

"use strict";

import type {ChromePlatformInfo} from "chromeApi";

// encapsulating chrome's platform info into Promise API
export function platformInfo(): Promise<ChromePlatformInfo> {
  return new Promise((resolve, reject) => {
    try {
      chrome.runtime.getPlatformInfo((info: ChromePlatformInfo) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          if (info == null) {
            reject(new Error("info is null"));
          } else {
            resolve(info);
          }
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}

export function manifest(): Promise<Object> {
  return new Promise((resolve, reject) => {
    try {
      resolve(chrome.runtime.getManifest());
    } catch (e) {
      reject(e);
    }
  });
}
