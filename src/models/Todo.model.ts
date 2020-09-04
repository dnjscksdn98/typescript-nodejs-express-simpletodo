import {
    AllowNull, AutoIncrement, Column, Model, PrimaryKey, Table
} from 'sequelize-typescript';


@Table
export default class Todo extends Model<Todo> {

    @AllowNull(false)
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @AllowNull(false)
    @Column
    text!: string;
}