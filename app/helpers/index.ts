// Copyright (c) 2022 https://www.adminbengkel.my.id
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
function truncateString(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}

function greeting() {
  const today = new Date();
  const hour = today.getHours();
  if (hour < 12) {
    return 'Selamat Pagi ';
  }
  if (hour < 18) {
    return 'Selamat Siang ';
  }
  return 'Selamat Malam ';
}

function filterArrayContain<T1 extends {[key: string]: any}, T2 extends T1>(
  arr: T1[],
  arr1: T2[],
  field: keyof T1,
): T1[] {
  return arr.filter(t => arr1.findIndex(i => i[field] === t[field]) < 0);
}

function filterArray<ID, T extends {id: ID}>(arr: T[], ids: ID[]): T[] {
  return arr.filter(t => ids.indexOf(t.id) > -1);
}

function generateCode(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function generateServCode() {
  const result = generateCode(9);
  const final = `ab-${result}`;
  return final;
}

function generateQueue(lastQueue: number): string {
  let queue = '';
  if (lastQueue < 9) {
    queue = `S00${lastQueue + 1}`;
  } else if (lastQueue > 8) {
    queue = `S0${lastQueue + 1}`;
  } else {
    queue = `S0${lastQueue + 1}`;
  }
  return queue;
}

export {
  getImageSource,
  groupArrayByMultiple,
  truncateString,
  greeting,
  filterArrayContain,
  filterArray,
  generateServCode,
  generateQueue,
  generateCode,
};
