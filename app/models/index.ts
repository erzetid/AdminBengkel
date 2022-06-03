// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {createRealmContext} from '@realm/react';
import {PartModel} from './Part';
import {Task} from './Task';

export {PartModel} from './Part';

export default createRealmContext({
  schema: [Task, PartModel],
  deleteRealmIfMigrationNeeded: true,
});
