import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from "../types";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class UserEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn( {
        unsigned: true
    } )
    id: number;

    @ApiProperty()
    @Column( {
        length: 191,
        nullable: false
    } )
    firstName: string;

    @ApiProperty()
    @Column( {
        length: 191,
        nullable: false
    } )
    lastName: string;

    @ApiProperty()
    @Column( {
        length: 191,
        unique: true,
        nullable: false
    } )
    email: string;

    @Column( {
        length: 191,
        nullable: false
    } )
    password: string;

    @ApiProperty()
    @Column( {
        type: "enum",
        enum: UserRole,
        default: UserRole.USER,
        nullable: false
    } )
    role: UserRole;
}
