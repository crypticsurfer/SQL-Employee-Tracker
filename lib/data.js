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

    async getEmployeeChoices(connection, no_choice) {
        let choices = []
    
        if (no_choice) {
          choices.push({ "name": "No Manager", "value": -1 });
        }
        
        const [rows, fields] = await connection.execute('SELECT * FROM data.employee');
        rows.forEach((result) => choices.push(
            {
                "name": result['first_name'] + ' ' + result['last_name'],
                "value": result['id']
            }
        ));
        return choices;
    }
    async addDepartment(connection, name) {
        const [rows] = await connection.execute('SELECT id FROM data.department ORDER BY id DESC LIMIT 1');
        let new_id;
        if (rows.length > 0) {
            new_id = rows[0]['id'] + 1;
        }
        else {
            new_id = 0;
        }
        try {
            await connection.execute('INSERT INTO data.department (id, name) VALUES (?, ?)', [new_id, name]);
            console.log(`Department ${name} made successfully!`);
        }
        catch (e) {
            console.error(e);
        }
    }

    async addRole(connection, title, salary, department_id) {
        const [rows] = await connection.execute('SELECT id FROM data.role ORDER BY id DESC LIMIT 1');
        let new_id;
        if (rows.length > 0) {
            new_id = rows[0]['id'] + 1;
        }
        else {
            new_id = 0;
        }
        if (salary === '') {
            salary = 0;
        }
        try {
            await connection.execute('INSERT INTO data.role (id, title, salary, department_id) VALUES (?, ?, ?, ?)', [new_id, title, salary, department_id]);
            console.log(`Role ${title} made successfully!`);
        }
        catch (e) {
            console.error(e);
        }
    }

    async addEmployee(connection, first_name, last_name, role_id, manager_id) {
        const [rows] = await connection.execute('SELECT id FROM data.employee ORDER BY id DESC LIMIT 1');
        let new_id;
        if (rows.length > 0) {
            new_id = rows[0]['id'] + 1;
        }
        else {
            new_id = 0;
        }
        if (manager_id == -1) {
            manager_id = null;
        }
        try {
            await connection.execute('INSERT INTO data.employee (id, first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?, ?)', [new_id, first_name, last_name, role_id, manager_id]);
            console.log(`Employee ${first_name + ' ' + last_name} made successfully!`);
        }
        catch (e) {
            console.error(e);
        }
    }

    async updateEmployee(connection, role_id) {
        const [rows] = await connection.execute('SELECT id FROM data.employee ORDER BY id DESC LIMIT 1');
        try{
            await connection.execute('UPDATE data.employee SET role_id = ? WHERE id = ?', [role_id, id]);
            console.log(`Employee updated!`);
          }
          catch (e) {
            console.error(e);
          }
        }
}
module.exports = Data;
