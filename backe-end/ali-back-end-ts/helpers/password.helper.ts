import bcrypt from 'bcryptjs';

export const generatePassword = async (password: string) => {
    // const salt = await bcrypt.genSaltSync(3);
    // const pass = bcrypt.hashSync(password, salt);
    //console.debug(`recipe: ${password}`)
    const saltRounds = 3;
    const salt = bcrypt.genSaltSync(saltRounds);
    const pass = bcrypt.hashSync(password, salt);
    //console.debug(`deliver: ${pass}`)

    return pass;
}

export const ValidadPassword = (password: string, hash: string) => {
    const validPassword = bcrypt.compare(password, hash);
    if (!validPassword) {
        return false;
    } else {
        return true;
    }

}
