const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connections');

// Creates Comment model.
class Comment extends Model {}

// Creates fields/columns for Comment model.
Comment.init({

id: {

    type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true

},

comment_input: {

    type: DataTypes.STRING,
        allowNull: false,
        validate: {

            len: [1]

        }

},

user_id: {

    type: DataTypes.INTEGER,
        allowNull: false,
        references: {

            model: 'user',
            key: 'id'

        }

},

post_id: {

    type: DataTypes.INTEGER,
        allowNull: false,
        references: {

            model: 'post',
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
    modelName: 'comment'

})

module.exports = Comment;