// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {ICON} from '../assets/icon';

const groupArrayByMultiple = <T>(array: T[], groupSize: number): T[][] => {
  const result = [];
  for (let i = 0; i < array.length; i += groupSize) {
    result.push(array.slice(i, i + groupSize));
  }
  return result;
};

// overload 1: getImageSource(image: string): any;
function getImageSource(image: string): any;
// overload 2: getImageSource(image: string, type: keyof typeof ICON): any;
function getImageSource(image: string, type?: 'PART'): any;
// implementation of overloads
function getImageSource(image: string, type?: 'PART'): any {
  if (type) {
    return ICON[type][image as keyof typeof ICON.PART];
  }
  return ICON[image as keyof typeof ICON];
}

export {getImageSource, groupArrayByMultiple};
