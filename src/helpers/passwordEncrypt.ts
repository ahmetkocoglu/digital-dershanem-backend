import bcrypt from 'bcrypt';

const passwordEncrypt = (password: string) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);

};

export default passwordEncrypt;