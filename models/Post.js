const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connections');

// Creates Post model.
class Post extends Model {}

// Creates fields/columns for Post model.
Post.init({

    id: {

        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true

    },
    title: {

        type: DataTypes.STRING,
        allowNull: false,
        validate: {

            len: [1]

        }

    },
    content: {

        type: DataTypes.STRING,
        allowNull: false,
        validate: {

            len: [1]

        }

    },
    user_id: {

        type: DataTypes.INTEGER,
        references: {

            model: 'user',
            key: 'id'

        }

    },
    creation_date: {

        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,

    }

},
{

    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',

})

module.exports = Post;