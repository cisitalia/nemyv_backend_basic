'use strict'

import bcrypt from 'bcrypt'

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            },
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        dbcode: {
            allowNull: false,
            type: DataTypes.STRING,
        }
    }, {
            tableName: 'users',
            timestamps: true,
        })

    User.associate = function (models) {
        // associations
    }

    // hooks
    // 저장하기 전에 비밀번호를 암호화 해서 넘긴다.
    User.beforeSave(async (user, options) => {
        if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password, salt)
        }
    })

    return User
}
