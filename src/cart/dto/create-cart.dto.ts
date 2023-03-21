export class CreateCartDto {
    readonly user_id: number;
    readonly user_wallet_id: number;
    readonly st_time_id: number;
    readonly date?: Date;
    readonly createdAt?: Date;
    readonly time_for_clear?: string;
    readonly status_id: number;
}
