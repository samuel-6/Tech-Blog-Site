const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');
const bcrypt = require('bcrypt');

// Creates User model.
class User extends Model {

    // Checks password against hashed password.
    checkPassword(loginPassword) {

        return bcrypt.compareSync(loginPassword, this.password);

    }

}

// Creates fields/columns for User model.
User.init({

    id: {

        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true

    },
    username: {

        type: DataTypes.STRING,
        allowNull: false

    },
    password: {

        type: DataTypes.STRING,
        allowNull: false,
        validate: {

            len: [4]
            
        }

    }

},
{

    hooks: {

        // Hashes password before creating new user.
        async beforeCreate(newUserData) {

            newUserData.password = await bcrypt.hash(newUserData.password, 10);

            return newUserData;

        },

        // Hashes password before updating user.
        async beforeUpdate(updatedUserData) {

            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);

            return updatedUserData;

        }

    },

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'

})

module.exports = User;