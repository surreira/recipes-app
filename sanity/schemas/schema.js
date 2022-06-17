import schemaTypes from "all:part:@sanity/base/schema-type";
import createSchema from "part:@sanity/base/schema-creator";

import accessory from "./accessory";
import category from "./category";
import recipe from "./recipe";
import step from "./step";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([accessory, category, recipe, step]),
});
