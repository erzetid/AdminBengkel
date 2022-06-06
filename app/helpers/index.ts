// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
export const groupArrayByMultiple = <T>(
  array: T[],
  groupSize: number,
): T[][] => {
  const result = [];
  for (let i = 0; i < array.length; i += groupSize) {
    result.push(array.slice(i, i + groupSize));
  }
  return result;
};
