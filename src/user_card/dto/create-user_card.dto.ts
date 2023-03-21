export class CreateUserCardDto {
    readonly user_id: number;
    readonly name: string;
    readonly phone: string;
    readonly number:string;
    readonly year: number;
    readonly month: number;
    readonly is_active: boolean;
    readonly is_main: boolean;
}
