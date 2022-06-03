// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {createRealmProvider} from '@realm/react/dist/RealmProvider';
import {createUseObject} from '@realm/react/dist/useObject';
import {createUseQuery} from '@realm/react/dist/useQuery';
import {createUseRealm} from '@realm/react/dist/useRealm';

export type ControllerContext = {
  RealmProvider: ReturnType<typeof createRealmProvider>;
  useQuery: ReturnType<typeof createUseQuery>;
  useObject: ReturnType<typeof createUseObject>;
  useRealm: ReturnType<typeof createUseRealm>;
};
