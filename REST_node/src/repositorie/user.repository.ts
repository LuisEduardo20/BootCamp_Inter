import db from "../config/db";
import DataBaseError from "../models/errors/database.error.model";
import User from "../models/user.model";

class UserRepository {
  
  //? GET ALL USERS
  async findAllUsers(): Promise<User[]> {
    const query = `
    SELECT 
    uuid, username
    FROM 
    application_user;
    `;
    
    const { rows } = await db.query<User[]>(query);
    return rows || [];
  }
  
  //? GET SPECIFIC USER
  async findUserById(uuid: string): Promise<User> {
    try {
      const query = `
      SELECT 
        uuid, username
      FROM
        application_user
      WHERE
        uuid = $1
      `;
      const values = [uuid];
      
      const { rows } = await db.query(query, values);
      const user = rows;
      
      return user[0];
    }
    catch (err) {
      console.log(err);
      throw new DataBaseError("Erro na consulta por ID", err);
    }
  }
  
  //? CREATE USER
  async createUser(user: User): Promise<string> {
    const { username, password } = user;
    
    const query = `
    INSERT INTO
      application_user (username, password)
    VALUES
      ($1, crypt($2, 'my_salt'))
    RETURNING
      uuid
    `;
    
    const values =  [username, password];
    
    const { rows } = await db.query<{ uuid: string }>(query, values);
    const [ newUser ] = rows;
    
    return newUser.uuid;
  }
  
  //? UPDATE USER
  async updateUser(user: User): Promise<void> {
    const { uuid, username, password } = user;
    
    const query = `
    UPDATE
      application_user
    SET
      username = $1, 
      password = crypt($2, ${process.env.SALT})
    WHERE
      uuid = $3
    `;
    
    const values =  [username, password, uuid];
    
    await db.query(query, values);
  }
  
  //? DELETE USER
  async deleteUser(uuid: string): Promise<void> {
    const query = `
    DELETE FROM
      application_user
    WHERE
      uuid = $1
    `;
    
    const values = [uuid];
    
    await db.query(query, values);
  }

  //? VERIFY USER
  async findByUsernameAndPassword(username: string, password: string): Promise<User | null> {
    try {
      const query = `
        SELECT
          uuid, username
        FROM
          application_user
        WHERE
          username = $1
        AND
          password = crypt($2, '${process.env.SALT}')
      `;
  
      const values = [username, password];
      
      const { rows } = await db.query<User>(query, values);
      
      const [ user ] = rows;
  
      return user || null;
    }
    catch (err) {
      throw new DataBaseError('Erro na consulta por credenciais');
    }
    
  }
  
}

export default new UserRepository();