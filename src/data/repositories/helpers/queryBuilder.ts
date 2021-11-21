import { Knex } from "knex";

const filtersReference = {
  ne: applyNotEqualWhereClause,
  contains: applyContainsWhereClause,
  startsWith: applyStartsWithWhereClause,
  endsWith: applyEndsWithWhereClause,
  in: applyInWhereClause,
  nin: applyNotInWhereClause,
  is: applyIsWhereClause,
  isNull: applyIsNullWhereClause,
  lt: applyLowerThanWhereClause,
  lte: applyLowerThanOrEqualWhereClause,
  gt: applyGreaterThanWhereClause,
  gte: applyGreaterThanOrEqualWhereClause,
  between: applyBetweenWhereClause,
  notBetween: applyNotBetweenWhereClause,
};

function applyWhereClause(
  key: string,
  value: string,
  builder: Knex.QueryBuilder
) {
  const [property, operator] = key.split(".");
  if (operator) {
    filtersReference[operator](property, value, builder);
  } else {
    applyEqualWhereClause(property, value, builder);
  }
}

export function queryBuilder(
  builder: Knex.QueryBuilder,
  queryParams: Record<string, string>
): void {
  Object.entries(queryParams).forEach(([key, value]) => {
    if (!["page", "limit", "sort", "groupScouts"].includes(key)) {
      applyWhereClause(key, value, builder);
    }
  });
}

function convertStringToInteger(string: string) {
  const number = Number(string);
  if (!string || !Number.isInteger(number)) return null;
  return number;
}

function converStringToBoolean(string: string) {
  if (!string || ["true", "false"].indexOf(string) === -1) return null;
  return string === "true";
}

function applyNotEqualWhereClause(
  property: string,
  value: string,
  builder: Knex.QueryBuilder
) {
  builder.whereNot(property, value);
}

function applyContainsWhereClause(
  property: string,
  value: string,
  builder: Knex.QueryBuilder
) {
  builder.where(property, "like", `%${value}%`);
}

function applyStartsWithWhereClause(
  property: string,
  value: string,
  builder: Knex.QueryBuilder
) {
  builder.where(property, "like", `${value}%`);
}

function applyEndsWithWhereClause(
  property: string,
  value: string,
  builder: Knex.QueryBuilder
) {
  builder.where(property, "like", `%${value}`);
}

function applyInWhereClause(
  property: string,
  value: string,
  builder: Knex.QueryBuilder
) {
  builder.whereIn(property, value.split(","));
}

function applyNotInWhereClause(
  property: string,
  value: string,
  builder: Knex.QueryBuilder
) {
  builder.whereNotIn(property, value.split(","));
}

function applyIsWhereClause(
  property: string,
  value: string,
  builder: Knex.QueryBuilder
) {
  const booleanValue = converStringToBoolean(value);
  if (booleanValue !== null) {
    builder.where(property, booleanValue);
  }
}

function applyIsNullWhereClause(
  property: string,
  value: string,
  builder: Knex.QueryBuilder
) {
  const booleanValue = converStringToBoolean(value);
  if (booleanValue !== null && booleanValue) {
    builder.whereNull(property);
  }

  if (booleanValue !== null && !booleanValue) {
    builder.whereNotNull(property);
  }
}

function applyGreaterThanWhereClause(
  property: string,
  value: string,
  builder: Knex.QueryBuilder
) {
  const number = convertStringToInteger(value);
  if (number) {
    builder.where(property, ">", number);
  }
}

function applyGreaterThanOrEqualWhereClause(
  property: string,
  value: string,
  builder: Knex.QueryBuilder
) {
  const number = convertStringToInteger(value);
  if (number) {
    builder.where(property, ">=", number);
  }
}

function applyLowerThanWhereClause(
  property: string,
  value: string,
  builder: Knex.QueryBuilder
) {
  const number = convertStringToInteger(value);
  if (number) {
    builder.where(property, "<", number);
  }
}

function applyLowerThanOrEqualWhereClause(
  property: string,
  value: string,
  builder: Knex.QueryBuilder
) {
  const number = convertStringToInteger(value);
  if (number) {
    builder.where(property, "<=", number);
  }
}

function applyBetweenWhereClause(
  property: string,
  value: string,
  builder: Knex.QueryBuilder
) {
  const [firstValue, secondValue] = value.split(",");
  const firstNumber = convertStringToInteger(firstValue);
  const secondNumber = convertStringToInteger(secondValue);

  if (firstNumber && secondNumber) {
    builder.whereBetween(property, [firstNumber, secondNumber]);
  }
}

function applyNotBetweenWhereClause(
  property: string,
  value: string,
  builder: Knex.QueryBuilder
) {
  const [firstValue, secondValue] = value.split(",");
  const firstNumber = convertStringToInteger(firstValue);
  const secondNumber = convertStringToInteger(secondValue);

  if (firstNumber && secondNumber) {
    builder.whereNotBetween(property, [firstNumber, secondNumber]);
  }
}

function applyEqualWhereClause(
  property: string,
  value: string,
  builder: Knex.QueryBuilder
) {
  builder.where(property, value);
}
