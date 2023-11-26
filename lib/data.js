class Data {
  async getTableObject(connection, table) {
    const [rows, fields] = await connection.execute(`SELECT * FROM data.${table}`);
    return rows;
  }
  
  async getDepartmentChoices(connection) {
    let choices = [];
    const [rows, fields] = await connection.execute('SELECT * FROM data.department');
    rows.forEach((result) => choices.push(
      {
        "name": result['name'],
        "value": result['id']
      }
    ));
    return choices;
  }

  async getRoleChoices(connection) {
    let choices = [];
    const [rows, fields] = await connection.execute('SELECT * FROM data.role');
    rows.forEach((result) => choices.push(
      {
        "name": result['title'],
        "value": result['id']
      }
    ));
    return choices;
  }

  async getEmployeeChoices(connection) {
    let choices = [];
    const [rows, fields] = await connection.execute('SELECT * FROM data.employee');
    rows.forEach((result) => choices.push(
      {
        "name": result['first_name'] + ' ' + result['last_name'],
        "value": result['id']
      }
    ));
    return choices;
  }

  addDepartment(connection) {

  }

  addRole(connection) {

  }

  addEmployee(connection) {

  }
}

module.exports = Data;