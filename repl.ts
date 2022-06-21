'use-strict';
// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
export const menus = [
  {name: 'Menu 1', image: 'https://picsum.photos/200/300'},
  {name: 'Menu 2', image: 'https://picsum.photos/200/300'},
  {name: 'Menu 3', image: 'https://picsum.photos/200/300'},
  {name: 'Menu 4', image: 'https://picsum.photos/200/300'},
  {name: 'Menu 5', image: 'https://picsum.photos/200/300'},
  {name: 'Menu 6', image: 'https://picsum.photos/200/300'},
  {name: 'Menu 7', image: 'https://picsum.photos/200/300'},
  {name: 'Menu 8', image: 'https://picsum.photos/200/300'},
];

export const groupArrayByMultiple = (
  array: any[],
  groupSize: number,
): any[] => {
  const result = [];
  for (let i = 0; i < array.length; i += groupSize) {
    result.push(array.slice(i, i + groupSize));
  }
  return result;
};

console.log({gsTCxgt6KJN8: {myRow: 1}, i5fqtmRd7tax: {myRow: 1}});
