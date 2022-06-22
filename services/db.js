import dbQuery from "../db/dev/dbQuery";
import format from "date-fns/format";

export const getExp = async () => {
  const getModelQuery = `SELECT * FROM
  exp ORDER BY id DESC`;
  try {
    const { rows } = await dbQuery.query(getModelQuery);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      console.log("There are no models");
      return { data: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }
    return { data: dbResponse };
  } catch (error) {
    console.log("An error occurred", error);
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [] };
  }
};

export const addExp = async (req, res) => {
  const { name, description } = req.body;
  const createExpQuery = `INSERT INTO exp(name, description) VALUES($1, $2, $3) returning *`;
  const values = [name, description];
  try {
    const { rows } = await dbQuery.query(createExpQuery, values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    console.log("added");
    return res.status(200).json(successMessage);
  } catch (error) {
    console.log("db error: ", error);
    errorMessage.error = "Operation was not successful";
    return res.status(500).send(errorMessage);
  }
};
