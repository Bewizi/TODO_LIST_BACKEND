import {DataTypes, Model} from "sequelize";
import database from "../../../shared/config/database_config";

class Task extends Model {
    declare id: string;
    declare title: string;
    declare description: string;
}

Task.init(
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        sequelize: database,
        modelName: "task",
        timestamps: true,
        paranoid: true
    }
)

export default Task;